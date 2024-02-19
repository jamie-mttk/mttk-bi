<template>
    <el-dialog  v-model="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" :draggable="true" v-bind="$attrs"
        :before-close="handleClose">
        <el-steps :active="active" simple style="padding:8px 8%;">
            <el-step v-for="step in steps" :key="step.key" :title="step.name">
                <template #icon>
                    <lc-icon v-if="step.icon" :icon="step.icon" size="large"></lc-icon>
      
                </template>
            </el-step>
        </el-steps>
        <div style="min-height:420px;padding-top:10px;">
            <slot v-bind:active="active" v-bind:step="step"></slot>
        </div>

        <template #footer>

            <el-button type="primary"  :disabled="active == 0"
                @click="preStep">
                <template #icon>
          <lc-icon icon="mdiSkipPrevious"></lc-icon>
        </template>
                Previous</el-button>
            <el-button type="primary"  :disabled="active >= steps.length - 1" @click="nextStep"> 
                <template #icon>
          <lc-icon icon="mdiSkipNext"></lc-icon>
        </template>
        Next
            </el-button>

            <el-button type="success" :disabled="disableFinish"
                @click="finish">
                <template #icon>
          <lc-icon icon="mdiCheck"></lc-icon>
        </template>
                Finish</el-button>
            <el-button type="warning" @click="cancel">
                <template #icon>
          <lc-icon icon="mdiClose"></lc-icon>
        </template>
                Cancel</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

import {  ElMessageBox } from 'element-plus'

const props = defineProps({
    steps: {
        type: Array,
        required: true,
        default() {
            return []
        }
    },
})

const emit = defineEmits<{
    (e: 'next', active: Number, callback: Function): void
    (e: 'finish', callback: Function): void
}>()

//Whether this dialog is visible
const dialogVisible = ref(false)
//Current step index
const active = ref(0)
//Current step
const step = computed(() => props.steps[active.value]);
//Whether
const disableFinish = computed(() =>
    active.value != props.steps.length - 1 && !step.value.finish
)


function preStep() {
    if (active.value > 0) {
        active.value = active.value - 1;
    }
}
function nextStep() {
    if (active.value < props.steps.length - 1) {
        emit('next', active.value, () => {
            active.value = active.value + 1;
        })

    }
}

function handleClose(done) {
    ElMessageBox.confirm('Are you sure to close this wizard?', 'Warning',)
        .then(() => {
            done();
        })
        .catch(() => { });
}
function cancel() {
    handleClose(() => {
        dialogVisible.value = false;
    });
}
function finish() {
    emit("finish", () => {
        dialogVisible.value = false;
    });
}
function show() {
    active.value = 0;
    dialogVisible.value = true;
}
//
defineExpose({ show })
</script>