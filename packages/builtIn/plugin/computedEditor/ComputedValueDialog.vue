<template>
  <el-dialog v-model="dialogVisible" title="Computed value">
    <b-ace-editor v-model="jsonData" lang="json" width="100%" height="50vh" :readonly="false"
      :font-size="14"></b-ace-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>

      </span>
    </template>
  </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref, inject } from 'vue'

//
const context = inject('context')
//
const jsonData = ref()

//Save the data editing
let editingData = undefined;

function show(data: object) {
  editingData = data;
  //
  jsonData.value = parseValue(data)
  //
  dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)

//Parse value  - set jsonData as string from raw data
function parseValue(data: object) {
  const value = context.computedManager.get(editingData.key)?.value

  if (value != undefined) {
    if (typeof  value=='string' ) {
      //stringify will add "" around String,so we need to handle it seperately
      return value
    } else {
      //alreay has data,use it directly after convert to string
      return JSON.stringify(value, null, 2)
    }
  } else {
    return 'undefined'
  }
}
//
defineExpose({ show })
</script>
<style scoped></style>
  