<template>
    <div>AABBCC
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  >
  <PageRender v-model="code1"></PageRender>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import PageRender from '@/pageRender/index.vue'
import {code1,code2} from '../test4/data'
//Dialog visibility
const dialogVisible=ref(true)
//
//alert('CALLED')

</script>

<style scoped></style>
