<template>
     <el-tooltip
        effect="light"
        :content="config.description"
        placement="bottom-start"
      >

    <span class="pallet-item">
      <el-icon class="icon">
        <component :is="config.icon"/>
      </el-icon>
      <span class="text">{{ config.name }}</span>
    </span>
  </el-tooltip>
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


