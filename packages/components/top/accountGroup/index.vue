<template>
    <div class="auth-container">
  <div class="lc-common-toolbar toolbar"
    style="background-color:var(--el-color-info);margin-top:10px 0;border-radius:0px;">
    <div class="left" style="font-weight: bold;"><lc-icon icon="mdiAccountSupervisor" style="margin-right: 4px" size="large" />用户组管理</div>
    <el-input v-model="filter" placeholder="Input to filter" class="middle" clearable></el-input>

    <el-button-group class="right">
      <el-button @click="load">
        <template #icon>
          <lc-icon icon="mdiRefresh"></lc-icon>
        </template>
        刷新</el-button>
      <el-button @click="handleAdd" v-auth:accountGroup_add> <template #icon>
          <lc-icon icon="mdiPlus"></lc-icon>
        </template>增加</el-button>
  
    </el-button-group>
  </div>
  <el-table :data="filteredData" :highlight-current-row="true" table-layout="fixed"
  class="table-area" ref="editorTableRef">


    <el-table-column prop="name" label="名称" sortable  width="320" ></el-table-column>
    <el-table-column prop="description" label="描述" sortable/>

    <el-table-column prop="_updateTime" label="最后更新" sortable width="240">
      <template #default="sp">
        {{ formatMongoDate(sp.row['_updateTime']) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240">
      <template #default="sp">
        <el-button-group>
          <el-button @click="handleEdit(sp)"  v-data-auth:edit="sp.row">编辑</el-button>
          <el-button @click="handleDelete(sp)"  v-data-auth:del="sp.row">删除</el-button>
          <el-button @click="handleCopy(sp)"  v-auth:accountGroup_add>拷贝</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</div>
  <AccountGroupEditorDialog ref="editorDialogRef"></AccountGroupEditorDialog>
</template>


<script setup lang="ts">
import { deepCopy } from '@/utils/tools'
// import { vTableDragable } from "@/utils/table-dragable";
import { ref, computed, nextTick, onMounted, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import AccountGroupEditorDialog from './AccountGroupEditorDialog.vue'
import { formatMongoDate } from '@/utils/tools'



const globalContext = inject('globalContext')


//Filter  item 
const filter = ref('')
//
const tableData = ref([])
//Load table 
onMounted(()=>load())

//Load menu list
function load() {

  globalContext.request({
    method: "GET",
    url: "accountGroup/query",
    params: {
    
    }
  }).then(function (response) {
    tableData.value = response.list || []
    //  :default-sort="{ prop: '_updateTime', order: 'descending' }" does not work for dynamic data,sort manually
    nextTick(() => {
      if (editorTableRef.value) {
        editorTableRef.value.sort('_updateTime', 'descending')
      }
    })

  });
}

//
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    if (filter.value) {
      if ((item.name && item.name.indexOf(filter.value) >= 0) || (item.description && item.description.indexOf(filter.value) >= 0)) {
        //name or description matched,pass to next check
      } else {
        return false;
      }
    }
    //
    return true
  })
})

//
//
const editorDialogRef = ref()

//
const editorTableRef = ref()
//
 function handleAdd() {


  //
  let dataAdd = {}
  //console.log(JSON.stringify(dataAdd))
  //
  editorDialogRef.value.show(dataAdd, callback)
}
function handleEdit(sp) {
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  //
  editorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  // console.log('CALLBACK:'+JSON.stringify(dataNew))
  //
  globalContext.request({
    method: "POST",
    url: 'accountGroup/save',
    data: dataNew,
  }).then(function () {
    load();
    //
    ElMessage({
      message: '账户组保存成功',
      type: '成功',
    })
  });
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    '确定删除此用户组吗',
    '警告',
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
        url: 'accountGroup/delete',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: '删除成功',
          type: '成功',
        })
      });

    })
}
//Copy
const handleCopy = (sp) => {
  ElMessageBox.confirm(
    '确定复制此用户组吗',
    '警告',
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
        url: 'accountGroup/copy',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: '复制成功',
          type: '成功',
        })
      });

    })
}


</script>


<style lang="scss" scoped></style>