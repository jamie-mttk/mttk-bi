import { pageWidgetTransform } from './transform'
import { findCompontByKeyWithError, findDataByKeyWithError } from './sourceCodeUtil'
import useComponentRepository from '@/componentRepository/index'
import { deepCopy } from '@/utils/tools'
import { ElMessage } from 'element-plus'


export default function build(compConfig,sourceCode){
    const result = {
      key: compConfig.sys.key,
      name: compConfig.sys.name,
      description: compConfig.sys.description,
      folder:compConfig.sys.folder,
      icon: compConfig.sys.icon,
      transform: pageWidgetTransform(compConfig),
      editor: (data)=>buildEditor(compConfig,sourceCode,data),
      initConfig: {
        props: buildInitConfig(compConfig,sourceCode)
      },
      events:buildEvents(compConfig)
    }
    //if modelValue is configured,set it
      applyModelValue(result,compConfig,sourceCode)
    //
    //console.log(result)
    //
    return result;  
  }

//build editor by configUI
function buildEditor(compConfig,sourceCode,data) {
    const editor = []
    //
    if (compConfig.data && compConfig.data.length > 0) {
      builEditorOfData(editor, data, compConfig.data,sourceCode)
    }
    if (compConfig.ui && compConfig.ui.length > 0) {
      for (const single of compConfig.ui) {
        builEditorOfUI(editor, data, single,sourceCode)
      }
    }
    //
    return editor
  }
  
  function builEditorOfData(editor, data, configData,sourceCode) {
    const children=[] as Object[]
    editor.push({
      '~component': 'el-collapse',
      '~label': 'Data',
      '_children':children
    })
    for (const d of configData) {
      children.push({
        '~component': 'el-input',
        '~label': d,
        '~prop': 'data.' + d
      })
    }
  }
  
  function builEditorOfUI(editor, data, configSingle,sourceCode) {
    const component = findCompontByKeyWithError(configSingle.uiKey, sourceCode)
    if (!component) {
      return
    }
  
    //
    const { componentByKey } = useComponentRepository()
    const comp = componentByKey(component.type)
    if (!comp) {
      ElMessage.error('No component defined is found in component repository:' + component.type)
    }
    //
    const children=[] as Object[]
    editor.push({
      '~component': 'el-collapse',
      '~label': configSingle.name || configSingle.uiKey,
      '_children':children
    })
    //
    let editorComp = comp.editor
    if (typeof editorComp == 'function') {
      editorComp = editorComp(data[configSingle.uiKey])
    }
    //
    for (const p of configSingle.props) {
      for (const editorProp of editorComp) {
        if (editorProp['~prop'] == p) {
          const prop = deepCopy(editorProp)
          prop['~prop'] = 'ui.' + configSingle.uiKey + '.' +p
          children.push(prop)
        }
      }
    }
  }

  //buildInitConfig
  function buildInitConfig(compConfig,sourceCode){
    const initConfig={data:{},ui:{}}
    //sys
    //initConfig.sys['raw_page_id']=compConfig.sys['raw_page_id']
    //events - not needed since the transform can get from compConfig
    //initConfig.events=compConfig.events
    //data
    for(const d of compConfig.data||[]){
      const found=findDataByKeyWithError(d,sourceCode)
      if(!found){
        continue
      }
      initConfig.data[d]=found.initValue
    }
    //ui
    for(const ui of compConfig.ui||[]){
      const found=findCompontByKeyWithError(ui.uiKey,sourceCode)
      if(!found){
        continue
      }
      //
      //initConfig.ui[ui.uiKey]=found?.config?.props||{}
      initConfig.ui[ui.uiKey]={}
      for(const p of ui.props||[]){
        initConfig.ui[ui.uiKey][p]=found?.config?.props[p]
      }

    }
    //
    //console.log(JSON.stringify(initConfig))
    //
    return initConfig;

  }
//
  function   applyModelValue(result,compConfig,sourceCode,){
    const dataMapped=compConfig.modelValue?.dataMapped
    if(!dataMapped){
      return
    }

    const found=findDataByKeyWithError(dataMapped,sourceCode)
    //
    result.dataConfig=   {
      type:found.type,
    }

  }
  function buildEvents(compConfig){
    return (compConfig.events||[]).map((e)=>e.eventRaise)
  }