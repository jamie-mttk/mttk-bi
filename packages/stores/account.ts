import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({ token: '',authorities:{} }),
  actions: {
    //Login returns a promise
    login(globalContext, loginData) {
      const vm = this
      return new Promise((resolve, reject) => {
        globalContext
          .request({
            method: 'POST',
            url: 'account/login',
            data: loginData
          })
          .then(function (response) {
            if (response.token) {
              vm.token = response.token
              vm.authorities=response.authorities
              resolve(response.token)
            } else {
              reject('Login failed')
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //Logout returns a promise
    logout(globalContext) {
      const vm = this
      return new Promise<void>((resolve, reject) => {
        globalContext
          .request({
            method: 'POST',
            url: 'account/logout'
          })
          .then(function (response) {
            if (response.result) {
              vm.token = ''
              resolve()
            } else {
              reject('Logout failed')
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //reset token
    resetToken() {
      this.token = ''
    }
  },
  //Tell plugin 'pinia-plugin-persistedstate' to persist
  persist: true
})
