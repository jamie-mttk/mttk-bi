import { defineAsyncComponent } from 'vue'
import './styles/main.scss'
//Bin editor
import Editor from 'bin-editor-next'
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
//
import 'animate.css'
//
import MttkVueWrap from 'mttk-vue-wrap'

//
import createGlobalContext from '@/context/globalContext/index'


export function installDesigner(app, option) {

  //Install bin-editor
  app.component(Editor.name, Editor)
  //Element plus install
  app.use(ElementPlus)
  //MttkVueWrap install
  app.use(MttkVueWrap)
  //Some components
  app.component(
    'lc-editable-list',
    defineAsyncComponent(() => import('@/components/pageDesign/propsEditor/editableList.vue'))
  )
  app.component(
    'lc-icon',
    defineAsyncComponent(() => import('@/components/icon/index.vue'))
  )
  app.component(
    'lc-icon-picker',
    defineAsyncComponent(() => import('@/components/iconPicker/index.vue'))
  )
  //
  //Create global context
  const globalContext = createGlobalContext(option.url || '', app,option.router)
  app.provide('globalContext', globalContext)

  //
  return { globalContext }
}

