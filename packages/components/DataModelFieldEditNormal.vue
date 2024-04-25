<template>
  <el-form :model="modelValue" label-width="180px" label-position="right">
    <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.label')">
      <el-input v-model="modelValue['label']" required />
    </el-form-item>

    <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.sort')">
      <el-radio-group v-model="modelValue['_sort']">
        <el-radio-button value="NONE">{{ $t('bi.components.dataModelFieldEditNormal.sort_none') }}</el-radio-button>
        <el-radio-button value="ASC">{{ $t('bi.components.dataModelFieldEditNormal.sort_asc') }}</el-radio-button>
        <el-radio-button value="DESC">{{ $t('bi.components.dataModelFieldEditNormal.sort_desc') }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <div v-show="belongTo('metric')">
      <el-form-item :label=" $t('bi.components.dataModelFieldEditNormal.aggregation') ">
        <el-select v-model="modelValue['_aggregation']">
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_none')" value="_NONE" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_sum')" value="SUM" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_avg')" value="AVG" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_count')" value="COUNT" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_count_distinct')" value="_COUNT_DISTINCT" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_max')" value="MAX" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.aggregation_min')" value="MIN" />
          <!-- <el-option label="自定义" value="_CUSTOMIZE" /> -->
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.aggregation_customize')" v-show="modelValue['_aggregation'] == '_CUSTOMIZE'">
        <el-input v-model="modelValue['_aggregation_customize']"></el-input>
      </el-form-item>
    </div>
    <div
      v-show="
        (column.dataType == 'datetime' || column.dataType == 'time') 
        &&belongTo('metric', 'dimension','drilling')
      "
    >
      <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_datetime')">
        <el-select v-model="modelValue['_format_datetime']">
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_none')" value="none" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_y')" value="y" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_yq')" value="yq" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_ym')" value="ym" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_ymd')" value="ymd" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_h')" value="h" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_datetime_hm')" value="hm" />
        </el-select>
      </el-form-item>

    </div>
    <div
      v-show="
        ((column.dataType == 'integer' || column.dataType == 'number') ||
        ((modelValue['_aggregation']||'_NONE')!='_NONE'))
        && belongTo('metric', 'dimension')
      "
    >

      <!-- Number format -->
      <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter')">
        <el-select v-model="modelValue['_format_number_converter']">
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_none')" value="none" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_ch_auto')" value="ch_auto" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_en_auto')" value="en_auto" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_percentage')" value="percentage" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_ch_qian')" value="ch_qian" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_ch_wan')" value="ch_wan" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_ch_baiwan')" value="ch_baiwan" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_ch_qianwan')" value="ch_qianwan" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_ch_yi')" value="ch_yi" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_en_k')" value="en_k" />
          <el-option :label="$t('bi.components.dataModelFieldEditNormal.format_number_converter_en_m')" value="en_m" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_number_point')">
        <el-input-number v-model="modelValue['_format_number_point']" :min="0" :max="20" />
      </el-form-item>

      <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_number_thousandth_mark')">
        <el-switch
          v-model="modelValue['_format_number_thousandth_mark']"
          active-text=""
        />
      </el-form-item>
      <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_number_negative')">
        <el-select v-model="modelValue['_format_number_negative']">
          <el-option label="-1234" value="none" />
          <el-option label="(1234)" value="bracketed" />
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_number_prefix')">
            <el-input v-model="modelValue['_format_number_prefix']"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item :label="$t('bi.components.dataModelFieldEditNormal.format_number_suffix')" label-width="60px">
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
