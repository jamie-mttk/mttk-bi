<template>
    <MttkWrapComp :config="config"></MttkWrapComp>
</template>

<script lang="ts" setup>
import {inject} from 'vue'
//
const globalContext = inject('globalContext')

//
const config=function(){

    //Find all login plugin
    const plugins=globalContext.pluginManager.findByEntry('login')
    if(!plugins||plugins.length==0){
        return {'~':'el-empty','description':'No login plugin found!'}
    }else{
        //Get last one
        const p=plugins[plugins.length-1]
        return p.ui
    }
}

</script>

<style scoped>

</style>