<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { deepCopy,createUniqueString } from '@/utils/tools'
import PalletItem from "./PalletItem.vue";
import draggable from "vuedraggable";
//
const context = inject('context')
//Filter pallet item 
const filter = ref('')
//folder list
const folders = context.repositoryManager.componentFolders()
//First open this folder
const initOpenedFolder = folders[0].key

//
let lastComponent = ref({})
//
const componentsByFolderReal = computed(() => function (folder: string) {
  const fullComponents = context.repositoryManager.componentsByFolder(folder)
  if (!filter.value) {
    //No filter,return all
    return fullComponents
  }
  //
  return fullComponents.filter(item => { return strMatchFilter(item.key) || strMatchFilter(item.name) || strMatchFilter(item.description) })
})
//Whethter the str match the filter
function strMatchFilter(str: string) {
  if (!str) {
    //
    return false;
  }
  return str.indexOf(filter.value) >= 0
}


//Clone component for drag and drop
function cloneComponent(component) {
  //随机生成key
  const key = context.codeManager.createComponentKey(component.key)
  const componentCloned = {
    key: key,
    type: component.key,
    config:  buildInitConfig(component),
    data: {},
    event: [],
    styles: deepCopy(component.initStyles) || {},
  };
  //
  lastComponent.value = componentCloned;
  //
  return componentCloned;
}
function buildInitConfig(component){
  const initConfig=deepCopy(component.initConfig) || {}
  //If there are _container,add key
  if(initConfig.props['_container'] && Array.isArray(initConfig.props['_container']) && initConfig.props['_container'].length>0){
    for(const c of initConfig.props['_container']){
      if(!c.key){
        //Set key if it is not present
        c.key=createUniqueString()
      }
    }
  }

  //
  return initConfig;
}
// :drag-class="testDrag" :ghost-class="testGhost" 
// const testDrag = computed(() => {
//   console.log(JSON.stringify(lastComponent))
//   if (lastComponent.value.type == 'button') {
//     console.log(lastComponent.value.type+'##~~~~~~~~~~~1')
//     return 'testGhost1'
//   } else {
//     console.log(lastComponent.value.type+'##~~~~~~~~~~~2')
//     return 'testGhost1'
//   }
// })
// const testGhost = computed(() => {
//   console.log('####'+ (lastComponent.value.type == 'button'))
//   if (lastComponent.value.type == 'button') {
//     console.log(lastComponent.value.type+'~~~~~~~~~~~1')
//     return 'testGhost1'
//   } else {
//     console.log(lastComponent.value.type+'~~~~~~~~~~~2')
//     return 'testGhost1'
//   }
// })
// function onStart() {
//   //Drap start,clear the current selected component
//   context.choosedManager.setChoosed(undefined)

// }
// function onEnd() {
//   //Set the current 
//   context.choosedManager.setChoosed(lastComponent.value)
// }
</script>

<template>
  <div>
    <el-input v-model="filter" placeholder="Input to filter pallet item" style="margin-bottom:8px;"></el-input>
    <el-collapse accordion :model-value="initOpenedFolder">
      <el-collapse-item v-for="folder in folders" :key="folder.key" :name="folder.key">
        <template #title>
            <span style="font-size:1.1em;">{{ folder.name }}</span>
        </template>
        <draggable :modelValue="componentsByFolderReal(folder.key)"
          :group="{ name: 'components', pull: 'clone', put: false }" :empty-insert-threshold="1000" item-key="key"
          :clone="cloneComponent" class="el-row">
          <template #item="{ element }">
            <el-col :span="8" style="margin: 0.8em 0;">
              <PalletItem :config="element"></PalletItem>
            </el-col>
          </template>
        </draggable>


      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style>
/* .testDrag1 {
  background-color: #ff0000;
}

.testDrag2 {
  background-color: #00ff00;
}
.testGhost1 {
  background-color: #ffff00;
  display:inline-block;
  position:relative;
  min-width: 20px;
  min-height:20px;
}
.testGhost2 {
  background-color: #ff00ff;
  display:block;
  width:100%;
  min-width:1024px;
  min-height:60px;
} */
</style>

