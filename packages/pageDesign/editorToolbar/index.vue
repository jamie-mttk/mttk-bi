<template>
  <div class="lc-common-toolbar" style="height:100%;">
    <div class="left">
      <span class="left lc-main-title">{{ title }} </span>
    </div>

    <div class="right">
      <el-button-group>
        <el-button type="default" @click="emit('action', 'return')">Return to list</el-button>
        <el-button type="primary"  @click="emit('action', 'save')">Save</el-button>
        <el-button  type="success" @click="switchMode">{{ previewEditLabel }}</el-button>
        <!-- <el-button  @click="emit('action','deploy')">Deploy</el-button> -->
      </el-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { ElMessage } from 'element-plus'
const emit = defineEmits<{
  (e: 'action', type: string): void
}>()

//
const context = inject('context')
//Report title
const title = computed(() => {
  let pageTitle = context.codeManager.getCode().name
  if (!pageTitle) {
    return 'Name is not set'
  }
  if (context.codeManager.dirty.value) {
    pageTitle = pageTitle + '---Modified'
  }
  //
  return pageTitle
})
//Preview/Edit button title
const previewEditLabel = computed(() => context.mode.value == 'edit' ? 'Switch to preview' : 'Return to edit')

//Preview/Edit switch
function switchMode() {
  if (context.mode.value == 'edit') {
   context.mode.value = 'view'
  } else {
    context.mode.value = 'edit'
  }
}
//
// function handleMenuSelect(key: string){
//   if('edit'==key){
//     context.choosedManager.setChoosed(undefined)
//         //
//         ElMessage({
//       message: 'Please use the property editor on right to edit' ,
//       type: 'success',
//     })
//   }
// }
</script>
<style lang="scss" scoped>
.editorToolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 20px;

  .left {
    min-width: 20%;
  }

  .right {
    padding-right: 10px;
  }
}
</style>