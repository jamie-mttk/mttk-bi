<template>

  <el-input v-model="inputValue"  v-bind="$attrs" @dblclick="handleDblClick" ></el-input> 
  <el-drawer
    v-model="drawerShow"  direction="rtl" size="30%"
    title="Edit data in drawer window"
  >
  <el-input v-model="inputValue"  type="textarea" :rows="20"></el-input> 
  </el-drawer>


</template>
  
<script lang="ts" setup>
import { ref, watch,useAttrs } from 'vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
//
const attrs = useAttrs()
//Set a long delay for textarea
const debounceDelay=attrs.type=='textarea'?3000:500

//
const inputValue = ref(props.modelValue)
watch(() => props.modelValue,
  (val) => {
    inputValue.value = val
  })
watchDebounced(
  inputValue,
  () => {
    emit('update:modelValue', inputValue.value)
  },
  { debounce: debounceDelay, maxWait: 3000 },
)

//
const drawerShow=ref(false)
function handleDblClick(){
  drawerShow.value=true
}
</script>
  