import { reactive } from 'vue'
import { getByPath, setByPath } from '@/utils/pathUtil'
import { deepCopy } from '@/utils/tools'
export default function dataManager(context: any) {
  //Preview data cache, the key is data key and value is the current data value
  //the value is not wrapped, so use reactive
  const dataCache = reactive({})

  //Get cached data,return undefined is neither cached nor initValue
  function get(key: string, path?: string) {
    //
    let d = dataCache[key]
    //
    if (d == undefined) {
      //not cached?
      //find configuration
      const config = findConfig(key)
      //
      if (!config) {
        //data key is not found
        return undefined
      }
      if (config.initValue!=undefined) {
        //Need to copy here,otherwise change to data will affect init value if it is a complex data type
        d = deepCopy(config.initValue)
        
      } else {
        d = defaultByType(config.type)
      }
      //Save to cache
      dataCache[key] = d
      //Get back it neccessary, the returned data is reactived
      d = dataCache[key]
    }

    //
    return getByPath(d, path)
  }
  function getWithDefault(key: string, value:any) {
    const d = dataCache[key]
    //
    if (d != undefined) {
      return d
    }
    //
    dataCache[key]=value
    //
    return value
  }
  //Clear cached data
  function clear(key: String) {
    delete dataCache[key]
  }
  //Set cached data
  function set(key: string, value: any, path?) {
    //  console.log('@@@@@@@@@',key,value,path)
    if (!path) {
      //If no path,set directly
      dataCache[key] = value
    } else {
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
  }
  //shortcut
  function g(key: string, path: string) {
    return get(key, path)
  }
  function s(key: string, value: any, path?) {
    set(key, value, path)
  }
  function c(key: String) {
    clear(key)
  }
  //
  //Find data config from code
  function findConfig(key: string) {
    for (const c of context.codeManager.getCode().data || []) {
      if (c.key == key) {
        return c
      }
    }
    return undefined
  }

  //Return default value by data type
  function defaultByType(dataType: string) {
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
  return { get, set, clear, g, s, c, defaultByType ,getWithDefault}
}
