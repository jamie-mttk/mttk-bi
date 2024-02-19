<template>
  <div>
    <div class="lc-common-toolbar">
      <div class="left">行数: {{ prviewData.length }}</div>
      <el-button-group class="right">
        <el-button @click="refreshData"> <template #icon>
            <lc-icon icon="mdiRefresh"></lc-icon>
          </template>刷新数据</el-button>
      </el-button-group>
    </div>
    <!-- <el-scrollbar height="420px"> -->
    <el-table :data="prviewData" border :fit="true" empty-text="没数据,请点击刷新按钮查看数据">
      <!-- Here,we consider two level heder -->
      <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
        <template v-if="column.children">
        <el-table-column v-for="c in column.children" :key="c.prop" :prop="c.prop" :label="c.label" width="240px">
        </el-table-column>
      </template>
      </el-table-column>
    </el-table>
    <!-- </el-scrollbar> -->

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue'

//
const globalContext = inject('globalContext')

//
const props = defineProps(['model'])
//
const prviewData = ref([])
//Build table column from preview data
const columns = ref([])

function refreshData() {
  //
  globalContext.request({
    method: "POST",
    url: '/dataModel/loadPreviewData',
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


</script>