<template>
     <el-tree :data="props.modelValue.columns" :allow-drag="isAllowDrag" :allow-drop="isAllowDrop" draggable node-key="key"
      default-expand-all :expand-on-click-node="true" @node-drag-start="handleDragStart" empty-text="请先选择数据模型" style="font-size:0.9em;">
      <template #default="{ node, data }">
        <span>

          <lc-icon :icon="nodeIcon(data)" :tooltip="data.dataType || ''" :show-after="1000" size="1.2em" color="#A9A9A9"
            style="margin-right:8px"> </lc-icon>
          <SmartView :value="node.label" :length="8"/> 

        </span>
      </template>
    </el-tree>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import SmartView from './SmartView.vue'
const props = defineProps(['modelValue'])

const nodeIcon = computed(() => (data) => {
  if (data.type == 'hierarchy') {
    return 'mdiFileTreeOutline'
  } else if (data.type == 'field') {
    if (data.dataType == 'string') {
      return 'mdiFormatTextRotationNone'
    } else if (data.dataType == 'integer') {
      return 'mdiOrderNumericAscending'
    } else if (data.dataType == 'number') {
      return 'mdiDecimalIncrease'
    } else if (data.dataType == 'boolean') {
      return 'mdiSortBoolAscending'
    } else if (data.dataType == 'date') {
      return 'mdiCalendarRange'
    } else if (data.dataType == 'datetime') {
      return 'mdiArchiveClockOutline'
    } else {
      return 'mdiTooltipQuestionOutline'
    }

  } else if (data.type == 'expression') {
    return 'mdiCalculatorVariantOutline'
  } else {
    return 'mdiTooltipQuestionOutline'
  }
})

function isAllowDrag({ data }) {
  return data.type == 'field' || data.type == 'expression'
}
function isAllowDrop() {
  return false
}
function handleDragStart({ data }, evt) {
  // console.log('handleDragStart', evt.dataTransfer)

  //save data
  evt.dataTransfer.setData('fieldJSON', JSON.stringify(data))
}
</script>