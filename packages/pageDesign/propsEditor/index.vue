<script setup lang="ts">
import { ref, computed, inject, isRef, isReactive, toRaw } from 'vue'
import { ElMessageBox } from 'element-plus'
import propesEditorData from './data'
import StyleEdior from './styleEditor.vue'
//
const context = inject('context')
//
const tabIndex = ref('basic')
//
const { canBeDelete, configTitle, configBasic, configStyles, configData, configEvent } = propesEditorData(context)

//
function handleDelete() {
    //
    ElMessageBox.confirm(
        'Are you sure to delete this component?',
        'Confirm',
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        }
    )
        .then(() => {
            //
            const choosed = context.choosedManager.getChoosed()
            if (!choosed || !choosed.key) {
                return;
            }
            //
            context.codeManager.delComponent(choosed.key)
            //
            context.choosedManager.setChoosed(undefined)
        })
}
//
function handleDuplicate() {
    //
    ElMessageBox.confirm(
        'Are you sure to duplicate this component?',
        'Confirm',
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        }
    )
        .then(() => {
            //
            const choosed = context.choosedManager.getChoosed()
            if (!choosed || !choosed.key) {
                return;
            }
            //
            const controllerNew = context.codeManager.duplicateComponent(choosed.key)
            //
            context.choosedManager.setChoosed(controllerNew)
        })
}
</script>

<template>
    <el-card shadow="never">
        <template #header>
            <div class="card-header">
                <span> <span class="card-title">{{ configTitle }}</span> 
                <el-button type="warning" icon="DocumentCopy"
                        size="small" v-if="canBeDelete" @click="handleDuplicate" /></span>
                <el-button type="danger" icon="Delete" size="small" v-if="canBeDelete" @click="handleDelete" />
            </div>
        </template>
        <el-tabs v-model="tabIndex">
            <el-tab-pane label="Basic" name="basic">
                <CompWrap v-if="configBasic" :config="configBasic"></CompWrap>
            </el-tab-pane>
            <el-tab-pane label="Data" name="data">
                <CompWrap v-if="configData" :config="configData"></CompWrap>
            </el-tab-pane>
            <el-tab-pane label="Events" name="events">
                <CompWrap v-if="configEvent" :config="configEvent"></CompWrap>
            </el-tab-pane>
            <el-tab-pane label="Styles" name="styles">
                <StyleEdior v-model="configStyles" />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    font-size: 1.1em;
    margin-right:10px;
}
</style>