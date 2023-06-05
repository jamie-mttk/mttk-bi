<template>
    <el-dialog v-model="dialogVisible" title="Method editor" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">
            <el-form-item label="Key" prop="key" required>
                <el-input v-model="formData.key" />
            </el-form-item>
            <el-form-item label="Description" prop="description" >
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="Parameters" prop="paras">
                <el-table :data="formData.paras" style="width: 100%">
                    <el-table-column prop="key" label="Key" />
                    <el-table-column prop="description" label="Description" />
                    <el-table-column prop="type" label="Data type" />
                    <el-table-column fixed="right" label="Operations" width="240px">
                        <template #default="sp">
                            <el-button-group>
                                <el-button type="primary" @click="handleAdd()">Add</el-button>
                                <el-button type="success" @click="handleEdit(sp)">Edit</el-button>
                                <el-button type="danger" @click="handleDelete(sp)">Delete</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                    <template #empty>
                        Please <el-button type="primary" @click="handleAdd()">Add</el-button> a new record
                    </template>
                </el-table>
            </el-form-item>
            <el-form-item label="Code" prop="code" >
                <b-ace-editor v-model="formData.code" lang="javascript"  width="100%" height="40vh"
                    :readonly="false" :font-size="14"></b-ace-editor>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
    <MethodParaEditorDialog ref="methodParaEditorDialogRef"></MethodParaEditorDialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import MethodParaEditorDialog from './MethodParaEditorDialog.vue'
import {deepCopy} from '@/utils/tools'
//The row index editing
let editingIndex=-1
const methodParaEditorDialogRef=ref()

//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {
    // console.log('DATA SET TO '+JSON.stringify(data))
    formData.value = data
    callbackSaved = callback;
    dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function;
//
const dataEditorFormRef = ref<FormInstance>()
//
//
function handleAdd(){
  editingIndex=-1
   //
   methodParaEditorDialogRef.value.show({},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  methodParaEditorDialogRef.value.show(rowCopied,callback)
}

const callback=(dataNew:Object)=>{
  if(editingIndex<0){
    //add
    formData.value.paras.push(dataNew)
  }else{
    //edit
    formData.value.paras[editingIndex]=dataNew
  }
}
//Delete
const handleDelete = (sp) => {
     //
     formData.value.paras.splice(sp.$index,1);
}
//
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            //
            dialogVisible.value = false
            //
            if (callbackSaved) {
                callbackSaved(formData.value)
            }
        }
    })
}
//
defineExpose({ show })
</script>
<style scoped></style>
  