<template>
  <div class="grid-rect" :style="rectStyle" v-show="showGrid">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern :id="gridId" :width="grid" :height="grid" patternUnits="userSpaceOnUse">
          <path :d="`M ${grid} 0 L 0 0 0 ${grid}`" fill="none" :stroke="color" stroke-width="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" :fill="`url(#${gridId})`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed,inject } from 'vue'
import {gridWidth} from './util'
import {tools} from 'mttk-lowcode-engine'
//
const context = inject('context')
const gridId = computed(() => tools.createUniqueString())
// 
const color = computed(() =>'#DCDFE6')
const rectStyle = computed(() => ({ '--border-color': color.value }))

const showGrid = computed(() => {
  const showGrid = context.codeManager.getCode().showGrid || 'hide'
  if (context.mode.value == 'edit') {
    return showGrid != 'hide'
  } else {
    return showGrid == 'show'
  }
})
const grid=computed(()=>gridWidth.value(context))
</script>

<style lang="scss" scoped>
.grid-rect {

  width: 100%;
  height: 100%;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}
</style>
