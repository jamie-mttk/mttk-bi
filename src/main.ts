import { createApp,inject } from 'vue'
//
import App from './App.vue'
import router from './router'
//
import {installDesigner,installRouter,installPlugin,installBuiltIn} from '@/installer/index'

//
import installBI from './components/bi/index'


//
const app = createApp(App)
//
installRouter(app,router)
const {globalContext}=installDesigner(app,{url:import.meta.env.VITE_APP_API_BASE,router})
installPlugin(globalContext)
installBuiltIn(globalContext);
//
//
installBI(globalContext);
//
app.mount('#app')
//
//app will be used by App.vue
//export default does not work :(
export {app};
