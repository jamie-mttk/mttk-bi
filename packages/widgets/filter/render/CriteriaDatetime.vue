<template>
  <span style="display: inline-flex; width: 100%">
    <el-select style="flex-basis: 86px; flex-grow: 1; margin-right: 2px" v-model="modelValueMatch" clearable v-show="!c['_ui_hide_match']">
      <el-option
        v-for="item in timeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-date-picker clearable
      style="flex-basis: 0; flex-grow: 10"
      type="datetime"
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss"
      v-model="modelValueValue"
    ></el-date-picker>
    <span v-if="model[c.id + '-match'] == '_RANGE'">~</span>
    <el-date-picker clearable
      style="flex-basis: 0; flex-grow: 10"
      type="datetime"
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss"
      v-if="model[c.id + '-match'] == '_RANGE'"
      v-model="modelValueValueTo"
    ></el-date-picker>
  </span>
</template>
<script lang="ts" setup>
import { timeOptions } from '../data'
import { buildModelValue } from './filterUtil'
//modelValue is the form model value
//config is the filter config
//c is the filter item config
const model = defineModel({ type: Object })
const props = defineProps(['config', 'c'])
//
const modelValueMatch = buildModelValue(model, props.c.id + '-match')
const modelValueValue = buildModelValue(model, props.c.id)
const modelValueValueTo = buildModelValue(model, props.c.id + '-to')
</script>
