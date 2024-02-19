<template>
    <div>
        <el-alert title="Optional. Please choose a data from page which will be mapped to widget model value" type="success"
            style="margin-bottom: 10px;" />
        <el-form :model="formData" label-width="120px" ref="modelValueFormRef">

            <el-form-item label="Data mapped" prop="raw_page_id">
                <el-select v-model="formData.dataMapped" clearable>
                    <el-option v-for="page in dataList" :key="page['key']" :label="page['name']" :value="page['key']" />
                </el-select>
            </el-form-item>

        </el-form>

    </div>
</template>
<script setup lang="ts">
import { inject, ref, watch } from 'vue'

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
const formData = ref(props.modelValue.modelValue || {})

//
const globalContext = inject('globalContext')
//
const dataList = ref([])
//
function load() {
    if (!props.modelValue.sys.raw_page_id) {
        return;
    }
    globalContext.request({
        method: "GET",
        url: 'page/load',
        params: {
            id: props.modelValue.sys.raw_page_id
        }
    }).then(function (response) {
        //sourceCode.value=response
        //
        dataList.value = response.data

    });
}
watch(
    () => props.modelValue.sys.raw_page_id,
    () => {
        load()
    }, {
    immediate: true
}
)
//
// const modelValueFormRef = ref()
//
function beforeClose(done) {
    //
    const d = props.modelValue
    d.modelValue = formData.value
    emit('update:modelValue', d)
    //
    done()
}
//
defineExpose({ beforeClose })
</script>
  