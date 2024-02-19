import { watch, unref } from 'vue'
import PageRender from '@/components/pageRender/index.vue'
import createContext from '@/context/pageContext/index'
import { tryConvertDataType } from '@/utils/dataTransform'

import { findCompontByKeyWithError, findDataByKeyWithError } from './sourceCodeUtil'
import { deepCopy } from '@/utils/tools'

export function pageWidgetTransform(compConfig) {
  return function ({config, data, context, contextWrap}) {

    //build page context
    const pageContext = createContext('view', context.appContext)
    const sourceCode = deepCopy(compConfig.rawPage)
    applyPageContext(compConfig, config, context, contextWrap, sourceCode, pageContext)

    //
    const result = {
      '~component': PageRender,
      context: pageContext,
      '^onMounted': function () {
        applyModelValue(compConfig, config, context, contextWrap, sourceCode, pageContext, data)
      }
    }
    //
    //  console.log(result)
    //
    return result
  }
}
function applyPageContext(compConfig, config, context, contextWrap, sourceCode, pageContext) {
  //since it is a async call, the resp source code will be set later.this is the reason why onMounted is not called
  //resp.ui[0].config.basic['_children'][0].config.basic['label-width']=config['_form_label-width']||'230px'
  fillProps(sourceCode, config, context, pageContext)
  //
  //Here to demo add customized event
  const event = compConfig.event
  //
  if (event && Array.isArray(event) && event.length > 0) {
    handleEvents(event, sourceCode, config, context, contextWrap, pageContext)
  }
  //
  //console.log(resp)
  //
  pageContext.codeManager.setCode(sourceCode)
  //console.log('@@@@@@@@@@@@@@@@@'+context.test+'~~~'+pageContext.test+'~~'+pageContext.dataManager.get('apiURL'))
  //
  // const dataKey='apiURL'
  // console.log('TEST:'+dataKey+'~~'+pageContext.dataManager.get(dataKey))
  //apply modelValue if needed
}
function handleEvents(event, sourceCode, config, context, contextWrap, pageContext) {
  for (const evt of event) {
    handleEvent(evt, sourceCode, config, context, contextWrap, pageContext)
  }
}
//
function handleEvent(evt, sourceCode, config, context, contextWrap, pageContext) {
  //try to find component
  const component = findCompontByKeyWithError(evt.ui, sourceCode)
  if (!component) {
    return
  }
  if (!component.config) {
    component.config = {}
  }
  if (!component.config.event) {
    component.config.event = []
  } //

  //
  component.config.event.push({
    key: evt.key,
    mode: 'script',
    name: evt.event,
    code:
      `
      // console.log(arguments)
      const context=arguments[0]
      context.mitt.emit('event_` +
      evt.key +
      `',arguments)      
      `
  })

  //
  pageContext.mitt.on('event_' + evt.key, function (e) {
    // const args = [...e]
    //console.log('INSIDE ON' + Array.isArray(e) + '~~~' + Array.isArray(args))

    // console.log(context.codeManager.getCode())
    // console.log(args)
    //console.log(arguments)

    // console.log('event raised:' + event.eventRaise || event.ui + '-' + event.event)
    // console.log(contextWrap,evt.eventRaise || evt.ui + '-' + evt.event, ...e)
    //It does not work well since the event is raied to lcWrap
    contextWrap.context.emit(evt.eventRaise || evt.ui + '-' + evt.event, ...e)
  })
}
//Fill all basic to source code
function fillProps(sourceCode, config, context, pageContext) {
  // for (const k of Object.keys(config)) {
  //   //
  //   const v = config[k]
  //   //
  //   if (k.startsWith('ui:')) {
  //     fillPropUI(k.substring('ui:'.length), v, sourceCode, context)
  //   } else if (k.startsWith('data:')) {
  //     fillPropData(k.substring('data:'.length), v, sourceCode, context)
  //   }
  // }
  //data
  const configData = config['data'] || {}
  for (const k of Object.keys(configData)) {
    fillPropData(k, configData[k], sourceCode, context, pageContext)
  }
  //ui
  const configUI = config['ui'] || {}
  for (const k of Object.keys(configUI)) {
    fillPropUI(k, configUI[k], sourceCode, context)
  }
}

//Fill a single UI component
function fillPropUI(uiKey, uiProps, sourceCode, context) {
  //find ui component by uiKey
  const found = findCompontByKeyWithError(uiKey, sourceCode)
  if (!found) {
    return
  }
  //
  if (!found.config) {
    found.config = {}
  }
  if (!found.config.basic) {
    found.config.basic = {}
  }
  for (const k of Object.keys(uiProps)) {
    found.config.basic[k] = uiProps[k]
  }
}

//
function fillPropData(dataKey, value, sourceCode, context, pageContext) {
  //find data by key
  const dataDefine = findDataByKeyWithError(dataKey, sourceCode)
  if (!dataDefine) {
    return
  }
  //
  const dataReal = tryConvertDataType(dataKey, dataDefine.type, value)
  if (!dataReal) {
    return
  }
  dataDefine.initValue = dataReal
  //
  //clear data to reset init value - this is not the context of target component...
  //console.log('before:'+dataKey+'~~'+context.dataManager.get(dataKey))
  // pageContext.dataManager.clear(dataKey)
  // console.log('start get')
  // console.log('after:'+dataKey+'~~'+context.dataManager.get(dataKey))
}

function applyModelValue(compConfig, config, context, contextWrap, sourceCode, pageContext, data) {
  // console.log(arguments)
  const dataMapped = compConfig.modelValue?.dataMapped
  // console.log('DDDD:'+dataMapped+"==>"+contextWrap.modelValue)
  if (!dataMapped) {
    return
  }
  //If basic is changed,update data immediately
  watch(
    () => data.value,
    (valNew) => {
      // console.log('9999', contextWrap.modelValue, valNew, dataMapped)
      if (valNew) {
        pageContext.dataManager.set(dataMapped, valNew)
      }
    },
    {
      immediate: true
    }
  )
  //watch the change of dataMapped to update the model value
  watch(
    () => pageContext.dataManager.get(dataMapped),
    (valNew) => {
      if (valNew) {
        contextWrap.context.emit('update:modelValue', valNew)
      }
    },
    {
      immediate: false
    }
  )
}
