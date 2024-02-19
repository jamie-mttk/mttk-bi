<template>
    <el-drawer v-model="dialogVisible" title="模型字段选择" width="50%" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-table :data="allFields" style="width: 100%" ref="columnChooseTableRef">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="key" label="字段名" />
            <el-table-column prop="label" label="字段标签" />

        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
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
let modelSaved=undefined
let entitySaved=undefined
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
            const choosedColumns = findColumns(model, entity.key)

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
    //Try to find the index of model columns which is NOT in rows
     const index=modelSaved.columns.findIndex(c=>{
        //First check entity matched
        if(c.entity!=entitySaved.key){
            return false;
        }
        //This is to determine whether the column is NOT in rows
        return rows.findIndex(r=>r.key==c.column)<0
     })
     if(index>=0){
        //Found
        modelSaved.columns.splice(index,1)
        //Try to delete next one
        removeUnSelected(rows)
     }
}
function addNewSelected(rows) {
    //Try to check whether rows is in model columns
  for(const r of rows){
    const index=modelSaved.columns.findIndex(c=>{
        //First check entity matched
        if(c.entity!=entitySaved.key){
            return false;
        }
        //This is to determine whether the column is NOT in rows
        return c.column==r.key
     })
     if(index<0){
        //r is not in model column,add
        modelSaved.columns.push(  {
            "key" : tools.createUniqueString(),
            "entity" : entitySaved.key,
            "dataType" : r.dataType,
            "label" :r.label,
            "type" : "field",
            "column" : r.key
        })
     }
  }
}
</script>