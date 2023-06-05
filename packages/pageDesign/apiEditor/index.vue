<template>



  <el-table :data="tableData" border >
    <el-table-column  prop="key" label="Key"  />
    <el-table-column prop="description" label="Description" />
    <el-table-column prop="method" label="Method" />
    <el-table-column prop="url" label="URL" />
    <el-table-column fixed="right" label="Operations" width="280px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">Add</el-button>
        <el-button  type="success" @click="handleEdit(sp)">Edit</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">Delete</el-button>
        <el-button  type="warning" @click="handleCall(sp)">Call</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
     Please <el-button  type="primary" @click="handleAdd()">Add</el-button> a new record
      </template>
  </el-table>
 
  <ApiEditorDialog ref="apiEditorDialogRef"></ApiEditorDialog>

</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import ApiEditorDialog from './ApiEditorDialog.vue'

import {deepCopy} from '@/utils/tools'
//Refer to the popup dialog
const apiEditorDialogRef=ref()
//
const context = inject('context')

//The row index editing
let editingIndex=-1
//
function handleAdd(){
  editingIndex=-1
   //
   apiEditorDialogRef.value.show({},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  apiEditorDialogRef.value.show(rowCopied,callback)
}

const callback=(dataNew:Object)=>{
  if(editingIndex<0){
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
    'Will you want to delete this API',
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
    })

}
//Call
const handleCall = (sp) => {
  ElMessageBox.confirm(
    'Will you want to call this API',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
     //
     context.apiManager.invoke(sp.row.key)
     //
     ElMessage({
    message: 'API is called.',
    type: 'success',
  })
    })

}
//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().apis
})

</script>
