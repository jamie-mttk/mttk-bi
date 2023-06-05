<template>
  <el-table :data="tableData" border >
    <el-table-column  prop="key" label="Key"  />

    <el-table-column fixed="right" label="Operations" width="280px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">Add</el-button>
        <el-button  type="success" @click="handleEdit(sp)">Edit</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">Delete</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
     Please <el-button  type="primary" @click="handleAdd()">Add</el-button> a new record
      </template>
  </el-table>
 
  <LifecycleEditorDialog ref="lifecycleEditorDialogRef"></LifecycleEditorDialog>


</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox } from 'element-plus'
import LifecycleEditorDialog from './LifecycleEditorDialog.vue'


import {deepCopy} from '@/utils/tools'
//Refer to the popup dialog
const lifecycleEditorDialogRef=ref()

//The row index editing
let editingIndex=-1
//
const context = inject('context')
//
function handleAdd(){
  editingIndex=-1
   //
   lifecycleEditorDialogRef.value.show({mode:'script',code:''},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  lifecycleEditorDialogRef.value.show(rowCopied,callback)
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
    'Will you want to delte this lifecycle',
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

//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().lifecycle
})

// const  tableData= reactive([
//  {key:'formData',name:'Search criteria',type:'Object',initValue:{name:'111',type:'222',age:33}},
//  {key:'tableData',name:'Data to show in table',type:'Array',initValue:[{key:'k1',name:'n1',age:11},{key:'k2',name:'n2',age:122}]},
//  {key:'simpleBoolean',name:'Simple boolean',type:'Boolean',initValue:false},
//  {key:'simpleString',name:'Simple string',type:'String',initValue:'hello'},
//  {key:'simpleNumber',name:'Simple number',type:'Number',initValue:1234},
// ])
</script>
