<template>
  <div>
    <h2>Plugin Test</h2>
    <el-divider></el-divider>
    <el-button @click=test>TEST</el-button>
    {{ selected }}
    <el-table :data="tableData" ref="tableRef" style="width: 100%; " row-key="key" border default-expand-all @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="key" label="Key" sortable>
        <template #default="{ row }">
          <lc-icon :icon="row.icon"></lc-icon> {{ row.key }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable />
      <el-table-column prop="description" label="Description" sortable />
      <el-table-column prop="entry" label="Entry" sortable />
      <el-table-column prop="sequence" label="Sequence" sortable />
    </el-table>

  </div>
</template>
<script lang="ts" setup>
import { ref, inject,onMounted } from 'vue'
//
const globalContext = inject('globalContext')
//
const tableRef = ref(null)
//
const tableData = globalContext.pluginManager.findAllPlugins()
console.log(globalContext.pluginManager.findAllPlugins().map(item => item.key))
//
const selected = ref(['_pallet', '_componentTree', '_title', '_button_sys'])
//To avoid handleSelectionChange to take affect before set all the choosed selection
let finishInit=false
//
function test() {
  for(const row of tableData){
    if(selected.value.find(item=>row.key==item)){
      tableRef.value.toggleRowSelection(row,true)
    }
  }
  ///
  finishInit=true
  //
  console.log(tableRef.value.getSelectionRows())
}
onMounted(()=>test())

//
function handleSelectionChange(selection){
  if(!finishInit){
    return
  }
  selected.value=selection.map(item=>item.key)
}

</script>
