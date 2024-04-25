<template>
    <el-dialog v-model="modelValue" :title="$t('bi.plugin.modelEditor.single.fieldEditor.expression')" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">

        <el-form ref="addExpressionFormRef" :model="data" label-width="100px">

            <el-form-item :label="$t('_._.name')" prop="label" required>
                <el-input v-model="data.label" />
            </el-form-item>
            <el-form-item :label="$t('bi.plugin.modelEditor.single.fieldEditor.expression')" prop="expression" required>
                <el-input v-model="data.expression" />
            </el-form-item>
            <el-form-item :label="$t('bi.plugin.modelEditor.single.fieldEditor.dataType')" prop="dataType" required>
                <el-select v-model="data.dataType">
                    <el-option v-for="type in dataTypeList" :key="type.value" :label="type.label" :value="type.value" />

                </el-select>
             
            </el-form-item>
            <el-form-item :label="$t('bi.plugin.modelEditor.single.fieldEditor.entity')" prop="entities">
                    <el-select v-model="data.entities" multiple>
                        <el-option v-for="e in model.entities" :key="e.key" :label="e.name" :value="e.key" />
                    </el-select>
                </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modelValue = false">{{$t('_._.cancel')}}</el-button>
                <el-button type="primary" @click="handleAddExpression">
                    {{$t('_._.ok')}}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, } from 'vue'

import { dataTypeList } from '../../../../data'

const props = defineProps([ 'model', 'callback'])

//

const modelValue=defineModel('modelValue')
const data=defineModel('data')
//
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