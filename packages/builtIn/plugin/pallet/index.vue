<script setup lang="ts">
import { ref, computed, inject } from 'vue'

import PalletItem from "./PalletItem.vue";
import { VueDraggable } from 'vue-draggable-plus'
import { cloneComponent } from '@/components/panel/PanelUtil'
//
const globalContext= inject('globalContext')
const context = inject('context')
//

//
const components = context.appContext.getCode().components || []
//Filter pallet item 
const filter = ref('')
//folder list
const folders = computed(() => {
  if (context.appContext.getCode().customizeComponent) {
    return components.filter(item => item.type == 'folder').map(item => globalContext.componentRepository.folderByKey(item.key))
  } else {
    return globalContext.componentRepository.componentFolders()
  }
})
//

//First open this folder
const initOpenedFolder = folders.value.length > 0 ? folders.value[0].key : undefined

//
// let lastComponent = ref({})
//
const componentsByFolderReal = computed(() => function (folder: string) {
  let componentsOfFolder = globalContext.componentRepository.componentsByFolder(folder)
  if (filter.value) {
    //Filter it 
     componentsOfFolder=componentsOfFolder.filter(item => { return strMatchFilter(item.key) || strMatchFilter(item.name) || strMatchFilter(item.description) })
  }
  //
  if (context.appContext.getCode().customizeComponent) {
    //return compnents which are in app allowed components list
    componentsOfFolder=componentsOfFolder.filter(c=>!!components.find(item=>item.type=='component' && item.key==c.key))
  }
  //
  return componentsOfFolder
})
//Whethter the str match the filter
function strMatchFilter(str: string) {
  if (!str) {
    //
    return false;
  }
  return str.indexOf(filter.value) >= 0
}
//Save component key to get the dropped component later
function handleSetData(dataTransfer, el) {
  // console.log('WOW',el,el.dataset.pallet,el.getAttribute('data-pallet'))
  dataTransfer.setData('text/plain', el.dataset.pallet)
  // console.log(arguments)
}

// function handleStart(){
//   console.log('handleStart',arguments)
// }


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
//   context.choosedManager.set(undefined)

// }
// function onEnd() {
//   //Set the current
//   context.choosedManager.set(lastComponent.value)
// }
function cloneComponentPallet(component) {
  return cloneComponent(context, component)
}

</script>

<template>
  <div>
    <el-input v-model="filter" placeholder="Input to filter pallet item" style="margin-bottom:8px;"></el-input>
    <el-collapse accordion :model-value="initOpenedFolder">
      <el-collapse-item v-for="folder in folders" :key="folder.key" :name="folder.key">
        <template #title>
          <span style="font-size:1.1em;">{{ folder.name }}</span>
        </template>
        <!-- <draggable :modelValue="componentsByFolderReal(folder.key)"
          :group="{ name: 'components', pull: 'clone', put: false }" :empty-insert-threshold="1000" item-key="key"
          :clone="cloneComponent" class="el-row">
          <template #item="{ element }">
            <el-col :span="8" style="margin: 0.8em 0;">
              <PalletItem :config="element"></PalletItem>
            </el-col>
          </template>
        </draggable> -->
        <VueDraggable :modelValue="componentsByFolderReal(folder.key)"
          :group="{ name: 'components', pull: 'clone', put: false }" :empty-insert-threshold="1000" item-key="key"
          :clone="cloneComponentPallet" class="el-row" :setData="handleSetData">
          <!-- <el-col v-for="item in componentsByFolderReal(folder.key)" :key="item.key" :span="8" style="margin: 0.8em 0;" :data-pallet="item.key"> -->
          <el-col v-for="item in componentsByFolderReal(folder.key)" :key="item.key" :span="8" style="margin: 0.8em 0;"
            :data-pallet="item.key">
            <PalletItem :config="item"></PalletItem>
          </el-col>

        </VueDraggable>

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

