<template>
  <div class="toolbar-table-container" style="margin: 0 24px 0 8px">
    <div class="lc-common-toolbar toolbar" style="background-color: var(--el-color-primary)">
      <div class="left" style="font-weight: bold; color: var(--el-color-white)">
        {{ $t('bi.plugin.modelEditor.name') }}
      </div>
      <el-button-group class="right">
        <el-button @click="reload">
          <template #icon> <lc-icon icon="mdiRefresh"></lc-icon> </template>
          {{ $t('_._.refresh') }}</el-button
        >
        <el-button @click="handleAddModel" v-auth:dataModel_add>
          <template #icon>
            <lc-icon icon="mdiPlus"></lc-icon> </template
          >{{ $t('_._.add') }}</el-button
        >
      </el-button-group>
    </div>
    <el-table :data="modelList" class="table-area" v-fullHeight="8">
      <el-table-column prop="name" :label="$t('_._.name')" width="320px" />
      <el-table-column
        prop="_connectionName"
        :label="$t('bi.plugin.modelEditor.data.connection')"
        idth="320px"
      />
      <el-table-column prop="description" :label="$t('_._.description')" />
      <el-table-column prop="_insertTime" :label="$t('_._.createTime')" width="200px">
        <template #default="sp">
          {{ formatDateTime(sp.row._insertTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="_updateTime" :label="$t('_._.updateTime')" width="200px">
        <template #default="sp">
          {{ formatDateTime(sp.row._updateTime) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('_._.operation')" width="260px">
        <template #default="sp">
          <el-button-group>
            <el-button @click="handleEdit(sp.row)" v-data-auth:edit="sp.row">{{ $t('_._.edit') }}</el-button>
            <el-button @click="handleDelete(sp.row)" v-data-auth:del="sp.row">{{ $t('_._.del') }}</el-button>
            <lcDataAuthButton :data="sp.row" resource="dataModel" uri="/bi/dataModel"> </lcDataAuthButton>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <AddModelDialog v-model="showAddModelDialog" :callback="handleCallback"></AddModelDialog>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import { formatDateTime } from '../../../utils/biTool'
import AddModelDialog from './AddModelDialog.vue'

import { lcDataAuthButton, vFullHeight, locale } from 'mttk-lowcode-engine'

//
const emit = defineEmits(['edit'])
//
const globalContext = inject('globalContext')
const appContext = inject('appContext')
//
const showAddModelDialog = ref(false)
function handleAddModel() {
  showAddModelDialog.value = true
}
function handleCallback(model) {
  globalContext
    .request({
      method: 'POST',
      url: '/bi/dataModel/save',
      data: model
    })
    .then(function (response) {
      //
      handleEdit(response)
    })
}
function handleDelete(model) {
  ElMessageBox.confirm(
    locale.t('bi.plugin.modelEditor.deleteConfirm', [model.name]),
    locale.t('_._.warning'),
    {
      confirmButtonText: locale.t('_._.yes'),
      cancelButtonText: locale.t('_._.no'),
      type: 'warning'
    }
  ).then(() => {
    //
    globalContext
      .request({
        method: 'POST',
        url: '/bi/dataModel/delete',
        params: {
          id: model['_id']
        }
      })
      .then(function () {
        reload()
      })
  })
}

//model list
const modelList = ref([])

function reload() {
  //Load mode list
  globalContext
    .request({
      method: 'GET',
      url: '/bi/dataModel/query',
      params: {
        app: appContext.getKey()
      }
    })
    .then(function (response) {
      modelList.value = response.list
    })
}
reload()
//
function handleEdit(model) {
  emit('edit', model._id)
}
</script>
