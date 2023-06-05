<template>
  <div class="lc-common-toolbar" style="background-color:var(--el-color-primary);margin-top:10px 0;border-radius: 4px 4px 0px 0px;">
    <div class="left"  style="font-weight: bold;">Pages</div>
    <el-input v-model="filter" placeholder="Input to filter" class="middle" clearable></el-input>

    <el-button-group class="right">
        <el-button icon="Refresh" @click="load">Refresh</el-button>
        <el-button  icon="Plus" @click="handleAdd">Add page</el-button>
  </el-button-group>
  </div>
  <el-table :data="filteredData"  :highlight-current-row="true" table-layout="fixed" style="height: calc(100% - 42px);border: 1px solid var(--el-color-primary);">
    <!-- <el-table-column label="" width="32">
      <template #default="sp">
        <el-icon class="icon">
          <el-tooltip effect="light" placement="bottom-start"
            :content="((sp.row.visible) ? 'Visible' : 'Invisible') + ' - Click to toggle'">
            <component :is="(sp.row.visible)?'Select':'CloseBold'" />
          </el-tooltip>
        </el-icon>
      </template>
    </el-table-column> -->
    <el-table-column prop="name" label="Name">
      <template #default="sp">
        <el-icon>
          <component :is="sp.row.icon||''"></component>
        </el-icon>
        {{ sp.row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="menu_NAME" label="Menu" />
    <el-table-column prop="_updateTime" label="Last update" >
      <template #default="sp">
        {{ formatMongoDate(sp.row['_updateTime']) }}
      </template>
    </el-table-column>
    <el-table-column label="Operations" width="290">
      <template #default="sp">
        <el-button-group>
          <el-button @click="handleDesign(sp)">Design</el-button>
          <el-button @click="handleEdit(sp)">Edit</el-button>
          <el-button @click="handleDelete(sp)">Delete</el-button>
          <el-button @click="handleCopy(sp)">Copy</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <PageEditorDialog ref="pageEditorDialogRef"></PageEditorDialog>
</template>


<script setup lang="ts">
import { deepCopy } from '@/utils/tools'
// import { vTableDragable } from "@/utils/table-dragable";
import { ref, onMounted, computed, reactive, watch, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import PageEditorDialog from './PageEditorDialog.vue'
import {formatMongoDate} from '@/utils/tools'
//
const props = defineProps({
  menuFilter: {
    type: String,
    required: false,
    default: ''
  },
})
const emit = defineEmits<{
  (e: 'pageDesign', page: string): void
}>()

const globalContext=inject('globalContext')

//

const appContext = inject('appContext')
//Filter  item 
const filter = ref('')
//
const tableData = ref([])
watch(
  () => appContext.key.value,
  () => {
    load();
  },
  {immediate:true}
)


//Load menu list
function load() {
  if (!appContext.key.value) {
    //maybe it is NOT finish initiation 
    return
  }
  globalContext.request({
    method: "GET",
    url: "page/query",
    params: {
      app: appContext.key.value
    }
  }).then(function (response) {
    tableData.value = response.list || []
  });
}

//
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    if (props.menuFilter && item.menu != props.menuFilter) {
      //If menu filter existed (menu choosed) but menu is not match,return false directly
      return false;
    }
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
const pageEditorDialogRef = ref()
//
//
function handleAdd() {
  //
  const ui=[{
  key: '_root',
  type: '_container',
  label:'ROOT',
  data: {},
  event: [],
  styles: {diaplay:'block',width:'100%','min-height': '128px', margin: '10px' },
  config: {
    props: {
      _children: []
    }
  }
}]
  let dataAdd={app: appContext.key.value, sequence: 0, "apis": [],"computed": [],"data": [],"lifecycle": [],"methods": [],"ui": ui}
  //console.log(JSON.stringify(dataAdd))
  //
  pageEditorDialogRef.value.show(dataAdd, callback)
}
function handleEdit(sp) {
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  //
  pageEditorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
 // console.log('CALLBACK:'+JSON.stringify(dataNew))
  //
  globalContext.request({
    method: "POST",
    url: 'page/saveInfo',
    data: dataNew,
  }).then(function () {
    load();
    //
    ElMessage({
      message: 'Page info saved',
      type: 'success',
    })
  });
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this page',
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
        url: 'page/delete',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: 'Page deleted',
          type: 'success',
        })
      });

    })
}
//Copy
const handleCopy = (sp) => {
  ElMessageBox.confirm(
    'Will you want to copy this page',
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
        url: 'page/copy',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: 'Page copied',
          type: 'success',
        })
      });

    })
}
function handleDesign(sp) {
  emit('pageDesign', sp.row['_id'])
}
</script>


<style lang="scss" scoped>

</style>