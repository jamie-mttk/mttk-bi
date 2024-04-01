<template>
    <div class="toolbar">
        <span class="left handle" style="padding:0">
            <lc-icon icon="mdiDrag" size="1.2em" color="#A9A9A9" style="margin-right:2px">
            </lc-icon>
           <SmartView :value="fieldLabel" :length="8"></SmartView>
            </span>
        <span class="right" style="padding:0">
            <DataModelFieldEdit v-model="$props.modelValue" :prop="$props.prop" :option="$props.option" :column="column"
            :modelConfig="props.modelConfig"></DataModelFieldEdit>

            <lc-icon icon="mdiTrashCanOutline" size="1.2em" color="#A9A9A9" style="margin-right:0px" @click="handleDelete">
            </lc-icon>
        </span>
    </div>
</template>
<script lang="ts" setup>
import {  computed, inject } from 'vue'
import DataModelFieldEdit from './DataModelFieldEdit.vue'
import SmartView from './SmartView.vue'

//modelValue is a single config of one item, for example a dimension config /a metric config or a filter config
//Later it will be call as singleConfig
const props = defineProps(['modelValue','modelConfig','prop', 'option'])
const emit = defineEmits(['delete'])
//
const dataModel = inject('dataModel')

//Column definition,return undefined if not found
const column = computed(() => {
    return findMatchColumn(dataModel.value.columns,props.modelValue.key)
})
function findMatchColumn(columns, key) {
    if(!key||!columns){
        return undefined
    }
    //
    for (const c of columns) {
        if(c.key==key){
            return c
        }
        if(c.children){
            const result=findMatchColumn(c.children,key)
            if(result){
                return result
            }
        }
    }
    //not found
    return undefined
}
//
const fieldLabel = computed(() => {
    const aggregation = props.modelValue['_aggregation']
    if (aggregation && aggregation != '_NONE') {
        if (aggregation == '_COUNT_DISTINCT') {
            return 'COUNT(DISTINCT ' +props.modelValue?.label + ')'
        } else if (aggregation == '_CUSTOMIZE') {
            return  props.modelValue?.label
        } else {
            return props.modelValue['_aggregation'] + '(' + props.modelValue?.label + ')'
        }
    } else {
        return props.modelValue?.label
    }
})
//
function handleDelete() {
    emit('delete', props.modelValue)
}



</script>
<style scoped lang="scss" >
.toolbar {

    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 32px;
    // padding: 4px;
    height: 32px;
    background-color: antiquewhite;
    border: 1px dashed blue;
    border-radius: 4px;

    .left {
        // min-width: 20%;
        // padding-left: 10px;

    }

    .right {
        padding-right: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>