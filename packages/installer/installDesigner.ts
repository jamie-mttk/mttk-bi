import { defineAsyncComponent } from 'vue'

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
// import 'element-plus/theme-chalk/index.css'
import 'element-plus/dist/index.css'
//
import './styles/main.scss'
//
import 'animate.css'
//
import MttkVueWrap from 'mttk-vue-wrap'

//
import createGlobalContext from '@/context/globalContext/index'
//
import {vAuth,vDataAuth} from '@/utils/auth'

export function installDesigner(app, option) {

  //Install bin-editor
  app.component(Editor.name, Editor)
  //Element plus install
  app.use(ElementPlus, { size: 'default'})
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
  
  app.directive('dataAuth',vDataAuth)
  app.directive('auth',vAuth)
  //
  //Create global context
  const globalContext = createGlobalContext(option.url || '', app,option.router)
  app.provide('globalContext', globalContext)

  //
  return { globalContext }
}

