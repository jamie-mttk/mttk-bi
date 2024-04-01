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
import { inject,  computed } from 'vue'
import build from './filterUtil'

//
const model = defineModel()
const props = defineProps([ 'config','fullConfig'])


//
const context=inject('context')
//
const result = computed(() => build(model, props.config,props.fullConfig,context))
//
// console.log(result)



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