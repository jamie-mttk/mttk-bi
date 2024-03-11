<template>
    <div style="display:flex;margin:0 24px 0 8px;">
          <div style="flex-basis:360px;" v-auth:menu>
            <MenuEditor @selectionChanged="menuChanged"></MenuEditor>
          </div>
          <!-- This is a seperator -->
          <div style="flex-basis:8px;flex-shrink:0;"></div>
          <div style="flex-grow: 1;" v-auth:page>
            <PageEditor :menuFilter="menuFilter" @pageDesign="handlePageDesign"></PageEditor>
          </div>
        </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MenuEditor from './menuEditor/index.vue'
import PageEditor from './pageEditor/index.vue'

const emit = defineEmits<{
  (e: 'pageDesign', page: string): void
}>()

//Choosed menu, to filter right page
const menuFilter = ref('')
//
//
function menuChanged(menuKey: string) {
  menuFilter.value = menuKey
}
//
function handlePageDesign(page: string) {
  emit('pageDesign', page)
}

</script>