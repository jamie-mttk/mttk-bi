import type { App } from 'vue'
import type {Router} from 'vue-router'
import { useRouter } from 'vue-router'
import createRequest from '@/utils/requestCreator'
export default function createGlobalContext(baseUrl: string = '', vueApp: App,routerInit:Router) {
  //
  const globalContext = {
    request: createRequest(baseUrl),
    vueApp: vueApp,
    router: routerInit||useRouter()
  }
  //
  // globalContext.setRouter = function (routerNew:Router) {
  //   globalContext.router = routerNew
  // }
  //
  // globalContext.setBaseUrl = function (baseUrl: string) {
  //   globalContext.request({ baseUrl: baseUrl })
  // }
  //
  // globalContext.getVueApp = function () {
  //   return globalContext.vueApp
  // }
  // //
  // globalContext.setVueApp = function (vueAppNew: App) {
  //   globalContext.vueApp = vueAppNew
  // }
  //
  return globalContext
}
