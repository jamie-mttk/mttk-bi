<template>
<span style="display: inline-flex;width: 100%;">
    <el-select style="flex-basis:86px; flex-grow: 1; margin-right: 2px;" v-model="modelValueMatch" clearable v-show="!c['_ui_hide_match']">
        <el-option-group v-for="group in inputOptions" :key="group.key">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
    </el-select>

    <!-- v-if="inputHasValueOptions.includes(model[c.id + '-match'] || '')" -->
    <el-input clearable style="flex-basis:0; flex-grow: 10;" v-if="inputHasValueOptions.includes(c['_ui_input_match_init'] || '')" v-model="modelValueValue"></el-input>
</span>
</template>
<script lang="ts" setup>
import { inputOptions, inputHasValueOptions } from '../data'
import {buildModelValue} from './filterUtil'
//modelValue is the form model value
//config is the filter config
//c is the filter item config
const model = defineModel({ type: Object })
const props = defineProps([ 'config','c'])
//
const modelValueMatch=buildModelValue(model,props.c.id + '-match')
const modelValueValue=buildModelValue(model,props.c.id)
</script>