import { useStorage } from '@vueuse/core'
//login state
export const loginState = useStorage('mttk-lowcode-engine-login', { token: '', authorities: {} })
//handle login
export function login(globalContext, loginData) {
  return new Promise((resolve, reject) => {
    globalContext
      .request({
        method: 'POST',
        url: 'account/login',
        data: loginData
      })
      .then(function (response) {
        if (response.token) {
          loginState.value.token = response.token
          loginState.value.authorities = response.authorities
          //
          resolve(response.token)
        } else {
          reject('Login failed')
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

//logout
export function logout(globalContext) {
  return new Promise<void>((resolve, reject) => {
    globalContext
      .request({
        method: 'POST',
        url: 'account/logout'
      })
      .then(function (response) {
        if (response.result) {
          reset()
          //
          resolve()
        } else {
          reject('Logout failed')
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

//reset
export function reset() {
  loginState.value.token = ''
  loginState.value.authorities = {}
}
