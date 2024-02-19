import { ref, reactive, computed, watch, toRaw, isRef, isReactive } from 'vue'



import {pageProps,promptMsg,buildInternal} from './buildCompEditorUti'
//build editor for component
export default function buildCompEditor(context) {
  

  //Whether the component can be delte
  const canBeDelete = computed(() => {
    //
    const choosed = context.choosedManager.get()
    return choosed && choosed.key && '_root' != choosed.key
  })
  //
  const configTitle = computed(() => {
    //
    const choosed = context.choosedManager.get()
    if (!choosed || !choosed.key) {
      return 'Page config'
    }
    //{ "key": "button215", "type": "button", "config": { "props": { "type": "primary" }, "slots": { "default": "Button3" } }, "data": {}, "event": [] }
    return choosed.key
  })
  //tab index to indicate which tab to show
  const tabIndex = ref('')
  //the UI description
  const compEditor = ref(pageProps(context))
//
//Add a scrollbar so the basic can be displayed even if it is very high
const sc_height = ref('640px') 
calScHeight()
window.onresize = function () {
    calScHeight()
}
function calScHeight(){
    sc_height.value = (window.innerHeight - 320) + 'px' 
}

  watch(
    () => context.choosedManager.get(),
    () => {
      //
      const choosed = context.choosedManager.get()
      // console.log('configBasic is calculated',choosed)
      // console.log(JSON.stringify(choosed))
      if (!choosed || !choosed.key) {
        //
        compEditor.value = pageProps(context)
        return
        //return promptMsg('No component is choosed')
      }

      //{ "key": "button215", "type": "button", "config": { "props": { "type": "primary" }, "slots": { "default": "Button3" } }, "data": {}, "event": [] }
      const componentConfig = context.appContext.globalContext.componentRepository.componentByKey(choosed.type)
      if (!componentConfig) {
        compEditor.value = promptMsg('No component config is found by type:' + choosed.type)
        return
      }
      if (!componentConfig.editor) {
        compEditor.value = promptMsg('Component does not define configuration of type:' + choosed.type)
        return
      }
      //
      buildInternal(choosed,context,componentConfig,compEditor,tabIndex)
      //
      // console.log('%%%%%%%%',JSON.stringify(configBasic.value))
    },
    {
      immediate: true
    }
  )

  
  //
  return {
    canBeDelete,
    configTitle,
    compEditor
  }
}
