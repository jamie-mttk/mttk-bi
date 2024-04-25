<template>
    <el-drawer v-model="dialogVisible" :title=" $t('bi.plugin.modelEditor.single.entityTree.columnChoose.title')" width="50%" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-table :data="allFields" style="width: 100%" ref="columnChooseTableRef">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="key" :label=" $t('bi.plugin.modelEditor.single.entityTree.columnChoose.key')" />
            <el-table-column prop="label" :label=" $t('bi.plugin.modelEditor.single.entityTree.columnChoose.label')" />

        </el-table>
     
        <template #footer>
            <span class="dialog-footer">
                <el-switch v-model="useRemarkAsName" style="margin-right:16px" :active-text=" $t('bi.plugin.modelEditor.single.entityTree.columnChoose.useRemark')" />

                    <el-button @click="dialogVisible = false"> {{$t('_._.cancel')}}</el-button>
                <el-button type="primary" @click="handleConfirm">
                    {{$t('_._.ok')}}
                </el-button>
            </span>
        </template>
    </el-drawer>
</template>
<script lang="ts" setup>
import { ref, inject, nextTick } from 'vue'

import { tools } from 'mttk-lowcode-engine'
import { findColumns, loadEntityColumnsPromise } from '../../../util/modelUtil'
//
const globalContext = inject('globalContext')
//
const columnChooseTableRef = ref()
//
const dialogVisible = ref(false)
//data of the table of all the fields
const allFields = ref([])

//
const useRemarkAsName = ref(true)
//
let modelSaved=undefined
let entitySaved=undefined
//Chosoed columns while the dialog is opened - save to compare the difference while saving 
let choosedColumns=[]
//
function show(entity, model) {
    modelSaved=model
    entitySaved=entity
    //
    loadEntityColumnsPromise(globalContext.request, model._id, entity).then(function (reponse) {
         //Show first,otherwise columnChooseTableRef is null
         dialogVisible.value = true
         //
        allFields.value = reponse.data
        
        //Use nextTick to wait table to finish rendering
        nextTick(() => {
            choosedColumns = findColumns(model, entity.key)

            //Defaultly choose columns already choosed
            for (const c of choosedColumns) {
                //Find row
                const row = allFields.value.find((item) => {
                    return item.key == c.column
                })
                //
                if (row) {
                    columnChooseTableRef.value.toggleRowSelection(row, undefined)
                }
            }
           
        })
    })
}

//
defineExpose({ show })
//
function handleConfirm() {
    const rows = columnChooseTableRef.value.getSelectionRows()
    //Remove the columns in model which is not choosed any more
    removeUnSelected(rows)
    //Add into model columns which is choosed
     addNewSelected(rows)
    //
    dialogVisible.value=false
}
function removeUnSelected(rows) {
    removeUnselectedInternal(rows,modelSaved?.columns)
    //try to remove from children
    for(const column of modelSaved?.columns){
        removeUnselectedInternal(rows,column.children)
    }
}
function removeUnselectedInternal(rows,columns){
        if(!columns){
            return
        }
        //Try to find the index of model columns which is NOT in rows
        const index=columns.findIndex(c=>{
        //First check entity matched
        if(c.entity!=entitySaved.key){
            return false;
        }
        //This is to determine whether the column is NOT in rows
        return rows.findIndex(r=>r.key==c.column)<0
     })
     if(index>=0){
        //Found
        columns.splice(index,1)
        //Try to delete next one
        removeUnSelected(rows)
     }
}
function addNewSelected(rows) {
    //Try to check whether rows is in model columns
  for(const row of rows){
     if(!columnExist(row)){
        //r is not in model column,add
        modelSaved.columns.push(  {
            "key" : 'c'+tools.createUniqueString(),
            "entity" : entitySaved.key,
            "dataType" : row.dataType,
            "label" : useRemarkAsName.value ? row.label : row.key,
            "type" : "field",
            "column" : row.key
        })
     }
  }
}
function columnExist(row){
    if(columnExistInternal(row,modelSaved.columns)){
        return true;
    }
    for(const column of modelSaved.columns){
        if(columnExistInternal(row,column.children)){
            return true;
        }
    }
    //
    return false;
}
function columnExistInternal(row,columns){
    if(!columns){
        return false
    }
    //
    const index=columns.findIndex(c=>{
        //First check entity matched
        if(c.entity!=entitySaved.key){
            return false;
        }
        //This is to determine whether the column is NOT in rows
        return c.column==row.key
     })
     //
     return index>=0;
}
</script>