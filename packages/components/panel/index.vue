<script setup lang="ts">
import { onMounted, computed, inject } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import DraggableCanvas from './DraggableCanvas.vue'
import lcWrap from '../wrap/index.vue'
import useDropDetect from './dropDetect'
//
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  // pageContext: {
  //   type: Object,
  //   required: false,
  //   default() {
  //     return undefined
  //   }
  // },
  // jamie:{
  //   type:String,
  //   required: false,
  //   default:'NONE'
  // },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<any>): void
}>()

// console.log('#####################',inject('wrapContext'))
//
// //const context =inject('context')
//  let context = props.context

// //  console.log('$$$$$$$$$$$$$',props.modelValue,props.pageContext)
// if (context) {
//   //provide so the children components can inject,this will happen if Panel is the root component
//   //context is reactive,so toRaw is used
//   context = toRaw(unref(context))
//   provide('context', context)
//   // console.log('INSIDE PANEL provide:'+context.test)
// } else {
//   context = inject('context')
//   // console.log('INSIDE PANEL inject context:'+context.test)
// }

const context = inject('context')
//
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };
})
//

//
const showTips = computed(() => {
  return !(props.modelValue &&
    props.modelValue.length > 0
  ) && context.mode.value == 'edit';
})
const dragDisabled = computed(() => {
  if (context.mode.value != 'edit') {
    // console.log('false','because of edit')
    return true;
  }

  //
  return false;
})

//
function handleDateChange(data: Array<any>) {
  //  console.log('~handleDateChange',JSON.stringify(data))

  emit('update:modelValue', data)
  // console.log(JSON.stringify(props.modelValue))

}

//
const {detecting,clearDetect,droppingClass}=useDropDetect(context)

function handleDrop(event) {
  //
  clearDetect();
  //Try to choose the dropped component
  let index = event.newIndex
  //console.log('handleDrop',arguments,index,props.modelValue.length)

  //Maybe it is a  bug of SortableJS, the first time drop in ,the index=1 and length are 1, in fact the index should be 0
  if (index == 1 && props.modelValue.length == 1) {
    index = 0
  }
  //
  if (index == undefined || index >= props.modelValue.length) {
    return
  }

  context.choosedManager.set(props.modelValue[index])

}




// function test11(){
//   console.log(props.modelValue)
//   console.log('test11',arguments)
// }
// function handleMouseDown(event, item) {
//   //
//    console.log(event,item)
//   //Choose the current component
//   componentChoosed(context, event, item)
// }
//

</script>

<template>
  <VueDraggable v-if="context.componentManager.renderMode.value == 'flex'" :disabled="dragDisabled" v-bind="$attrs"
    :modelValue="props.modelValue" @update:modelValue="handleDateChange"
    :group="{ name: 'components', pull: true, put: true }" class="wrap-group" filter=".draggable-header"
    draggable=".draggable-item" @add="handleDrop" @change="detecting" :class="[droppingClass]">


    <div class="draggable-header" v-if="showTips" >Please
      drag the component from pallet to drop here {{ droppingClass }} </div>

    <lcWrap v-for="item in modelValue" :key="item.key" class="draggable-item" :modelValue="item"></lcWrap>

  </VueDraggable>
  <DraggableCanvas v-else v-bind="$attrs" :modelValue="props.modelValue" @update:modelValue="handleDateChange">
  </DraggableCanvas>
</template>


<style lang="scss" scoped>
.wrap-group {
  min-height: 32px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .draggable-header {
    min-height: 72px;
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
// }</style>