<template>
  <div>
    PARENT:<Child></Child>
  </div>
</template>
<script setup lang="ts">
import {provide} from 'vue'
import Child from './Child.vue'
//
function test(){
 console.log(arguments) 
}
//
const props = defineProps({
  data: {
    type: String,
    required: true,
    default() {
      return 'Not set'
    }
  },
})
//
provide('value',props.data)
console.log('provide:'+props.data)
</script>