<script lang="ts" setup>
import { ref, computed, reactive, inject } from 'vue'
import { watchPausable } from '@vueuse/core'

//Current selected row,use to make it editable
const currentRow = ref({})
//
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
const context = inject('context')
//Whether component is choosed
const isChoosed = computed(() => {    //
    const choosed = context.choosedManager.getChoosed()
    return choosed && choosed.key
})
//Build from props
const tableData = ref([])
const {  pause, resume } = watchPausable(
    ()=>props.modelValue,
    () => {
        const result = []
        for (const k of Object.keys(props.modelValue)) {
            result.push({ name: k, value: props.modelValue[k] })
        }
        tableData.value = result
    },{
        immediate:true
    })

//Once click,save current row
function handleRowClick(row) {
    currentRow.value = row
}
//Add a new style
function addNewStyle() {
    //console.log(isRef(props.modelValue)+'~~~'+isReactive(props.modelValue))
    tableData.value.push({})
}
//Delete from
function deleteRow(sp) {
    //
    tableData.value.splice(sp.$index, 1)
    //
    updateBack();
}
//
function updateBack() {
    pause() 
    //Delete later,the keys which has been changed or deleted
        for (const k of Object.keys(props.modelValue)) {
        if (!styleExist(k)) {
            delete props.modelValue[k]
        }
    }
    //
    for (const line of tableData.value) {
        if (!line.name || !line.value) {
            continue;
        }
        //
        props.modelValue[line.name] = line.value
        //
        //
        //emit("update:modelValue", props.modelValue)
    }
    //
    resume()

}
function styleExist(name: string) {
    for (const line of tableData.value) {
        if (name == line.name) {
            return true
        }
    }
    return false
}
</script>

<template>
    <div v-show="isChoosed">
        <el-table :data="tableData" style="width: 100%" :show-header="false" empty-text="Press button below"
            @row-click="handleRowClick">
            <el-table-column prop="name" label="Name">
                <template #default="sp">
                    <el-input v-model="sp.row.name" v-if="currentRow == sp.row" @change="updateBack"></el-input>
                    <span v-else>{{ sp.row.name || 'Empty' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="value" label="Value">
                <template #default="sp">
                    <el-input v-model="sp.row.value" v-if="currentRow == sp.row" @change="updateBack"></el-input>
                    <span v-else>{{ sp.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="Operation" width="60px">
                <template #default="sp">
                    <el-button icon="Delete" @click="deleteRow(sp)" />
                </template>
            </el-table-column>
        </el-table>
        <el-button icon="Plus" @click="addNewStyle" style="margin-top:6px;">Add a new style</el-button>
    </div>
    <div v-show="!isChoosed">
        No component is choosed
    </div>
</template>