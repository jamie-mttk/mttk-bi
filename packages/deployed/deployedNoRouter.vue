<script setup lang="ts">
import { ref, watch, inject, provide, computed } from 'vue'

import PageRender from '@/pageRender/index.vue'
import createContext from '../context/pageContext/index'
import { popup } from '@/utils/pageNavi'
//
const globalContext = inject('globalContext')
const appContext = inject('appContext')
//
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  showBreadcrumb: {
    type: Boolean,
    required: false,
    default: true
  },
})


const contextStack = ref([])

//provide('context', contextRef)
watch(
  () => props.modelValue,
  (pageId) => {
    loadPage(pageId)
  },
  { immediate: true })
//load page 
function loadPage(pageId) {
  if (!pageId) {
    return
  }
  //
  globalContext.request({
    method: "GET",
    url: "deployed/load",
    params: {
      id: pageId
    }
  }).then(function (response) {
    const context = createContext('view', appContext)
    context.codeManager.setCode(response)

    //
    contextStack.value[0] = context
    //Clear all the possible opend pages
    contextStack.value.length = 1
    //
    // console.log(contextRef.value.codeManager.getCode().name)
  });
}

//
function breadcrumbClicked(c) {
  popup(c, contextStack.value)
}



</script>

<template>
  <div>
    <el-breadcrumb v-if="props.showBreadcrumb" separator-icon="ArrowRight" style="padding:10px;border-bottom:solid 1px var(--el-menu-border-color);">
      <el-breadcrumb-item v-for="(c, index) in contextStack" :key="index">
        <el-button link type="primary" @click="breadcrumbClicked(c)" :disabled="index == contextStack.length - 1">{{
          c.codeManager.getCode().name }}</el-button>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <PageRender :contextStack="contextStack" ></PageRender>

  </div>
</template>

<style></style>
