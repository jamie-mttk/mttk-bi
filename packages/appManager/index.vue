<template>

  <AppList v-if="mode=='list'" @action="handleAction"></AppList>
  <AppEditor v-if="mode=='design'" :modelValue="app['_id']" @return="mode = 'list'"></AppEditor>
</template>


<script setup lang="ts">
import { ref,inject } from 'vue'
import AppList from './appList/index.vue'
import AppEditor from '@/appEditor/index.vue'

const globalContext=inject('globalContext')

//UI mode
//list - show app list
//design - single app interface, show single app info
//launch - launch deployed app
const mode = ref("list")
//app info
const app = ref({})
//
function handleAction(type: string, app: object) {
  if ('design' == type) {
    handleDesign(app)
  } else if ('launch' == type) {
    handleLaunch(app)
  }
}
//
function handleDesign(appNew: object) {  //
  // app.value = appNew
  // mode.value = "design"
  globalContext.router.push('/design/'+appNew['_id'])
}
//
function handleLaunch(app: object) {
  //
  // Here we deploy to root page,the deployed will pickup the first page to show
  //window.open('/deploy/'+app['_id']+'/ROOT')
  globalContext.router.push('/deploy/'+app['_id']+'/ROOT')

}
// function handleLaunch(app: object) {
//   //Here we need to find the first page of the app
//   request({
//     method: "GET",
//     url: "page/query",
//     params: {
//       app: app['_id']
//     }
//   }).then(function (response) {
//     if (response.list && Array.isArray(response.list) && response.list.length > 0) {
//       //
//       Cookies.set('appLauched', app['_id'])
//       //
//       window.open('/deploy/page/' + response.list[0]['_id'], '_blank')
//     } else {
//       ElMessage({
//         message: 'The app has no page, launch failed',
//         type: 'error',
//       })
//     }
//   });
// //
// }
</script>
<style ></style>