<script setup lang="ts">
//import type { throwError } from 'element-plus/es/utils';
import { ref, computed, inject, unref, isReactive, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

import { convertFlatConfig } from 'vuewrapper'
import {tryEval} from '@/utils/expression'
import { tryConvertDataType } from '@/utils/dataTransform'

//
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  },
  slotParaStack: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
})

// const emit = defineEmits<{
//   (e: 'deleteMe', data: Object): void
// }>()

//
//
const context = inject('context')


//Get the component full config from component repository
const componentConfig = computed(() => {

  if (props.data.type) {
    let c = context.repositoryManager.componentByKey(props.data.type)
    if (c) {
      return c
    } else {
      ElMessage.error("No component is found from :" + JSON.stringify(props.data))
      return {}
    }
  } else {
    return {};
  }
}
)

function myDataGet(wrapperContext) {
  if (!componentConfig.value.dataConfig) {
    //No data config is set in component configuration, it should not come here,so just return undefined
    return undefined;
  }
  //
  const dataType = componentConfig.value.dataConfig.type
  //Try to set value is needed    
  if (props.data.data) {
    // console.log(JSON.stringify(props.data.data))
    //console.log(props.data.data.dataKey+'GET DATA OK'+context.dataManager.getData(props.data.data.dataKey))
    let result = undefined
    if (props.data.data.mode == 'data') {
      result = context.dataManager.getData(props.data.data.dataKey, props.data.data.dataPath)
    } else if (props.data.data.mode == 'computed' && props.data.data.computedKey) {
      result = context.computedManager.get(props.data.data.computedKey)
    } else if (props.data.data.mode == 'method' && props.data.data.methodKey) {
      //try to get the possible interested value
      let valueIntersted = undefined
      if (props.slotParaStack && props.slotParaStack.length > 0) {
        const sp = unref(props.slotParaStack[props.slotParaStack.length - 1])
        valueIntersted = sp?.slotValue
      }
      //
      result = context.methodManager.methodCall({ method: props.data.data.methodKey }, wrapperContext, valueIntersted, props.slotParaStack)
    } else if (props.data.data.mode == 'fixed' && props.data.data.dataContent) {

      try {
        result = tryConvertDataType(props.data.key, dataType, props.data.data.dataContent)
      } catch (e) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: 'The data content of ' + props.data.key + ' can not be translate into required data type:' + dataType + ',error:' + e,
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
      //ElMessage.error('The data of ' + props.data.key + ' is undefined')
    }
  }
  //
  //console.log('GET DATA WOWOWOWOW HERE')
  //No data is set,use default instead
  return context.dataManager.defaultValueByType(dataType)
}



//Check whether the result match the required dataType
//return undefined if matched,otherwise return error information
function checkDataType(dataType: string, result: any) {
  if (dataType == 'Array') {
    if (Array.isArray(result)) {
      return undefined;
    }
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the result is not an array'
  } else if (dataType == 'Object') {
    if (typeof result == 'object' && !Array.isArray(result)) {
      return undefined;
    }
    //
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the result is not an object or it is array'
  } else if (dataType == 'String') {
    if (typeof result == 'string') {
      return undefined;
    }
    //
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the result is ' + (typeof result)
  } else if (dataType == 'Number') {
    if (typeof result == 'number') {
      return undefined;
    }
    //
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the result is ' + (typeof result)
  } else if (dataType == 'Boolean') {
    if (typeof result == 'boolean') {
      return undefined;
    }
    //
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the result is ' + (typeof result)
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

    propsCal[k] = tryEval(v, context)
  }
  //
  return propsCal;
}

//Build comp wrap config
const realConfig = function (wrapperContext) {
  //console.log('realconfig is called!!!')
  try {
    return buildRealConfigInternal(wrapperContext)
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
function buildRealConfigInternal(wrapperContext) {
  //
  const myData = computed({
    get: () => {
      // const myData= myDataGet()
      // console.log(myData)
      // console.log(JSON.stringify(myData))
      // return myData
      //
      return myDataGet(wrapperContext)
    },
    set: (val) => {
      //
      if (props.data.data.mode == 'data') {
        context.dataManager.setData(props.data.data.dataKey, val, props.data.data.dataPath)
      } else if (props.data.data.mode == 'computed' && props.data.data.computedKey) {
        context.computedManager.set(props.data.data.computedKey, val)
      } else {
        //not come here,do nothing
      }
    }
  })
  //
  //console.log('@@@@@@@@@'+ props.data.key)
  let result;
  if (!componentConfig.value.transform) {

    //no transform,get from config directly 
    result = {
      sys: {
        //
        component: componentConfig.value.component,
      },
      props: calProps(props.data?.config?.props || {}),
      slots: props.data?.config?.slots || {},
      events: {}
    }
  } else {
    let p = props.data?.config?.props
    if (!p) {
      //If no props is set,return empty JSON
      return {}
    }
    //Here we should add reactive since the original p is reactived
    //We should eval props here since the props may be used in target slot, for example the lable of input
     const propsNew =reactive(calProps(p))
   watch(propsNew,()=>{
    // console.log('props New is changed!')
    // console.log(JSON.stringify(propsNew['_children']))
    // console.log(JSON.stringify(p['_children']))
    //Here we should set value manually, it seem the _children of p and propsNew is different
    //I really do not know why
    if(propsNew['_children']){
      p['_children']=propsNew['_children']
    }
   })

    //
    result = componentConfig.value.transform(propsNew, myData, context, wrapperContext)
    //Convert from flat structure to standard structure if needed
    result = convertFlatConfig(result)


  }

  //Set instance key as component key
  if (!result.sys) {
    result.sys = {}
  }
  result.sys.instanceKey = props.data.key
  //Here we need to set model value if needed
  if (componentConfig.value.dataConfig) {
    if (!result.sys.modelValueName) {
      //Only set modelValueName if it is not present
      result.sys.modelValueName = componentConfig.value.dataConfig.modelValueName || 'modelValue'
    }
    result.sys.modelValue = myData
  }
  //
  //Handle events
  const events = props.data.event
  if (events && Array.isArray(events) && events.length > 0) {
    if (result.events == undefined) {
      //Only set to {} if there is no original events
      result.events = {}
    }
    for (const event of events) {
      //
      if (!event.mode) {
        continue;
      }
      if (event.mode == 'api') {
        result.events[event.name] = { type: 'function', value: handleEventAPI(event) }
      } else if (event.mode == 'script') {
        result.events[event.name] = { type: 'function', value: handleEventScript(event) }
      } else if (event.mode == 'method') {
        result.events[event.name] = { type: 'function', value: handleEventMethod(event) }
      } else if (event.mode == 'openPage') {
        result.events[event.name] = { type: 'function', value: handleEventOpenPage(event) }
      } else {
        throw new Error('Unsuported event type:' + event.mode)
      }
    }
  }
  //

  //styles
  if (result.styles) {
    //If result already has syles, append all from props.data
    //otherwise,set directly in else
    for (const k of Object.keys(props.data.styles || {})) {
      result.styles[k] = props.data.styles[k]
    }
  } else {
    result.styles = props.data.styles || {}
  }
  //}

  //classes
  if (props.data.classes) {
    let classes = props.data.classes.split(' ')
    if (result.classes) {
      for(const c of classes){
        result.classes.push(c)
      }
    } else {
      result.classes=classes
    }
  }
  //Visisble
  if(props.data?.config?.props['~hideComponent']!=undefined){
    result.sys.show=!tryEval(props.data?.config?.props['~hideComponent'],context)
  }

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
//Handle event if type is open page
function handleEventOpenPage(event: Object) {
  return function () {
    //So far no parameters are handled
    return context.methodManager.openPage(event)
  }
}


//Once use select this component
function componentChoosed(e: any) {
  if (context.mode.value == 'view') {
    //under view mode ,it is not necessary to set choosed
    //and return here will make page widget can be choosed
    return
  }
  if (e && e.stopPropagation) {
    try {
      //console.log('stopPropagation is called')
      e.stopPropagation()
    } catch (error) {
      console.log(e)
      //console.log(e.event.event.stopPropagation())
      //console.log(e.event.stop())
      //ignore
    }
  }
  //
  context.choosedManager.setChoosed(props.data)

}

//Is current component active
const isActive = computed(() => {
  const choosed = context.choosedManager.getChoosed();
  // console.log(context)
  // console.log(context.mode)
  return (
    context.mode.value == 'edit' &&
    choosed &&
    choosed.key &&
    choosed.key == props.data?.key
  );
})
// // //The style of current component
// const componentStyles = computed(() => {
//   return props.data.styles || {}
// })




</script>

<template>
  <CompWrap ref="target" :config="realConfig" :class="{ active: isActive }" @mousedown="componentChoosed"
    @componentChoosed="componentChoosed" :slotParaStack="slotParaStack">
  </CompWrap>
</template>


<style lang="scss" scoped>
.active {
  outline: 2px outset var(--el-color-primary);
  outline-offset: 2px;
  user-select: none;
  z-index: 2000;
  //margin-top: 32px;
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