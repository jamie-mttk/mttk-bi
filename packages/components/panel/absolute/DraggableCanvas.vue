<template>
  <div
    class="drag-container"
    :class="panelClass"
    @dragover.prevent.stop="detecting"
    @mousemove="laryerMouseMove"
    @mouseup="laryerMouseUp"
    @drop.prevent.stop="handleDropFromPallet"
  >
    <GridRect ></GridRect>
    <!-- :style="dragContainerItemStyle(item)" -->
    <lcWrap
      v-for="item in model"
      :key="item.key"
      class="drag-container-item"
      :modelValue="item"
      @componentChoosed="handleComponentChoosed"
    >
    </lcWrap>
    <ChoosedBox  ref="choosedBoxRef"></ChoosedBox>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, inject } from 'vue'
import { setByPath } from '@/utils/pathUtil'
import { cloneComponent } from '../PanelUtil'
import lcWrap from '../../wrap/index.vue'
import GridRect from './GridRect.vue'
import useDropDetect from '../dropDetect'
import ChoosedBox from './ChoosedBox.vue'
import {alignToGrid} from './util'

//
const model = defineModel({ type: Array,default:[] })

//
const context = inject('context')
//Refer to choosed box
const choosedBoxRef = ref()
//
function laryerMouseMove() {
  choosedBoxRef.value.handleMouseMove()
}
function laryerMouseUp() {
  choosedBoxRef.value.trggerDone()
}
function handleComponentChoosed(){
  choosedBoxRef.value.triggerMove()
}

//
const panelClass = computed(() => {
  const result = []
  //
  if (droppingClass.value) {
    result.push(droppingClass.value)
  }
  // if( context.mode.value=='edit'){
  //     result.push('panel-edit-mode')
  // }
  //
  return result
})

//
const { detecting, clearDetect, droppingClass } = useDropDetect(context)


//Once user choose component from pallet
function handleDropFromPallet(event) {
  //
  clearDetect()
  //
  const componentKey = event.dataTransfer.getData('text')
  //
  // console.log('DROP',event.dataTransfer.getData('text'),event.dataTransfer)
  // build new component
  const component = cloneComponent(context, componentKey)
  if (!component) {
    return
  }
  //event.offsetX

  if (!component.config?.display) {
    setByPath(component, 'config.display', {}, true)
  }
  setByPath(component, 'config.display.style.left', alignToGrid(event.offsetX,context), true)
  setByPath(component, 'config.display.style.top', alignToGrid(event.offsetY,context), true)
  // if (!component.config.display.style.width) {
  //   component.config.display.style.width = '100%'
  // }
  // if (!component.config.display.style.height) {
  //   component.config.display.style.height = '100%'
  // }
  //
  model.value.push(component)
  //choose the dropped component
  context.choosedManager.set(component)
  //
  //calPanelHeight()
}

//calculate panel height based on the components inside
// function calPanelHeight() {
//   let height = 0
//   for (const comp of model) {
//     height = Math.max(height, calSingleComponent(comp))
//     console.log(height, comp.key)
//   }
//   // console.log(height)
//   //32 the spare space
//   return height + 32
// }
// function calSingleComponent(comp) {
//   return (comp?.config?.display?.position?.y || 0) + (comp?.config?.display?.position?.h || 0)
// }
</script>

<style lang="scss" scoped>
//Whole drap container
.drag-container {
  position: relative;
  min-width: 32px;
  min-height: 32px;
  //try to fullfill the whole parent,but it may not work as expected
  width: 100%;
  // height: 100%;
  //One drap item
  .drag-container-item {
    position: absolute;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
  }
}
</style>
