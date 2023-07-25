import { reactive } from 'vue'
import { getByPath, setByPath } from '@/utils/pathUtil'
import { deepCopy } from '@/utils/tools'
export default function dataManager(context: any) {
  //Preview data cache, the key is data key and value is the current data value
  //the value is not wrapped, so use reactive
  const dataCache = reactive({})

  //Get cached data,return undefined is neither cached nor initValue
  function getData(key: string, path: string) {

    //
    let d = dataCache[key]

    if (d == undefined) {
      const config = findData(key)
    
      if (!config) {
        //data key is not found
        return undefined
      }
      //Need to copy here,otherwise change to data will affect init value
      d = deepCopy(
        config.initValue == undefined ? defaultValueByType(config.type) : config.initValue
      )
      dataCache[key] = d
      //Get back it neccessary, the returned data is reactived
      d = dataCache[key]

    }
    //
    return getByPath(d, path)
  }
  //Clear cached data
  function clearData(key: String) {
    delete dataCache[key]
  }
  //Set cached data
  function setData(key: string, value: any, path) {
    //console.log('@@@@@@@@@',key,value,path)

    if (!path) {
      //If no path,set directly
      dataCache[key] = value
    }
    //If path is existed
    let cachedData = dataCache[key]
    if (cachedData == undefined) {
      //Not cached,create a new object and cached it
      cachedData = {}
      dataCache[key] = cachedData
    }
    //
    setByPath(cachedData, path, value, true)
  }
  //shortcut
  function g(key: string, path: string) {
    return getData(key, path)
  }
  function s(key: string, value: any, path) {
    setData(key, value, path)
  }
  function c(key: String) {
    clearData(key)
  }
  //
  //Find method from code
  function findData(key: string) {
    for (const c of context.codeManager.getCode().data || []) {
      if (c.key == key) {
        return c
      }
    }
    return undefined
  }

  //Return default value by data type
  function defaultValueByType(dataType: string) {
    if (dataType == 'Array') {
      return []
    } else if (dataType == 'Object') {
      return {}
    } else if (dataType == 'String') {
      return ''
    } else if (dataType == 'Number') {
      return 0
    } else if (dataType == 'Boolean') {
      return true
    } else {
      return ''
    }
  }
  //
  return { getData, clearData, setData, g, s, c, defaultValueByType }
}
