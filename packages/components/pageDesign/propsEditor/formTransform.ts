import { reactive, isRef, inject, unref } from 'vue'

import { createUniqueString } from '@/utils/tools'
import lcFormItem from './components/FormItem.vue'
//Convert raw config to standard form config
//the context is optional
export function formTransform(rawConfig, data, context?: object, hideComponent = false) {
  //

  if (!context) {
    context = inject('context')
  }
  //
  if (typeof rawConfig == 'function') {
    rawConfig = rawConfig(data)
  }

  //If config is array, conver to json
  if (Array.isArray(rawConfig)) {
    rawConfig = {
      _children: rawConfig
    }
  }
  //
  const config = reactive({})
  //Form level config
  mergeJson(config, formDefault(data), false)
  if (hideComponent) {
    //Add visible directly
    config['#'].push({
      '~component': lcFormItem,
      //
      '~modelValue': data,
      config: {
        '~component': 'el-switch',
        '~label': 'Hide component',
        '~prop': '~hideComponent'
      },
      context: context
      // id:createUniqueString(),
    })
  }
  //Form items
  for (const itemConfig of rawConfig['_children'] || []) {
    //
    config['#'].push(calFormItem(data, itemConfig, context))
  }

  //
  return config
}
//merge json
//flags:true,ignore key started with "~"
export function mergeJson(json, jsonToMerge, flags) {
  for (const k of Object.keys(jsonToMerge)) {
    if (flags && k.startsWith('~')) {
      continue
    }
    json[k] = jsonToMerge[k]
  }
}
//Form default config
function formDefault(data) {
  return {
    '~component': 'ElForm',
    //props
    labelPosition: 'top',
    size:'default',
    model: data,
    '#': [],
  }
}
//Get form item default
function calFormItem(data, itemConfig, context?: object) {
  if (itemConfig['~component'] == 'el-collapse') {
    // let dividerSlot=itemConfig['~label']||''
    // if(dividerSlot){
    //   dividerSlot='<span style="font-size: 1.1em;font-weight:bold;">'+dividerSlot+'</span>';
    // }
    // return {'~component':'el-divider','content-position':'center','border-style':'dashed','#':{type:'html',value:dividerSlot}}
    return calFormItemCollapse(data, itemConfig, context)
  }

  const prop = itemConfig['~prop']
  if (unref(data)[prop] == undefined || unref(data)[prop] == null) {
    //Data has not set value
    if (itemConfig['~default'] != undefined) {
      //default is set
      if (isRef(data)) {
        data.value[prop] = itemConfig['~default']
      } else {
        data[prop] = itemConfig['~default']
      }

      // console.log(JSON.stringify(data))
    }
  }

  //

  //
  const c = {
    '~component': lcFormItem,
    '~show': itemConfig['~show'],
    //Set to true to avoid vue3 reuse the component , so the onMounted onUnmounted will be called
    '~instanceKeyAsKey':true,
    //
    '~modelValue': data,

    config: itemConfig,
    context: context
    // id:createUniqueString(),
  }
  // console.log(c)
  //
  return c
}

//
function calFormItemCollapse(data, itemConfig, context?: object) {

  const uniqueKey = createUniqueString()
  const c = {
    '~component': 'el-collapse',
    accordion: true,
    'model-value': uniqueKey,
    '~styles': {
      padding: '4px',
      'margin-bottom': '8px',
      border: '1px groove #F2F3F5',
      'border-radius': '5px'
    },
    '#': {
      '~component': 'el-collapse-item',
      name: uniqueKey,
      // '#title':{
      //   '~component': 'span',
      //   '~styles':{'font-weight':'bold'},
      //   '#':itemConfig['~label']||''
      // },
      '#title': '<span style="font-weight:bold">' + itemConfig['~label'] || '' + '</span>',
      '#': calFormItemCollapseInside(data, itemConfig, context)
    }
  }

  //
  return c
}
//collapse inside form items
function calFormItemCollapseInside(data, itemConfig, context) {
  const result = []
  for (const c of itemConfig['_children'] || []) {
    result.push(calFormItem(data, c, context))
  }
  return result
}
