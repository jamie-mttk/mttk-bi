<script setup lang="ts">
//import type { throwError } from 'element-plus/es/utils';
import { ref, computed, inject, unref } from 'vue'
import { ElMessage } from 'element-plus'
//import { useMouseInElement } from '@vueuse/core'

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
      throw new Error("No component is found from :" + JSON.stringify(props.data));
    }
  } else {
    return {};
  }
}
)

function myDataGet() {
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
      //undefined is the wrapperContext
      result = context.methodManager.methodCall({ method: props.data.data.methodKey }, undefined, valueIntersted, props.slotParaStack)
    } else if (props.data.data.mode == 'fixed' && props.data.data.dataContent) {

      try {
        result = tryConvertDataType(dataType, props.data.data.dataContent)
      } catch (e) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message:  'The data content of ' + props.data.key +' can not be translate into required data type:'+dataType+',error:'+e,
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

//Try to conver dataContent to the required dataType
function tryConvertDataType(dataType: string, dataContent: string) {
  if (dataType == 'Array') {
    const result = JSON.parse(dataContent)
    if (Array.isArray(result)) {
      return result;
    }
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the data content can not be translate into an array'
  } else if (dataType == 'Object') {
    const result = JSON.parse(dataContent)
    if (typeof result == 'object' && !Array.isArray(result)) {
      return result;
    }
    //
    return 'The data of ' + props.data.key + ' requires ' + dataType + ',but the data content can not be translate into an object or it is array'
  } else if (dataType == 'String') {
    return dataContent
  } else if (dataType == 'Number') {
    return Number(dataContent)
  } else if (dataType == 'Boolean') {
    return Boolean(dataContent)
  } else {
    return undefined;

  }
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
//Build comp wrap config
const realConfig = computed(() => {
  //
  const myData = computed({
    get: () => {
      // const myData= myDataGet()
      // console.log(myData)
      // console.log(JSON.stringify(myData))
      // return myData
      //
      return myDataGet()
    },
    set: (val) => {
      //It seems this code will not be called?
      if (props.data.data.mode == 'data') {
        context.dataManager.setData(props.data.data.dataKey, val)
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
      props: props.data?.config?.props || {},
      slots: props.data?.config?.slots || {},
      events: {}
    }
  } else {
    const p = props.data?.config?.props
    if (!p) {
      //If no props is set,return empty JSON
      return {}
    }
    result = componentConfig.value.transform(p, myData, context)
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
  //styles
  //if(context.mode.value != 'edit'){
  //If it is not under edit mode, set the style directly to final component
  result.styles = props.data.styles || {}
  //}

  //
  return result;
})
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
    // console.log(context.methodManager)
    // console.log(context.methodManager.scriptCall)
    //
    return context.methodManager.scriptCall(event, ...arguments)
  }
}
//Handle event if type is method
function handleEventMethod(event: Object) {
  return function () {
    // console.log('SHOW IN handleEventMethod')
    // console.log(arguments)
    // console.log(JSON.stringify(arguments[0].props))
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
  e.stopPropagation();
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

//
const target = ref(null)
//useMouseInElement will cause dialog display error:getBoundingClientRect is not a funciton,so remove it here
//const { isOutside } = true;//useMouseInElement(target)


</script>

<template>
  <CompWrap ref="target" :config="realConfig" :class="{ active: isActive }" @mousedown="componentChoosed"
    :slotParaStack="slotParaStack"></CompWrap>
</template>


<style lang="scss" scoped>
.active {
  outline: 4px outset var(--el-color-primary);
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
</style>