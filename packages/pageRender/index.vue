<template>
  <div>
    <!--Add a DIV so the attribute for example styles can work-->
    <!--Please note the key is set to contextThis.key to avoid vnode to be reused
    refer to : https://vuejs.org/api/built-in-special-attributes.html-->
    <CompWrap v-for="(contextThis, index) in props.contextStack" :config="pageConfig(contextThis)"
      v-show="index == props.contextStack.length - 1" :key="contextThis.key"></CompWrap>
    </div>
</template>

<script setup lang="ts">
import Panel from '@/components/panel/index.vue'

import { computed, inject, onUnmounted,watch } from 'vue'
import createContext from '../context/pageContext/index'

//
const props = defineProps({
  contextStack: {
    type: [],
    required: true,
    default() {
      return []
    }
  },
})
//
const appContext = inject('appContext')
// console.log('PAGE RENDER IS STARTED~~~~~~~~~~~~~~')
// watch(()=>props.contextStack,
// ()=>{console.log('PROPS IS CHANGED@@@@@@@@@@@')},
// {immediate:true})
//provide('context', props.context)
//
// console.log('provide')
// console.log(props.context.codeManager)
//
// const appContext=inject('appContext')
// let context = inject('context')

// console.log('##########'+props.context)
// console.log(JSON.stringify('111:'+props.context.codeManager.getCode().name))
// if(context){
// console.log(JSON.stringify('111:'+context.codeManager.getCode().name))
// }
// if (!context) {  
//   //If pageRender is called inside pageDesigner, context is alreay injected;if pageRender is used seperately, context is undefined  and should create and set
//   context = createContext('view',appContext,props.contextParent)
//   provide('context', context)
//   //

// }
//console.log(JSON.stringify('222:'+context.codeManager.getCode().name))
//Set code once props is changed, please note only watch if context is not available(deploy mode)
// watch(
//   () => props.modelValue,
//   () => {
//     context.codeManager.setCode(props.modelValue)
//   },
//   { immediate: true }
// )

const pageConfig =function(contextThis)  {
  if (!contextThis.codeManager) {
    // console.log('CAN NOT calculate with')
    return { '~component': 'div', '#': 'Empty' }
  }
  //console.log('calculate with'+contextThis.codeManager.getCode().name)

  const config= {
    sys: {
      'component': Panel,
      'modelValue': contextThis.codeManager.getCode().ui
    },
    props: {
      pageContext: contextThis,
     // jamie:'I am '+contextThis.test
    },
    lifecycle: computed(() => {
      const lifecycle = contextThis.codeManager.getCode().lifecycle
      if (!lifecycle || !Array.isArray(lifecycle) || lifecycle.length == 0) {
        return {}
      }
      //
      const result = {}
      for (const lc of lifecycle) {
        //so far only script is supported
        const mode = lc.mode || 'script'
       
        if (mode == 'script') {
		appendLifeCycle(result,lc.key,function () {
            return contextThis.methodManager.scriptCall({code:lc.code})
          })
        } else if (mode == 'method') {
          appendLifeCycle(result,lc.key, function () {
            return contextThis.methodManager.methodCall({method:lc.method})
          })
        } else {
          throw new Error('Unsuported lifecyle mode:' + lc.mode)
        }
      }

      //
      return result
    })
  }

  return config;
}
//append to lifecyle list 
function appendLifeCycle(result,key,func){
  if(!result[key]){
    result[key]=[]
  }
	result[key].push(func)
}
//
if (appContext) {
  //appContext may be undefined if the page is opened by dialog
  appContext.emitter.on('pageChanged', e => handlePageChange(e))
  //
  onUnmounted(() => appContext.emitter.off('pageChanged'))
}
//
function handlePageChange(e) {
  //Create a new context and add into stack
  const contextNew = createContext('view', appContext, e.context)
  contextNew.codeManager.setCode(e.code)
  // console.log(unref(contextNew.contextParent).codeManager.getCode().name)
  //  console.log(JSON.stringify(contextNew.codeManager.getCode()))
  //  console.log(contextNew.computedManager.get('editData'))
  //TEST
  // let c=props.contextStack[0].value
  // props.contextStack[0].value=contextNew
  // props.contextStack.push(c)
  props.contextStack.push(contextNew)
}

//
//defineExpose(popup)

// onMounted(()=>{
//   console.log('+++++++++++++PGE RENDER ONMOUNTED IS CALLED')
//   console.log(props.contextStack)
// })
// onUnmounted(()=>{
//   console.log('------------PGE RENDER ONUNMOUNTED IS CALLED')
//   console.log(props.contextStack)
// })
</script>
<style lang="scss"></style>

