<template>
    <el-dialog v-model="dialogVisible" title="数据库连接编辑" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="connectionEditorFormRef" :model="formData"  label-width="120px">
            <el-form-item label="名称"  prop="name" required>
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="描述"  prop="description" >
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="驱动类"  prop="driverClass" required>
                <el-input v-model="formData.driverClass" />
            </el-form-item>
            <el-form-item label="URL"  prop="url" required>
                <el-input v-model="formData.url" />
            </el-form-item>
            <el-form-item label="用户名"  prop="user" >
                <el-input v-model="formData.user" />
            </el-form-item>
            <el-form-item label="密码"  prop="password" >
                <el-input v-model="formData.password" type="password"/>
            </el-form-item>
            <el-form-item label="只读"  prop="readonly" >
                <el-switch v-model="formData.readonly" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="submitForm(connectionEditorFormRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import {  ref  } from 'vue'
import type { FormInstance } from 'element-plus'


//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data:object,callback:Function){
   
   formData.value=data
    callbackSaved=callback;
    dialogVisible.value=true    
}

//Whether the dialog is show or hide
const dialogVisible=ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved:Function;
//
const connectionEditorFormRef = ref<FormInstance>()

//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //
      dialogVisible.value=false
      //
      if(callbackSaved){
        callbackSaved(formData.value)
      }
    }
  })
}


//
defineExpose({show})
</script>
<style scoped></style>
  