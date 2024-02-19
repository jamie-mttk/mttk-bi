<template>
<el-form :model="modelValue" label-width="100px" label-position="left">
             <el-form-item label="标题">
                    <el-input v-model="modelValue['label']" required />
                </el-form-item>

            <!-- <el-form-item label="排序">
                <el-radio-group v-model="modelValue['_sort']">
                    <el-radio-button label="NONE">不排序</el-radio-button>
                    <el-radio-button label="ASC">升序</el-radio-button>
                    <el-radio-button label="DESC">降序</el-radio-button>
                </el-radio-group>
            </el-form-item> -->
            <div v-show="belongTo('metric')">
                <el-form-item label="聚合">
                    <el-select v-model="modelValue['_aggregation']">
                        <el-option label="无" value="_NONE" />
                        <el-option label="求和" value="SUM" />
                        <el-option label="平均值" value="AVG" />
                        <el-option label="计数" value="COUNT" />
                        <el-option label="去重计数" value="_COUNT_DISTINCT" />
                        <el-option label="最大值" value="MAX" />
                        <el-option label="最小值" value="MIN" />
                        <!-- <el-option label="自定义" value="_CUSTOMIZE" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="自定义聚合" v-show="modelValue['_aggregation'] == '_CUSTOMIZE'">
                    <el-input v-model="modelValue['_aggregation_customize']"></el-input>
                </el-form-item>
            </div>
            <div v-show="(column.dataType == 'datetime' || column.dataType == 'time') && belongTo('metric','dimension')">
                <el-form-item label="日期时间格式">
                    <el-select v-model="modelValue['_format_datetime']">
                        <el-option label="2023-12-01 12:13:14" value="yyyy-MM-dd HH:mm:ss" />
                        <el-option label="2023-12-01" value="yyyy-MM-dd" />
                        <el-option label="12:13:14" value="HH:mm:ss" />
                        <el-option label="自定义" value="_CUSTOMIZE" />
                    </el-select>
                </el-form-item>
                <el-form-item label="自定义日期时间" v-show="modelValue['_format_datetime'] == '_CUSTOMIZE'">
                    <el-input v-model="modelValue['_format_datetime_customize']"></el-input>
                </el-form-item>
            </div>
            <div v-show="(column.dataType == 'integer' || column.dataType == 'number')&& belongTo('metric','dimension')">
                <!-- Number format -->
                <el-form-item label="小数点后位数">
                    <el-input-number v-model="modelValue['_format_number_point']" :min="0" :max="10" />

                </el-form-item>
                <el-form-item label="">
                    <el-switch v-model="modelValue['_format_number_point_fixed']"
                        :active-text="'小数点后强制显示 ' + (modelValue['_format_number_point'] || '0') + ' 位'" />
                </el-form-item>
                <el-form-item label="">
                    <el-switch v-model="modelValue['_format_number_point_mark']" active-text="显示千分符" />
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12"> <el-form-item label="前缀">
                            <el-input v-model="modelValue['_format_number_point_prefix']"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="12"> <el-form-item label="后缀" label-width="60px">
                            <el-input v-model="modelValue['_format_number_point_suffix']"></el-input>
                        </el-form-item></el-col>
                </el-row>
            </div>
        </el-form>    
</template>

<script lang="ts" setup>
import { useVModels } from '@vueuse/core'

const props = defineProps(['modelValue','column', 'prop','option'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } =useVModels(props, emit)
//
function belongTo(...categories:string[]){
    // console.log(props.column,props.prop)
    for(const c of categories){
        // console.log((props.prop||'').startsWith(c),c,props.prop,categories)
        if((props.prop||'').startsWith(c)){
            return true;
        }
    }
    return false
}
</script>