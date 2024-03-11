//Handle router Navigation Guards
import { useAccountStore } from '@/stores/account'
//

export function initPermission(globalContext) {
  const accountStore = useAccountStore()

  //URLs without login to access
  const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
  //
  globalContext.router.beforeEach((to, from) => {
    //Check whether loginInfo is available
    if (accountStore.token) {
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
