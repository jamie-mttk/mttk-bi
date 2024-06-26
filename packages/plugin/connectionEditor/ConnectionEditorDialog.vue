<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('_._.edit') + ' ' + $t('bi.plugin.connectionEditor.name')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="connectionEditorFormRef" :model="formData" label-width="200px">
      <el-form-item :label="$t('_._.name')" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item :label="$t('_._.description')" prop="description">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-tabs v-model="activeTab"  type="card" class="connection-editor">
        <el-tab-pane label="Basic" name="basic">
          <el-form-item
            :label="$t('bi.plugin.connectionEditor.data.driverClass')"
            prop="driverClassName"
            required
          >
            <el-input v-model="formData.driverClassName" />
          </el-form-item>
          <el-form-item label="URL" prop="jdbcUrl" required>
            <el-input v-model="formData.jdbcUrl" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.user')" prop="username">
            <el-input v-model="formData.username" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.password')" prop="password">
            <el-input v-model="formData.password" type="password" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.readonly')" prop="readOnly">
            <el-switch v-model="formData.readOnly" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Pool" name="pool">
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.minimumIdle')" prop="user">
            <el-input-number v-model="formData.minimumIdle" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.maximumPoolSize')" prop="user">
            <el-input-number v-model="formData.maximumPoolSize" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.connectionTimeout')" prop="user">
            <el-input-number v-model="formData.connectionTimeout" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.idleTimeout')" prop="user">
            <el-input-number v-model="formData.idleTimeout" />
          </el-form-item>
          <el-form-item :label="$t('bi.plugin.connectionEditor.data.maxLifetime')" prop="user">
            <el-input-number v-model="formData.maxLifetime" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleTrial()" >{{
              $t('bi.plugin.connectionEditor.trial')
            }}</el-button>
        <el-button @click="dialogVisible = false">{{ $t('_._.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(connectionEditorFormRef)">
          {{ $t('_._.save') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref,inject, } from 'vue'
import type { FormInstance } from 'element-plus'
import {tryTrial} from './connectionUtil'
//
const globalContext=inject('globalContext')
//
const activeTab = ref('basic')

//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {
  formData.value = data
  callbackSaved = callback
  dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function
//
const connectionEditorFormRef = ref<FormInstance>()
//
function handleTrial(){
  tryTrial(globalContext,formData.value)
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
<style >
.connection-editor .el-tabs__nav{
    float: left !important;
  left: 128px !important;
}
</style>
