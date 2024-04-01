<template>
  <div
    class="choosedBox"
    :style="choosedBoxStyle"
    @mousedown.prevent.stop="triggerMove"
  >
    <!-- Draw the resize points of the current item -->
    <div
      @mousedown.stop="trggerResize('resize-lt')"
      class="resize-icon resize-left-top"
    ></div>
    <div
      @mousedown.stop="trggerResize('resize-lc')"
      class="resize-icon resize-left-center"
    ></div>
    <div
      @mousedown.stop="trggerResize('resize-lb')"
      class="resize-icon resize-left-bottom"
    ></div>
    <div
      @mousedown.stop="trggerResize( 'resize-rt')"
      class="resize-icon resize-right-top"
    ></div>
    <div
      @mousedown.stop="trggerResize( 'resize-rc')"
      class="resize-icon resize-right-center"
    ></div>
    <div
      @mousedown.stop="trggerResize( 'resize-rb')"
      class="resize-icon resize-right-bottom"
    ></div>
    <div
      @mousedown.stop="trggerResize( 'resize-ct')"
      class="resize-icon resize-center-top"
    ></div>
    <div
      @mousedown.stop="trggerResize( 'resize-cb')"
      class="resize-icon resize-center-bottom"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, inject } from 'vue'
import { useElementBounding,  } from '@vueuse/core'
import useDragAndMove from '../dragAndMove/useDragAndMove'
//
const contextWrap = inject('contextWrap')
//
const {choosed, triggerMove, trggerResize, handleMouseMove, trggerDone }=useDragAndMove()



//choose component real width and height
const realChoosedSize = computed(() => {
  const el = contextWrap.getRef(choosed.value.key)
  //Here useElementBounding is better than useElementSize because the width/height returned includes the padding/margin
  return useElementBounding(el)
})
//


//
const choosedBoxStyle = computed(() => {
  if (!choosed.value || choosed.value.type == '_container' || choosed.value.type == undefined) {
    return { display: 'none' }
  } else {
    const result = {} as any
    //top
    result.top = choosed.value.config?.display?.style?.top || '0px'
    //left
    result.left = choosed.value.config?.display?.style?.left || '0px'
    //width
    if (choosed.value.config?.display?.style?.width) {
      result.width = choosed.value.config.display.style.width
    } else {
      //Try to get the choosed component real size
      result.width = (realChoosedSize?.value?.width?.value || 32) + 'px'
    }
    //height
    if (choosed.value.config?.display?.style?.height) {
      result.height = choosed.value.config.display.style.height
    } else {
      //Try to get the choosed component real size
      result.height = (realChoosedSize?.value?.height?.value || 32) + 'px'
    }
    //z
    //DO NOT NEED TO SET z-index since it will be set a fixed value 998


    //
    return result
  }
})

//
defineExpose({ handleMouseMove, trggerDone, triggerMove })
</script>

<style lang="scss" scoped>
//This is the box area same as the choosed component
.choosedBox {
  position: absolute;
  min-width: 32px;
  min-height: 32px;
  outline: var(--el-color-warning) dotted 2px;
  z-index: 998;
  // background-color: red;
  .resize-icon {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: white;
    border: 1px solid var(--el-color-primary);
    border-radius: 50%;
  }

  //
  .resize-left-top {
    left: -15px;
    top: -15px;
    cursor: nwse-resize;
  }

  .resize-left-center {
    left: -15px;
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
  }

  .resize-left-bottom {
    left: -15px;
    bottom: -15px;
    cursor: nesw-resize;
  }

  .resize-right-top {
    right: -15px;
    top: -15px;
    cursor: nesw-resize;
  }

  .resize-right-center {
    right: -15px;
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
  }

  .resize-right-bottom {
    right: -15px;
    bottom: -15px;
    cursor: nwse-resize;
  }

  .resize-center-top {
    top: -15px;
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }

  .resize-center-bottom {
    bottom: -15px;
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }
}
</style>
