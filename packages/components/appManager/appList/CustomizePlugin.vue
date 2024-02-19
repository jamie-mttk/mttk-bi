<template>
  <el-scrollbar height="520px">
    <el-alert  type="info" effect="dark" :closable="false"  >
            <template #title>
                Total: {{ tableData.length }} Selected: {{modelValue.length}}
            </template>
            </el-alert>
        <el-table :data="tableData" ref="tableRef" style="width: 100%; " row-key="key" border default-expand-all
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="key" label="Key" sortable>
                <template #default="{ row }">
                    <lc-icon :icon="row.icon"></lc-icon> {{ row.key }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Name" sortable />
            <el-table-column prop="description" label="Description" sortable />
            <el-table-column prop="entry" label="Entry" width="120" sortable />
            <el-table-column prop="sequence" label="Sequence" width="120" sortable />
        </el-table>

    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'
import { useVModels } from '@vueuse/core'
//
const globalContext = inject('globalContext')

//modelValue is field list
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
const tableRef = ref(null)
//
const tableData = globalContext.pluginManager.findAllPlugins()
// console.log(globalContext.pluginManager.findAllPlugins().map(item => item.key))

//To avoid handleSelectionChange to take affect before set all the choosed selection
let finishInit = false
//

onMounted(() => {
    //choose already choosed plugins
    for (const row of tableData) { 
         tableRef.value.toggleRowSelection(row, !!modelValue.value.find(item => row.key == item))
    }
    ///
    finishInit = true

})

//
function handleSelectionChange(selection) {
    if (!finishInit) {
        return
    }
    modelValue.value = selection.map(item => item.key)
}

</script>
  