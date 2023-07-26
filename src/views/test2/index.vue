<template>
  {{ configStd }}
  <el-button type="primary" @click="callTest">TEST</el-button>
  <CompWrap :config="config" :key="mykey"></CompWrap>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue'
import { formValue, config1, config2, configCard, myClasses,configTransform ,configFormItem} from './data'
const config = ref(configFormItem)
const mykey = ref('11')



const ctx={props:{config:configFormItem}}

var configStd = computed(() => standardizedConfig(), 
// {
//     onTrack(e) {
//       //debugger;
//       console.log('@@@onTrack',e)
//     },
//     onTrigger(e) {
//       console.log('@@@onTrigger',e)
//     },
//   }
  );

function callTest() {
  // mykey.value="22"
  // config.value=config2
  //myClasses.value = 'class-yellow'
  configCard.props.header='CHANGE ME'
  //
  console.log(configCard)
}

function standardizedConfig(){
  return ctx.props.config;
}

</script>

<style>
.class-pink{
  color:pink
}
.class-red{
  color:red 
}
.class-yellow{
  color:yellow
}
</style>
