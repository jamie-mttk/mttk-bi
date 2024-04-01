<script setup lang="ts">
import { ref } from 'vue'

function test(){
  console.log('200px',parseStyleValue('200px'))
  console.log('20abc3px',parseStyleValue('20abc3px'))
  console.log('70%',parseStyleValue('70%'))
}
function parseStyleValue(styleText){
  if(!styleText || typeof styleText!='string' || !styleText.endsWith('px')||styleText.length<=2){
    return undefined
  }
  //
  const value=styleText.substring(0,styleText.length-2)
  // console.log(value,isNUmber(value),parseInt(value))
  if(!isNUmber(value)){
    //please note: parseFloat(20abc4 ) will return 20,so we should check whther it is a number first
    return undefined
  }
  //
  return parseFloat((value))
}

function isNUmber(num) {
	return /^[0-9]+.?[0-9]*$/.test(num);
}
</script>

<template>
  <div><el-button @click="test">TEST</el-button></div>
</template>