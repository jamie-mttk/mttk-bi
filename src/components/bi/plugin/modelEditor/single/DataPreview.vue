<template>
  <div class="toolbar-table-container">
    <div class="lc-common-toolbar toolbar">
      <div class="left">行数: {{ prviewData.length }}</div>
      <el-button-group class="right">
        预览行数:<el-input-number v-model="maxRows" :precision="0" :controls="false"
          style="margin-right:4px;margin-left:4px;"></el-input-number>
        <el-button @click="refreshData"> <template #icon>
            <lc-icon icon="mdiRefresh"></lc-icon>
          </template>刷新数据</el-button>
      </el-button-group>
    </div>
    <!-- <el-scrollbar height="420px"> -->
    <lcFullHeight class="table-area">
      <el-table :data="prviewData" border :fit="true" empty-text="没数据,请点击刷新按钮查看数据" height="calc(100% - 16px)">
        <!-- Here,we consider two level heder -->
        <ExtendTableColumn v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
          <template v-if="column.children">
            <ExtendTableColumn v-for="c in column.children" :key="c.prop" :prop="c.prop" :label="c.label">
            </ExtendTableColumn>
          </template>
        </ExtendTableColumn>
      </el-table>
    </lcFullHeight>
    <!-- </el-scrollbar> -->

  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import { lcFullHeight } from 'mttk-lowcode-engine'
import ExtendTableColumn from '../../../components/ExtendTableColumn.vue'
//
const globalContext = inject('globalContext')
//



//
const props = defineProps(['model'])
//
const prviewData = ref([])
//Build table column from preview data
const columns = ref([])
//max rows of preview
const maxRows = ref(10)

function refreshData() {
  //
  globalContext.request({
    method: "POST",
    url: '/bi/dataModel/loadPreviewData',
    params: { maxRows: maxRows.value },
    data: props.model,
  }).then(function (response) {
    prviewData.value = response.data
    //
    calculateColumns();
  });
}
//Calculate columns based on model configuration
function calculateColumns() {
  const result = calculateColumnsInternal(props.model.columns || [])
  //

  //
  columns.value = result;
}
function calculateColumnsInternal(columns) {
  const result = []
  //
  for (const c of columns) {
    const r = { prop: c.key, label: c.label }
    result.push(r)
    //check children
    if (c.children && Array.isArray(c.children) && c.children.length >= 0) {
      r.children = calculateColumnsInternal(c.children)
    }
  }
  //
  return result;
}

//



</script>