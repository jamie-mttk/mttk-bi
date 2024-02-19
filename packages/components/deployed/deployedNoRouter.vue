<script setup lang="ts">
import {watch, inject } from 'vue'

import PageRender from '@/components/pageRender/index.vue'
import createContext from '@/context/pageContext/index'

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


const context = createContext('view', appContext)

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

    context.codeManager.setCode(response)

   
  });
}

// 



</script>

<template>


    <PageRender  :context="context" ></PageRender>

</template>

<style></style>
