<script setup lang="ts">
import { onMounted, inject } from 'vue'
import FlexCanvas from './flex/FlexCanvas.vue'
import DraggableCanvas from './absolute/DraggableCanvas.vue'

//
const model = defineModel({ type: Array, default: [] })
const context = inject('context')
//
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
})
</script>

<template>
  <FlexCanvas
    v-if="context.componentManager.renderMode.value == 'flex'"
    v-bind="$attrs"
    v-model="model" >

  </FlexCanvas>
  <DraggableCanvas
    v-else
    v-bind="$attrs"
    v-model="model"
  >
  </DraggableCanvas>
</template>

<style lang="scss" scoped>
.wrap-group {
  min-height: 32px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .draggable-header {
    min-height: 128px;
    width: 100%;

    background-color: var(--el-fill-color-lighter);
    margin: 1px;
  }

  //   background-color: #00ffff;
  // border: 1px groove #E0E0E0;
  .draggable-item {
    min-height: 32px;
  }
}

// .wrap-group:hovor {
//  // border: 1px solid #ff0000;
// }

// .component-ghost{
//   background-color: #00ffff;
//   border: 1px solid #ff0000;
// }
</style>
