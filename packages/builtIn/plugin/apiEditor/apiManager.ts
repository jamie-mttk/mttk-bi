import {tryEval} from '@/utils/expression'
//Create method manager
export default function apiManager(context: object) {
  function invoke(apiKey: object|string) {
    const apiConfig = (typeof apiKey=='string')?findAPIConfigByKey(apiKey):apiKey
    if (!apiConfig) {
      console.log('No API config is found by:' + apiKey)
      return
    }
    //
    let params = {}
    if ('para' == apiConfig.requestType) {
      if (apiConfig.requestMode == 'data') {
        params=context.dataManager.get(apiConfig.requestContentValueData) || {}
      }else if (apiConfig.requestMode == 'computed') {
        params=context.computedManager.get(apiConfig.requestContentValueComputed) || {}
      }
    }
    //
    const url=tryEval(apiConfig.url,context)
    const request=context.appContext.globalContext.request
    //
    request({
      url: url,
      method: apiConfig.method,
      params: params
    }).then((res) => {

      context.dataManager.set(
        apiConfig.responseValue,
        apiConfig.responseExpression ? res[apiConfig.responseExpression] : res
      )
    })
  }



  function i(apiKey: object|string) {
    return invoke(apiKey)
  }
  //
  //Find API by key
  function findAPIConfigByKey(key: string) {
    const apis = context.codeManager.getCode().apis
    if (!apis) {
      return undefined
    }
    for (const api of apis) {
      if (key == api.key) {
        return api
      }
    }
    //
    return undefined
  }
  //
  return { invoke, i }
}
