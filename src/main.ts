import { createApp } from 'vue'

//
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { install } from 'mttk-lowcode-engine'
import 'mttk-lowcode-engine/dist/index.css'
//
import {installBI} from '@/index'
import 'element-plus/dist/index.css'
//
const app = createApp(App)

const { globalContext } = install.installAll(
  app,
  createRouter({
    history: createWebHashHistory(),
    routes: [ 
      //  {
      // path: '/home',
      // name: 'home',
      // component: () => import('./views/home/index.vue')
    // },
  ]
  }),
  {
    url: import.meta.env.VITE_APP_API_BASE
  }
)

//await will cause compiled show a empty page,so we use promise.then instead
installBI(globalContext).then(function () {
  //
  app.mount('#app')
})
