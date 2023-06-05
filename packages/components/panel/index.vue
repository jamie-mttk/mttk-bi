<script setup lang="ts">
import {ref,onMounted,computed,inject, provide,isRef,isReactive,toRaw,unref  } from 'vue'
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
})

const emit = defineEmits<{
  (e: 'update:modelValue', value:Array<any>): void
}>()
//
//const context =inject('context')
let context = props.pageContext

  
if(context){
  //provide so the children components can inject,this will happedn if Panel is the root component
  //context is reactive,so toRaw is used
  context=toRaw(unref(context))
  provide('context',context)
}else{
  context =inject('context')
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
  // console.log(JSON.stringify(data))


    emit('update:modelValue',data)
   // console.log(JSON.stringify(props.modelValue))
}

// function test1(){
//   console.log(arguments)
// }

</script>

<template>
  <div style="min-height: 12px;" >

    <draggable :modelValue="modelValue"  @update:modelValue="handleDateChange"   group="components" item-key="key" class="wrap-group" animation="300" ghostClass="itemGhost"
    :disabled="context.mode.value!='edit'" >
      <template #header>
        <div v-show="showTips" style="min-height:2px;min-width:128px;background-color:var(--el-fill-color);">Please drag the component from pallet and drop here</div>
      </template>

      <template #item="{ element }">
        <Wrap :data="element" :slotParaStack="slotParaStack"></Wrap>
      </template>
    </draggable>

    <!-- <div v-for="element in modelValue" >
        <Wrap :data="element"></Wrap>
    </div> -->

  </div>
</template>


<style lang="scss" scoped>
.wrap-group {
  min-height: 32px;
  // background-color: #00ffff;
 // border: 1px solid #ff0000;
}

.wrap-group:hovor {
 // border: 1px solid #ff0000;
}
</style>