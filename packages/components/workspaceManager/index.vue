<template>
  <el-tabs  type="border-card" v-model="tabSelcted" >
    <el-tab-pane label="Applications" name="app"><AppManager></AppManager></el-tab-pane>
    <el-tab-pane label="Page widget" name="widget"><PageWidgetManager></PageWidgetManager></el-tab-pane>
</el-tabs>
  </template>
  
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import AppManager from '../appManager/index.vue'
  import PageWidgetManager from '../pageWidgetManager/index.vue'

  const tabSelcted = ref('app')
  
  </script>
  <style ></style>