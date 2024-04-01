<template>
  <el-form :model="modelValue" label-width="180px" label-position="right">
    <el-form-item label="标题">
      <el-input v-model="modelValue['label']" required />
    </el-form-item>

    <el-form-item label="排序">
      <el-radio-group v-model="modelValue['_sort']">
        <el-radio-button value="NONE">不排序</el-radio-button>
        <el-radio-button value="ASC">升序</el-radio-button>
        <el-radio-button value="DESC">降序</el-radio-button>
      </el-radio-group>
    </el-form-item>
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
    <div
      v-show="
        (column.dataType == 'datetime' || column.dataType == 'time') 
        &&belongTo('metric', 'dimension','drilling')
      "
    >
      <el-form-item label="日期时间转换">
        <el-select v-model="modelValue['_format_datetime']">
          <el-option label="原始格式(2021-12-21 13:14:15)" value="none" />
          <el-option label="年份(2021)" value="y" />
          <el-option label="年季度(2021Q4)" value="yq" />
          <el-option label="年月(2021-12)" value="ym" />
          <el-option label="年月日(2021-12-21)" value="ymd" />
          <el-option label="小时(13)" value="h" />
          <el-option label="时分(13:14)" value="hm" />
        </el-select>
      </el-form-item>

    </div>
    <div
      v-show="
        ((column.dataType == 'integer' || column.dataType == 'number') ||
        (modelValue['_aggregation']||'NONE'!='NONE'))
        && belongTo('metric', 'dimension')
      "
    >
    <el-divider style="margin-top:30px;">工具提示数字显示设置</el-divider>
      <!-- Number format -->
      <el-form-item label="数据转换">
        <el-select v-model="modelValue['_format_number_converter']">
          <el-option label="无" value="none" />
          <el-option label="中文自动(万/百万/亿)" value="ch_auto" />
          <el-option label="英文自动(K/M)" value="en_auto" />
          <el-option label="百分比" value="percentage" />
          <el-option label="中文 - 千" value="ch_qian" />
          <el-option label="中文 - 万" value="ch_wan" />
          <el-option label="中文 - 百万" value="ch_baiwan" />
          <el-option label="中文 - 千万" value="ch_qianwan" />
          <el-option label="中文 - 亿" value="ch_yi" />
          <el-option label="英文 - K" value="en_k" />
          <el-option label="英文 - M" value="en_m" />
        </el-select>
      </el-form-item>

      <el-form-item label="小数位数">
        <el-input-number v-model="modelValue['_format_number_point']" :min="0" :max="20" />
      </el-form-item>

      <el-form-item label="显示千分符">
        <el-switch
          v-model="modelValue['_format_number_thousandth_mark']"
          active-text=""
        />
      </el-form-item>
      <el-form-item label="负数显示">
        <el-select v-model="modelValue['_format_number_negative']">
          <el-option label="-1234" value="none" />
          <el-option label="(1234)" value="bracketed" />
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="前缀">
            <el-input v-model="modelValue['_format_number_prefix']"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="后缀" label-width="60px">
            <el-input v-model="modelValue['_format_number_suffix']"></el-input> </el-form-item
        ></el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { useVModels } from '@vueuse/core'

const props = defineProps(['modelValue', 'column', 'prop', 'option'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
function belongTo(...categories: string[]) {
  // console.log(props.column,props.prop)
  for (const c of categories) {
    // console.log((props.prop||'').startsWith(c),c,props.prop,categories)
    if ((props.prop || '').startsWith(c)) {
      return true
    }
  }
  return false
}
</script>
