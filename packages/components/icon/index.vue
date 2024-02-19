<template>
    <el-tooltip
        effect="light"
		:disabled="!props.tooltip"
        :raw-content="true"
        :content="props.tooltip"
        placement="bottom"
      >
    <i class="lc-icon" :style="styleObject" aria-hidden="true"  v-bind="$attrs" @click="handleClick">
        <svg class="lc-icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path :d="all[toHump(props.icon)]"></path>
        </svg>
    </i>
    </el-tooltip>
</template>
<script setup lang="ts">
import {reactive} from 'vue'
import * as all from '@mdi/js'
import {toHump} from './iconUtil'

const predefinedSize={'x-small':'1em',small:'1.25em',medium:'1.5em',large:'1.75em','x-large':'2em'}
const props = defineProps<{
    icon?: String,
    color?: String,
    size?: String,
    tooltip?:String,
}>()

const emit = defineEmits<{
  (e: 'click', data: Object): void
}>()

const styleObject = reactive({
  color: props.color||'',
  fontSize: props.size?predefinedSize[props.size]||props.size:'medium'
})

//el-tooltip will override the click event,so we raise event here
function handleClick(event){

    emit('click',event)
    // event.preventDefault();
    //   event.stopPropagation();
}   
</script>


<style scoped>


.lc-icon {
    --v-icon-size-multiplier: 1;
    align-items: center;
    display: inline-flex;
    font-feature-settings: "liga";
    height: 1em;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    position: relative;
    text-indent: 0;
    user-select: none;
    vertical-align: middle;
    width: 1em;
}

.lc-icon_svg {
    fill: currentColor;
    width: 100%;
    height: 100%;
}
</style>
  