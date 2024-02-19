import { computed, unref } from 'vue'
import { ElMessage } from 'element-plus'
//Create computed manager
export default function computedManager(context: object) {
  //Cache the computed,please note the cached object is computed,not the value
  const cache = {}
  //

  //Return the computed result
  function get(key: string) {
    const cached = cache[key]
    // console.log('111',context.key,key,cached)
    // try{
    // throw Error('SHOW ME')
    // }catch(err){
    //   console.log(err)
    // }

    // console.log('query criteria:'+JSON.stringify(context.d.g('QueryCriteria')))
    if (cached !== undefined) {
      //existed,return directly
      return cached
    }
    //
    const computedConfig = findConfig(key)
    if (!computedConfig) {
      ElMessage.error('No computed is found by ' + key)
      // console.log('@@@')
      // console.log(context.codeManager.getCode())
      return undefined
    }
    //Create computed
    const created = computed({
      get: () => {
        //
        try {
          return new Function('c', computedConfig.code)(context)
        } catch (e) {
          ElMessage({
            type: 'error',
            dangerouslyUseHTMLString: true,
            message: 'Executing computed ' + key + ' failed<br>' + e
          })
          console.log(e)
          return undefined
        }
      },
      set: (value) => {
        if (!computedConfig.codeSet) {
          //no code,do nothing
          return
        }
        //
        try {
           new Function('c','value', computedConfig.codeSet)(context,value)
        } catch (e) {
          ElMessage({
            type: 'error',
            dangerouslyUseHTMLString: true,
            message: 'Set computed ' + key + ' failed<br>' + e
          })
          console.log(e)
          return undefined
        }
      }
    })
    // {
    //   onTrack(e) {
    //     console.log('track',e)
    //     // console.log(e)
    //   },
    //   onTrigger(e) {
    //     console.log('trigger',e)
    //     // console.log(e)
    //   }
    // }
    //cache it
    cache[key] = created
    return created
  }
  // function set(key:string,value:any){
  //   let cached=cache[key]
  //   if(cached==undefined){
  //     //do nothing
  //     return
  //   }
  //   cached.value=value
  // }
  function clear(key: string) {
    delete cache[key]
  }
  //Find method from code
  function findConfig(key: string) {
    for (const c of context.codeManager.getCode().computed || []) {
      if (c.key == key) {
        return c
      }
    }
    return undefined
  }
  function g(key: string) {
    return get(key)
  }
  //
  function init() {
    // console.log('Start init computed'+JSON.stringify(unref(context.codeManager.getCode())))
    for (const c of context.codeManager.getCode().computed || []) {
      // console.log('Start init computed of '+c.key)
      get(c.key)
    }
  }

  //
  return { get, clear, g, init } //set,
}
