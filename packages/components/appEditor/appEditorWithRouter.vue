<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue'



import AppEditor from './index.vue'
//
const globalContext = inject('globalContext')
//
function handleReturn(){
    globalContext.router.push('/')
}
//


</script>

<template>
  <AppEditor :modelValue=" globalContext.router.currentRoute.value.params.app"  @return="handleReturn"></AppEditor>
</template>

<style></style>
