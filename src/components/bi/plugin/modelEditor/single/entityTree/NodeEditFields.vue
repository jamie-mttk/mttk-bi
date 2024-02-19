<template>
    <el-table :data="$props.fields" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="column" label="字段"/>
        <el-table-column prop="label" label="名称"/>

    </el-table>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { useVModels } from '@vueuse/core'
const props = defineProps(['modelValue', 'fields'])
const emit = defineEmits(['update:modelValue'])

</script>