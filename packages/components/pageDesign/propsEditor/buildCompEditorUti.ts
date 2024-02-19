//move some util functions from buildCompEditor.ts to make it smaller

import { ref, reactive, computed, watch, toRaw, isRef, isReactive } from 'vue'

import { formTransform } from './formTransform'
import StyleEditor from './styleEditor.vue'
import PositionEditor from './PositionEditor.vue'
import MyInput from './components/MyInput.vue'
import {setByPath} from '@/utils/pathUtil'
//If not choosed, show page properties
export function pageProps(context) {
  const pageConfig =function(data){
    // console.log(data.renderMode,data)
    return [
    {
      '~component': 'el-input',
      '~label': 'Name',
      '~prop': 'name',
      clearable: true
    },
    {
      '~component': 'el-input',
      '~label': 'Description',
      '~prop': 'description',
      clearable: true
    },
    {
      '~component': 'el-radio-group',
      '~label': 'Render Mode',
      '~prop': 'renderMode',
      '~options':{value:[
        {value:'flex',label:'Flex'},
        {value:'absolute',label:'Absolute'}
      ]}
    },
    {
      '~component': 'el-switch',
      '~show':data.renderMode=='absolute',
      '~label': 'Show grid',
      '~prop': 'showGrid',
    },
    {
      '~component': 'el-input-number',
      '~show':data.renderMode=='absolute',
      '~label': 'Grid width',
      '~prop': 'gridWidth',
      clearable: true
    },
  ]
}
  return formTransform(pageConfig, context.codeManager.getCode(), context)
}

//
//Return config of prompt message
export function promptMsg(msg: string) {
  return {
    '~component': 'el-empty',
    description: msg
  }
}

//
export function buildInternal(choosed, context, componentConfig, compEditor, tabIndex) {
  //1.0 Find and sort all(standard and customized) the tab panels
  const tabs = findTabs(componentConfig)
  //2.0 set proper tabIndex value
  setProperTabIndex(tabIndex, tabs)
  //3.0 build tabs and tabPanel one by one
  compEditor.value = buildTabConfig(choosed, context, componentConfig, tabIndex, tabs)
  //4.0 done
}

//Find and sort all the tabs of the editor
//cc-componentConfig
function findTabs(cc) {
  //
  // console.log(JSON.stringify(cc,null,2))
  const tabs = []
  //Standard tabs
  //basic
  if (cc.editor.basic && cc.editor.basic.ui) {
    tabs.push({ sequence: cc.editor.basic.sequence || 10, key: 'basic' })
  }
  //data
  if (cc.editor.data && cc.editor.data.type && !cc.editor.data.hide) {
    tabs.push({ sequence: cc.editor.data.sequence || 20, key: 'data' })
  }
  //event
  if (!(cc.editor?.event == false)) {
    tabs.push({ sequence: cc.editor?.event?.sequence || 30, key: 'event' })
  }
  //display
  if (cc.editor.display && !cc.editor.display.hide) {
    tabs.push({ sequence: cc.editor?.display?.sequence || 40, key: 'display' })
  }
  //customized
  for (const k of Object.keys(cc.editor)) {
    if (k == 'basic' || k == 'data' || k == 'event' || k == 'display') {
      continue
    }
    //
    tabs.push({ sequence: cc.editor[k].sequence || 100, key: k })
  }

  //
  return tabs.sort((item1, item2) => item1.sequence - item2.sequence)
}

//Set proper value of tabIndex
//If there are keys of the current tab index,do not change tabIndex  value;
//Otherwise change tabIndex to the first key of the tabs
function setProperTabIndex(tabIndex, tabs) {
  //
  if (tabs.length <= 0) {
    return
  }
  //Is current tabIndex value existed in tabs
  //If yes, return directly
  for (const t of tabs) {
    if (t.key == tabIndex.value) {
      return
    }
  }
  //
  tabIndex.value = tabs[0].key
}

function buildTabConfig(choosed, context, componentConfig, tabIndex, tabs) {
  //all data list
  const dataList = computed(() =>
    context.codeManager.getCode().data.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )

  //Computed list
  const computedList = computed(() =>
    context.codeManager.getCode().computed.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )
  //API list
  const apiList = computed(() =>
    context.codeManager.getCode().apis.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )
  //Method list
  const methodList = computed(() =>
    context.codeManager.getCode().methods.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )

  //
  const config = {
    '~': 'el-tabs',
    '~modelValue': tabIndex,
    '#': []
  }
  //
  for (const tab of tabs) {
    config['#'].push(buildTabSingle(tab.key))
  }
  //
  // console.log(config)
  //
  return config
  //
  function buildTabSingle(key) {
    if (key == 'basic') {
      return buildTabPanel('basic', 'Basic', buildTabBasic())
    } else if (key == 'data') {
      return buildTabPanel('data', 'Data', buildTabData())
    } else if (key == 'event') {
      return buildTabPanel('event', 'Event', buildTabEvent())
    } else if (key == 'display') {
      return buildTabPanel('display', 'Display', buildTabDisplay())
    } else {

      return buildTabPanel(
        key,
        componentConfig.editor[key].name,
        buildUI(key, componentConfig, choosed, context)
      )
    }
  }
  function buildTabBasic() {
    return buildUI('basic', componentConfig, choosed, context)
  }
  function buildTabData() {
    //Dynamically generate data config
    const config = [] as object[]
    const data = reactive(choosed.config?.data || {})
    config.push({
      '~component': 'el-select',
      '~label': 'Mode',
      '~prop': 'mode',
      clearable: true,
      '~options': [
        { value: 'data', label: 'Data' },
        { value: 'computed', label: 'Computed' },
        { value: 'method', label: 'Method' },
        { value: 'fixed', label: 'Fixed' }
        //{ code: 'expression', name: 'Expression' },//Not implemented so far
      ]
    })

    config.push({
      '~component': 'el-select',
      '~label': 'Data',
      '~prop': 'dataKey',
      '~show': computed(() => data.mode == 'data'),
      clearable: true,

      //options is not a standard el-select prop,the transform will handle it
      '~options': dataList
    })
    //Sub part of data,optional
    config.push({
      '~component': 'el-input',
      '~label': 'Data path',
      '~prop': 'dataPath',
      '~show': computed(() => data.mode == 'data'),
      clearable: true
    })

    config.push({
      '~component': 'el-select',
      '~label': 'Computed',
      '~prop': 'computedKey',
      '~show': computed(() => data.mode == 'computed'),
      clearable: true,
      //options is not a standard el-select prop,the transform will handle it
      '~options': computedList
    })

    config.push({
      '~component': 'el-select',
      '~label': 'Method',
      '~prop': 'methodKey',
      '~show': computed(() => data.mode == 'method'),
      clearable: true,
      //options is not a standard el-select prop,the transform will handle it
      '~options': methodList
    })

    //Sub part of data,optional
    config.push({
      '~component': 'el-input',
      '~label': 'Data content',
      '~prop': 'dataContent',
      '~show': computed(() => data.mode == 'fixed'),
      type: 'textarea',
      rows: 10,
      clearable: true
    })
    //
    return formTransform(config, data, context)
  }
  //
  //
  function buildTabEvent() {
    //
    const pageList = ref([])
    context
      .appContext
      .queryPages()
      .then(function (response) {
        pageList.value = response.list.map((item) => {
          return { value: item['_id'], label: item.name }
        })
      })

    //
    const data = reactive(choosed.config || [])
    //

    const c = {
      '~component': 'lc-editable-list',
      '~label': '',
      '~prop': 'event',
      '~hideSwitchButton': true,
      labelColumn: 'name',
      editConfig: function (d) {
        return [
          {
            '~component': 'el-select',
            '~label': 'Name',
            '~prop': 'name',
            'allow-create': true,
            '~options': componentConfig.editor?.event?.list || []
          },
          {
            '~component': 'el-select',
            '~label': 'Handle mode',
            '~prop': 'mode',
            '~default': 'script',
            '~options': [
              { value: 'script', label: 'Script' },
              { value: 'method', label: 'Method' },
              { value: 'api', label: 'API' },
            ]
          },
          {
            '~component': 'el-select',
            '~label': 'API',
            '~prop': 'api',
            '~show': computed(() => d.value.mode == 'api'),
            clearable: true,

            //options is not a standard el-select prop,the transform will handle it
            '~options': apiList
          },
          {
            '~component': 'el-select',
            '~label': 'Method',
            '~prop': 'method',
            '~show': computed(() => d.value.mode == 'method'),
            clearable: true,
            //options is not a standard el-select prop,the transform will handle it
            '~options': methodList
          },
          {
            '~component': 'b-ace-editor',
            '~label': 'Script code',
            '~prop': 'code',
            '~show': computed(() => d.value.mode == 'script')
          },
          
        ]
      }
    }
    //
    return formTransform([c], data, context)
  }

  // <div style="margin-bottom:8px">Classes:</div>
  // 	<MyInput v-model="configClasses"></MyInput>
  // 	<div style="margin:12px 0 4px 0">Styles:</div>
  // 	<StyleEditor v-model="configStyles" />
  function buildTabDisplay() {
    //Should set default value first,otherwise configStyle does no work as expected
    if(!choosed?.config?.display?.style){
      setByPath(choosed,'config.display.style',{},true)
    }
    //
    const configStyle = computed({
      get: () => {
        // console.log('111111',choosed?.config?.display?.style ,choosed)
        return choosed?.config?.display?.style 
      },
      set: (val) => {
        // console.log('222222',val)
        setByPath(choosed,'config.display.style',val,true)
      }
    })
    //
    const configClass = computed({
      get: () => {
        return choosed?.config?.display?.class || ''
      },
      set: (val) => {
        if (!choosed) {
          return
        }
        if (!choosed.config) {
          choosed.config = {}
        }
        if (!choosed.config.display) {
          choosed.config.display = {}
        }
        //
        choosed.config.display.class = val
      }
    })
    //
    const config = []
    //
    // console.log(configClass.value,configStyle.value)
    //
    config.push({
      '~': 'div',
      style: { 'margin-bottom': '8px' },
      '#': 'Class (Seperated by space):'
    })
    //
    config.push({ '~': MyInput, '~modelValue': configClass })
    //
    config.push({ '~': 'div', style: { margin: '12px 0 4px 0' }, '#': 'Style:' })
    //
    config.push({ '~': StyleEditor, '~modelValue': configStyle })
    if (context.choosedManager.get()['key']!='_root' &&  context.componentManager.renderMode.value == 'absolute') {
      handleDisplayPosition(config,choosed)
    }
    //
    return config
  }
}
//build position
//This is only make sense if renderMode=='absolute'
function handleDisplayPosition(config,choosed) {
  if(!choosed?.config?.display?.position){
    //set initial value
    setByPath(choosed,'config.display.position',{},true)
  }
  //
  config.push({
    '~': 'div',
    style: { 'margin': '8px 0' },
    '#': 'Position(For absolute render mode):'
  })
  //
  const configPosition = computed({
    get: () => {
      return choosed?.config?.display?.position || {}
    },
    set: (val) => {
      setByPath(choosed,'config.display.position',val,true)
    }
  })
  config.push({ '~': PositionEditor, '~modelValue': configPosition })
}
//
//<el-tab-pane label="Basic" name="basic">
function buildTabPanel(key, label, config) {
  return { '~': 'el-tab-pane', label: label, name: key, 
  '#':{
    '~':'div',
    'style':{'margin-right':'1px'},
    '#':config
  } }
}
//Here based on the ui type ,build proper UI config
//So far only form items is supported(ui is an array)
function buildUI(key, componentConfig, choosed, context) {
  // console.log('buildUI',arguments)
  //
  let ui = componentConfig.editor[key].ui || {}
  //
  
  const config = choosed.config[key] || {}
  // console.log(key,data,choosed)
  //
  if (typeof ui == 'function') {
    ui = ui({config,context,componentConfig,fullConfig:choosed,key:choosed.key})
  }
  if (Array.isArray(ui)) {
    //If it is array ,assume they are form items
    return formTransform(ui, config, context, true)
  } else {
    //Otherwise consider it can be rendered by MttkCompWrap
    return ui
  }
}
