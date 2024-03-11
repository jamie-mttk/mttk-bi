<template>
  <el-container style="height: 100%"  class="page-designer-main">
    <el-header style="padding: 0px; margin: 0 0 8px 0; height: 48px">
      <MttkWrapComp :config="configTop"></MttkWrapComp>
    </el-header>
    <Transition
      mode="out-in"
      name="custom-classes"
      enter-active-class=" page_enter"
      leave-active-class=" page_leave"
    >
      <div v-if="isEditMode" style="min-height: calc(100% - 58px); display: flex">
        <div style="flex-grow: 0">
          <!-- <MttkWrapComp :config="configLeft"></MttkWrapComp> -->
          <ToolbarLeft></ToolbarLeft>
        </div>
        <div style="flex-grow: 1; margin-left: 8px">
          <MttkWrapComp :config="configMain"></MttkWrapComp>
        </div>
      </div>
      <el-row v-else>
        <el-col :span="24">
          <PageRender :context="context"></PageRender>
        </el-col>
      </el-row>
    </Transition>
  </el-container>
</template>

<script setup lang="ts">
import PageRender from '../pageRender/index.vue'
import { computed, watch } from 'vue'
import { provide, inject } from 'vue'
import ToolbarLeft from './ToolbarLeft.vue'

import createContext from '@/context/pageContext/index'
import { buildTop } from './buildTop'
import { buildLeft } from './buildLeft'
import { buildMain } from './buildMain'

//
const props = defineProps({
  //modelValue is source code
  modelValue: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  }
})

//
//return  - Return to application edit UI
//save    - Save button is called
const emit = defineEmits(['action'])
//

//
const appContext = inject('appContext')
//Create and provide context
const context = createContext('edit', appContext)
provide('context', context)
//
context.mitt.on('action', function (detail) {
  emit('action', detail)
})

//whether it is edit mode
const isEditMode = computed(() => context.mode.value == 'edit')
//Set code once props is changed
watch(
  () => props.modelValue,
  () => {
    context.codeManager.setCode(props.modelValue)
  },
  { immediate: true }
)
//
const configTop = buildTop(context)
// const configLeft = buildLeft(context)
const configMain = buildMain(context)

//
//
</script>
<style lang="scss">
// .max-tab-height {
//   .el-tabs {
//     height: 100%;
//   }

//   .el-tabs__content {
//     height: calc(100% - 40px);

//     .el-tab-pane {
//       height: 100%;
//     }
//   }
// }

.el-affix {
  height: 100%;
}

.el-affix > div {
  height: 100%;
}

.page_enter {
  //animation-delay: 10s;
  animation: zoomInUp;
  animation-duration: 0.5s;
}

.page_leave {
  animation: zoomOutDown;
  animation-duration: 0.2s;
}

//Remove the tabs top line below
.page-designer-main {
  .el-tabs__nav-wrap::after {
    /* Hide the line under tabs top */
    height: 0px !important;
  }
}
</style>
