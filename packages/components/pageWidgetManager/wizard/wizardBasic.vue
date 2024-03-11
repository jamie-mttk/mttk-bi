<template>
    <div>
        <el-alert
            title="Basic information of the page widget. The unique key is set first time[System set a default value] and can not be changed after saved."
            type="success" style="margin-bottom: 10px;" />
        <el-form :model="formData" label-width="120px" ref="basicFormRef">
            <el-form-item label="Unique key" prop="key" required>
                <el-input v-model="formData.key" :disabled="!!$props.modelValue['_id']">
                    <template #append>
                        <el-button @click="generateKey">Generate</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Original page" prop="raw_page_id" required>
                <el-select v-model="formData.raw_page_id" filterable required @change="pageChange">
                    <el-option v-for="page in pages" :key="page['_id']" :label="page['name']" :value="page['_id']" />
                </el-select>
            </el-form-item>


            <el-form-item label="Name" prop="name" required>
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input v-model="formData.description" />
            </el-form-item>

            <el-form-item label="Icon" prop="icon" required>
                <lc-icon-picker v-model="formData.icon" />
            </el-form-item>
        </el-form>

    </div>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import { deepCopy, createUniqueString } from '@/utils/tools'
const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    }
})
//
const emit = defineEmits<{
    (e: 'update:modelValue', value: object): void
}>()
//
const formData = ref(props.modelValue.sys)

//
const globalContext = inject('globalContext')
//Page list - use to select raw page
const pages = ref([])
globalContext.request({
    method: "GET",
    url: 'page/query',
}).then(function (response) {
    pages.value = response.list
});
//page change 
function pageChange(val) {
    if (!val) {
        formData.raw_page_name = ''
        return
    }
    //
    const found = pages.value.find((p) => p['_id'] == val)
    if (found) {
        formData.raw_page_name = found['name']
    } else {
        formData.raw_page_name = ''
    }
}
//
function generateKey(){
    formData.value.key=createUniqueString()
}
//
const basicFormRef = ref()
//
function beforeClose(done) {

    basicFormRef.value.validate((valid) => {
        if (valid) {
            globalContext.request({
                method: "GET",
                url: 'page/load',
                params: {
                    id: props.modelValue.sys.raw_page_id
                }
            }).then(function (response) {
                //
                const d = props.modelValue
                d.sys = formData.value
                d.rawPage = response
                //
                emit('update:modelValue', d)
                //
                done()
            });

        }
    });
}
//
defineExpose({ beforeClose })
</script>
  