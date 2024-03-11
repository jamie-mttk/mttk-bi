<template>
  <el-row>
    <el-col :span="6" v-for="app in apps" :key="app['_id']" >
      <AppSingle :modelValue="app" @action="handleAction"></AppSingle>
    </el-col>
    <el-col :span="6" v-auth:app_add>
      <el-row style="padding:16px;">
        <el-col :span="24" style="height:160px;width:100%;border-radius: 4px; padding:16px;background-color:#137372;display:flex;justify-content: center;">         
          <el-button type="success" link   @click="handleAdd">
            <lc-icon icon="mdiPlus" size="x-large"></lc-icon>
            <h3>Add a new application</h3></el-button>
        </el-col>
      </el-row>

    </el-col>
  </el-row>


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
//
function load() {
  globalContext.request({
    method: "GET",
    url: 'app/query',
  }).then(function (response) {
    apps.value = response.list
  });
}
//
function handleAction(type: string, app: object) {
  if ('edit' == type) {
    handleEdit(app)
  } else if ('delete' == type) {
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
/* .app-list-area {
  margin-top: 10px;
  background-color: var(--el-fill-color-dark);
  border-radius: 8px;
  height: 100%;

} */

</style>