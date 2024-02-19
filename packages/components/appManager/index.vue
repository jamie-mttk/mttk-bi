<template>

  <AppList  @action="handleAction"></AppList>

</template>


<script setup lang="ts">
import { ref,inject } from 'vue'
import AppList from './appList/index.vue'


const globalContext=inject('globalContext')


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
  // console.log(globalContext.router.resolve('/deploy/'+app['_id']+'/ROOT').href )
  // Here we deploy to root page,the deployed will pickup the first page to show
  // window.open('/#/deploy/'+app['_id']+'/ROOT')
  //globalContext.router.push('/deploy/'+app['_id']+'/ROOT')
  window.open(globalContext.router.resolve('/deploy/'+app['_id']+'/ROOT').href)

}

</script>
<style ></style>