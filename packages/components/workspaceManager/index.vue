<template>

  <div>
    <el-container>
      <el-header :height="32"  style="padding:0px;"><Top @action="handleAction"></Top></el-header>
      <el-main style="padding:0px;">
       <component :is="componentThis"></component>
      
      </el-main>
    </el-container>
  </div>




</template>


<script setup lang="ts">
import {ref} from 'vue'
import Top from '../top/index.vue'
import AppManager from '../appManager/index.vue'

//
const componentThis=ref(AppManager)
//
function handleAction(comp){

  componentThis.value=comp
}

</script>

<style></style>