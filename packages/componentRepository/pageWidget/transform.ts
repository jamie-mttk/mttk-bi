import { ref, isRef, isReactive, unref ,watch} from 'vue'
import PageRender from '@/pageRender/index.vue'
import createContext from '@/context/pageContext/index'
import { tryConvertDataType } from '@/utils/dataTransform'
import { ElMessage } from 'element-plus'
import { findCompontByKeyWithError, findDataByKeyWithError } from './sourceCodeUtil'
import { deepCopy } from '@/utils/tools'

export function pageWidgetTransform(compConfig) {
  return function (config: any, data: any, context, wrapperContext) {
    //
    
    //build page context
    const pageContext = createContext('view', context.getAppContext(), context)
    const sourceCode=deepCopy(compConfig.rawPage)
    applyPageContext(compConfig,config, context, wrapperContext, sourceCode, pageContext)
    //
    const result = {
      sys: {
        component: PageRender
      },
      props: { contextStack: [pageContext] },
      styles: {},
      lifecycle:{
        onMounted:function(){
          applyModelValue(compConfig,config, context, wrapperContext, sourceCode, pageContext) 
        }
      }
    }
    //

    //
    return result
  }
}
function applyPageContext(compConfig,config, context, wrapperContext, sourceCode, pageContext) {
  //since it is a async call, the resp source code will be set later.this is the reason why onMounted is not called
  //resp.ui[0].config.props['_children'][0].config.props['label-width']=config['_form_label-width']||'230px'
  fillProps(sourceCode, config, context, pageContext)
  //
  //Here to demo add customized event
  const events = compConfig.events
  //
  if (events && Array.isArray(events) && events.length > 0) {
    handleEvents(events, sourceCode, config, context, wrapperContext, pageContext)
  }
  //
  //console.log(resp)
  //
  pageContext.codeManager.setCode(sourceCode)
  //console.log('@@@@@@@@@@@@@@@@@'+context.test+'~~~'+pageContext.test+'~~'+pageContext.dataManager.getData('apiURL'))
  //
  // const dataKey='apiURL'
  // console.log('TEST:'+dataKey+'~~'+pageContext.dataManager.getData(dataKey))
  //apply modelValue if needed
 
}
function handleEvents(events, sourceCode, config, context, wrapperContext, pageContext) {
  for (const event of events) {
    handleEvent(event, sourceCode, config, context, wrapperContext, pageContext)
  }
}
//
function handleEvent(event, sourceCode, config, context, wrapperContext, pageContext) {
  //try to find component
  const component = findCompontByKeyWithError(event.ui, sourceCode)
  if (!component) {
    return
  }

  if (!component.event) {
    component.event = []
  } //

  //
  component.event.push({
    key: event.key,
    mode: 'script',
    name: event.event,
    code:
      `
      const context=arguments[0]
        context.emitter.emit('event_` +
      event.key +
      `',arguments)
      
      `
  })
  //
  pageContext.emitter.on('event_' + event.key, function (e) {
    // const args = [...e]
    //console.log('INSIDE ON' + Array.isArray(e) + '~~~' + Array.isArray(args))

    // console.log(context.codeManager.getCode())
    // console.log(args)
    //console.log(arguments)

    // console.log('event raised:' + event.eventRaise || event.ui + '-' + event.event)
    //console.log(wrapperContext)
    wrapperContext.emit(event.eventRaise || event.ui + '-' + event.event,...e)
  })
}
//Fill all props to source code
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
  if (!found.config.props) {
    found.config.props = {}
  }
  for (const k of Object.keys(uiProps)) {
    found.config.props[k] = uiProps[k]
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
  //console.log('before:'+dataKey+'~~'+context.dataManager.getData(dataKey))
  // pageContext.dataManager.clearData(dataKey)
  // console.log('start get')
  // console.log('after:'+dataKey+'~~'+context.dataManager.getData(dataKey))
}

function applyModelValue(compConfig,config, context, wrapperContext, sourceCode, pageContext) {
  const dataMapped=compConfig.modelValue?.dataMapped
  // console.log('DDDD:'+dataMapped+"==>"+wrapperContext.modelValue)
  if(!dataMapped){
    return
  }
  //If props is changed,update data immediately
  watch(()=>wrapperContext.modelValue,(valNew)=>{
    if(valNew){
    pageContext.dataManager.setData(dataMapped,valNew)
  }
  },{
    immediate:true
  })
  //watch the change of dataMapped to update the model value
  watch(()=> pageContext.dataManager.getData(dataMapped),(valNew)=>{
    if(valNew){
      wrapperContext.emit('update:modelValue',valNew)
  }
  },{
    immediate:false
  })


}