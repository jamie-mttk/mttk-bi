<template>
  <el-row style="margin: 16px" >
    <el-col :span="24" :style="singleStyle" ref="target">
      <h2 style="margin: 16px 0 0 16px;" >{{ props.modelValue.name }}</h2>
      <div style="margin: 10px 0 0 16px; padding-right: 100px; min-height: 32px">
        {{ props.modelValue.description }}
      </div>
      <div
        v-show="!isOutside"
        style="margin-top: 16px; display: flex; justify-content: center;"
      >
        <div>
          <el-button-group>
            <el-button
              type="primary"
              @click="emitAction('design')"
              v-data-auth:edit="props.modelValue"
              >Design</el-button
            >
            <el-button type="success" @click="emitAction('launch')">Launch</el-button>
            <el-button
              type="default"
              @click="emitAction('edit')"
              v-data-auth:edit="props.modelValue"
              >Setting</el-button
            >
            <el-button
              type="danger"
              @click="emitAction('delete')"
              v-data-auth:del="props.modelValue"
              >Delete</el-button
            >
            <DataAuthButton type="warning" :data="props.modelValue" resource="app" />
          </el-button-group>
        </div>
      </div>
    </el-col>
    <div style="position: absolute; top: 40px; right: 40px">
      <lcIcon :icon="modelValue.icon" size="4em"> </lcIcon>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { generateRandomColor } from '@/utils/tools'
import lcIcon from '@/components/icon/index.vue'
import DataAuthButton from '@/components/auth/DataAuthButton.vue'
//
const target = ref(null)
const { isOutside } = useMouseInElement(target)

//
let props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'action', type: string, app: object): void
}>()
//
const singleStyle = computed(() => {
  return {
    height: '160px',
    'border-radius': '4px',
    'background-color': props.modelValue.color || generateRandomColor()
  }
})

function emitAction(type: string) {
  emit('action', type, props.modelValue)
}
</script>

<style scoped></style>
