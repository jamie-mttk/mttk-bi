<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue'


import { ElMessage } from 'element-plus'
import DeployedNoRouter from './deployedNoRouter.vue'
//
const globalContext = inject('globalContext')

//

// if(!router){
//   console.log('router IS UNDEFINED??')
// }
// console.log(useRoute())
// console.log(useRouter())
//
let pageId = ref('')
//

watch(
  () => globalContext.router.currentRoute.value.params.page,
  () => {
    let appIdNew = globalContext.router.currentRoute.value.params.app
    let pageIdNew = globalContext.router.currentRoute.value.params.page
    if (!appIdNew) {
      //Try to get app from injected context
      const appContext = inject('appContext')
      //
      if (!appContext) {
        ElMessage({
          message: 'App is neither provided in URL normal inejct from appContext, launch failed',
          type: 'error',
        })
        //
        return
      }
      //
      appIdNew = appContext.key.value
      // console.log('Get appIdNew from appContext:'+appIdNew)
      // console.log(JSON.stringify( appContext.app.value))
      // console.log( appContext.key.value)
    }
    //
    qualifydPageId(appIdNew, pageIdNew)
  },
  { immediate: true })

function qualifydPageId(appIdNew, pageIdNew) {


  if (pageIdNew && 'ROOT' != pageIdNew) {
    pageId.value = pageIdNew
    return
  }
  //Here we need to find the first page of the app
  globalContext.request({
    method: "GET",
    url: "page/query",
    params: {
      app: appIdNew
    }
  }).then(function (response) {
    if (response.list && Array.isArray(response.list) && response.list.length > 0) {
      //
      for(const page of response.list){
        //Try to find one with menu linked
        if(!page.menu){
          continue;
        }
        pageId.value =page['_id']
        return
      }     
    }
    //
    ElMessage({
      message: 'The app has no page, launch failed.app:' + appIdNew + ',page:' + pageIdNew,
      type: 'error',
    })

  });
}

const showBreadcrumb = computed(() => {
  const show = globalContext.router.currentRoute.value.meta?.showBreadcrumb
  if (show == undefined) {
    return true;
  }
  return !!show
})
</script>

<template>
  <DeployedNoRouter :modelValue="pageId" :showBreadcrumb="showBreadcrumb"></DeployedNoRouter>
</template>

<style></style>
