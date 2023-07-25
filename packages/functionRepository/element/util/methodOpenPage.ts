import { ref, createVNode, render, unref } from 'vue'
import PageRender from '@/pageRender/index.vue'
import { ElMessage } from 'element-plus'
import { CompWrap } from 'vuewrapper'
import createContext from '@/context/pageContext/index'

export default function methodOpenPage(pageContext, options: object = {}) {

  const appContext = pageContext.getAppContext()
  //
  if (!appContext) {
    ElMessage.error('App context is not avaibale.')
    return
  }
  if (!appContext.getGlobalContext()) {
    ElMessage.error('Global context is not avaibale.')
    return
  }
  //

  //Load page content
  let loadPromise
  if (options.pageId) {
    loadPromise = appContext.loadPage(options.pageId)
  } else if (options.pageName) {
    loadPromise = appContext.loadPageByName(options.pageName)
  } else {
    ElMessage.error('Neither pageId nor pageName is not provide, load page failed.')
    return
  }
  loadPromise.then(function (response) {
    //
    if (!response['_id']) {
      ElMessage.error('Page is not found by id:' + options.pageId + ' or name:' + options.pageName)
      return
    }
    //
    showUI(appContext, pageContext, options, response)
  })
}
//Show UI
function showUI(appContext, pageContext, options, response) {

  if ('dialog' == options.openPageType || 'drawer' == options.openPageType) {
    showPopup(appContext, pageContext, options, response)
  } else {
    //
    appContext.emitter.emit('pageChanged', {
      code: response,
      options: options,
      context: pageContext
    })
  }
}
//Show dialog
function showPopup(appContext, pageContext, options, content) {
  const mountNode = document.createElement('div')
  const closeCallback = function () {
    document.body.removeChild(mountNode)
  }
  //
  const { popupVisible, popupConfig } = popupCreator(pageContext, content, options, closeCallback)
  //
  const dialogNode = createVNode(CompWrap, {
    config: popupConfig
  })
  //
  dialogNode.appContext = appContext.getGlobalContext().getVueApp()._context
  //
  render(dialogNode, mountNode)
  document.body.appendChild(mountNode)
  //
  popupVisible.value = true
}
function popupCreator(pageContext, content: object, options, closeCallback: Function) {
  if ('dialog' == options.openPageType) {
    return dialogCreator(pageContext, content, options, closeCallback)
  } else if ('drawer' == options.openPageType) {
    return drawerCreator(pageContext, content, options, closeCallback)
    // }else if('replace'==options.openPageType){
    //   return replaceCreator(pageContext,content,options,closeCallback)
  } else {
    return { popupVisible: false, popupConfig: {} }
  }
}
//Create a dialog configuration to rendered by CompWrap
function dialogCreator(pageContext, content: object, options, closeCallback: Function) {
  //
  const contextNew = createContext(
    unref(pageContext.mode),
    pageContext.getAppContext(),
    pageContext
  )
  contextNew.codeManager.setCode(content)
  contextNew.param.value=options.param||''
  //
  const optionsPopup={}
  for(const k of Object.keys(options)){
    if('param'==k||'openPageType'==k){
      continue;
    }
    optionsPopup[k]=options[k]
  }
  //
  const popupVisible = ref(true)
  const popupConfig = {
    sys: {
      component: 'el-dialog',
      modelValue: popupVisible
    },
    props: {
      title: content.name,
      'append-to-body': true,
      'destroy-on-close': true,
      ...optionsPopup
    },
    slots: {
      default: {
        type: 'wrap',
        value: [
          {
            '~component': PageRender,
            contextStack: [contextNew]
          }
        ]
      }
    },
    events: {
      closed: () => {
        //Use to clear the dynamic created div
        if (closeCallback) {
          closeCallback()
        }
      }
    }
  }
  //
  return { popupVisible, popupConfig }
}

//Create a drawer configuration to rendered by CompWrap
function drawerCreator(pageContext, content: object, options, closeCallback: Function) {
  //
  const contextNew = createContext(
    unref(pageContext.mode),
    pageContext.getAppContext(),
    pageContext
  )
  contextNew.codeManager.setCode(content)
  contextNew.param.value=options.param||''
  //
    //
    const optionsPopup={}
    for(const k of Object.keys(options)){
      if('param'==k||'openPageType'==k){
        continue;
      }
      optionsPopup[k]=options[k]
    }
  //
  const popupVisible = ref(true)
  const popupConfig = {
    sys: {
      component: 'el-drawer',
      modelValue: popupVisible
    },
    props: {
      title: content.name,
      'append-to-body': true,
      'destroy-on-close': true,
      direction: 'rtl',
      optionsPopup
    },
    slots: {
      default: {
        type: 'wrap',
        value: [
          {
            '~component': PageRender,
            contextStack: [contextNew]
          }
        ]
      }
    },
    events: {
      closed: () => {
        //Use to clear the dynamic created div
        if (closeCallback) {
          closeCallback()
        }
      }
    }
  }
  //
  return { popupVisible, popupConfig }
}

// //Create a replace configuration to rendered by CompWrap
// function replaceCreator(pageContext,content: object, options,closeCallback:Function) {
//   //
//   const popupVisible = ref(true)
//   const popupConfig =    {
//     '~component': PageRender,
//     '~modelValue': content,
//     'contextParent':pageContext,
//   }
//   //
//   return { popupVisible, popupConfig }
// }
