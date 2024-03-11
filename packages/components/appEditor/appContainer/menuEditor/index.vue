<template>
  <div class="toolbar-table-container">
    <div class="lc-common-toolbar toolbar">
      <div class="left" style="font-weight: bold">Menus</div>

      <el-button-group class="right">
        <el-button @click="load">
          <template #icon> <lc-icon icon="mdiRefresh"></lc-icon> </template>Refresh</el-button
        >
        <el-button @click="handleAdd" v-auth:menu_add>
          <template #icon> <lc-icon icon="mdiPlus"></lc-icon> </template>Add menu</el-button
        >
      </el-button-group>
    </div>
    <el-table
      :data="tableData"
      :show-header="false"
      :highlight-current-row="true"
      @row-click="handleRowClick"
      class="table-area"
    >
      <el-table-column prop="name" label="Name">
        <template #default="sp">
          <lc-icon :icon="sp.row.icon || ''" size="medium" style="margin-right: 16px"></lc-icon>
          {{ sp.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Operations" width="164">
        <template #default="sp">
          <el-button-group v-if="sp.row['_id']">
            <el-button @click="handleEdit(sp)" v-data-auth:edit="sp.row">
              <template #icon>
                <lc-icon icon="mdiSquareEditOutline"></lc-icon>
              </template>
            </el-button>
            <el-button @click="handleDelete(sp)" v-data-auth:del="sp.row">
              <template #icon>
                <lc-icon icon="mdiTrashCanOutline"></lc-icon>
              </template>
            </el-button>
            <DataAuthButton :data="sp.row" resource="menu">
              <el-button>
                <template #icon>
                  <lc-icon icon="mdiAccountMultiplePlus"></lc-icon>
                </template>
              </el-button>
            </DataAuthButton>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <MenuEditorDialog ref="menuEditorDialogRef"></MenuEditorDialog>
</template>

<script setup lang="ts">
import { deepCopy } from '@/utils/tools'

// import { vTableDragable } from "@/utils/table-dragable";
import { ref, inject, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import MenuEditorDialog from './MenuEditorDialog.vue'
import DataAuthButton from '@/components/auth/DataAuthButton.vue'

const emit = defineEmits<{
  (e: 'selectionChanged', type: string): void
}>()

//
const globalContext = inject('globalContext')
const appContext = inject('appContext')
//
const tableData = ref([])
watch(
  () => appContext.getKey(),
  () => {
    load()
  },
  { immediate: true }
)

//Load menu list
function load() {
  if (!appContext.getKey()) {
    //maybe it is NOT finish initiation
    return
  }
  globalContext
    .request({
      method: 'GET',
      url: 'menu/query',
      params: {
        app: appContext.getKey()
      }
    })
    .then(function (response) {
      tableData.value = response.list || []
      //Use to display show all pages
      tableData.value.push({ _id: '', name: 'Show all pages' })
    })
}
//
function handleRowClick(row) {
  emit('selectionChanged', row['_id'])
}

//
const menuEditorDialogRef = ref()
//
//
async function handleAdd() {
  //
  //
  const result = await globalContext.request({
    method: 'GET',
    url: 'menu/maxSequence',
    params: {
      app: appContext.getKey()
    }
  })
  //Calcuate next sequence
  const nextSequence = result?.sequenceMax ? result.sequenceMax + 1 : 0

  //
  menuEditorDialogRef.value.show({ app: appContext.getKey(), sequence: nextSequence }, callback)
}
function handleEdit(sp) {
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  menuEditorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  //
  globalContext
    .request({
      method: 'POST',
      url: 'menu/save',
      data: dataNew
    })
    .then(function () {
      load()
      //
      ElMessage({
        message: 'Menu saved',
        type: 'success'
      })
    })
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this menu?All the pages under this menu will be unlinked!',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }
  ).then(() => {
    //
    //
    globalContext
      .request({
        method: 'POST',
        url: 'menu/delete',
        params: {
          id: sp.row['_id']
        }
      })
      .then(function () {
        load()
        //
        ElMessage({
          message: 'Menu deleted',
          type: 'success'
        })
      })
  })
}
</script>

<style lang="scss" scoped></style>
