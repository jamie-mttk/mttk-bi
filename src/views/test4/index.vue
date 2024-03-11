<template>
  flag:{{ flag }}<br />
  <el-button @click="test11">TEST 1</el-button>
  <el-button @click="test22">TEST 2</el-button>
  <MttkWrapComp :config="buildConfig()"></MttkWrapComp>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

//
const flag = ref(false)

function test11() {
  flag.value = !flag.value
}

function buildConfig() {
  //
  console.log('I AM BUILD' + new Date())
  //

  return {
    '~': 'div',
    class: computed(() => {
      const cls = ['hello']
      if (flag.value) {
        cls.push('hello-active')
      }
      return cls
    })
  }
}
</script>

<style>
.hello {
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
.hello-active {
  background-color: blue;
}
</style>
