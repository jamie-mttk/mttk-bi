<template>
    <el-dialog v-model="modelValue" title="增加 计算字段" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" @open="data = {}">
        <el-form ref="addExpressionFormRef" :model="data" label-width="80px">
            <el-form-item label="字段" prop="key" required :rules="keyRules">
                <el-input v-model="data.key" />
            </el-form-item>
            <el-form-item label="名称" prop="label" required>
                <el-input v-model="data.label" />
            </el-form-item>
            <el-form-item label="表达式" prop="expression" required>
                <el-input v-model="data.expression" />
            </el-form-item>
            <el-form-item label="数据类型" prop="dataType" required>
                <el-select v-model="data.dataType">
                    <el-option v-for="type in dataTypeList" :key="type.value" :label="type.label" :value="type.value" />
      
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modelValue = false">取消</el-button>
                <el-button type="primary" @click="handleAddExpression">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useVModels } from '@vueuse/core'
import {keyRules,dataTypeList} from './data'
const props = defineProps(['modelValue', 'callback'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//FORM DATA
const data = ref({})
//refer to form
const addExpressionFormRef = ref(null)

function handleAddExpression() {
    addExpressionFormRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        //
        data.value.type = 'expression'
        //
        props.callback(data.value)
        //Close
        modelValue.value = false
    })
}
</script>