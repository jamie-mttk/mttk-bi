<template>
    <div>
        <el-alert title="Choose the data which will be configured in page widget." type="success"
            style="margin-bottom: 10px;" />
        <el-table ref="wizardDataTableRef" :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column property="key" label="Key" />
            <el-table-column property="description" label="Description" />
            <el-table-column property="type" label="Type" />

        </el-table>

    </div>
</template>
<script setup lang="ts">
import { ref, watch, inject, nextTick } from 'vue'


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
const globalContext = inject('globalContext')
//
const wizardDataTableRef = ref()
//
const tableData = ref([])
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
        tableData.value = response.data
        //
        nextTick(() => checkInitRows())
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
function checkInitRows() {
    //clear all
    wizardDataTableRef.value!.clearSelection()
    //
    for (const dataKey of props.modelValue.data || []) {
        const row = tableData.value.find((item) => item.key == dataKey)
        if (row) {
            wizardDataTableRef.value!.toggleRowSelection(row, true)
        }
    }
}

function beforeClose(done) {
    let rowsKey = wizardDataTableRef.value!.getSelectionRows().map(item => item.key)
    //
    const d = props.modelValue
    d.data = rowsKey
    emit('update:modelValue', d)
    //
    done();
}
//
defineExpose({ beforeClose })
</script>
  