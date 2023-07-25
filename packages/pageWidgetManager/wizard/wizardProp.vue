<template>
    <div>
        <el-alert title="Choose the UI properties which will be configured in page widget." type="success"
            style="margin-bottom: 10px;" />
        <el-tree ref="uiPropTreeRef" :props="{ children: 'children', label: 'label', disabled: 'disabled', }" node-key="key"
            :data="treeData" show-checkbox :default-expanded-keys="['_root']" :default-checked-keys="defaultCheckedKeys">
            <template #default="{ node }">
                <lc-icon v-if="node.data.icon" :icon="node.data.icon"></lc-icon>
                <span style="margin-left:16px;">{{ node.label }}</span>

            </template>
        </el-tree>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue'
import useComponentRepository from '@/componentRepository/index'

import { buildTreeData } from './wizardPropUtil'
const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    }
})
//
const emit = defineEmits<{
    (e: 'update:modelValue', value: object): void
}>()
//
// const globalContext = inject('globalContext')
//
const repositoryManager = useComponentRepository()

//These are keys which are checked already
const defaultCheckedKeys = computed(() => {
    const ui = props.modelValue.ui || []
    const result = [] as String[]
    for (const u of ui) {
        for (const p of u.props || []) {
            //
            result.push('___prop:' + u.uiKey + ':' + p)
        }
    }
    //
    return result
})
//ref to tree 
const uiPropTreeRef = ref()
//tree data
const treeData = ref([])
//
function load() {
    if (!props.modelValue.rawPage) {
        return
    }
    // globalContext.request({
    //     method: "GET",
    //     url: 'page/load',
    //     params: {
    //         id: props.modelValue.sys.raw_page_id
    //     }
    // }).then(function (response) {
    //sourceCode.value=response
    //
    treeData.value = buildTreeData(props.modelValue.rawPage, repositoryManager)
    // });
}

watch(
    () => props.modelValue.rawPage,
    () => {
        load()
    }, {
    immediate: true
}
)
//
function beforeClose(done) {
    //
    const ui = []
    const keys = uiPropTreeRef.value.getCheckedKeys(true)
    for (const key of keys) {
        if (!key.startsWith('___prop:')) {
            continue;
        }
        const k = key.substring('___prop:'.length)
        const index = k.indexOf(':')
        if (index < 0) {
            continue
        }
        //
        const uiKey = k.substring(0, index)
        const prop = k.substring(index + 1)
        //
        let found = ui.find((item) => item.uiKey == uiKey)
        if (!found) {
            found = { uiKey: uiKey, props: [] }
            ui.push(found)
        }
        found.props.push(prop)
    }
    //
    const d = props.modelValue
    d.ui = ui
    //
    emit('update:modelValue', d)
    //
    done();
}
//
defineExpose({ beforeClose })
</script>
  