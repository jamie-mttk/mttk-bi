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

//icons

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//
import 'animate.css'
//
import WRAPPER from 'vuewrapper'
//
import useComponentRepository from '@/componentRepository/index'
import useFunctionRepository from '@/functionRepository/index'
//
import createGlobalContext from '@/context/globalContext/index'

export function installDesigner (app, option) {
  const componentRepository = useComponentRepository()
  componentRepository.useBuitin()

  useFunctionRepository().useBuitin()

  //
  app.component(Editor.name, Editor)
  //
  app.use(ElementPlus)
  // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //   app.component(key, component)
  // }

  app.use(WRAPPER)
  //
  app.component(
    'lc-editable-list',
    defineAsyncComponent(() => import('@/pageDesign/propsEditor/editableList.vue'))
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
  const globalContext = createGlobalContext(option.url||'', app)
  app.provide('globalContext', globalContext)
  componentRepository.resetPageWidget(globalContext)
  //
  if(option.router){
    globalContext.setRouter(option.router)
  }
  //
  return {globalContext}
}


