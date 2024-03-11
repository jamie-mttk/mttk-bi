import { ref, createVNode, render } from 'vue'
import type { AppContext, VNode } from 'vue'
import { MttkWrapComp } from 'mttk-vue-wrap'
//options
//appendTo: where to append,null will append to root(document.body),it can be a string or html element
//removeEvent: if provide, this event will automatically trigger remove handler to remove appended div
export default function dynamicRender(config, appContext: AppContext, options = {}) {
  const mountNode = document.createElement('div')
  const appendTo = getAppendToElement()
  const remove = function () {
    render(null, mountNode)
    appendTo.removeChild(mountNode)
  }

  const vNode = createVNode(MttkWrapComp, { config: getConfig() })
  //
  vNode.appContext = appContext
  //
  render(vNode, mountNode)
  appendTo.appendChild(mountNode)
  //
  return { remove, mountNode, vNode }

  function getConfig() {
    const removeEvent = options.removeEvent
    if (!removeEvent) {
      return config
    }
    //
    const configModified = { ...config }
    configModified['@' + removeEvent] = remove
    //
    console.log(configModified)
    return configModified
  }
  function getAppendToElement() {
    const appendTo = options.appendTo
    if (appendTo) {
      if (typeof appendTo == 'string') {
        return document.querySelector(appendTo)
      }
      if (appendTo instanceof Element) {
        return appendTo
      }
    }
    return document.body
  }
}
