<template>
    <el-card header="基本信息" shadow="hover" style="height:100%;">

        <el-form ref="nodeEditBasicFormRef" :model="modelValue" label-width="80px">
            <el-form-item label="类型" prop="type">
                <el-input v-model="modelValue.type" :disabled="true" />
            </el-form-item>
            <el-form-item label="名称" prop="name" required>
                <el-input v-model="modelValue.name" />
            </el-form-item>
            <el-form-item label="别名" prop="alias" required>
                <el-input v-model="modelValue.alias" />
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="modelValue.description" />
            </el-form-item>

            <div v-if="modelValue.type != 'SQL'">
                <el-form-item label="Schema" prop="schema">
                    <el-input :modelValue="modelValue.schema||modelValue.catalog" :disabled="true" />
                </el-form-item>
                <el-form-item label="表格/视图" prop="table">
                    <el-input v-model="modelValue.table" :disabled="true" />
                </el-form-item>
                <el-form-item label="过滤" prop="filter">
                    <el-input v-model="modelValue.filter" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="modelValue.sort" />
                </el-form-item>
            </div>
            <div v-if="modelValue.type == 'SQL'">
                <el-form-item label="SQL语句" prop="sql" required>
                    <el-input v-model="modelValue.sql" :rows="8" type="textarea" />
                </el-form-item>
            </div>
        </el-form>
    </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import { useVModels } from '@vueuse/core'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
const nodeEditBasicFormRef=ref()
const validateFunc=function(){return nodeEditBasicFormRef.value.validate}

defineExpose({ validateFunc })

</script>