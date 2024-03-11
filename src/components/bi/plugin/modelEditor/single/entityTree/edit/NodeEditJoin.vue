<template>
    <el-card shadow="hover" style="height:100%;">
        <template #header>
            <div class="card-header">
                <span>关联关系</span>
                <span>
                    <el-button-group>
                    <el-button v-if="modelValue?.target" @click="loadFields">刷新字段列表</el-button>
                    <el-button v-if="modelValue?.target" @click="handleAdd">增加关联字段</el-button>
                </el-button-group>

                </span>
            </div>
        </template>

        <el-empty description="此实体没有上级实体,无需设置关联" v-if="!modelValue?.target" />
        <el-form :model="modelValue" label-width="80px" ref="nodeEditJoinFormRef" v-if="modelValue?.target">
            <el-form-item label="上级表" prop="source" required>
                <el-select v-model="modelValue.source" :disabled="isEditing" @change="handleSourceChange">
                    <el-option v-for="e in props.model?.entities || []" :key="e.key" :label="e.name" :value="e.key" />
                </el-select>
            </el-form-item>
            <el-form-item label="连接类型" prop="joinType" required>
                <el-select v-model="modelValue.joinType">
                    <el-option label="内连接" value="INNER JOIN" />
                    <el-option label="左连接" value="LEFT JOIN" />
                    <el-option label="右连接" value="RIGHT JOIN" />
                </el-select>
            </el-form-item>
            <el-form-item label="关联字段" prop="keys" required :rules="rulesFields">
                <el-table :data="modelValue.keys" style="width: 100%">
                    <el-table-column prop="sourceKey" label="上级表字段">
                        <template #default="sp">
                            <el-select v-model="sp.row.sourceKey" filterable>
                                <el-option v-for="f in fieldsSource" :key="f.key" :label="f.key" :value="f.key" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetKey" label="当前表字段">
                        <template #default="sp">
                            <el-select v-model="sp.row.targetKey" filterable>
                                <el-option v-for="f in fieldsTarget" :key="f.key" :label="f.key" :value="f.key" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation" label="" width="40">
                        <template #default="sp">
                            <lc-icon icon="mdiTrashCanOutline" style="cursor: pointer;" @click="handleDelete(sp)"></lc-icon>
                        </template>
                    </el-table-column>

                </el-table>

            </el-form-item>


        </el-form>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, inject, watch } from 'vue'
import { useVModels } from '@vueuse/core'
import { findEntity, loadEntityColumns } from '../../../util/modelUtil'
const props = defineProps(['modelValue', 'model', 'isEditing', 'dataBasic'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
const globalContext = inject('globalContext')
//
function handleAdd() {
    modelValue.value.keys.push({ sourceKey: '', targetKey: '' })
}
function handleDelete(sp) {
    modelValue.value.keys.splice(sp.$index, 1);
}


//Load source and target fields
const fieldsSource = ref([])
const fieldsTarget = ref([])
function loadFields() {
    if (!props.model?._id || !modelValue) {
        return
    }
    //
    loadEntityColumns(globalContext.request, props.model._id, findEntity(props.model, modelValue.value.source), fieldsSource)
    //If it is adding,target entity can not found from model
    loadEntityColumns(globalContext.request, props.model._id, props.dataBasic, fieldsTarget)
}
//Once modelValue changed, load fields
watch(
    () => props.modelValue,
    () => {
        loadFields();
    },
    { immediate: true }
)
function handleSourceChange() {
    loadEntityColumns(globalContext.request, props.model._id, findEntity(props.model, modelValue.value.source), fieldsSource)
}
//
function fieldsValid() {
    for (let i = 0; i < modelValue.value.keys.length; i++) {
        const line = modelValue.value.keys[i]
        if (!line.sourceKey) {
            return '第' + (i + 1) + '行上级表字段为空'
        }
        if (!line.targetKey) {
            return '第' + (i + 1) + '行当前表字段为空'
        }
    }
}

const validateFields = (rule: any, value: any, callback: any) => {

    const reuslt = fieldsValid()
    if (reuslt) {
        callback(new Error(reuslt))
    } else {
        callback()
    }
}


const rulesFields = [{ validator: validateFields }]
//
//
const nodeEditJoinFormRef = ref()
const validateFunc = function () {
    if (nodeEditJoinFormRef.value) {
        return nodeEditJoinFormRef.value.validate()
    }
}

defineExpose({ validateFunc })


</script>