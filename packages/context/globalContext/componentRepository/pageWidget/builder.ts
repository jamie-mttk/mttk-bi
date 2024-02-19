import { pageWidgetTransform } from './transform'
import { findCompontByKeyWithError, findDataByKeyWithError } from './sourceCodeUtil'


import { ElMessage } from 'element-plus'


export default function build(globalContext,compConfig,sourceCode){
    const result = {
      key: compConfig.sys.key,
      name: compConfig.sys.name,
      description: compConfig.sys.description,
      folder:compConfig.sys.folder,
      icon: compConfig.sys.icon,
      transform: pageWidgetTransform(compConfig),
      editor:{
        basic: {
          init:buildInitConfig(compConfig,sourceCode),
          ui: (data)=>buildEditor(globalContext,compConfig,sourceCode,data)
        },
        event:buildEvent(compConfig)
      },
    }
    //if modelValue is configured,set it
      applyModelValue(result,compConfig,sourceCode)
    //
    // console.log(result)
    //
    return result;  
  }

//build editor by configUI
function buildEditor(globalContext,compConfig,sourceCode,data) {
    const editor = []
    //
    if (compConfig.data && compConfig.data.length > 0) {
      builEditorOfData(editor, data, compConfig.data,sourceCode)
    }

    if (compConfig.ui && compConfig.ui.length > 0) {
      for (const single of compConfig.ui) {
        builEditorOfUI(globalContext,editor, data, single,sourceCode)
      }
    }
    //
    // console.log(editor)
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
  
  function builEditorOfUI(globalContext,editor, data, configSingle,sourceCode) {
 
    const component = findCompontByKeyWithError(configSingle.uiKey, sourceCode)
    if (!component) {
      return
    }
  
    //
    const { componentByKey } = globalContext.componentRepository
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

    let editorComp = comp.editor.basic.ui
    if (typeof editorComp == 'function') {
      editorComp = editorComp({data:data[configSingle.uiKey]})
    }
    //
    for (const p of configSingle.props) {
      for (const editorProp of editorComp) {
        if (editorProp['~prop'] == p) {
          // console.log(editorProp)
          //TBD
          // const prop = deepCopy(editorProp)
          const prop = copyProp(editorProp)
          // delete prop['~show']
          prop['~prop'] = 'ui.' + configSingle.uiKey + '.' +p
          children.push(prop)
        }
      }
    }
  }
  //
  function copyProp(editorProp){
    const result={}
    //
    for(const k of Object.keys(editorProp)){
      if('~show'==k){
        continue;
      }
      result[k]=editorProp[k]
    }
    //
    return result
  }
  //buildInitConfig
  function buildInitConfig(compConfig,sourceCode){

    const initConfig={data:{},ui:{}}
    //sys
    //initConfig.sys['raw_page_id']=compConfig.sys['raw_page_id']
    //event - not needed since the transform can get from compConfig
    //initConfig.event=compConfig.event
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
        initConfig.ui[ui.uiKey][p]=found?.config?.basic[p]
      }

    }
    //
    // console.log(JSON.stringify(initConfig))
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
    // console.log('aaa',JSON.stringify(result))
    
    result.editor.data=   {
      skip:true,
      type:found.type,
    }

    // console.log('bbb',JSON.stringify(result))
  }
  function buildEvent(compConfig){
    return {list:(compConfig.event||[]).map((e)=>e.eventRaise)}
  }