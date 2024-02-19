<template>



  <el-table :data="tableData" border >
    <el-table-column  prop="key" label="Key"  />
    <el-table-column prop="description" label="Description" />
    <el-table-column prop="type" label="Type" />
    <el-table-column fixed="right" label="Operations" width="420px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">Add</el-button>
        <el-button  type="success" @click="handleEdit(sp)">Edit</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">Delete</el-button>
        <el-button  type="primary" @click="handleInitValue(sp)">Init value</el-button>
        <el-button  type="success" @click="handleCurrentValue(sp)">Current value</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
     Please <el-button  type="primary" @click="handleAdd()">Add</el-button> a new record
      </template>
  </el-table>
 
  <DataEditorDialog ref="dataEditorDialogRef"></DataEditorDialog>
  <DataValueDialog ref="dataValueDialogRef"></DataValueDialog>

</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import DataEditorDialog from './DataEditorDialog.vue'
import DataValueDialog from './DataValueDialog.vue'


import {deepCopy} from '@/utils/tools'
//Refer to the popup dialog
const dataEditorDialogRef=ref()
const dataValueDialogRef=ref()
//The row index editing
let editingIndex=-1
//
const context = inject('context')
//
function handleAdd(){
  editingIndex=-1
   //
   dataEditorDialogRef.value.show({},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  dataEditorDialogRef.value.show(rowCopied,callback)
}

const callback=(dataNew:Object)=>{
  if(editingIndex<0){
    //check whether key is existed
    for(const single of tableData.value){
      if(single.key==dataNew.key){
        ElMessage.error('Data key ['+dataNew.key+'] is already existed')
        //
        return;
      }
    }
    //add
    tableData.value.push(dataNew)
  }else{
    //edit
    tableData.value[editingIndex]=dataNew
  }
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this data',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
     //
     tableData.value.splice(sp.$index,1);
     //Remove from data manager
     context.dataManager.clear(sp.row.key)
    })

}
//init Value 
const handleInitValue = (sp) => {
  dataValueDialogRef.value.show(sp.row,0)
}
//current Value 
const handleCurrentValue = (sp) => {
  dataValueDialogRef.value.show(sp.row,1)
}
//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().data
})


</script>
