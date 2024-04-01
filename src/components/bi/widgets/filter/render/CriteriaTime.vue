<template>
  <span style="display: inline-flex; width: 100%">
    <el-select style="flex-basis: 86px; flex-grow: 1; margin-right: 2px" v-model="modelValueMatch" clearable v-show="!c['_ui_hide_match']">
      <el-option
        v-for="item in datetimeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-time-picker clearable
      style="flex-basis: 0; flex-grow: 10"
      format="HH:mm:ss"
      value-format="HH:mm:ss"
      v-model="modelValueValue"
    ></el-time-picker>
    <span v-if="model[c.id + '-match'] == '_RANGE'">~</span>
    <el-time-picker clearable
      style="flex-basis: 0; flex-grow: 10"
      format="HH:mm:ss"
      value-format="HH:mm:ss"
      v-if="model[c.id + '-match'] == '_RANGE'"
      v-model="modelValueValueTo"
    ></el-time-picker>
  </span>
</template>
<script lang="ts" setup>
import { datetimeOptions } from '../data'
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
