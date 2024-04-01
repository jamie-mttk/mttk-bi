<template>

    <MttkWrapComp  :config="pageConfig" ></MttkWrapComp>

</template>

<script setup lang="ts">
import lcWrap from '@/components/wrap/index.vue'

import { computed,provide } from 'vue'

//
const props = defineProps({
  context: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  },
})
//
provide('context',props.context)
//
const pageConfig = computed (()=> {
  if(!props.context.codeManager.getCode().ui){
    return {'~':'div','#':'No source code available'}
  }

  // console.log('calculate with'+JSON.stringify(props.context.codeManager.getCode(),null,2))
  const lifecycles = computed(() => {
    const lifecycle = props.context.codeManager.getCode().lifecycle
    if (!lifecycle || !Array.isArray(lifecycle) || lifecycle.length == 0) {
      return {}
    }
    //
    const result = {}
    for (const lc of lifecycle) {
      //so far only script is supported
      const mode = lc.mode || 'script'

      if (mode == 'script') {
        appendLifeCycle(result, lc.key, function () {
          return props.context.methodManager.scriptCall({ code: lc.code })
        })
      } else if (mode == 'method') {
        appendLifeCycle(result, lc.key, function () {
          return props.context.methodManager.methodCall({ method: lc.method })
        })
      } else {
        throw new Error('Unsuported lifecyle mode:' + lc.mode)
      }
    }
    //
    return result
  })
  //
  //  console.log('!!!!!!!!!!!!', JSON.stringify(props.context.codeManager.getCode().ui[0]))
  //
  const code=props.context.codeManager.getCode();
  let config = {
    '~component': lcWrap,
    'modelValue': code.ui[0],

    // pageContext: props.context,
    // jamie:'I am '+props.context.test
    ...lifecycles.value
  }

  //Under render mode, we should calculate the style of width/height
  if(code.renderMode=='absolute'){
    //
    // const heightCal=pageHeightByControlls();
    // console.log(heightCal)
    //
    const scaleVal=(code.zoom||100)/100
    const width=code.width||1920
    const height=code.height||1080

    config.style={width:width+'px',height:height+'px','transform-origin':'0 0',transform:'scale('+scaleVal+','+scaleVal+')'}//
    //
    if(scaleVal!=1){
      //Here we wrap a DIV since the sapce in DOM is still kept after transform
    config={
      '~':'div',
      style:{width:width*scaleVal+'px',height:height*scaleVal+'px',overflow:'hidden'},
      '#':config,
    }
  }
  }
  // console.log(config)
//  console.log(JSON.stringify(config))
  //
  //  try{
  // throw new Error('TEST ME')
  //  }catch(err){
  //   console.log(err)
  //  }
//

//
  return config;
})
//

//append to lifecyle list 
function appendLifeCycle(result, key, func) {
  const keyReal = '^' + key
  if (!result[keyReal]) {
    result[keyReal] = []
  }
  result[keyReal].push(func)
}
</script>
<style lang="scss"></style>

