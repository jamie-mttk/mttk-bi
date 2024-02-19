<template>
    <el-container style="margin-top:8px;">
          <el-aside width="360px" style="margin:4px 10px 0 8px;padding:0px;">
            <MenuEditor @selectionChanged="menuChanged"></MenuEditor>
          </el-aside>
          <el-main style="margin:4px 10px 0 8px;padding:0px;">
            <PageEditor :menuFilter="menuFilter" @pageDesign="handlePageDesign"></PageEditor>
          </el-main>
        </el-container>
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