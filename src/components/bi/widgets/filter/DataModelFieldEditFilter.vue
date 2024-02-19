<template>
    <el-form :model="modelValue" label-width="100px" label-position="left">
        <el-form-item label="标题">
            <el-input v-model="modelValue['label']" required />
        </el-form-item>


        <el-form-item label="展示类型">
            <el-select v-model="modelValue['_ui_mode']">
                <el-option label="输入" value="input" v-if="column.dataType == 'string'"/>
                <el-option label="选择框" value="select" v-if="column.dataType == 'string'"/>
                <el-option label="数字输入" value="input-number" v-if="column.dataType == 'integer' || column.dataType == 'number'"/>
                <el-option label="日期" value="datetime" v-if="column.dataType == 'datetime'"/>
                <el-option label="时间" value="time" v-if="column.dataType == 'time'"/>
            </el-select>
        </el-form-item>
        <el-form-item label="文本匹配方式"  v-if="modelValue['_ui_mode'] == 'input'">
            <el-select v-model="modelValue['_ui_input_match']">
                <el-option label="精确匹配" value="="/>
                <el-option label="模糊匹配" value="LIKE"/>
                <el-option label="界面选择" value="_CUSTOMIZE"/>           
            </el-select>
        </el-form-item>
        <el-form-item label="支持多选"  v-if="modelValue['_ui_mode'] == 'select'">
            <el-switch v-model="modelValue['_ui_select_multiple']"></el-switch>
        </el-form-item>
        <el-form-item label="加载时机"  v-if="modelValue['_ui_mode'] == 'select'">
            <el-select v-model="modelValue['_ui_select_load']">
                <el-option label="进入界面后立刻加载" value="preload"/>
                <el-option label="输入过滤条件后加载" value="filter_load"/>
            </el-select>
        </el-form-item>
        <el-form-item label="数字匹配方式"  v-if="modelValue['_ui_mode'] == 'input-number'">
            <el-select v-model="modelValue['_ui_input-number_match']">
                <el-option label="相等" value="="/>
                <el-option label="大于" value=">"/>
                <el-option label="大于等于" value=">="/>
                <el-option label="小于" value="<"/>
                <el-option label="小于等于" value="<="/>
                <el-option label="范围区间" value="_RANGE"/>
                <el-option label="界面选择" value="_CUSTOMIZE"/>           
            </el-select>
        </el-form-item>
        <el-form-item label="日期匹配方式"  v-if="modelValue['_ui_mode'] == 'datetime'">
            <el-select v-model="modelValue['_ui_input-datetime_match']">
                <el-option label="相等" value="="/>
                <el-option label="大于" value=">"/>
                <el-option label="大于等于" value=">="/>
                <el-option label="小于" value="<"/>
                <el-option label="小于等于" value="<="/>
                <el-option label="范围区间" value="_RANGE"/>
                <el-option label="界面选择" value="_CUSTOMIZE"/>           
            </el-select>
        </el-form-item>
        <el-form-item label="时间匹配方式"  v-if="modelValue['_ui_mode'] == 'time'">
            <el-select v-model="modelValue['_ui_input-time_match']">
                <el-option label="相等" value="="/>
                <el-option label="大于" value=">"/>
                <el-option label="大于等于" value=">="/>
                <el-option label="小于" value="<"/>
                <el-option label="小于等于" value="<="/>
                <el-option label="范围区间" value="_RANGE"/>
                <el-option label="界面选择" value="_CUSTOMIZE"/>           
            </el-select>
        </el-form-item>

        <el-form-item label="占用2格宽度" >
            <el-select v-model="modelValue['_colSpanRate']">
                <el-option label="自动判断" value="auto"/>
                <el-option label="是" value="yes"/>
                <el-option label="否" value="no"/>
        
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { useVModels } from '@vueuse/core'

const props = defineProps(['modelValue', 'column','prop', 'option'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)


</script>