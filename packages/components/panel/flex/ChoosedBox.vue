<script setup lang="ts">
import {  computed, inject } from 'vue'
import { useElementBounding } from '@vueuse/core'

//
//Choosed item
const context = inject('context')
const choosed = computed(() => context.choosedManager.get())
const contextWrap = inject('contextWrap')
//choose component real width and height
const realChosoedSize = computed(() => {
  const el = contextWrap.getRef(choosed.value.key)
  //Here useElementBounding is better than useElementSize because the width/height returned includes the padding/margin
  return useElementBounding(el)
})

//
const choosedBoxStyle = computed(() => {
  if (!choosed.value || choosed.value.type == '_container' || choosed.value.type == undefined) {
    return { display: 'none' }
  } else {
    const result = {
      top: realChosoedSize.value.top.value + 'px',
      left: realChosoedSize.value.left.value + 'px',
      width: realChosoedSize.value.width.value + 'px',
      height: realChosoedSize.value.height.value + 'px'
    }

    //
    return result
  }

})

// @mousedown.prevent.stop="handleMouseDown"
// function handleMouseDown() {
//   //Do nohting, just prevent the event bubble
// }
</script>
<template>
  <div class="choosed-box" :style="choosedBoxStyle" >
   
  </div>
</template>

<style lang="scss" scoped>
.choosed-box {
  position: fixed;
  min-height: 32px;
  min-width: 32px;
  outline:  var(--el-color-warning) dotted 2px;
  z-index:998;//the choosed wrap is 999
}
</style>
