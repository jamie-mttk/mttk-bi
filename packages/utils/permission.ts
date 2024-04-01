//Handle router Navigation Guards
import { loginState } from './authentication'
//

export function initPermission(globalContext) {

  //URLs without login to access
  const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
  //
  globalContext.router.beforeEach((to, from) => {
    //Check whether loginInfo is available
    if (loginState.value.token) {
      //Already login
      //   if (to.path === '/login') {
      //     return '/'
      //   } else {
      //     //
      //     return true
      //   }
      return true
    } else {
      //Not login
      if (whiteList.indexOf(to.path) !== -1) {
        //
        return true
      } else {
        return `/login?redirect=${to.path}` // Redirect to login page
      }
    }
  })
}
