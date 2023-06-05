import { ref, computed, watch } from 'vue'
import mitt from 'mitt'

export default function createAppContext(globalContext: object) {
  //
  const appContext = {
    //
    app: ref({}),
    key: ref(''),
    getGlobalContext: () => globalContext,
    emitter: mitt()
  }
  //
  watch(appContext.key, (keyNew) => {
    //
    globalContext
      .request({
        method: 'GET',
        url: 'app/load',
        params: {
          id: keyNew
        }
      })
      .then(function (response) {
        appContext.app.value = response
      })
  })

  //
  // appContext.key = computed(() => {
  //   if (appContext.app) {
  //     // console.log('111'+JSON.stringify(context.app.value))
  //     //console.log('000'+JSON.stringify(context.app.value['_id']))
  //     return appContext.app.value['_id']
  //   } else {
  //     //console.log('222')
  //     return undefined
  //   }
  // })
  //Load all the pages of this app - not full information
  //the return value is a Promise
  appContext.queryPages = function () {
    return globalContext.request({
      method: 'GET',
      url: 'page/query',
      params: {
        app: appContext.key.value
      }
    })
  }
  //Load page full information
  appContext.loadPage = function (pageId: string) {
    return globalContext.request({
      method: 'GET',
      url: 'page/load',
      params: {
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
        app: appContext.key.value,
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
        id: appContext.key.value
      }
    })
  }
  //
  return appContext
}
