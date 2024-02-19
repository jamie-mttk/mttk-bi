<template>
    <el-dialog v-model="dialogVisible" title="Event mapping editor" :close-on-click-modal="false" :close-on-press-escape="false">

        <el-form ref="eventMappingEditorRef" :model="formData" label-width="120px">
            <el-form-item label="UI component" prop="ui" required>
                <el-tree-select v-model="formData.ui" :data="treeSelectData" :render-after-expand="false" :check-strictly=true />
            </el-form-item>
            <el-form-item label="Original event" prop="event" required>
                <el-input v-model="formData.event" />
            </el-form-item>
            <el-form-item label="Event to raise" prop="eventRaise" required>
                <el-input v-model="formData.eventRaise" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm(eventMappingEditorRef)">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import {buildSelectTreeData} from './wizardEventUtil'

//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, modelValue:object,callback: Function) {
    formData.value = data
    callbackSaved = callback;
    //
    loadSelectTreeData(modelValue);
    dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function;
//
const eventMappingEditorRef = ref<FormInstance>()
//Tree select data
const  treeSelectData=ref([])
//
//const globalContext = inject('globalContext')

//
function loadSelectTreeData(modelValue:object){
    // const url=modelValue.sys.raw_page_id
    // if(!url){
    //     return
    // }
    // //
    // globalContext.request({
    //     method: "GET",
    //     url: 'page/load',
    //     params: {
    //         id: url
    //     }
    // }).then(function (response) {
    //     //sourceCode.value=response
        //
        treeSelectData.value=buildSelectTreeData(modelValue.rawPage,globalContext.componentRepository)
  //  });
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
  