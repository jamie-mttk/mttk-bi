import { computed, ref } from 'vue'
import dataManager from './dataManager'
import codeManager from './codeManager'
import choosedManager from './choosedManager'
import computedManager from './computedManager'
import methodManager from './methodManager'
import apiManager from './apiManager'
import useComponentRepository from '@/componentRepository/index'
import useFunctionRepository from '@/functionRepository/index'
import mitt from 'mitt'
 import {createUniqueString} from '@/utils/tools'
export default function createContext(modeInit: string,appContext:object,contextParentInit:object) {
  const contextParentSave=ref(contextParentInit)
  //
  const context = {
    //A unique key to distinguish context 
    key:createUniqueString(),
    //Below are used internaly,so maybe they will be removed from context later
    mode: ref(modeInit),

    codeManager: codeManager(),
    contextParent:contextParentSave,
    cp:contextParentSave,//shortcut
    getContextParent:function(){
      return contextParentSave
    },
    repositoryManager:useComponentRepository(),
    functionManager:useFunctionRepository(),
    f:useFunctionRepository(),
    getAppContext:()=>appContext,
    emitter: mitt(),
    param:ref(''),//Use to transfer content while openPage,it can be any type,use ref to make it reactive
  }
  //Why set here?since context is available after here
  //data manager
  const dm = dataManager(context)
  context.dataManager = dm
  context.d = dm //shortcut
  //computed manager
  const cm=computedManager(context)
  context.computedManager = cm
  context.c = cm

  //method manager
  const mm=methodManager(context)
  context.methodManager = mm
  context.m= mm
  //
  const am=apiManager(context)
  context.apiManager = am
  context.a= am
    //
  //choosed manager does not make sense for view mode, place here is just to simplify the code invoked choosed manager
  context.choosedManager= choosedManager(context)
  //
  return context
}
