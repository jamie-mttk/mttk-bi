<template>
  <el-link type="default" :underline="false" @click='handleTitleClicked'>
    <span class="lc-main-title">{{ title }}</span></el-link>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'

//
const context = inject('context')
function handleTitleClicked() {
  //Clear current choosed to show page config
  context.choosedManager.set(undefined)
}

//Report title
const title = computed(() => {
  let pageTitle = context.codeManager.getCode().name
  if (!pageTitle) {
    return 'Name is not set'
  }
  if (context.codeManager.dirty.value) {
    pageTitle = pageTitle + '---Modified'
  }
  //
  return pageTitle
})

</script>