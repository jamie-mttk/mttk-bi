import { defineAsyncComponent } from 'vue'

import createGlobalContext from '@/context/globalContext/index'
import createAppContext from '@/context/appContext/index'
import createContext from '@/context/pageContext/index'


import lcPageRender from '@/components/pageRender/index.vue'
import lcDeployed from '@/components/deployed/index.vue'
import lcDeployedNoRouter from '@/components/deployed/deployedNoRouter.vue'
import lcLayout from '@/components/layout/index.vue'
import lcPanel from '@/components/panel/index.vue'
import lcIcon from '@/components/icon/index.vue'
//import Wrap from './components/wrap/index.vue'
import WRAPPER from 'mttk-vue-wrap'

//Below are for designer
import { installDesigner, installRouter ,installPlugin} from '@/installer/index'
import lcWorkspaceManager from '@/components/workspaceManager/index.vue'
import lcAppEditorWithRouter from '@/components/appEditor/appEditorWithRouter.vue'
import * as widgetUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import * as widgetTransformUtil from '@/context/globalContext/componentRepository/util/transformUtil'
import * as tools from '@/utils/tools'

//install
const install = (app) => {
  app.component('lcPageRender', lcPageRender)
  app.component('lcDeployed', lcDeployed)
  app.component('lcDeployedNoRouter', lcDeployedNoRouter)
  // app.component('lc-wrap',Wrap)
  app.component('lcPanel', lcPanel)
  app.component('lcLayout', lcLayout)
  app.component('lcIcon', lcIcon)
  app.use(WRAPPER)
  //
  app.component(
    'lcEditableList',
    defineAsyncComponent(() => import('@/components/pageDesign/propsEditor/editableList.vue'))
  )
  app.component(
    'lcIconPicker',
    defineAsyncComponent(() => import('@/components/iconPicker/index.vue'))
  )

}
//
const installer = { install }
//
export {
  installer,
  lcPageRender,
  createGlobalContext,
  createAppContext,
  createContext,

  lcDeployed,
  lcDeployedNoRouter,
  lcLayout,
  lcPanel,
  lcIcon,
  tools,
  //Below are for designer
  installDesigner,
  installRouter,
  installPlugin,
  lcWorkspaceManager,
  lcAppEditorWithRouter,
  widgetUtil,
  widgetTransformUtil
}
