<template>
  <div>
    <el-alert title="Page widget is to convert a page into a widget with properties and events to customize."
      type="success" style="margin-bottom: 10px;" />

    <button-group>
      <el-button type="primary" @click="handleAdd">Add</el-button>
      <el-button type="warning" @click="handleUpdatePage">Update page</el-button>
    </button-group>
    <el-table :data="tableData" style="width: 100%" ref="pageWidgetTableRef">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="sys.name" label="Name" />
      <el-table-column prop="sys.description" label="Description" />
      <el-table-column prop="sys.raw_page_name" label="Original page" />
      <el-table-column label="Operation">
        <template #default="sp">
          <el-button-group>

            <el-button type="success" @click="handleEdit(sp)">Edit</el-button>
            <el-button type="warning" @click="handleDelete(sp)">Delete</el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        No page widget, press add button at top to add a new one
      </template>
    </el-table>

    <Wizard ref="wizardRef"></Wizard>
  </div>
</template>
  
  
<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { deepCopy, createUniqueString } from '@/utils/tools'
import Wizard from './wizard/index.vue'
import useComponentRepository from '@/componentRepository/index'
//
const globalContext = inject('globalContext')


//
const tableData = ref([])
//
const wizardRef = ref()
//
load();
function load() {
  globalContext.request({
    method: "GET",
    url: 'pageWidget/findAll',
  }).then(function (response) {
    tableData.value = response.list
  });
}
function resetPageWidget() {
  const repositoryManager = useComponentRepository()
  repositoryManager.resetPageWidget(globalContext)
}

//
function handleAdd() {
  //
  wizardRef.value.show({ sys: { folder: 'pageWidget' }, data: [], ui: [], events: [] ,modelValue:{}}, callback)
}
function handleEdit(sp) {

  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  wizardRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  globalContext.request({
    method: "POST",
    url: 'pageWidget/save',
    data: dataNew
  }).then(function () {
    load()
    //
    resetPageWidget()
  });
  //

}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this widget',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
      //
      globalContext.request({
        method: "POST",
        url: 'pageWidget/delete',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load()
        //
        resetPageWidget()
      });
    })
}
//
const pageWidgetTableRef = ref()
//
function handleUpdatePage() {
  const rows = pageWidgetTableRef.value.getSelectionRows()
  if (!rows || rows.length == 0) {
    //
    ElMessage.error('Please select rows first')
    return
  }
  //
  const ids=rows.map(item=>item['_id'])
  //
  ElMessageBox.confirm(
    'This will update the page content in page widget into the current page content, do you want to continue?',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
      //
      globalContext.request({
        method: "POST",
        url: 'pageWidget/updateRawPage',
        data: ids
      }).then(function () {
        load()
        //
        resetPageWidget()
        //
        ElMessage.success('Update done!')
      });
    })
}

</script>
<style scope></style>