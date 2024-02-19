<template>

  <b-ace-editor v-model="code" lang="json" width="100%" height="80vh"  :font-size="14"></b-ace-editor>

</template>
  
<script lang="ts" setup>
import {computed, inject } from 'vue'

//
const context = inject('context')
//
const code = computed(() => JSON.stringify(context.codeManager.getCode(), null, 2))
</script>
<style scoped></style>
  