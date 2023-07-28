import { defineAsyncComponent } from 'vue'

import createGlobalContext from './context/globalContext/index'
import createAppContext from './context/appContext/index'
import createContext from './context/pageContext/index'
import useComponentRepository from './componentRepository/index'
import useFunctionRepository from './functionRepository/index'

import lcPageRender from './PageRender/index.vue'
import lcDeployed from './deployed/index.vue'
import lcDeployedNoRouter from './deployed/deployedNoRouter.vue'
import lcLayout from './layout/index.vue'
import lcPanel from  './components/panel/index.vue'
import lcIcon from './components/icon/index.vue'
//import Wrap from './components/wrap/index.vue'
//Below are for designer
import {installDesigner,installRouter} from '@/installer/index'
import lcWorkspaceManager from '@/workspaceManager/index.vue'
import  lcAppEditorWithRouter from '@/appEditor/appEditorWithRouter.vue'
import * as widgetUtil from './componentRepository/util/uiUtil'
import * as widgetTransformUtil from './componentRepository/util/transformUtil'
//install
const install=app=>{
    app.component('lcPageRender',lcPageRender)
    app.component('lcDeployed',lcDeployed)
    app.component('lcDeployedNoRouter',lcDeployedNoRouter)
   // app.component('lc-wrap',Wrap)
    app.component('lcPanel',lcPanel)
    app.component('lcLayout',lcLayout)
    app.component('lcIcon',lcIcon)
    
    //
    app.component('lcEditableList', defineAsyncComponent(() => import('@/pageDesign/propsEditor/editableList.vue')))
    app.component('lcIconPicker', defineAsyncComponent(() => import('@/components/iconPicker/index.vue')))
    //console.log('INSTALLER IS CALLED 7')
}
//
const installer={install}
//
export {installer,lcPageRender,createGlobalContext,createAppContext,createContext,useComponentRepository,useFunctionRepository,lcDeployed,lcDeployedNoRouter,lcLayout,lcPanel,lcIcon,
	//Below are for designer
	installDesigner,installRouter,lcWorkspaceManager,lcAppEditorWithRouter,widgetUtil,widgetTransformUtil,
	}

