
export default function installLogin(globalContext){
  //login
  globalContext.pluginManager.register({
    key: '_login_bi',
    name: 'Login',
    description: '',
    icon: '',
    entry: 'login',
    sequence: 20,
    ui: {
      '~': import('./index.vue')
    }
  })
}