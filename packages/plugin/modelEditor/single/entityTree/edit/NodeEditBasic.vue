<template>
    <el-card :header=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.header')" shadow="hover" style="height:100%;">

        <el-form ref="nodeEditBasicFormRef" :model="modelValue" label-width="100px">
            <el-form-item :label=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.type')" prop="type">
                <el-input v-model="modelValue.type" :disabled="true" />
            </el-form-item>
            <el-form-item :label=" $t('_._.name')" prop="name" required>
                <el-input v-model="modelValue.name" />
            </el-form-item>
            <el-form-item :label=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.alias')" prop="alias" required :rules=" {pattern: /^[a-zA-Z]\w*$/, message:  $t('bi.plugin.modelEditor.single.entityTree.edit.basic.aliasRuleError'), trigger: 'blur' }">
                <el-input v-model="modelValue.alias" />
            </el-form-item>
            <el-form-item :label=" $t('_._.description')" prop="description">
                <el-input v-model="modelValue.description" />
            </el-form-item>

            <div v-if="modelValue.type != 'SQL'">
                <el-form-item label="Schema" prop="schema">
                    <el-input :modelValue="modelValue.schema||modelValue.catalog" :disabled="true" />
                </el-form-item>
                <el-form-item :label=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.tableOrView')" prop="table">
                    <el-input v-model="modelValue.table" :disabled="true" />
                </el-form-item>
                <el-form-item :label=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.filter')" prop="filter">
                    <el-input v-model="modelValue.filter" />
                </el-form-item>
                <el-form-item :label=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.sort')" prop="sort">
                    <el-input v-model="modelValue.sort" />
                </el-form-item>
            </div>
            <div v-if="modelValue.type == 'SQL'">
                <el-form-item :label=" $t('bi.plugin.modelEditor.single.entityTree.edit.basic.sql')" prop="sql" required>
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