<template>
  <div class="toolbar-table-container">
    <div class="lc-common-toolbar toolbar">
      <div class="left">{{ $t('bi.plugin.modelEditor.single.dataPreview.lineCount') }}: {{ prviewData.length }}</div>
      <el-button-group class="right">
        {{ $t('bi.plugin.modelEditor.single.dataPreview.linePreview') }}:<el-input-number
          v-model="maxRows"
          :precision="0"
          :controls="false"
          style="margin-right: 4px; margin-left: 4px"
        ></el-input-number>
        <el-button @click="refreshData">
          <template #icon>
            <lc-icon icon="mdiRefresh"></lc-icon> </template
          >{{ $t('bi.plugin.modelEditor.single.dataPreview.refresh') }}</el-button
        >
      </el-button-group>
    </div>
    <!-- <el-scrollbar height="420px"> -->
   
      <el-table
        :data="prviewData"
        border
        :fit="true"
        :empty-text=" $t('bi.plugin.modelEditor.single.dataPreview.emptyText') "
        v-fullHeight="8"
      >
        <!-- Here,we consider two level heder -->
        <ExtendTableColumn
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        >
          <template v-if="column.children">
            <ExtendTableColumn
              v-for="c in column.children"
              :key="c.prop"
              :prop="c.prop"
              :label="c.label"
            >
            </ExtendTableColumn>
          </template>
        </ExtendTableColumn>
      </el-table>
   
    <!-- </el-scrollbar> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import { vFullHeight } from 'mttk-lowcode-engine'
import ExtendTableColumn from '../../../components/ExtendTableColumn.vue'

import { showLoadDataError } from '../../../widgets/utils/chartActionUtil'
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
  globalContext
    .request({
      method: 'POST',
      url: '/bi/dataModel/loadPreviewData',
      params: { maxRows: maxRows.value },
      data: props.model
    })
    .then(function (response) {
      if (response.error) {
        showLoadDataError(globalContext, response)
      } else {
        prviewData.value = response.data
      }
      //
      calculateColumns()
    })
}
//Calculate columns based on model configuration
function calculateColumns() {
  const result = calculateColumnsInternal(props.model.columns || [])
  //

  //
  columns.value = result
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
  return result
}

//
</script>
