<template>
    <el-dialog v-model="dialogVisible" title="Computed editor" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">
            <el-form-item label="Key" prop="key" required>
                <el-input v-model="formData.key" />
            </el-form-item>
            <el-form-item label="Description" prop="description" >
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="Code" prop="code" required>

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
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'


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
  