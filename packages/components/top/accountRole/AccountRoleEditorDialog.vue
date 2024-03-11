<template>
    <el-dialog v-model="dialogVisible" title="用户组编辑" :destroy-on-close="true"
        :close-on-click-modal="false" :close-on-press-escape="false">

        <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">
        
            <el-form-item label="名称" prop="name" required>
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="权限" prop="authorities">
                <RoleAuthorities v-model="formData.authorities" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref, watch, inject, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import RoleAuthorities  from './RoleAuthorities.vue';


//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {

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
  