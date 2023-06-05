<template>
    <el-container style="height:100%;">
      <el-header class="lc-common-toolbar">
        <span class="left lc-main-title">{{ appContext?.app?.value?.name||'Applicaiton name is not set' }} </span>
      <span class="right">
        <el-button-group>
        <el-button icon="Back" type="primary" @click="emit('return')">Return</el-button>
        <el-button icon="DocumentCopy" type="success" @click="handleDeploy">Deploy</el-button>
      </el-button-group>
      </span>

      </el-header>
      <el-container style="margin-top:8px;">
        <el-aside width="360px" style="margin:4px 10px 0 8px;padding:0px;">
          <MenuEditor  @selectionChanged="menuChanged"></MenuEditor>
        </el-aside>
        <el-main  style="margin:4px 10px 0 8px;padding:0px;">
          <PageEditor :menuFilter="menuFilter" @pageDesign="handlePageDesign"></PageEditor>
        </el-main>
      </el-container>
    </el-container>

</template>


<script setup lang="ts">

import { ref, onMounted, inject } from 'vue'
import MenuEditor from './menuEditor/index.vue'
import PageEditor from './pageEditor/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
//

//
//
// const props = defineProps({
//   modelValue: {
//     type: String,
//     required: false,
//     default: ''
//   },
// })

const emit = defineEmits<{
  (e: 'pageDesign', page: string): void
  (e: 'return'): void
}>()
//
const globalContext=inject('globalContext')
//
const appContext=inject('appContext')
//
const menuFilter=ref('')
//
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };
})
//
function menuChanged(menuKey:string){
  menuFilter.value=menuKey
}
//
function handlePageDesign(page:string){
  emit('pageDesign', page)
}

//
function handleDeploy(){
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
          id: appContext.key.value
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