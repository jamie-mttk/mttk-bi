import { createApp,defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
//Bin editor
import Editor from 'bin-editor-next';
import * as ace from 'brace'
import 'brace/ext/emmet'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/snippets/json'
import 'brace/theme/chrome'

//Element PLUS
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//icons
// import { library } from '@fortawesome/fontawesome-svg-core'
// import * as iconsRegular from '@fortawesome/free-regular-svg-icons'
// import  * as iconsSolid from '@fortawesome/free-solid-svg-icons'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//
import 'animate.css';
//
import WRAPPER from 'vuewrapper'
//
import useComponentRepository from '@/componentRepository/index'
import useFunctionRepository from '@/functionRepository/index'


const componentRepository =useComponentRepository()
componentRepository.useBuitin()

useFunctionRepository().useBuitin();
//
const app = createApp(App)

app.use(createPinia())
app.use(router)

//
app.component(Editor.name, Editor)
//
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//install icons
// for(const k of Object.keys(iconsRegular)){
//   const v=iconsRegular[k] 
//   if('prefix'==k){
//       continue
//   }
//   //
//   library.add(v)
// }
// for(const k of Object.keys(iconsSolid)){
//   const v=iconsSolid[k] 
//   if('prefix'==k){
//       continue
//   }
//   //
//   library.add(v)
// }
//console.log('icons is installed!')

app.use(WRAPPER)
//
app.component('lc-editable-list', defineAsyncComponent(() => import('@/pageDesign/propsEditor/editableList.vue')))
app.component('lc-icon-picker', defineAsyncComponent(() => import('@/components/iconPicker/index.vue')))
//
app.mount('#app')
//
//app will be used by App.vue
//export default does not work :(
export {app};
