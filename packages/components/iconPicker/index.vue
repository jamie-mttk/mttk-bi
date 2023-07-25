<template>
    <el-popover :visible="visiblePopover" placement="bottom" width="40%" :teleported="true">
        <template #reference>
            <div class="icon"  :class="{ icon_empty: !props.modelValue }" @click="visiblePopover=true" v-click-outside="onClickOutside"> 
            <lc-icon size="large" :icon="props.modelValue" >
            </lc-icon>
        </div>
        </template>
        <template #default>
            <PickerList @icon-choosed="handleIconChoosed"></PickerList>
        </template>
    </el-popover>
    
</template>
  
<script lang="ts" setup>
import { ref,unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import PickerList from './pickerList.vue'
import lcIcon from '@/components/icon/index.vue'
//
let props = defineProps({
    modelValue: {
        type: String,
        required: true,
        default: ''
    },
})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
//
const visiblePopover=ref(false)


//
function handleIconChoosed(icon:string){
    emit('update:modelValue',icon)
    //
    visiblePopover.value=false
}
//
const onClickOutside = () => {
 // unref(popoverRef).popperRef?.delayHide?.()
 //alert('CLick out')
 visiblePopover.value=false
}
</script>
<style scoped lang="scss">
.icon {   
    width:2em;
    height:2em;
}
.icon_empty{
    border: 1px solid var(--el-border-color);
    border-radius: 2px;
}
</style>
  