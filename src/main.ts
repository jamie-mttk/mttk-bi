import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
 import router from './router'


import {installDesigner,installRouter} from '@/installer/index'

//
const app = createApp(App)

// app.use(createPinia())
// app.use(router)



//
// const {router}=installRouter(app)
installRouter(app,router)


installDesigner(app,{url:import.meta.env.VITE_APP_API_BASE,router})

//
app.mount('#app')
//
//app will be used by App.vue
//export default does not work :(
export {app};
