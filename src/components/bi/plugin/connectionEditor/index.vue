<template>
  <div class="toolbar-table-container" style="margin:0 24px 0 8px;">
    <div class="lc-common-toolbar toolbar" style="background-color: var(--el-color-primary)">
      <div class="left" style="font-weight: bold; color: var(--el-color-white);">数据库连接</div>

      <el-button-group class="right">
        <el-button @click="reload">
          <template #icon> <lc-icon icon="mdiRefresh"></lc-icon> </template>刷新</el-button
        >
        <el-button @click="handleAdd" v-auth:jdbcConnection_add>
          <template #icon> <lc-icon icon="mdiPlus"></lc-icon> </template>新建连接</el-button
        >
      </el-button-group>
    </div>

    <el-table :data="tableData"  class="table-area" v-fullHeight="8">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="driverClass" label="驱动类" />
      <el-table-column prop="url" label="URL" />
      <el-table-column prop="readonly" label="只读" width="80px">
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
      <el-table-column fixed="right" label="操作" width="240px">
        <template #default="sp">
          <el-button-group>
            <el-button @click="handleEdit(sp)" v-data-auth:edit="sp.row">修改</el-button>
            <el-button @click="handleDelete(sp)" v-data-auth:del="sp.row">删除</el-button>
            <lcDataAuthButton :data="sp.row" resource="jdbcConnection" />
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        Please <el-button type="primary" @click="handleAdd()">Add</el-button> a new record
      </template>
    </el-table>
  </div>

  <ConnectionEditorDialog ref="connectionEditorDialogRef"></ConnectionEditorDialog>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import ConnectionEditorDialog from './ConnectionEditorDialog.vue'
import { lcDataAuthButton,vFullHeight } from 'mttk-lowcode-engine'

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
  connectionEditorDialogRef.value.show({ readonly: true, app: appContext.getKey() }, callback)
}
function handleEdit(sp) {
  editingIndex = sp.$index
  connectionEditorDialogRef.value.show(sp.row, callback)
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
  ElMessageBox.confirm('确定要删除数据库连接?', 'Warning', {
    confirmButtonText: '是',
    cancelButtonText: '否',
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
