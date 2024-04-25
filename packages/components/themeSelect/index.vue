<template>
  <el-select v-model="model" placeholder="Please choose echarts theme">
    <el-option v-for="item in themes" :key="item.name" :value="item.name">
      <ThemeBar :theme="item"></ThemeBar>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import {  ref, inject } from 'vue'
import { useStorage } from '@vueuse/core'
import ThemeBar from './ThemeBar.vue'
//
const model = defineModel()
//
const globalContext = inject('globalContext')
//Here we cave the theme list to local storage to avoid load every time of chart choosed
const themes = useStorage('themeList',[])
//
if(!themes.value||themes.value.length==0){
globalContext
  .request({
    method: 'GET',
    url: 'echartsTheme/query'
  })
  .then(function (response) {
    themes.value = response.list
  })
}
</script>
