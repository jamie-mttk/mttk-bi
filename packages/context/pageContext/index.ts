import { computed, ref } from 'vue'
import {findPluginsByEntry} from '@/context/appContext/appContextUtil'
import choosedManager from './choosedManager'

import codeManager from './codeManager'
// import dataManager from './dataManager'
// import computedManager from './computedManager'
// import methodManager from './methodManager'
// import apiManager from './apiManager'

import mitt from 'mitt'
import { createUniqueString } from '@/utils/tools'
export default function createContext(modeInit: string, appContext) {
  //
  const context = {
    //A unique key to distinguish context
    key: createUniqueString(),
    //Below are used internaly,so maybe they will be removed from context later
    mode: ref(modeInit),
    //render mode   flex/fixed


    // getContextParent:function(){
    //   return contextParentSave
    // },

    f: appContext?.globalContext.functionRepository,
    appContext: appContext,
    mitt: mitt()
  }
  //
  context.codeManager = codeManager(context)
  //
  context.renderMode=computed(()=>{
    return   context.codeManager.getCode().renderMode||'flex'
  })
  //
  //choosed manager does not make sense for view mode, place here is just to simplify the code invoked choosed manager
  context.choosedManager = choosedManager(context)
  //Here install the context plugins
  // const plugins = context.appContext.globalContext.pluginManager.findByEntry('context')
  const plugins = findPluginsByEntry(context.appContext,'context')
  for (const p of plugins) {
    const handler = p.handler(context)
    context[p.key] = handler
    if (p.alias) {
      context[p.alias] = handler
    }
  }
  //
  return context
}
