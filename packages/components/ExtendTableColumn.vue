<template>
  <el-table-column
    ref="tableColumnRef"
    :prop="props.prop"
    :label="props.label"
    :min-width="colWidth"
    :align="colAlign"
  >
    <template #default="sp">
      <slot v-bind="sp">{{ sp.row[props.prop] }}</slot>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import { ref, computed, unref, getCurrentInstance } from 'vue'
const tableColumnRef = ref(null)
const props = defineProps(['prop', 'label', 'widthPerChar', 'widthGap'])
//whether data is number
const isNumberCol = computed(() => {
  //Table data
  const data = unref(getCurrentInstance()?.parent?.props?.data) || []
  if (Array.isArray(data) && data.length > 0) {
    return typeof data[0][props.prop] === 'number'
  }
  //
  return false
})
//
const colAlign = computed(() => (isNumberCol.value ? 'right' : 'left'))
//
const colWidth = computed(() => {
  //Table data
  // console.log(getCurrentInstance(),'a',getCurrentInstance()?.parent,'b',getCurrentInstance()?.parent?.data,'c')
  const data = unref(getCurrentInstance()?.parent?.props?.data) || []
  //
  let maxLength = (props.label || '').length
  //
  if (Array.isArray(data) && data.length > 0) {
    //
    for (const row of data) {
      const v = row[props.prop]
      if (v != undefined) {
        //
        maxLength = Math.max(maxLength, (v.toString() || v).length)
      }
    }
  }

  //
  return (props.widthPerChar || 8) * maxLength + (props.widthGap || 42) + 'px'
})
</script>
