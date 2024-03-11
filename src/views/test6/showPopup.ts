import { ref, createVNode, render, unref,inject } from 'vue'
import {MttkWrapComp} from 'mttk-vue-wrap'
  //Show dialog
  export function showPopup(instance, component,props,content,) {
    const mountNode = document.createElement('div')
    const closeCallback = function () {
      console.log('call back is called')
      render(null, mountNode)
      document.body.removeChild(mountNode)
    }
    //
    const { popupVisible, popupConfig } = popupCreator(component,props,content, closeCallback)
    //
    const dialogNode = createVNode(MttkWrapComp, {
      config: popupConfig
    })

    //
    dialogNode.appContext =instance.appContext
    //
    render(dialogNode, mountNode)
    document.body.appendChild(mountNode)
    //
    popupVisible.value = true
  }

  //Create a dialog configuration to rendered by CompWrap
  function popupCreator(component,props={},content, closeCallback: Function) {
    //
    const popupVisible = ref(true)
    const popupConfig = {
        '~': component,
        '~modelValue': popupVisible,
        'destroy-on-close':true,
        ...props,
        '#':content,
        '^onUnmounted':function(){
          console.log('UNMOUNTED IS CALLED')
          if (closeCallback) {
            closeCallback()
          }
        },
        '@closed': () => {
          //Use to clear the dynamic created div
          // if (closeCallback) {
          //   closeCallback()
          // }
        }
     
    }
    //
    return { popupVisible, popupConfig }
  }
  