<template>
    <el-container style="height:100%;">
    <el-header class="lc-common-toolbar">
      <span class="left lc-main-title">Application List </span>
      <span class="right">
        <el-button icon="Plus" type="primary" @click="handleAdd">Add application</el-button>
      </span>
    </el-header>
    <el-main class="app-list-area">
      <el-row>
        <el-col :span="6" v-for="app in apps" :key="app['_id']">
          <AppSingle :modelValue="app" @action="handleAction"></AppSingle>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-if="apps.length==0">
          <el-empty description="">
            <template #description>
            <h2>No application is available.</h2><br>Please add a new one by click add application button at right corner
          </template>
          </el-empty>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <AppDialog ref="appDialogRef"></AppDialog>
</template>


<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

import AppSingle from './Single.vue'
import AppDialog from './AppDialog.vue'
import { deepCopy } from '@/utils/tools'

const emit = defineEmits<{
  (e: 'action', type: string, app: object): void
}>()


//
const globalContext = inject('globalContext')

const apps = ref([])
//
load();
function load() {
  globalContext.request({
    method: "GET",
    url: 'app/findAll',
  }).then(function (response) {
    apps.value = response.list
  });
}
//
function handleAction(type: string, app: object) {
  if ('edit' == type) {
    handleEdit(app)
  }else  if ('delete' == type) {
    handleDelete(app)
  } else {
    emit('action', type, app)
  }
}
//
const appDialogRef = ref()
//
function handleAdd() {
  //
  appDialogRef.value.show({}, callback)
}
function handleEdit(app: object) {
  const copied = deepCopy(app)
  appDialogRef.value.show(copied, callback)
}
//Delete
const handleDelete = (app) => {
  ElMessageBox.confirm(
    'Will you want to delte this application?All the menus and pages under this application will be deleted!',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
      //
      //
      globalContext.request({
        method: "POST",
        url: 'app/delete',
        params: {
          id: app['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: 'Application deleted',
          type: 'success',
        })
      });

    })

}
const callback = (dataNew: Object) => {
  //
  globalContext.request({
    method: "POST",
    url: 'app/save',
    data: dataNew,
  }).then(function () {
    load();
    //
    ElMessage({
      message: 'Application saved',
      type: 'success',
    })
  });
}

</script>
<style scope>
.app-list-area {
  margin-top: 10px;
  background-color: var(--el-fill-color-dark);
  border-radius: 8px;
  height:100%;
  /* .app-list-area-item{
    background-color: var(--el-fill-color-light);
  } */
}
</style>