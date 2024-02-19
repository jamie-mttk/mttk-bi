<template>
  <el-container style="height:100%;">
    <el-header class="lc-common-toolbar">
      <span class="left lc-main-title">{{ appContext?.getCode().name || 'Applicaiton name is not set' }} </span>
      <span class="right">
        <el-button-group>
          <el-button type="primary" @click="emit('return')">
            <template #icon>
              <lc-icon icon="mdiKeyboardBackspace"></lc-icon>
            </template>
            Return</el-button>
          <el-button type="success" @click="handleDeploy">
            <template #icon>
              <lc-icon icon="mdiTransfer"></lc-icon>
            </template>
            Deploy</el-button>
        </el-button-group>
      </span>
    </el-header>
    <MttkWrapComp :config="configMain" @pageDesign="handlePageDesign"></MttkWrapComp>
  </el-container>
</template>


<script setup lang="ts">

import {computed, onMounted, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import buildMain from './buildMain'



const emit = defineEmits<{
  (e: 'pageDesign', page: string): void
  (e: 'return'): void
}>()
//
const globalContext = inject('globalContext')
//
const appContext = inject('appContext')

//Wrap into computed, since the app context may not be loaded during the first evaluation
const configMain = computed(()=>buildMain(appContext))
//
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };
})
//
function handlePageDesign(page: string) {
  emit('pageDesign', page)
}

//
function handleDeploy() {
  ElMessageBox.confirm(
    'Will you want to deploy this application?This will deploy all the menus and pages',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
      //
      globalContext.request({
        method: "POST",
        url: 'app/deploy',
        params: {
          id: appContext.getKey()
        }
      }).then(function () {
        //
        ElMessage({
          message: 'APP deployed',
          type: 'success',
        })
      });

    })
}
</script>
<style ></style>