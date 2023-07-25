import installSystem from './system/index'
import installElement from './element/index'
import installPageWidget from './pageWidget/index'
import installChart from './chart/index'

import build from './pageWidget/builder'
//It is defined outside function,so it will be shared among different import
const folders = [] as object[]
let components = [] as object[]
export default function useComponentRepository() {
  //Later repository will be built automatically from some defined folder

  //return all the compont folders
  function componentFolders() {
    return folders
  }

  //list component by folder
  function componentsByFolder(folder: string) {
    return components.filter((component) => folder == component.folder)
  }
  //Find component by key;return undefined if not found by key
  function componentByKey(key: string) {
    return components.find((item) => {
      return key == item.key
    })
  }
  //
  function registFolder(folder: object) {
    folders.push(folder)
  }
  //
  function registComponent(component: object,folder?: object) {
    // function is imported as  ()=>import('./card/index'),
    if(typeof component=='function'){
      component=component()
    }
    //if it is a Promise
    //Promise is imported as above or import('./button/index'),
    if (component instanceof Promise){
      component.then(function(data){
        registerComponentInternal(data.default,folder)
      })
    }else{
      registerComponentInternal(component,folder)
    }    
  }
  //
  function registerComponentInternal(component: object,folder?: object){
    if(folder && folder.key){
      component.folder=folder.key
    }
    //
    components.push(component)
    //
    components.sort((item1,item2)=>item1.sequence||0>item2.sequence||0)
  }
  //Regist folder and components array(set the folder to the given folder)
  function registerComponents(folder: object, componentConfigs: Array<object>) {
    registFolder(folder)

    //
    for (const componentConfig of componentConfigs) {
      //Set folder key
      componentConfig.folder = folder.key
      //
      registComponent(componentConfig,folder)
    }
  }
  //Install all the buitin components
  function useBuitin() {
    use(installSystem)
    use(installElement)
    use(installPageWidget)
	  use(installChart)
  }
  //Call the install funciton of target,the target may
  function use(target) {
    if (target.install && typeof target.install == 'function') {
      target.install(useComponentRepository())
    }
  }
  //
  function resetPageWidget(globalContext) {
    //Clear exisitng
    components=components.filter((item)=>!item.isPageWidget)
    //
    globalContext
      .request({
        method: 'GET',
        url: 'pageWidget/query'
      })
      .then(function (resp) {
        for (const compConfig of resp.list || []) {
              const config = build(compConfig, compConfig.rawPage)
              config.isPageWidget=true
              registComponent(config)
          //
          // globalContext
          //   .request({
          //     method: 'GET',
          //     url: 'page/load',
          //     params: {
          //       id: compConfig.sys['raw_page_id']
          //     }
          //   })
          //   .then((sourceCode) => {
          //     const config = build(compConfig, sourceCode)
          //     config.isPageWidget=true
          //     registComponent(config)
          //   })
        }
      })
  }
  //
  return {
    componentFolders,
    componentsByFolder,
    componentByKey,
    registFolder,
    registComponent,
    registerComponents,
    use,
    useBuitin,
    resetPageWidget
  }
}
