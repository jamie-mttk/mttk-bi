<template>
    <div v-if="isHide"  style="margin:10px 0 0 0;color:var(--el-color-primary)">
        <lcIcon icon="mdiDotsVertical" size="large" tooltip="Click to expand left panel" @click="isHide=false"></lcIcon>
    </div>
    <div v-else style="width:256px;">
        <el-button plain style="width:100%;" @click="isHide=true">Click to hide the panel
        <template #icon>
            <lcIcon icon="mdiMenuLeftOutline"></lcIcon>
       
        </template></el-button>
        <MttkWrapComp :config="configLeft"></MttkWrapComp>
    </div>
</template>
<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import lcIcon from '@/components/icon/index.vue'
import { buildLeft } from './buildLeft'

const context = inject('context')
//Whether it is shown
const isHide = ref(false)
//
const configLeft = buildLeft(context)
</script>