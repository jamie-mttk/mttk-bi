<template>
    <el-dialog v-model="modelValue" :title="$t('bi.plugin.modelEditor.single.fieldEditor.addHierarchy')" width="30%"  :close-on-click-modal="false" :close-on-press-escape="false"  @open="data = {}">
        <el-form ref="addHierarchyFormRef" :model="data" label-width="80px">

            <el-form-item :label="$t('_._.name')" prop="label" required>
                <el-input v-model="data.label" />
            </el-form-item>
          
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modelValue = false">{{ $t('_._.cancel') }}</el-button>
                <el-button type="primary" @click="handleAddHierarchy">
                    {{ $t('_._.ok') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref,  } from 'vue'
import { useVModels } from '@vueuse/core'
import {tools} from 'mttk-lowcode-engine'
const props = defineProps(['modelValue', 'callback'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//FORM DATA
const data = ref({})
//refer to form
const addHierarchyFormRef = ref(null)
//
function handleAddHierarchy() {
    addHierarchyFormRef.value.validate((valid) => {
    if (!valid) {
        return
    } 
    //
    data.value.key='h'+tools.createUniqueString()
    data.value.type='hierarchy'
    data.value.children=[]
    //
    props.callback(data.value)
    //Close
    modelValue.value=false
  })
}
</script>