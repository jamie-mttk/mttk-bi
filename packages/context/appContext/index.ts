import { ref,  watch } from 'vue'
import mitt from 'mitt'

export default function createAppContext(globalContext: object) {
  //APP key
  let keySaved=ref('')
  //
  let codeSaved=ref({})
  //
  const appContext = {
    //
    globalContext:globalContext,
    mitt: mitt(),

  }
  //
  appContext.load=function(key:string) {
    //Save first since request is async
    keySaved.value=key
    //
    globalContext
      .request({
        method: 'GET',
        url: 'app/load',
        params: {
          id: key
        }
      })
      .then(function (response) {
        codeSaved.value = response
        //
        // console.log('load done:'+key)
      })
  }
  appContext.getKey=function(){
    return keySaved.value
  }
  appContext.getCode=function(){
    return codeSaved.value
  }
  // appContext.getCodeRef=function(){
  //   return codeSaved
  // }
  //Load all the pages of this app - not full information
  //the return value is a Promise
  appContext.queryPages = function () {
    return globalContext.request({
      method: 'GET',
      url: 'page/query',
      params: {
        app: keySaved.value
      }
    })
  }
  //Load page full information
  appContext.loadPage = function (pageId: string) {
    return globalContext.request({
      method: 'GET',
      url: 'page/load',
      params: {
        app: keySaved.value,
        id: pageId
      }
    })
  }
  //Load page full information - by name,please note the return object stucture is different with loadPage
  appContext.loadPageByName = function (pageName: string) {
    return globalContext.request({
      method: 'GET',
      url: 'page/loadByName',
      params: {
        app: keySaved.value,
        name: pageName
      }
    })
  }
  //Load menus
  appContext.loadDeployedMenus = function () {
    //
    return globalContext.request({
      method: 'GET',
      url: 'deployed/menus',
      params: {
        id: keySaved.value
      }
    })
  }

  //
  return appContext
}
