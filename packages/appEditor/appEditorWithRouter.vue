<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue'



import AppEditor from './index.vue'
//
const globalContext = inject('globalContext')
//
function handleReturn(){
    globalContext.router.push('/')
}
//

// if(!router){
//   console.log('router IS UNDEFINED??')
// }
// console.log(useRoute())
// console.log(useRouter())
//
// let appId = ref('')
//

// watch(
//   () => globalContext.router.currentRoute.value.params.app,
//   () => {
//     let appIdNew = globalContext.router.currentRoute.value.params.app
//     if (!appIdNew) {
//       //Try to get app from injected context
//       const appContext = inject('appContext')
//       //
//       if (!appContext) {
//         ElMessage({
//           message: 'App is neither provided in URL normal inejct from appContext, launch failed',
//           type: 'error',
//         })
//         //
//         return
//       }
//       //
//       appIdNew = appContext.key.value
//       // console.log('Get appIdNew from appContext:'+appIdNew)
//       // console.log(JSON.stringify( appContext.app.value))
//       // console.log( appContext.key.value)
//     }
//     //
//     qualifydPageId(appIdNew, pageIdNew)
//   },
//   { immediate: true })

</script>

<template>
  <AppEditor :modelValue=" globalContext.router.currentRoute.value.params.app"  @return="handleReturn"></AppEditor>
</template>

<style></style>
