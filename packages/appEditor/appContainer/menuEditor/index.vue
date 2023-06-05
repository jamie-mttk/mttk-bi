<template>
  <div class="lc-common-toolbar" style="background-color:var(--el-color-primary);margin-top:10px 0;border-radius: 4px 4px 0px 0px;">
    <div class="left" style="font-weight: bold;">Menus</div>

    <el-button-group class="right">
      <el-button icon="Refresh" @click="load">Refresh</el-button>
      <el-button icon="Plus" @click="handleAdd">Add menu</el-button>
    </el-button-group>

  </div>
  <el-table :data="tableData" :show-header="false" :highlight-current-row="true"
    @row-click="handleRowClick" style="height: calc(100% - 42px);border: 1px solid var(--el-color-primary);">
    <!--
    <el-table-column label="icon" width="32">
      <template #default="sp">
        <el-icon class="icon">
          <el-tooltip effect="light" placement="bottom-start"
            :content="((sp.row.visible) ? 'Visible' : 'Invisible') + ' - Click to toggle'">
            <component :is="(sp.row.visible)?'Select':'CloseBold'" />
          </el-tooltip>
        </el-icon>
      </template>
    </el-table-column>
    -->
    <el-table-column prop="name" label="Name">
      <template #default="sp">

        <el-icon>
          <component :is="sp.row.icon||''"></component>
        </el-icon>
        {{ sp.row.name }}

      </template>
    </el-table-column>

    <el-table-column label="Operations" width="116">
      <template #default="sp">
        <el-button-group v-if="sp.row['_id']">
          <el-button icon="Edit" @click="handleEdit(sp)" />
          <el-button icon="Delete" @click="handleDelete(sp)" />
        </el-button-group>

      </template>
    </el-table-column>
  </el-table>
  <MenuEditorDialog ref="menuEditorDialogRef"></MenuEditorDialog>
</template>


<script setup lang="ts">
import { deepCopy } from '@/utils/tools'

// import { vTableDragable } from "@/utils/table-dragable";
import { ref, onMounted, computed, reactive, inject, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import MenuEditorDialog from './MenuEditorDialog.vue'
const emit = defineEmits<{
  (e: 'selectionChanged', type: string): void
}>()

//
const globalContext=inject('globalContext')
const appContext = inject('appContext')
//
const tableData = ref([])
watch(
  () => appContext.key.value,
  () => {
    load();
  },
  { immediate: true }
)


//Load menu list
function load() {
  if (!appContext.key.value) {
    //maybe it is NOT finish initiation 
    return
  }
  globalContext.request({
    method: "GET",
    url: "menu/query",
    params: {
      app: appContext.key.value
    }
  }).then(function (response) {
    tableData.value = response.list || []
    //Use to display show all pages
    tableData.value.push({ '_id': '', name: 'Show all pages on the right ' })
  });
}
//
function handleRowClick(row) {
  emit('selectionChanged', row['_id'])
}

//
const menuEditorDialogRef = ref()
//
//
function handleAdd() {
  //
  menuEditorDialogRef.value.show({ app: appContext.key.value, sequence: 999 }, callback)
}
function handleEdit(sp) {
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  menuEditorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  //
  globalContext.request({
    method: "POST",
    url: 'menu/save',
    data: dataNew,
  }).then(function () {
    load();
    //
    ElMessage({
      message: 'Menu saved',
      type: 'success',
    })
  });
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this menu?All the pages under this menu will be unlinked!',
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
        url: 'menu/delete',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: 'Menu deleted',
          type: 'success',
        })
      });

    })

}

</script>


<style lang="scss" scoped>

</style>