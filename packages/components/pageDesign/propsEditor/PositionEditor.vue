<script lang="ts" setup>
import { ref, computed, reactive, inject } from 'vue'
import { watchPausable } from '@vueuse/core'
let props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    },
})
// const emit = defineEmits<{
//     (e: 'update:modelValue', value: Object): void
// }>()
//
// const context = inject('context')
//Table name list
const nameList = [{ key: 'x', description: 'Left(x)' },
{ key: 'y', description: 'Top(y)' },
{ key: 'z', description: 'z-index' },
{ key: 'w', description: 'Width' },
{ key: 'h', description: 'Height' }]
//Build from props
const tableData = ref([])
const { pause, resume } = watchPausable(
    () => props.modelValue,
    () => {

        const result = []
        for (const name of nameList) {
            result.push({ key: name.key, description: name.description, value: props.modelValue[name.key] })
        }
        tableData.value = result
    }, {
    immediate: true,
    deep:true,
})

function updateBack(row) {

        pause()
        //

        props.modelValue[row.key] = row.value

        //
        //emit("update:modelValue", props.modelValue)
        //
        resume()
    // }
}
</script>

<template>
    <el-table :data="tableData" style="width: 100%" :show-header="false" >
        <!-- <el-table-column prop="key" label="Key">

        </el-table-column> -->
        <el-table-column prop="description" label="Name" width="80px">

        </el-table-column>

        <el-table-column prop="value" label="Value" >
            <template #default="sp">
                <el-input-number v-model="sp.row.value" size="small" :step="10" style="width:100%;" @change="updateBack(sp.row)"></el-input-number>

            </template>
        </el-table-column>

    </el-table>
</template>


