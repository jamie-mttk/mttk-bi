<template>
    <el-scrollbar ref="fullHeightRef" :style="myStyle">
        <slot></slot>
    </el-scrollbar>
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
//Use height to set scroll height does not works well,so here change to use style
//Infact height property is also changed to style in el-scrollbar implementation
const myStyle = computed(() => {
     if(props.gap==34){
      console.log('evaled',height.value , top.value, (height.value - top.value -(props.gap||0)) )
     }
     const h=height.value - top.value -(props.gap||0) 
    return {height: h+'px'}
})
</script>