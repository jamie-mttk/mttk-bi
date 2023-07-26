<script setup lang="ts">
import { ref,  inject} from 'vue'
import { ElMessageBox } from 'element-plus'
import propesEditorData from './dataUtil'
import StyleEdior from './styleEditor.vue'
import MyInput from './components/MyInput.vue'
//
const context = inject('context')
//
const tabIndex = ref('basic')
//
const { canBeDelete, configTitle, configBasic, configStyles, configClasses,configData, configEvent } = propesEditorData(context)

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

//Add a scrollbar so the basic can be displayed even if it is very high
const sc_height = ref('640px') 
calScHeight()
window.onresize = function () {
    calScHeight()
}
function calScHeight(){
    sc_height.value = (window.innerHeight - 320) + 'px' 
}

</script>

<template>
    <el-card shadow="never">
        <template #header>
            <div class="card-header">
                <span> <span class="card-title">{{ configTitle }}</span> 
                <el-button type="warning" 
                        size="small" v-if="canBeDelete" @click="handleDuplicate" >
                        <template #icon>
            <lc-icon icon="mdiContentCopy"></lc-icon>
          </template>
                    </el-button></span>
                <el-button type="danger" size="small" v-if="canBeDelete" @click="handleDelete" >
                    <template #icon>
            <lc-icon icon="mdiTrashCanOutline"></lc-icon>
          </template>    
                </el-button>
            </div>
        </template>
        <el-tabs v-model="tabIndex">
            <el-tab-pane label="Basic" name="basic">
                <el-scrollbar :height="sc_height">
                <CompWrap v-if="configBasic" :config="configBasic"></CompWrap>
            </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="Data" name="data">
                <CompWrap v-if="configData" :config="configData"></CompWrap>
            </el-tab-pane>
            <el-tab-pane label="Events" name="events">
                <CompWrap v-if="configEvent" :config="configEvent"></CompWrap>
            </el-tab-pane>
            <el-tab-pane label="Display" name="display">

                <div style="margin-bottom:8px">Classes:</div>
                <MyInput v-model="configClasses"></MyInput>
                <div style="margin:12px 0 4px 0">Styles:</div>
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