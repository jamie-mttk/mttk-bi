import { watchEffect } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'

export const vFullHeight = {
    updated: (el, binding,) => {
      watchEffect(() => {
        const { top } = useElementBounding(el)
  
        //Get window height
        const { height } = useWindowSize()
        const fullHeight = height.value - top.value - (binding.value||0)
  
        //
        el.style.cssText += `height:${fullHeight}px;`
        // console.log(el.style.cssText,el)
      })
    }
  }