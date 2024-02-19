<template>
  <!-- <el-button @click="testMe">TEST111</el-button> -->
  <AppContainer @pageDesign="handlePageDesign" @return="emit('return')" v-if="mode == 'app'"></AppContainer>
  <PageDesign v-model="code" v-if="mode == 'design'" @action="handleAction"></PageDesign>
</template>


<script setup lang="ts">

import { ref, watch, provide, inject } from 'vue'
import AppContainer from './appContainer/index.vue'
import createAppContext from '@/context/appContext/index'
import PageDesign from '@/components/pageDesign/index.vue'
//
import { ElMessage } from 'element-plus'
//
//
const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: ''
  },
})
//
const emit = defineEmits<{
  (e: 'return'): void
}>()
//
const globalContext = inject('globalContext')
//
const appContext = createAppContext(globalContext);
provide('appContext', appContext)
//Once app id in property is changed,reload data and set appContext
watch(
  () => props.modelValue,
  () => {
    //loadApp();
    if (props.modelValue) {
      appContext.load(props.modelValue)
    }
    //

  },
  { immediate: true }
)
//mode of this page
//app:show app information, 
//page:page design
const mode = ref('app')
//This is the page code
const code = ref({})
function handlePageDesign(page: string) {
  //Need to reload again
  globalContext.request({
    method: "GET",
    url: "page/load",
    params: {
      'id': page,
    }
  }).then(function (response) {

    code.value = response

    //
    mode.value = 'design'
  });

}

function handleAction(detail) {
  if (detail.type == "return") {
    handleReturn()
  } else if (detail.type == "save") {
    handleSave(detail.code)
    // }else if(type=="deploy"){
    //   handleDeploy(page)
  }

}
function handleReturn() {
  mode.value = 'app'
}
function handleSave(page: object) {
  //console.log(JSON.stringify(page))
  globalContext.request({
    method: "POST",
    url: 'page/save',
    data: page,
  }).then(function () {

    //
    ElMessage({
      message: 'Page saved',
      type: 'success',
    })
  });
}
// function testMe(){
//   console.log('@@@@@@@@@@@')
//   appContext.loadPage('645a14f61736403bb4af8280').then(function (response) {
//     console.log(response)
//     console.log(JSON.stringify(response))
//   })
// }
</script>
<style ></style>