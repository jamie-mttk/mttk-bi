<template>

  <List v-if="listMode" @edit="handleEdit"></List>
  <Single v-else :modelValue="editModel" @return="handleReturn"></Single> 
</template>
<script setup lang="ts">
import {ref} from 'vue'
import Single from './single/Single.vue'
import List from './list//List.vue'
//list or detail
const listMode=ref(true)
//data to edit
const editModel=ref('')
//
function handleEdit(model){
  editModel.value=model

  //
  listMode.value=false
}
function handleReturn(){
  listMode.value=true
}
</script>
<style scoped></style>  