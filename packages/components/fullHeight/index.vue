<template>
    <div ref="fullHeightRef" :style="styleFullHeight">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'
//Sometime, it need some gap ,otherwise the height may be too high
const props=defineProps(['gap'])
//
const fullHeightRef = ref(null)
//Get the top of the component
const { top } = useElementBounding(fullHeightRef)
//Get window height
const { height } = useWindowSize()
const styleFullHeight = computed(() => {
    // console.log('evaled', (height.value - top.value -(props.gap||0)) + 'px')
    return { width:'100%', height: (height.value - top.value -(props.gap||0) ) + 'px' }
})
</script>