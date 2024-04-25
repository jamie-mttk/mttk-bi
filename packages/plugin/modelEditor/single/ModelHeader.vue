<template>
    <div>
        <div style="display:inline-block;cursor:pointer;">
        <span v-if="!editMode" @click="startEdit">{{ modelValue.name }} </span>
        <el-input v-if="editMode" v-model="modelValue.name" placeholder="" size="small">
        <template #suffix>
          <lc-icon icon="mdiCheck" @click="finishEdit" size="medium"></lc-icon>
        </template>
        </el-input>
    </div>
    <div style="display:inline-block;cursor:pointer;margin-left:10px;">
        <span v-if="!editMode" @click="startEdit" style="font-size: 0.8em;margin-left:20px;">{{ modelValue.description   }}</span>
        <el-input v-if="editMode" v-model="modelValue.description" :placeholder="$t('_._.description')" size="small" >
        <template #suffix >
          <lc-icon icon="mdiCheck" @click="finishEdit"  size="medium"></lc-icon>
        </template>
        </el-input>
    </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useVModels } from '@vueuse/core'
const props = defineProps(['modelValue', 'entities'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
  //
  const editMode=ref(false)
  //
  function startEdit(){
    editMode.value=true
  }
  //
  function finishEdit(){
    editMode.value=false
  }
</script>