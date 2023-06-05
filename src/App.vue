<script setup lang="ts">
import {provide,onMounted} from 'vue'
import { RouterView } from 'vue-router'
import createGlobalContext from '@/context/globalContext/index'
import {app} from './main'
//Create global context

const globalContext=createGlobalContext(import.meta.env.VITE_APP_API_BASE,app)
provide('globalContext',globalContext)

</script>

<template>

      <RouterView />

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.navLink {
  margin: 10px;
}
</style>
