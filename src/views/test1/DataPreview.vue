<template>
  <div>
    <div class="lc-common-toolbar">
      <div class="left" >行数: {{ prviewData.length }}</div>
      <el-button-group class="right">
        <el-button> <template #icon>
            <lc-icon icon="mdiRefresh"></lc-icon>
          </template>刷新数据</el-button>
      </el-button-group>
    </div>
    <el-table :data="prviewData" border style="width: 100%">
      <el-table-column v-for="column in columns" :key="column" :prop="column" :label="column" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { response } from './data'
//
const prviewData = ref(response.data)
//Build table column from preview data
const columns = computed(() => {
  if (prviewData.value.length == 0) {
    return ['empty']
  }
  //
  return Object.keys(prviewData.value[0])
})

</script>