<script setup lang="ts">
import {  computed, inject } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

import lcWrap from '../../wrap/index.vue'
import useDropDetect from '../dropDetect'
import ChoosedBox from './ChoosedBox.vue'
import {isItemChoosed} from '../PanelUtil'
//
//
const model = defineModel({ type: Array, default: [] })
//
const context = inject('context')
//
const showTips = computed(() => {
  return !(model.value && model.value.length > 0) && context.mode.value == 'edit'
})
const dragDisabled = computed(() => {
  if (context.mode.value != 'edit') {
    // console.log('false','because of edit')
    return true
  }

  //
  return false
})
//
const { detecting, clearDetect, droppingClass } = useDropDetect(context)
function handleDrop(event) {
  //
  clearDetect()
  //Try to choose the dropped component
  let index = event.newIndex
  //console.log('handleDrop',arguments,index,props.modelValue.length)

  //Maybe it is a  bug of SortableJS, the first time drop in ,the index=1 and length are 1, in fact the index should be 0
  if (index == 1 && model.value.length == 1) {
    index = 0
  }
  //
  if (index == undefined || index >= model.value.length) {
    return
  }

  context.choosedManager.set(model.value[index])
}
//

</script>

<template>
  <VueDraggable

    :disabled="dragDisabled"
    v-bind="$attrs"
    v-model="model"
    :group="{ name: 'components', pull: true, put: true }"
    class="wrap-group"
    filter=".draggable-header"
    draggable=".draggable-item"
    @add="handleDrop"
    @change="detecting"
    :class="[droppingClass]"
    :animation="150"
  >
    <div class="draggable-header" v-if="showTips">
      Please drag the component from pallet to drop here {{ droppingClass }}
    </div>

    <lcWrap
      v-for="item in model"
      :key="item.key"
      class="draggable-item"
      :modelValue="item"
      :class="{ 'choosed-wrap': isItemChoosed(context,item) }"
    ></lcWrap>
  </VueDraggable>
  <ChoosedBox></ChoosedBox>
 </template>

<style lang="scss" scoped>
.wrap-group {
  min-height: 32px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .draggable-header {
    min-height: 128px;
    width: 100%;

    background-color: var(--el-fill-color-lighter);
    margin: 1px;
  }

  //   background-color: #00ffff;
  // border: 1px groove #E0E0E0;
  .draggable-item {
    min-height: 32px;
  }
}

// .wrap-group:hovor {
//  // border: 1px solid #ff0000;
// }

// .component-ghost{
//   background-color: #00ffff;
//   border: 1px solid #ff0000;
// }
.choosed-wrap{
  //once choosed,set z-index to 999 so it will display at top
  z-index:999;
}
</style>
