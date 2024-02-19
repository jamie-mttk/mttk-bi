<template>
  <el-table :data="tableData" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="driverClass" label="驱动类" />
    <el-table-column prop="url" label="URL" />
    <el-table-column prop="readonly" label="只读" width="80px">
      <template #default="sp">
        <el-switch v-model="sp.row.readonly" :before-change="function(){return false}"/>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="240px">
      <template #default="sp">
        <el-button-group>
          <el-button type="primary" @click="handleAdd()">增加</el-button>
          <el-button type="success" @click="handleEdit(sp)">修改</el-button>
          <el-button type="danger" @click="handleDelete(sp)">删除</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
      Please <el-button type="primary" @click="handleAdd()">Add</el-button> a new record
    </template>
  </el-table>

  <ConnectionEditorDialog ref="connectionEditorDialogRef"></ConnectionEditorDialog>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import ConnectionEditorDialog from './ConnectionEditorDialog.vue'

import { deepCopy } from '@/utils/tools'

const globalContext = inject('globalContext')
const appContext = inject('appContext')
import { getKeysMap } from 'element-plus/es/components/table/src/util'
//Refer to the popup dialog
const connectionEditorDialogRef = ref(null)
//
const tableData = ref([])
//
function reload() {
  //Load connection list
  globalContext.request({
    method: "GET",
    url: '/jdbcConnection/query',
    params: {
      app: appContext.getKey()
    }
  }).then(
    function (response) {
      tableData.value = response.list
    }
  )
}
//
reload();

//The row index editing
let editingIndex = -1

//
function handleAdd() {
  editingIndex = -1
  //
  connectionEditorDialogRef.value.show({readonly:true,app:appContext.getKey()}, callback)
}
function handleEdit(sp) {
  editingIndex = sp.$index
  connectionEditorDialogRef.value.show(sp.row, callback)
}

const callback = (dataNew) => {
  globalContext.request({
        method: "POST",
        url: '/jdbcConnection/save',
        data: dataNew,
    }).then(function () {
        //
        reload();
    })
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    '确定要删除数据库连接?',
    'Warning',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(() => {
           //
           globalContext.request({
            method: "POST",
            url: 'jdbcConnection/delete',
            params: {
                id: sp.row['_id']
            }
        }).then(function () {
            reload();
        });
    })
}
</script>
