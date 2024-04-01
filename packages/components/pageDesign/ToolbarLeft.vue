<template>
    <!-- designer-left-dummy is used to calculate the width  class="designer-left-dummy-->
  <FullHeight :gap="8" style="border: 1px solid var(--el-border-color);" >
    <div v-if="isHide" style="margin: 10px 0 0 0; color: var(--el-color-primary)">
      <lcIcon
        icon="mdiDotsVertical"
        size="medium"
        tooltip="Click to expand left panel"
        @click="isHide = false"
      ></lcIcon>
    </div>
    <div v-else style="width: 256px; padding: 2px 4px 0 12px;">
      <el-button plain style="width: 100%" @click="isHide = true"
        >Click to hide the panel 
        <template #icon>
          <lcIcon icon="mdiMenuLeftOutline"></lcIcon> </template
      ></el-button>
      <MttkWrapComp :config="configLeft"></MttkWrapComp>
    </div>
  </FullHeight>
</template>
<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import lcIcon from '@/components/icon/index.vue'
import { buildLeft } from './buildLeft'
// import { useElementSize } from '@vueuse/core'
import FullHeight from '../fullHeight/index.vue'
const context = inject('context')
//Whether it is shown
const isHide = ref(false)
//

//
const configLeft = buildLeft(context)
</script>
