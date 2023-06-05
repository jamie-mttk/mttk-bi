import { ref,reactive, computed, isRef } from 'vue'

import { formTransform } from './formTransform'

export default function propsEditorData(context) {
  //all data list
  const dataList =computed(()=> context.codeManager.getCode().data.map((item: Object) => {
    return { value: item.key, label: item.description }
  }))

  //Computed list
  const computedList = computed(()=>context.codeManager.getCode().computed.map((item: Object) => {
    return { value: item.key, label: item.description }
  }))
  //API list
  const apiList = computed(()=>context.codeManager.getCode().apis.map((item: Object) => {
    return { value: item.key, label: item.description }
  }))
  //Method list
  const methodList = computed(()=>context.codeManager.getCode().methods.map((item: Object) => {
    return { value: item.key, label: item.description }
  }))

  //Whether the component can be delte
  const canBeDelete = computed(() => {
    //
    const choosed = context.choosedManager.getChoosed()
    return choosed && choosed.key && '_root'!=choosed.key
  })
  //
  const configTitle = computed(() => {
    //
    const choosed = context.choosedManager.getChoosed()

    if (!choosed || !choosed.key) {
      return 'Not selectd'
    }

    //{ "key": "button215", "type": "button", "config": { "props": { "type": "primary" }, "slots": { "default": "Button3" } }, "data": {}, "event": [] }
    return choosed.key
  })
  //
  const configBasic = computed(() => {
    //
    const choosed = context.choosedManager.getChoosed()

    if (!choosed || !choosed.key) {
      //
      return pageProps();
      //return promptMsg('No component is choosed')
    }

    //{ "key": "button215", "type": "button", "config": { "props": { "type": "primary" }, "slots": { "default": "Button3" } }, "data": {}, "event": [] }
    const componentConfig = context.repositoryManager.componentByKey(choosed.type)
    if (!componentConfig) {
      return promptMsg('No component config is found by type:' + choosed.type)
    }
    //
    if(!componentHasConfig(componentConfig.editor)){
     
      return promptMsg('This component does not need to config')
    }
    //
    return formTransform(componentConfig.editor, choosed.config?.props || {},context)
  })
//
const configStyles = computed(() => {
  const choosed = context.choosedManager.getChoosed()

  if (!choosed || !choosed.key) {
    return []
  }

  //
  return choosed.styles
})

  function pageProps(){
    const pageConfig =[
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
    ]
    return formTransform(pageConfig,  context.codeManager.getCode(),context)
  }
  function componentHasConfig(editor){
    if(!editor){
      return false
    }
    if(Array.isArray(editor)){
      return editor.length>0
    }
    if(typeof editor=='function'){
      //Function,alway consider it has config
      //This step can be ignored,but to clear the concept,keep it
      return true;
    }
    //
    return true;
  }
  //Return config of prompt message
  function promptMsg(msg: string) {
    return {
      '~component': 'el-empty',
      'description': msg
    }
  }
  //
  const configData = computed(() => {
    const choosed = context.choosedManager.getChoosed()
    if (!choosed || !choosed.key) {
      return promptMsg('No component is choosed')
    }
    const componentConfig = context.repositoryManager.componentByKey(choosed.type)
    if (!componentConfig) {
      return promptMsg('No component config is found by type:' + choosed.type)
    }
    if (!componentConfig.dataConfig) {
      //Componnet does not need to config data
      return promptMsg('This component does not need to config data')
    }
    //
    //Dynamically generate data config
    const config = []
    const data = reactive(choosed.data || {})
    config.push({
      '~component': 'el-select',
      '~label': 'Mode',
      '~prop': 'mode',
      clearable: true,
      '~options': [
        { value: 'data', label: 'Data' },
        { value: 'computed', label: 'Computed' },
        { value: 'method', label: 'Method' },
        { value: 'fixed', label: 'Fixed' },
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
          type:'textarea',
          rows:10,
          clearable: true
        })
    //
    return formTransform(config, data,context)
  })
  //
  //
  const configEvent = computed(() => {
    const choosed = context.choosedManager.getChoosed()
    if (!choosed || !choosed.key) {
      return promptMsg('No component is choosed')
    }
    const componentConfig = context.repositoryManager.componentByKey(choosed.type)
    if (!componentConfig) {
      return promptMsg('No component config is found by type:' + choosed.type)
    }
    //
    const pageList=ref([])
    context.getAppContext().queryPages().then(function (response) {
        pageList.value=response.list.map(item=>{return {value:item['_id'],label:item.name}})
    })
    //
    const data = reactive(choosed || [])
    const c = {
      '~component': 'lc-editable-list',
      '~label': '',
      '~prop': 'event',
      labelColumn: 'name',
      editConfig: function (d) {
        return [
          {
            '~component': 'el-input',
            '~label': 'Name',
            '~prop': 'name'
          },
          {
            '~component': 'el-select',
            '~label': 'Handle mode',
            '~prop': 'mode',
            '~default':'script',
            '~options': [
              { value: 'script', label: 'Script' },
              { value: 'method', label: 'Method' },
              { value: 'api', label: 'API' },
              { value: 'openPage', label: 'Open page' },
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
          {
            '~component': 'el-select',
            '~label': 'Open page type',
            '~prop': 'openPageType',
            '~default':'dialog',
            '~show': computed(() => d.value.mode == 'openPage'),
            '~options': [
              { value: 'dialog', label: 'Dialog' },
              { value: 'drawer', label: 'Drawer' },
              { value: 'replace', label: 'Replace this page' },
            ]
          },
          {
            '~component': 'el-select',
            '~label': 'Page to open',
            '~prop': 'pageId',
            '~show': computed(() => d.value.mode == 'openPage'),
            '~options':pageList,
            filterable:true,
          },
          {
            '~component': 'el-switch',
            '~label': 'Show shadowing layer/Modal',
            '~prop': 'modal',
            '~default':true,
            '~show': computed(() =>  d.value.mode == 'openPage' && (d.value.openPageType == 'dialog'||d.value.openPageType == 'drawer'))
          },
          {
            '~component': 'el-switch',
            '~label': 'Close on click modal',
            '~prop': 'close-on-click-modal',
            '~default':false,
            '~show': computed(() =>  d.value.mode == 'openPage' && (d.value.openPageType == 'dialog'||d.value.openPageType == 'drawer'))
          },
          {
            '~component': 'el-switch',
            '~label': 'Close on press escape',
            '~prop': 'close-on-press-escape',
            '~default':false,
            '~show': computed(() =>  d.value.mode == 'openPage' && (d.value.openPageType == 'dialog'||d.value.openPageType == 'drawer'))
          },
          {
            '~component': 'el-switch',
            '~label': 'Show close',
            '~prop': 'show-close',
            '~default':true,
            '~show': computed(() =>  d.value.mode == 'openPage' && (d.value.openPageType == 'dialog'||d.value.openPageType == 'drawer'))
          },
          {
            '~component': 'el-input',
            '~label': 'Width',
            '~prop': 'width',
            '~default':"50%",
            '~show': computed(() =>  d.value.mode == 'openPage' && d.value.openPageType == 'dialog')
          },
          {
            '~component': 'el-switch',
            '~label': 'Fullscreen',
            '~prop': 'fullscreen',
            '~default':false,
            '~show': computed(() => d.value.mode == 'openPage' && d.value.openPageType == 'dialog')
          },
          {
            '~component': 'el-switch',
            '~label': 'Draggable',
            '~prop': 'draggable',
            '~default':false,
            '~show': computed(() => d.value.mode == 'openPage' && d.value.openPageType == 'dialog')
          },
          {
            '~component': 'el-input',
            '~label': 'Size',
            '~prop': 'size',
            '~default':'30%',
            '~show': computed(() => d.value.mode == 'openPage' && d.value.openPageType == 'drawer')
          },
          {
            '~component': 'el-select',
            '~label': 'Direction',
            '~prop': 'direction',
            '~default':'rtl',
            '~show': computed(() => d.value.mode == 'openPage' && d.value.openPageType == 'drawer'),
            '~options': [
              { value: 'ltr', label: 'left to right' },
              { value: 'rtl', label: 'right to left' },
              { value: 'ttb', label: 'top to bottom<' },
              { value: 'btt', label: 'bottom to top' },
            ]
          },
          {
            '~component': 'el-switch',
            '~label': 'Show header',
            '~prop': 'with-header',
            '~default':true,
            '~show': computed(() => d.value.mode == 'openPage' && d.value.openPageType == 'drawer')
          },
        ]
      }
    }
    //
    return formTransform([c], data,context)
  })
  //
  return { canBeDelete, configTitle, configBasic,configStyles, configData, configEvent }
}
