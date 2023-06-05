<template>
  <div>
    <el-button @click="callTest">TEST</el-button>
    <Parent data="hello"  @test="test"></Parent>
    <Parent data="world"></Parent>
  </div>
</template>

<script setup lang="ts">
import Parent from './Parent.vue'
import useFunctionRepository from '@/functionRepository/index'

function test(){
 console.log(arguments) 
}
function callTest(){
  //const str="{'name':'Jamie','age':123}"
//   const str='[{"result":true,"count":42},{"result":false,"count":142}]';
//   const obj=JSON.parse(str,(k,v) => {
//   //   console.log('@@@@@@@')
//   // console.log(k);
//   // console.log(v);
//   return v ;
// })
//   console.log(obj)
  const repo=useTestRepository()
  const a1=repo.get('a1')
  if(typeof a1=='function'){
  a1()
}else{
  console.log('a1 is not available')
}
}

</script>

<style scoped></style>
