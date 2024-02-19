<template>
  <el-button @click="test1">TEST 1</el-button>
  <el-button @click="test2">TEST 2</el-button>
  <el-button @click="test3">TEST 3</el-button>

</template>

<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'

console.log('1.开始创建并执行 Promise')
const p=new Promise(function(resolve, reject) {
  console.log('2.由于创建会立即执行，所以会立即执行到本行')
  setTimeout(()=>{ // 模拟异步请求
    console.log('4. 1s之期已到,开始执行异步操作')
    if (true) {
        // 一般我们符合预期的结果时调用 resolve()，会在 .then 中继续执行
        resolve('成功')
    } else {
        // 不符合预期时调用 reject()，会在 .catch 中继续执行
        reject('不符合预期')
    }
  }, 5000)
})
function test1(){
p.then((res)=>{
  console.log('5.调用了then,接收数据:' + res)
}).catch((error)=>{
  console.log('5.调用了catch,错误信息:' + error)
})
console.log('3.本行为同步操作，所以先于 Promise 内的异步操作(setTimeout)')
}
console.log('~~~~~~~~~~~~~',typeof p)
async function test2(){
  const r=await p
  console.log('RESULT',r)
}
const ccc = computedAsync(
  async () => {
    return await p
  },
  null, // initial state
)
console.log('111',ccc.value)
function test3(){
  console.log('222',ccc.value)
}
</script>
