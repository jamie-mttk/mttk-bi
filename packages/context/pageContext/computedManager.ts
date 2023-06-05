import {computed } from 'vue'
import { ElMessage } from 'element-plus'
//Create computed manager
export default function computedManager(context:object){
    //Cache the computed cached
    const cache={}
    //Return the computed result
    function get(key:string){
        let cached=cache[key]
        // console.log('!!!!'+context.test)
        // console.log(cached)
        // console.log('query criteria:'+JSON.stringify(context.d.g('QueryCriteria')))
        if(cached==undefined){
            const computedConfig=findComputed(key)
            if(!computedConfig){
              ElMessage.error('No computed is found by '+key)
                // console.log('@@@')
                // console.log(context.codeManager.getCode())
                return
            }
            //Create computed
            cached=computed(()=>{     
              try{
                return new Function('c', computedConfig.code)(context)
              }catch(e){
                ElMessage({
                  type:'error',
                  dangerouslyUseHTMLString: true,
                  message:'Executing computed '+key+' failed<br>'+e,
                })
                console.log(e)
                return undefined
              }
              },
              // {
              //   onTrack(e) {
              //     console.log('track')
              //     console.log(e)
              //   },
              //   onTrigger(e) {
              //     console.log('trigger')
              //     console.log(e)
              //   }
              // }
              )
            //cache it
            cache[key]=cached
        }
        //
        return cached.value
    }
    // function set(key:string,value:any){
    //   let cached=cache[key]
    //   if(cached==undefined){
    //     //do nothing
    //     return 
    //   }
    //   cached.value=value
    // }
    function reset(key:string){
      delete cache[key]
    }
  //Find method from code
  function findComputed(key: string) {
    for (const c of context.codeManager.getCode().computed || []) {
      if (c.key == key) {
        return c
      }
    }
    return undefined
  }
  function g(key:string){
    return get(key)
  }
  //
  return {get,reset,g}//set,
}