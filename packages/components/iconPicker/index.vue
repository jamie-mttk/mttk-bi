<template>
    <el-popover :visible="visiblePopover" placement="bottom" width="40%" >
        <template #reference>
            <div class="icon" @click="visiblePopover=true"> 
            <el-icon size="large" >
                <component :is="props.modelValue"></component>
            </el-icon>
        </div>
        </template>
        <template #default>
            {{ visiblePopover }}
            <PickerList @icon-choosed="handleIconChoosed" style="width:512x;"></PickerList>
        </template>
    </el-popover>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import PickerList from './pickerList.vue'

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
</script>
<style scoped lang="scss">
.icon {
    border: 1px solid var(--el-border-color);
    border-radius: 2px;
    padding:4px;
    width:2em;
    height:2em;
}
</style>
  