<template>
  <el-input v-model="filter" clearable placeholder="Input to filter icons">
    <template #append>
      <el-button @click="emit('iconChoosed', '')">Clear Icon</el-button></template>
  </el-input>
  <el-scrollbar height="420px">
    <ul class="icon-list">
      <li v-for="icon in icons" :key="icon" class="icon-item">
        <PickerSingle :icon="icon" @iconChoosed="emit('iconChoosed', icon)"></PickerSingle>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import PickerSingle from './pickerSingle.vue'
//
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'iconChoosed', value: string): void
}>()

//Store all the icons, so no need to load frequently
const iconsAll = ref([] as string[])
onMounted(() => {
  let result = []
  for (const [key] of Object.entries(ElementPlusIconsVue)) {
    result.push(key)
  }
  iconsAll.value = result
})
const icons = computed(() => {
  return iconsAll.value.filter(icon => {
    if (!filter.value) {
      return true
    }
    //
    return icon.indexOf(filter.value) >= 0
  })
})
const filter = ref('')
</script>
<style scoped lang="scss">
.icon-list {
  overflow: hidden;
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  .icon-item {
    text-align: center;
    color: var(--el-text-color-regular);
    height: 64px;
    font-size: 12px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);
  }
}
</style>
