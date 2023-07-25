<template>
  <el-table :data="tableData" border >
    <el-table-column  prop="key" label="Key"  />
    <el-table-column prop="description" label="Description" />
    <el-table-column fixed="right" label="Operations" width="280px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">Add</el-button>
        <el-button  type="success" @click="handleEdit(sp)">Edit</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">Delete</el-button>
        <el-button  type="success" @click="handleCurrentValue(sp)">Value</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
     Please <el-button  type="primary" @click="handleAdd()">Add</el-button> a new record
      </template>
  </el-table>
 
  <ComputedEditorDialog ref="computedEditorDialogRef"></ComputedEditorDialog>
  <ComputedValueDialog ref="computedValueDialogRef"></ComputedValueDialog>

</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox } from 'element-plus'
import ComputedEditorDialog from './ComputedEditorDialog.vue'
import ComputedValueDialog from './ComputedValueDialog.vue'

import {deepCopy} from '@/utils/tools'
//Refer to the popup dialog
const computedEditorDialogRef=ref()
const computedValueDialogRef=ref()
//The row index editing
let editingIndex=-1
//
const context = inject('context')
//
function handleAdd(){
  editingIndex=-1
   //
   computedEditorDialogRef.value.show({code:''},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  computedEditorDialogRef.value.show(rowCopied,callback)
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
    'Will you want to delte this computed',
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
     context.computedManager.reset(sp.row.key)
    })

}

//current Value 
const handleCurrentValue = (sp) => {
  computedValueDialogRef.value.show(sp.row)
}
//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().computed
})


</script>
