<script setup lang="ts">
import {onMounted,computed,inject, provide,toRaw,unref  } from 'vue'
import draggable from "vuedraggable";
import Wrap from '../wrap/index.vue'

//
const props=defineProps({
  modelValue:{
    type:Array,
    required: true,
    default() {
      return []
    }
  },
  pageContext:{
    type:Object,
    required: false,
    default() {
      return undefined
    }
  },
  slotParaStack:{
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  // jamie:{
  //   type:String,
  //   required: false,
  //   default:'NONE'
  // },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value:Array<any>): void
}>()
//
//const context =inject('context')
let context = props.pageContext
  // console.log(props.jamie+'$$$$$$$$$$$$$'+props.pageContext?.test)
if(context){
  //provide so the children components can inject,this will happen if Panel is the root component
  //context is reactive,so toRaw is used
  context=toRaw(unref(context))
  provide('context',context)
  // console.log('INSIDE PANEL provide:'+context.test)
}else{
  context =inject('context')
  // console.log('INSIDE PANEL inject context:'+context.test)
}

  
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
const showTips=computed(() => {
  return !(
        props.modelValue &&
        props.modelValue.length > 0
      ) && context.mode.value=='edit';
})
//
function handleDateChange(data:Array<any>){
  // console.log('~!!!!!!!!!!!!!!!')
  //console.log(JSON.stringify(data))


    emit('update:modelValue',data)
   // console.log(JSON.stringify(props.modelValue))
}

// function test1(){
//   console.log(arguments)
// }

</script>

<template>


    <draggable :modelValue="modelValue"  @update:modelValue="handleDateChange"   group="components" item-key="key" class="wrap-group" animation="300" ghostClass="itemGhost"
    :disabled="context.mode.value!='edit'" style="min-height:2px;">
      <template #header>
        <div v-show="showTips" style="min-height:2px;min-width:128px;background-color:#E0E0E0;">Please drag the component from pallet and drop here</div>
      </template>

      <template #item="{ element }">
        <Wrap :data="element" :slotParaStack="slotParaStack"></Wrap>
      </template>
    </draggable>

 

</template>


<style lang="scss" scoped>
.wrap-group {
  min-height: 32px;
  // background-color: #00ffff;
 // border: 1px solid #ff0000;
}

// .wrap-group:hovor {
//  // border: 1px solid #ff0000;
// }
</style>