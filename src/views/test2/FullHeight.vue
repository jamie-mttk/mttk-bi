<template>
    <div ref="fullHeightRef" :style="styleFullHeight">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'
//
const fullHeightRef = ref(null)
//Get the top of the component
const { top } = useElementBounding(fullHeightRef)
//Get window height
const { height } = useWindowSize()
const styleFullHeight = computed(() => {
    return { 'background-color': 'red',width:'100%', height: (height.value - top.value -32 ) + 'px' }
})
</script>