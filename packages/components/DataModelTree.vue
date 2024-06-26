<template>
  <el-input
    v-model="filterStr"
    v-show="props.modelValue?._id"
    style="margin: 8px 4px 8px 4px"
    :placeholder="$t('bi.components.dataModelTree.placeholder')"
  ></el-input>
  
  <lcFullHeight :gap="12">
    <el-tree
      :data="columnFiltered"
      :allow-drag="isAllowDrag"
      :allow-drop="isAllowDrop"
      draggable
      node-key="key"
      default-expand-all
      :expand-on-click-node="true"
      @node-drag-start="handleDragStart"
      :empty-text="$t('bi.components.dataModelTree.empty')"
      style="font-size: 0.9em; min-height:40vh;overflow-x: hidden"
    >
      <template #default="{ node, data }">
        <span>
          <lc-icon
            :icon="nodeIcon(data)"
            :tooltip="findDataType(data.dataType)?.label || ''"
            :show-after="1000"
            size="1.2em"
            color="#A9A9A9"
            style="margin-right: 8px"
          >
          </lc-icon>
          <SmartView :value="node.label" :length="8" />
        </span>
      </template>
    </el-tree>
  </lcFullHeight>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import SmartView from './SmartView.vue'
import { findDataType } from '../data'
import { vFullHeight, lcFullHeight } from 'mttk-lowcode-engine'
const props = defineProps(['modelValue'])

//
const filterStr = ref('')
const columnFiltered = computed(() => {
  if (!filterStr.value) {
    return props.modelValue.columns
  }
  //
  return props.modelValue.columns.filter((item) => {
    //
    return isMatch(item,'column',filterStr)||isMatch(item,'label',filterStr)
  })
})

function isMatch(item,key,filterStr){
  const value=item[key]
  if(!value){
    //key has no proper value,consider it is matched
    return true
  }
  //
  return value.indexOf(filterStr.value) >= 0
}

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
<style type="scss" scopded>
.el-tree__empty-text{
  width:80%;
}
</style>