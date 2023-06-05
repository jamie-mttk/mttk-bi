import request from '@/utils/request'

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
      if (apiConfig.requestContentMode == 'data') {
        params=context.dataManager.getData(apiConfig.requestContentValueData) || {}
      }else if (apiConfig.requestContentMode == 'computed') {
        params=context.computedManager.get(apiConfig.requestContentValueComputed) || {}
      }
    }
    //
    request({
      url: apiConfig.url,
      method: apiConfig.method,
      params: params
    }).then((res) => {

      context.dataManager.setData(
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
