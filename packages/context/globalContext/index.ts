import type { App } from 'vue'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import pluginManager from './pluginManager'
import createRequest from '@/utils/requestCreator'
import useComponentRepository from './componentRepository/index'
import useFunctionRepository from './functionRepository/index'

export default function createGlobalContext(baseUrl: string = '', vueApp: App, routerInit: Router) {
  //
  const globalContext = {
    //Http request ,axios to server which provide low code engine APIs
    request: createRequest(baseUrl),
    //vue app
    vueApp: vueApp,
    //Vue router
    router: routerInit || useRouter()
  }
  //
  globalContext.componentRepository = useComponentRepository(globalContext)
  globalContext.functionRepository = useFunctionRepository(globalContext)
  globalContext.pluginManager = pluginManager(globalContext)

  //
  return globalContext
}
