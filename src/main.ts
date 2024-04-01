import { createApp, inject } from 'vue'

//
import App from './App.vue'
import router from './router'
//

import {
  installDesigner,
  installRouter,
  installPlugin,

  installBuiltIn
} from '@/installer/index'


//
import installBI from './components/bi/index'
import { initPermission } from '@/utils/permission'
//
import * as echarts from 'echarts'

import ThemeSelect from './components/bi/components/themeSelect/index.vue'

//
const app = createApp(App)
//



//
installRouter(app, router)
const { globalContext } = installDesigner(app, { url: import.meta.env.VITE_APP_API_BASE, router })
installPlugin(globalContext)

installBuiltIn(globalContext)
//
initPermission(globalContext)
//
installBI(globalContext)
//Register login
//login
globalContext.pluginManager.register({
  key: '_login_bi',
  name: 'Login',
  description: '',
  icon: '',
  entry: 'login',
  sequence: 20,
  ui: {
    '~': import('./components/login/index.vue')
  }
})
//Regiester all echarts themes
globalContext
  .request({
    method: 'GET',
    url: 'echartsTheme/query'
  })
  .then(function (response) {
    for (const theme of response.list) {
      echarts.registerTheme(theme.name, theme.value)
    }
  })
//
app.component('lc-theme-select',ThemeSelect)
//
app.mount('#app')
//
//app will be used by App.vue
//export default does not work :(
export { app }
