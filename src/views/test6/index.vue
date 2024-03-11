<template>
  <div>
    <!-- <MttkWrapComp :config="config1"></MttkWrapComp> -->
    <el-button @click="test">TEST</el-button>
  </div>
</template>
<script lang="ts" setup>
import { dividerProps } from 'element-plus';
import { ref, reactive, onMounted, nextTick, createVNode, inject, getCurrentInstance } from 'vue'
import {dynamicRender} from 'mttk-vue-wrap'
import { showPopup } from './showPopup'
const config = { "~": "el-pagination", "hide-on-single-page": false, "layout": "prev, pager, next", "page-size": 12, "total": 30, "current-page": 1 }
const config1 = { "~": "el-pagination", '~modelValue': 2, '~modelValueName': 'current-page', "hide-on-single-page": false, "layout": "prev, pager, next", "page-size": 12, "total": 30 }
const config2 = { "~": "el-pagination", "layout": "prev, pager, next", "total": 50 }
const globalContext = inject('globalContext')
//
const instance = getCurrentInstance()

function test() {
  console.log(globalContext.vueApp._context)
  const visible=ref(false)
  let closeCallbackSave=undefined
  // function close(){
  //   if(closeCallbackSave){
  //     closeCallbackSave()
  //   }
  // }
  const content = {'~':'el-dialog','~modelValue':visible,'@close':close,title:'THIS IS DIALOG TITLE','#':'THIS IS CONTENT'}
  //
  // showPopup(instance, 'el-dialog', { title: 'This is dialog' }, content)
   const {remove}=dynamicRender(content,globalContext.vueApp._context,{removeEvent:'close'})
  // const {remove}=dynamicRender(content,instance?.appContext,{removeEvent:'close'})
  // closeCallbackSave=remove
  visible.value=true

}


</script>
<style>
.test11 {

  width: 12em;

}

.test11:hover {}
</style>