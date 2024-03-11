<script setup lang="ts">
//import type { throwError } from 'element-plus/es/utils';
import { computed, inject, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { deepCopy,isPromise } from '@/utils/tools'

// import { convertFlatConfig } from 'vuewrapper'
import { tryEval } from '@/utils/expression'
import { tryConvertDataType } from '@/utils/dataTransform'
import lcPanel from '@/components/panel/index.vue'
//
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  },
})

// const emit = defineEmits<{
//   (e: 'deleteMe', data: Object): void
// }>()
// console.log('*****************',inject('wrapContext'))
//
//
const globalContext=inject('globalContext')
const context = inject('context')
//
const contextParent = inject('contextWrap')

//
//Get the component full config from component repository
const componentConfig = computed(() => {

  if (props.modelValue.type) {
    let c = globalContext.componentRepository.componentByKey(props.modelValue.type)
    if (c) {
      return c
    } else {
      // console.log('error load '+props.modelValue.type)
      ElMessage.error("No component is found from :" + JSON.stringify(props.modelValue))
      return {}
    }
  } else {
    return {};
  }
}
)

function myDataGet(contextWrap) {
//
  if (!componentConfig.value.editor?.data) {
    //No data config is set in component configuration, it should not come here,so just return undefined
    return undefined;
  }
  //
  const dataType = componentConfig.value.editor?.data.type
  //Try to set value is needed    
  if (props.modelValue.config.data) {
    // console.log(JSON.stringify(props.modelValue.config.data))
    //console.log(props.modelValue.config.data.dataKey+'GET DATA OK'+context.dataManager.get(props.modelValue.config.data.dataKey))
    let result = undefined
    if (props.modelValue.config.data.mode == 'data') {
      result = context.d.g(props.modelValue.config.data.dataKey, props.modelValue.config.data.dataPath)

    } else if (props.modelValue.config.data.mode == 'computed' && props.modelValue.config.data.computedKey) {
      result = context.c.g(props.modelValue.config.data.computedKey)
    } else if (props.modelValue.config.data.mode == 'method' && props.modelValue.config.data.methodKey) {

      result = context.m.i({ method: props.modelValue.config.data.methodKey }, contextWrap)
    } else if (props.modelValue.config.data.mode == 'fixed' && props.modelValue.config.data.dataContent) {

      try {
        result = tryConvertDataType(props.modelValue.key, dataType, props.modelValue.config.data.dataContent)
      } catch (e) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: 'The data content of ' + props.modelValue.key + ' can not be translate into required data type:' + dataType + ',error:' + e,
        })
        console.log(e)
        return undefined
      }
    } else {
      //not come here,just keep result undefined
    }
    //If result is undefined,use default value
    if (result != undefined) {
      //check type
      let checkResult = checkDataType(dataType, result)
      if (!checkResult) {
        //
        return result;
      }
      //If check error,show error message and continue - to use default value,other may cause UI crashed because of JS error
      ElMessage.error(checkResult)
    }
    else {
      //Show error and continue 
      //ElMessage.error('The data of ' + props.modelValue.key + ' is undefined')
    }
  }
  //
  //console.log('GET DATA WOWOWOWOW HERE')
  //No data is set,use default instead
  return context.d.defaultByType(dataType)
}



//Check whether the result match the required dataType
//return undefined if matched,otherwise return error information
function checkDataType(dataType: string, result: any) {
  if (dataType == 'Array') {
    if (Array.isArray(result)) {
      return undefined;
    }
    return 'The data of ' + props.modelValue.key + ' requires ' + dataType + ',but the result is not an array'
  } else if (dataType == 'Object') {
    if (typeof result == 'object' && !Array.isArray(result)) {
      return undefined;
    }
    //
    return 'The data of ' + props.modelValue.key + ' requires ' + dataType + ',but the result is not an object or it is array'
  } else if (dataType == 'String') {
    if (typeof result == 'string') {
      return undefined;
    }
    //
    return 'The data of ' + props.modelValue.key + ' requires ' + dataType + ',but the result is ' + (typeof result)
  } else if (dataType == 'Number') {
    if (typeof result == 'number') {
      return undefined;
    }
    //
    return 'The data of ' + props.modelValue.key + ' requires ' + dataType + ',but the result is ' + (typeof result)
  } else if (dataType == 'Boolean') {
    if (typeof result == 'boolean') {
      return undefined;
    }
    //
    return 'The data of ' + props.modelValue.key + ' requires ' + dataType + ',but the result is ' + (typeof result)
  } else {
    return undefined;

  }
}
//Calculate props
function calProps(propsRaw) {
  const propsCal = {}
  // 
  for (const k of Object.keys(propsRaw)) {

    const v = propsRaw[k]
    //  if(typeof v=='string' && v.startsWith('___computed')){
    //    propsCal[k] ='WOW'
    // }else{
    propsCal[k] = tryEval(v, context)
    //  }
  }
  //
  return propsCal;
}

//Build comp wrap config
const realConfig =  function (contextWrap) {


  try {

    return  buildRealConfigInternal(contextWrap)
  } catch (e) {
    console.log(e)
    const error = 'Build component config failed<br>' + e
    ElMessage({
      type: 'error',
      dangerouslyUseHTMLString: true,
      message: error,
    })
    //Return a div to describe error
    return { '~component': 'div', '#': { type: 'html', value: error } }
  }
}
 function buildRealConfigInternal(contextWrap) {
  //
  const myData = computed({
    get: () => {
      // const myData= myDataGet()
      // console.log(myData)
      // console.log(JSON.stringify(myData))
      // return myData
      //
      return myDataGet(contextWrap)
    },
    set: (val) => {
      //
      if (props.modelValue.config.data.mode == 'data') {
        context.dataManager.set(props.modelValue.config.data.dataKey, val, props.modelValue.config.data.dataPath)
      } else if (props.modelValue.config.data.mode == 'computed' && props.modelValue.config.data.computedKey) {
        context.computedManager.set(props.modelValue.config.data.computedKey, val)
      } else {
        //not come here,do nothing
      }
    }
  })
  //
  let result;
  const transform= componentConfig.value.transform
  if (!transform) {

    //no transform,get from config directly 
    result = {
      '~component': componentConfig.value.component,
      ...calProps(props.modelValue?.config?.basic || {}),

    }
    //
    if (props.modelValue?.config?.slots) {
      for (const k of Object.keys(props.modelValue?.config?.slots)) {
        result['#' + k] = props.modelValue?.config?.slots[k]
      }
    }
  } else {
    // console.log('realconfig is called!!!111', componentConfig.value,props.modelValue?.config,result)
    let p = props.modelValue?.config?.basic || {}
    // if (!p) {
    //   //If no props is set,return empty JSON
    //   return {}
    // }
    // //Here we should add reactive since the original p is reactived
    // //We should eval props here since the props may be used in target slot, for example the lable of input
    // const propsNew = reactive(calProps(p))
    // watch(propsNew, () => {
    //   // console.log('props New is changed!')
    //   // console.log(JSON.stringify(propsNew['_children']))
    //   // console.log(JSON.stringify(p['_children']))
    //   //Here we should set value manually, it seem the _children of p and propsNew is different
    //   //I really do not know why
    //   if (propsNew['_children']) {
    //     p['_children'] = propsNew['_children']
    //   }
    // })

    //Here we need to check whether _slot is existed,since the config(calProps(p)) transfered to transform function is deep copied
    //So add _slot in calProps(p) will not added into p
    if (!p._slot) {
      p._slot = {}
    }
    //
    const paras={ config: calProps(p), data: myData, componentConfig: componentConfig.value, fullConfig: props.modelValue, key: props.modelValue.key, context, contextWrap }

    if (typeof transform == 'function') {
      //data is a computed to keep reactive especially to build child components
      result =transform(paras)
    // } else if (isPromise(transform)) {
    //   result = await transform(paras)
    } else {
      //error
      throw Error('Unsupported transform , it should be a funciton or promise')

    }
    //
    result=unref(result)

  }
  //
  // console.log('00001', props.modelValue)
  //Set instance key as component key
  result['~instanceKey'] = props.modelValue.key
  //Here we need to set model value if needed
  if (componentConfig.value?.editor?.data && !componentConfig.value?.editor.data.skip) {
    if (!result['~modelValueName']) {
      //Only set modelValueName if it is not present
      result['~modelValueName'] = componentConfig.value.editor?.data?.modelValueName || 'modelValue'
    }
    result['~modelValue'] = myData
  }
  //
  //Handle events

  const events = props.modelValue?.config?.event
  if (events && Array.isArray(events) && events.length > 0) {
    for (const event of events) {
      //
      if (!event.mode) {
        continue;
      }
      if (event.mode == 'api') {
        result['@' + event.name] = { type: 'function', value: handleEventAPI(event) }
      } else if (event.mode == 'script') {
        result['@' + event.name] = { type: 'function', value: handleEventScript(event) }
      } else if (event.mode == 'method') {
        result['@' + event.name] = { type: 'function', value: handleEventMethod(event) }

      } else {
        throw new Error('Unsuported event type:' + event.mode)
      }
    }
  }
  //
  //here we add event inherit,otherwise component can not be choosed
  // console.log('111111111',result['@mousedown'] )
  // if (context.componentManager.renderMode.value == 'flex') {
    // result['@mousedown.capture'] = { 'type': 'function', 'value': componentChoosed, 'paraMode': 'contextFirst' }
  // }

  //style
  if (props.modelValue.config?.display?.style) {
    if (result.style) {
      //If result already has syles, append all from props.modelValue
      //otherwise,set directly in else
      for (const k of Object.keys(props.modelValue.config.display?.style || {})) {
        result.style[k] = props.modelValue.config.display?.style[k]
      }
    } else {
      result.style = props.modelValue.config.display?.style || {}
    }
  }
  //}

  //classes
  if (props.modelValue.config?.display?.class) {

    let classes = props.modelValue.config.display?.class
    if (typeof classes == 'string') {
      classes = classes.split(' ')
    } else {
      classes = deepCopy(classes)
    }
    if (result.class) {
      for (const c of classes) {
        result.classe.push(c)
      }
    } else {
      result.class = classes
    }
  }else{
    result.class=[]
  }
  //Do not set this class to panel, so the hovor style will not affect pane
  if(result['~']||result['~component']!=lcPanel){
  result.class.push('mttk-warp')
}
  //

  //Add choosed classed if needed
  if (isActive.value) {
    if (!result.class) {
      result.class = []
    }
    result.class.push('active')
    // console.log('actived',result)
  }
  //Visisble
  if (props.modelValue?.config?.basic && props.modelValue?.config?.basic['~hideComponent'] != undefined) {
    result['~if'] = !tryEval(props.modelValue?.config?.basic['~hideComponent'], context)
    // console.log(props.modelValue?.config?.basic['~hideComponent'],typeof result['~show'],result['~show'].value)

  }
  //
  // console.log('realconfig is called!!!333',result['~show'],result)
  // console.log('wrap real config',result)
  //
  return result;
}
//Handle event if type is API
function handleEventAPI(event: Object) {
  //
  return function () {
    context.apiManager.invoke(event.api, ...arguments)
  }
}

//Handle event if type is script
function handleEventScript(event: Object) {
  return function () {
    // console.log('SHOW IN ')
    // console.log(arguments)
    // console.log(event)

    //
    return context.methodManager.scriptCall(event, ...arguments)
  }
}
//Handle event if type is method
function handleEventMethod(event: Object) {
  return function () {

    //console.log(JSON.stringify(arguments[0].props))
    //
    return context.methodManager.methodCall(event, ...arguments)
  }
}



//Once use select this component
function componentChoosed(event: any) {
    // console.log(arguments)
    // if(!event){
    //   try{
    //     throw Error('AABVV')
    //   }catch(error){
    //     console.log(error)
    //   }
    // }
  if (context.mode.value == 'view') {
    //under view mode ,it is not necessary to set choosed
    //and return here will make page widget can be choosed
    return
  }
  // console.log(e)
  // if (e && e.stopPropagation) {
  //   try {
  //     //console.log('stopPropagation is called')
  //     e.stopPropagation()
  //   } catch (error) {
  //     console.log(error)
  //     //console.log(e.event.event.stopPropagation())
  //     //console.log(e.event.stop())
  //     //ignore
  //   }
  // }
  //
  // console.log('COMPONENT CHOOSED IS CALLED',props.modelValue)
  context.choosedManager.set(props.modelValue,event.timeStamp)

}

//Is current component active
const isActive = computed(() => {
  const choosed = context.choosedManager.get();
  // console.log(context)
  // console.log(context.mode)
  return (
    context.mode.value == 'edit' &&
    choosed &&
    choosed.key &&
    choosed.key == props.modelValue?.key
  );
})
// // //The style of current component
// const componentStyles = computed(() => {
//   return props.modelValue.styles || {}
// })




</script>

<template>
   <!-- @mousedown="componentChoosed"    @componentChoosed="componentChoosed" -->
  <MttkWrapComp ref="target" :config="realConfig" :contextParent="contextParent" @mousedown="componentChoosed">
  </MttkWrapComp>
</template>


<style lang="scss" scoped>
.active {
  outline: 2px dotted var(--el-color-info) !important;
  border-radius: 0px !important;
  outline-offset: 2px;
  user-select: none;
  z-index: 2000;
  //margin-top: 32px;
}

.mttk-warp:hover{
  //
  // outline: 1px dashed var(--el-color-info);
  box-shadow: var(--el-box-shadow-light)
}

// .focused {
//   outline:  1px outset var(--el-color-primary);
//   outline-offset: 1px;
//   user-select: none;
//   z-index:10000;
//   //margin-top: 32px;
// }

// .active-widget {
//   position: absolute;
//   height: 32px;
//   left: 0;
//   top: -2px;
//   line-height: 28px;
//    background: #409eff;
//   z-index: 10;
// }
</style>