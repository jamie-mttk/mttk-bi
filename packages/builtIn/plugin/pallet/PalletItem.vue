<template>
     <el-tooltip
        effect="light"
        :content="config.description"
        placement="bottom-start"
        v-if="!!config.description"
      >

    <span class="pallet-item">
      <lc-icon :icon="config.icon" size="x-large"></lc-icon>
      <span class="text">{{ config.name }}</span>
    </span>
  </el-tooltip>
  <span v-else class="pallet-item">
      <lc-icon :icon="config.icon" size="x-large"></lc-icon>
      <span class="text">{{ config.name }}</span>
    </span>
</template>

<script setup lang="ts">
//
defineProps({
  config:{
    type:Object,
    required: true,
    default() {
      return {}
    }
  },
})


</script>


