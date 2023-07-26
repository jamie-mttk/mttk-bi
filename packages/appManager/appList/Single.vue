<template>
  <el-row style="padding:16px;">
    <el-col :span="24" :style="singleStyles" ref="target">
      <h2 style="margin:16px 0 0 10px;">{{ props.modelValue.name }}</h2>
      <div  style="margin:0 10px;padding-right:100px;">
        {{ props.modelValue.description }}
      </div>
      <div v-show="!isOutside" style="margin:10px">
        <el-button type="primary" @click="emitAction('design')">Design</el-button>
        <el-button type="success" @click="emitAction('launch')">Launch</el-button>
        <el-button type="default" @click="emitAction('edit')">Setting</el-button>
        <el-button type="danger" @click="emitAction('delete')">Delete</el-button>
      </div>
   
    </el-col>
    <div style="position:absolute;top:40px;right:40px;">
      <lcIcon :icon="modelValue.icon" size="4em" >
    </lcIcon>
    </div>
  </el-row>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { generateRandomColor } from '@/utils/tools'
import lcIcon from '@/components/icon/index.vue'
//
const target = ref(null)
const { isOutside } = useMouseInElement(target)

//
let props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },

})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'action', type: string, app: object): void
}>()
//styles
const singleStyles = computed(() => {
  return {
    height: '160px',
    'border-radius': '6px',
    'background-color': props.modelValue.color || generateRandomColor()
  }
})


function emitAction(type: string) {
  emit('action', type, props.modelValue)

}
</script>
  
<style scoped></style>
  