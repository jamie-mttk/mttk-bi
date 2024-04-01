<template>
  <div class="theme-bar-container">
    <span class="theme-bar-name">{{ theme.name }}</span>
    <span class="theme-bar-content" :style="containerStyle">
      <span v-for="n in props.theme?.value?.color?.length||0" class="theme-bar-item" :style="itemStyle(n)"></span
    ></span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['theme'])
//
const containerStyle = computed(() => {
  return {
    'background-color': props.theme?.value?.backgroundColor
  }
})
//
const itemStyle = computed(() => (index: any) => {
  return { 'background-color': props.theme?.value?.color[index] }
})
</script>
<style type="scss" scoped>
.theme-bar-container {
  display: flex;
  .theme-bar-name {
    width: 120px;
  }
  .theme-bar-content {
    display: flex;
    flex-grow: 1;
    .theme-bar-item {
      width: 16px;
      height: 16px;
      margin: 4px;
      border-radius: 3px;
    }
  }
}
</style>
