<template>
  <el-dialog v-model="dialogVisible" title="Data value">
    <b-ace-editor v-model="jsonData" lang="json" width="100%" height="50vh" :readonly="false"
      :font-size="14"></b-ace-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-switch v-if="editingType==0" style="margin-right: 20px;" v-model="resetFlag" size="large"
          inactive-text="Reset current value to init value while saving" />
          <el-switch v-if="editingType==1" style="margin-right: 20px;" v-model="resetFlag2" size="large"
          inactive-text="Reset init value to current value while saving" />
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref, isRef, inject } from 'vue'
import { ElNotification } from 'element-plus'
//
const context = inject('context')
//
const jsonData = ref()
//
const resetFlag = ref(true)
//
const resetFlag2 = ref(false)

//Save the data editing
let editingData = undefined;
let editingType = 0
//Show this dialog
//data:data to edit
//type:0 - initvalue,1 - currentValue
function show(data: object, type: int) {
  editingData = data;
  editingType = type
  //
  jsonData.value = parseValue(data)
  //
  dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)

//Parse value  - set jsonData as string from raw data
function parseValue(data: object) {
  let value = undefined;
  if (editingType == 0) {
    value = data.initValue
  } else {
    value = context.dataManager.getData(editingData.key)
    value = isRef(value) ? value.value : value
  }


  if (value != undefined) {
    if ('String' == data.type) {
      //stringify will add "" around String,so we need to handle it seperately
      return value
    } else {
      //alreay has data,use it directly after convert to string
      return JSON.stringify(value, null, 2)
    }
  }

  //Set value by type
  if ('Object' == data.type) {
    return '{}'
  } else if ('Array' == data.type) {
    return '[]'
  } else if ('String' == data.type) {
    return ''
  } else if ('Number' == data.type) {
    return '0'
  } else if ('Boolean' == data.type) {
    return 'true'
  } else {
    return ''
  }
}
//Parse jsonData(String) to proper type according to data type
function applyData() {
  if ('Object' == editingData.type) {
    return JSON.parse(jsonData.value)
  } else if ('Array' == editingData.type) {
    return JSON.parse(jsonData.value)
  } else if ('String' == editingData.type) {
    return jsonData.value
  } else if ('Number' == editingData.type) {
    return parseFloat(jsonData.value)
  } else if ('Boolean' == editingData.type) {
    return 'true' == jsonData.value
  } else {
    return ''
  }
}
//
function handleSave() {
  let value = undefined
  try {
    value = applyData()
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: e.message,
      type: 'error',
    })
    //
    return
  }
  //
  if (editingType == 0) {
    editingData.initValue = value
    if(resetFlag.value){
      context.dataManager.setData(editingData.key, value)
    }
  } else {
    context.dataManager.setData(editingData.key, value)
    if(resetFlag2.value){
      editingData.initValue = value
    }
  }
  //
  dialogVisible.value = false
}

//
defineExpose({ show })
</script>
<style scoped></style>
  