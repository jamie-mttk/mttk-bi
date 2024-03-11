<template>
  <el-button-group>
    <el-button  @click="handleReturn">Return to list</el-button>
    <el-button  @click="handleSave">Save</el-button>
    <el-button  @click="switchMode">{{ previewEditLabel }}</el-button>
    <!-- <el-button type="warning"  @click="testTempoary">Test</el-button> -->
  </el-button-group>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useIntervalFn } from '@vueuse/core'
//
const context = inject('context')
//
function handleReturn() {
  saveIfNeed(false)
  //
  context.mitt.emit('action', { type: 'return' })
}
//
function handleSave() {
  saveIfNeed(true)

}
useIntervalFn(() => {
  saveIfNeed(false);
}, 120 * 1000)
//
function saveIfNeed(force: boolean) {
  if (force || context.codeManager.dirty.value) {
    context.mitt.emit('action', { type: 'save', code: context.codeManager.getCode() });
    //
    context.codeManager.dirty.value = false
  }
}
//
//Preview/Edit button title
const previewEditLabel = computed(() => context.mode.value == 'edit' ? 'Switch to preview' : 'Return to edit')

//Preview/Edit switch
function switchMode() {
  if (context.mode.value == 'edit') {
    context.mode.value = 'view'
  } else {
    context.mode.value = 'edit'
  }
}
</script>