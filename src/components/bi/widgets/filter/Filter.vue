<template>
    <div style="margin:10px;">
        <!-- {{ modelValue }}<br>


        <el-form :model="modelValue" :inline="true" size="small" label-width="80px" class="el-row bi-filter-form">


            <el-form-item :label="c.label" v-for="c in props.config.filter || []" :key="c.key" class="el-col el-col-4">
                <el-input v-model="modelValue[c.key]" />
            </el-form-item>


            <el-form-item v-if="props.config.showButton" class="el-col el-col-4">
                <el-button type="primary" @click="startQuery">开始查询</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider> -->
        <MttkWrapComp :config=result></MttkWrapComp>

    </div>
</template>
<script lang="ts" setup>
import { ref, inject, reactive, computed } from 'vue'
import build from './filterUtil'
import { useVModels } from '@vueuse/core'
//
const props = defineProps(['modelValue', 'config'])
const emit = defineEmits(['update:modelValue'])
//
//
// const { modelValue } = useVModels(props, emit)
const modelValue = reactive(props.modelValue)
//

//
const result = computed(() => build(modelValue, props.config, function (force) {
    return function () {
        if (!force && props.config.showButton) {
            //This means it is triggered from input/select/etc. 
            //Since button is shown, ignore this trigger
            //console.log('query is triggerd but ignored')
            return
        }
        //
        startQuery();
    }
}))
//
// console.log(result)
//
const context=inject('context')
//
function startQuery() {
    context.mitt.emit('bi_filter_reload',props.config.dataModel)
}

</script>
<style lang="scss" >
.bi-filter-form {
    .el-form-item__label {
        padding: 0 6px 0 0;
    }

    .el-form-item {
        margin-right: 0 !important;
        padding-right: 12px;
        margin-bottom: 8px;
    }
}

.bi-filter-form .el-input-number .el-input__inner {

    text-align: right;

}
</style>