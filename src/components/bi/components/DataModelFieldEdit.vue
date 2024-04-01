<template>
    <lc-icon icon="mdiSquareEditOutline" size="1.2em" color="#A9A9A9" style="margin-right:1px"
        @click="dialogVisible = true">
    </lc-icon>

    <el-dialog v-model="dialogVisible" title="编辑字段" width="50%" :append-to-body="true" @close="handleConfirm">

        
        <!-- <DataModelFieldEditFilter v-if="props.option.filterMode" v-model="modelValue" :prop="$props.prop" :column="props.column" :option="props.option" ></DataModelFieldEditFilter> -->
        <!-- <DataModelFieldEditNormal v-else v-model="modelValue" :column="props.column" :prop="$props.prop" :option="props.option"></DataModelFieldEditNormal> -->

        <component :is="editComponent" v-model="modelValue" :prop="$props.prop" :column="props.column" :option="props.option" :modelConfig="props.modelConfig"></component>

    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useVModels } from '@vueuse/core'
import DataModelFieldEditNormal from './DataModelFieldEditNormal.vue'
//modelVlaue is the single configuration of one dimension/metric/filter
const props = defineProps(['modelValue','modelConfig','column','prop', 'option'])
const emit = defineEmits(['update:modelValue'])

//
const { modelValue } =useVModels(props, emit)
//whether menu is shown
const dialogVisible = ref(false)
//
const editComponent=computed(()=>{
    if(props.option.editComponent){
        // console.log('return',props.option.editComponent)
        return props.option.editComponent
    }else{
        // console.log('return default',DataModelFieldEditNormal)
        //Default editor
        return DataModelFieldEditNormal
    }
})
//
function handleConfirm() {
    //In fact ,it is unnecessary!
    emit('update:modelValue', modelValue?.value)
    // //
    // dialogVisible.value = false
}
</script>