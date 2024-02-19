<template>
  <div class="grid-rect" :style="rectStyle">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>

        <pattern :id="gridId" :width="$props.grid" :height="$props.grid" patternUnits="userSpaceOnUse">
          <path :d="`M ${$props.grid} 0 L 0 0 0 ${$props.grid}`" fill="none" :stroke="color" stroke-width="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" :fill="`url(#${gridId})`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  grid: {
    type: Number,
    default: 64
  },
  borderColor: {
    type: String
  },
  gridId: String
})
const gridId = computed(() => props.gridId || 'uniqueGridId')
// 
const color = computed(() => props.borderColor || '#e4e7ed')
const rectStyle = computed(() => ({ '--border-color': color.value }))
</script>

<style lang="scss" scoped>
.grid-rect {
  width: 100%;
  height: 100%;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}
</style>
