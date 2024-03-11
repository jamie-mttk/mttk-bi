<template>
  <div>
    <MttkWrapComp
      :config="configMain"
      @pageDesign="handlePageDesign"
      class="page-design-tabs"
    ></MttkWrapComp>
    <div style="position: absolute; left: 32px; top: 2px;display:flex;align-items:center;" @click="handleAppClick">
      <lc-icon :icon="appContext?.getCode().icon" size="x-large"></lc-icon>
      <h3 style="margin-left:8px;">{{ appContext?.getCode().name || 'Applicaiton name is not set' }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, inject } from 'vue'
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
const configMain = computed(() => buildMain(appContext))
//
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
})
//
function handlePageDesign(page: string) {
  emit('pageDesign', page)
}

//
function handleAppClick(){
  //Return to main 
  globalContext.router.push('/')

}
</script>
<style type="scss">
.page-design-tabs {
  margin-top: 4px;
  .el-tabs__nav {
    /*Move tabs to right*/
    float: right !important;
    right: 32px;
    /* min-height: 32px; */
  }
  .el-tabs__nav-wrap::after {
    /* Hide the line under tabs top */
    height: 0px !important;
  }
}
</style>
