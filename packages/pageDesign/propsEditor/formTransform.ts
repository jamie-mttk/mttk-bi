import { ref, reactive, isRef, inject,unref } from 'vue'
import { selectTransform } from './selectTransform'
import { radioTransform } from './radioTransform'
import { baceeditorTransform } from './baceeditorTransform'
//Convert raw config to standard form config
//the pageContext is optional
export function formTransform(rawConfig, data, pageContext?: object) {
  if (!pageContext) {
    pageContext = inject('context')
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
  mergeJson(config, formDefault(data))
  //Form items
  for (const itemConfig of rawConfig['_children'] || []) {
    //
    config['#'].push(calFormItem(data, itemConfig, pageContext))
  }
  //
  //console.log(JSON.stringify(config,null,2))
  //
  return config
}
//merge json
//flags:true,ignore key started with "~"
function mergeJson(json, jsonToMerge, flags) {
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
    model: data,
    '#': []
  }
}
//Get form item default
function calFormItem(data, itemConfig, pageContext?: object) {
  //console.log(itemConfig['~show'])
  const prop = itemConfig['~prop']
  if (unref(data)[prop] == undefined||unref(data)[prop] == null) {
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
  const c = {
    '~component': 'el-form-item',
    '~show': itemConfig['~show'],
    //
    label: itemConfig['~label'],
    prop: prop,
    '#': {
      '~component': itemConfig['~component'],
      '~modelValue': data,
      '~modelValuePath': itemConfig['~prop']
      //
    },
    // '#label':[
    //   itemConfig['~label'],
    // ]
  }
  //If description is available, add icon to show
//   if(itemConfig['~description']){
//   c['#label'].push({
//     '~component':'el-tooltip',
//     effect:'light',
//     placement:'bottom',
//     content:itemConfig['~description']||'TEST',
//     '#':{
//       '~component':'el-icon',
//       '#':{
//         '~component':'View',
//       }
//     }
//   })
// }
  //copy all propties to slot #
  mergeJson(c['#'], itemConfig, true)
  //try to handle extra config
  const stdName = stdComponent(itemConfig['~component'])

  if ('elselect' == stdName) {
    //select
    selectTransform(c, itemConfig['~options'], pageContext)
  } else if ('elradiogroup' == stdName) {
    //radio
    radioTransform(c, itemConfig['~options'])
  } else if ('baceeditor' == stdName) {
    //
    baceeditorTransform(c, itemConfig)
  }
  //
  return c
}
//convert ~component to low case to compare
//If it is not string,return undefined
function stdComponent(component) {
  if (typeof component != 'string') {
    return component
  }
  //
  return component.replaceAll('-', '').toLowerCase()
}
