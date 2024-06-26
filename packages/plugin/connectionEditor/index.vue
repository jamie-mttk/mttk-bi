<template>
  <div class="toolbar-table-container" style="margin: 0 24px 0 8px">
    <div class="lc-common-toolbar toolbar" style="background-color: var(--el-color-primary)">
      <div class="left" style="font-weight: bold; color: var(--el-color-white)">
        {{ $t('bi.plugin.connectionEditor.name') }}
      </div>

      <el-button-group class="right">
        <el-button @click="reload">
          <template #icon> <lc-icon icon="mdiRefresh"></lc-icon> </template>
          {{ $t('_._.refresh') }}</el-button
        >
        <el-button @click="handleAdd" v-auth:jdbcConnection_add>
          <template #icon> <lc-icon icon="mdiPlus"></lc-icon> </template
          >{{ $t('_._.add') }}</el-button
        >
      </el-button-group>
    </div>

    <el-table :data="tableData" class="table-area" v-fullHeight="8">
      <el-table-column prop="name" :label="$t('_._.name')" />
      <el-table-column prop="description" :label="$t('_._.description')" />
      <el-table-column
        prop="driverClass"
        :label="$t('bi.plugin.connectionEditor.data.driverClass')"
      />
      <el-table-column prop="jdbcUrl" label="URL" />
      <el-table-column
        prop="readonly"
        :label="$t('bi.plugin.connectionEditor.data.readonly')"
        width="120px"
      >
        <template #default="sp">
          <el-switch
            v-model="sp.row.readonly"
            :before-change="
              function () {
                return false
              }
            "
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('_._.operation')" width="320px">
        <template #default="sp">
          <el-button-group>
            <el-button @click="handleEdit(sp)" v-data-auth:edit="sp.row">{{
              $t('_._.edit')
            }}</el-button>
            <el-button @click="handleDelete(sp)" v-data-auth:del="sp.row">{{
              $t('_._.del')
            }}</el-button>
            <el-button @click="handleTrial(sp)" v-data-auth:del="sp.row">{{
              $t('bi.plugin.connectionEditor.trial')
            }}</el-button>
            <lcDataAuthButton :data="sp.row" resource="jdbcConnection" uri="/bi/jdbcConnection" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <ConnectionEditorDialog ref="connectionEditorDialogRef"></ConnectionEditorDialog>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import { ElMessageBox,  } from 'element-plus'
import ConnectionEditorDialog from './ConnectionEditorDialog.vue'
import { locale, lcDataAuthButton, vFullHeight } from 'mttk-lowcode-engine'
import {tryTrial} from './connectionUtil'

const globalContext = inject('globalContext')
const appContext = inject('appContext')

//Refer to the popup dialog
const connectionEditorDialogRef = ref(null)
//
const tableData = ref([])
//
function reload() {
  //Load connection list
  globalContext
    .request({
      method: 'GET',
      url: '/bi/jdbcConnection/query',
      params: {
        app: appContext.getKey()
      }
    })
    .then(function (response) {
      tableData.value = response.list
    })
}
//
reload()

//The row index editing
let editingIndex = -1

//
function handleAdd() {
  editingIndex = -1
  //
  connectionEditorDialogRef.value.show(
    {
      app: appContext.getKey(),
      readonly: true,
      minimumIdle: 1,
      maximumPoolSize: 3,
      connectionTimeout: 10000,
      idleTimeout: 60000,
      maxLifetime: 600000
    },
    callback
  )
}
function handleEdit(sp) {
  editingIndex = sp.$index
  connectionEditorDialogRef.value.show(sp.row, callback)
}
function handleTrial(sp) {
  tryTrial(globalContext,sp.row)
}
const callback = (dataNew) => {
  globalContext
    .request({
      method: 'POST',
      url: '/bi/jdbcConnection/save',
      data: dataNew
    })
    .then(function () {
      //
      reload()
    })
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(locale.t('bi.plugin.connectionEditor.deleteConfirm'), 'Warning', {
    confirmButtonText: locale.t('_._.yes'),
    cancelButtonText: locale.t('_._.no'),
    type: 'warning'
  }).then(() => {
    //
    globalContext
      .request({
        method: 'POST',
        url: '/bi/jdbcConnection/delete',
        params: {
          id: sp.row['_id']
        }
      })
      .then(function () {
        reload()
      })
  })
}
</script>
