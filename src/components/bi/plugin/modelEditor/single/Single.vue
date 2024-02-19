<template>
    <el-container>
        <el-header style="padding:0px;">
            <div class="lc-common-toolbar"
                style="background-color:var(--el-color-primary);margin-top:10px 0;border-radius: 4px 4px 0px 0px;">
                <div class="left" style="font-weight: bold;">
                  <ModelHeader v-model="model"></ModelHeader>
                </div>
                <el-button-group class="right">
                    <el-button @click="handleReturn"> <template #icon>
                            <lc-icon icon="mdiKeyboardReturn"></lc-icon>
                        </template>返回</el-button>
                    <el-button @click="saveModel"> <template #icon>
                            <lc-icon icon="mdiContentSaveAllOutline"></lc-icon>
                        </template>保存</el-button>
                </el-button-group>
            </div>
        </el-header>
        <el-container>
            <el-aside width="240px" style="min-height:420px;height:100%;border-right:1px var(--el-border-color) solid;">
                <EntityList :entities="entities"></EntityList>
            </el-aside>
            <el-main style="padding:0px 8px;">
                <div style="display:flex;flex-direction:column;">
                    <div
                        style="flex-basis:80px;flow-growth:0;background-color: var(--el-fill-color-lighter);border-radius: 4px;;">
     
                        <EntityTree v-model="model" ></EntityTree>
                    </div>
                    <div style="flex-grow: 1;">
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="字段配置" name="field">
                                <FiledEditor v-model="model"></FiledEditor>
                            </el-tab-pane>
                            <el-tab-pane label="数据预览" name="preview">
                                <DataPreview :model="model"></DataPreview>
                            </el-tab-pane>
                        </el-tabs>

                    </div>
                </div>

            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import { ref,  watch, inject, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import ModelHeader from './ModelHeader.vue'
import EntityList from './EntityList.vue'
import DataPreview from '../DataPreview.vue'
import FiledEditor from '../FiledEditor.vue'
import EntityTree from './entityTree/index.vue'
//
const globalContext = inject('globalContext')


//Tab selection
const activeTab = ref('field')
//modelValue is the model id
//if it is empty(undefined/'') do nothing
const props = defineProps(['modelValue'])
const emit = defineEmits(['return'])
//entity detail
const model = ref({})
//
let dirty = false;
//table list
const entities = ref([])
//Last connection to avoid unnecessary load entities since it may cost a long time
let lastConenction = undefined
//If model changed, set dirty flag=true
watch(
    () => model.value,
    () => {
        dirty = true
    }, {
    deep: true
}
)
//
function loadEntities() {
    //
    const connection = model.value?.jdbcConnection
    if (!connection) {
        return
    }
    if (connection == lastConenction) {
        //no change, do not load
        return
    }
    //
    globalContext.request({
        method: "GET",
        url: '/dataModel/findEntities',
        params: {
            connection: connection
        }
    }).then(
        function (response) {
            entities.value = response.data
        }
    )
}
//if modelID changed, load model detail
watch(
    () => props.modelValue,
    (modelID) => {
        if (!modelID) {
            return
        }
        //
        globalContext.request({
            method: "GET",
            url: '/dataModel/load',
            params: {
                id: props.modelValue
            }
        }).then(
            function (response) {
                model.value = response
                //               
                nextTick(() => {
                    //use nextTick to wait for a while so the watch will be trigger before below code
                    dirty = false
                })

                //we also need reload entities
                loadEntities();
            }
        )
    },
    { immediate: true }
)

function saveModel() {
    //check data
    //
    globalContext.request({
        method: "POST",
        url: '/dataModel/save',
        data: model.value,
    }).then(function () {
        dirty=false
        //
        ElMessage({
            message: '保存成功.',
            type: 'success',
        })
    });
}

function handleReturn() {
    if (dirty) {
        ElMessageBox.confirm(
            '模型已经变更,是否保存',
            '保存确认',
            {
                confirmButtonText: '确认',
                cancelButtonText: '放弃',
                type: 'warning',
            }
        )
            .then(() => {
                emit('return')
            })
    } else {
        emit('return')
    }
}
</script>
<style scoped></style>
  