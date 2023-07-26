<template>
 <el-container style="height:100%;">
  <el-header style="padding:0px;margin:0 0 8px 0;">
        <EditorToolbar @action="handleAction"></EditorToolbar>
  </el-header>
    <Transition mode="out-in" name="custom-classes" enter-active-class=" page_enter" leave-active-class=" page_leave">
      <el-row v-if="isEditMode" style="height:calc(100% - 58px);">
        <el-col :span="4" class="max-tab-height">
         
            <el-tabs type="border-card" :stretch="true" v-model="leftTabActive">
              <el-tab-pane label="Pallet" name="pallet">
                <Pallet></Pallet>
              </el-tab-pane>
              <el-tab-pane label="Source tree" name="sourceTree">
                <SourceTree></SourceTree>
              </el-tab-pane>
            </el-tabs>
         
        </el-col>
        <el-col :span="20" class="max-tab-height">
          <el-tabs v-model="activeDetailTab" type="border-card" class="editor-main-tabs">
            <el-tab-pane label="User Interface" name="ui">
              <el-row class="height-full">
                <el-col :span="18" style="padding-right:16px;" @click="panelOuterClicked">
                  <!-- <Panel v-model="controllers" @click="panelInnerClicked"></Panel> -->
                  <!-- <CompWrap :config="pageConfig"></CompWrap> -->
                  <PageRender :contextStack="contextStack"></PageRender>
                </el-col>
                <el-col :span="6">
                  <PropsEditor class="height-full" style="z-index: 999;"></PropsEditor>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Data" name="data">
              <DataEditor></DataEditor>
            </el-tab-pane>
            <el-tab-pane label="Computed" name="computed">
              <ComputedEditor></ComputedEditor>
            </el-tab-pane>
            <el-tab-pane label="Method" name="method">
              <MethodEditor></MethodEditor>
            </el-tab-pane>
            <el-tab-pane label="API" name="api">
              <ApiEditor></ApiEditor>
            </el-tab-pane>
            <el-tab-pane label="Lifecycle" name="lifecycle">
              <LifecycleEditor></LifecycleEditor>
            </el-tab-pane>      
            <el-tab-pane label="Source code" name="code">
              <SourceCode></SourceCode>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

      <el-row :gutter="20" v-else>
        <el-col :span="24">
          <PageRender  :contextStack="contextStack"></PageRender>
        </el-col>
      </el-row>
    </Transition>
 </el-container>
</template>

<script setup lang="ts">
import Pallet from './pallet/index.vue'
import SourceTree from './sourceTree/index.vue'

import PropsEditor from './propsEditor/index.vue'
import DataEditor from './dataEditor/index.vue'
import ComputedEditor from './computedEditor/index.vue'
import MethodEditor from './methodEditor/index.vue'
import ApiEditor from './apiEditor/index.vue'
import LifecycleEditor from './lifecycleEditor/index.vue'
import SourceCode from './sourceCode/index.vue'
import EditorToolbar from './editorToolbar/index.vue'
import PageRender from '../pageRender/index.vue'

import { ref, computed, watch, reactive } from 'vue'
import { provide ,inject} from 'vue'
import { useIntervalFn } from '@vueuse/core'

import createContext from  '../context/pageContext/index'

//
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  },
})

//
//return  - Return to application edit UI
//save    - Save button is called
//deploy  - Deploy button is called
const emit = defineEmits<{
  (e: 'action', type:string,page: object): void
}>()
//
const leftTabActive = ref("pallet")
const activeDetailTab = ref('ui')
//
const appContext=inject('appContext')

//
const context = createContext('edit',appContext)
const contextStack=ref([context])

//
provide('context', context)


//Init all data initValue
// for (const d of code.data) {
//   context.dataManager.setData(d.key, d.initValue)
// }

//
// const controllers = computed(() => {
//   return context.codeManager.getCode().ui || []
// })
//
// const controllers = computed({
//   get: () => context.codeManager.getCode().ui || [],
//   set: (val) => {
//     context.codeManager.getCode().ui = val
//   }
// })
// const lifecycleComputed = computed(() => {
//   console.log('~~')
//   if (!context.codeManager.getCode().lifecycle) {
//     return {}
//   }
//   //
//   console.log(context.codeManager.getCode().lifecycle)
//   //
//   return {}
// })

//console.log(pageConfig)
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
function panelOuterClicked() {
 // 
 //console.log(arguments)
  //Click blank area,unchoose component -Since event bubbles,this will always choose root,so comment it
 //context.choosedManager.setChoosed(undefined)
}
//toolbar action
function handleAction(type: string) {
  const code = context.codeManager.getCode()
  //
  if('return'==type){
    triggerSaveIfNeed(false)
  }else  if('save'==type){
    triggerSaveIfNeed(true)
    return;
  }
  //
  emit('action',type, code);
}
//
function triggerSaveIfNeed(force:boolean){
  if(force || context.codeManager.dirty.value){
    emit('action','save', context.codeManager.getCode());
    //
    context.codeManager.dirty.value=false
  }
}
//
useIntervalFn(() => {
  triggerSaveIfNeed(false);
}, 120*1000)

</script>
<style lang="scss">
.max-tab-height {
  .el-tabs {
    height: 100%;
  }

  .el-tabs__content {
    height: calc(100% - 40px);

    .el-tab-pane {
      height: 100%;
    }
  }
}

.el-affix {
  height: 100%;
}

.el-affix>div {
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
</style>

