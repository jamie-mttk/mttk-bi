<template>
  <el-button @click="test">TEST</el-button>
  <PageDesign :modelValue="code" @return="handleReturn"  @save="handleSave"  @deploy="handleDeploy"></PageDesign>
</template>
  
<script lang="ts" setup>
import {ref} from 'vue'
import { code1,code2 } from './data'
import PageDesign from '@/pageDesign/index.vue'
//
const code=ref(code1)
//
function handleReturn(){
  alert('return is called')
}
function handleSave(){
  alert('save is called')
}
function handleDeploy(){
  alert('deploy is called')
}
//
function test(){
  //code.value=code2
  var a = [1, 2, 3, 4, 5]
a.splice(5, 0, 99)
console.log(a) // [1, 2, 'aaa', 4, 5]
}
</script>
  