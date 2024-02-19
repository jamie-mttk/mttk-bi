<template>
  <el-scrollbar class="entitity-tree" id="entityTreePanel" @dragover="allowDrop" @drop="handleDrop">

    <EntityNode v-for="node in treeNodes" :key="node.entity?.key" :modelValue="node" :id="'pn_' + node.entity?.key"
      :style="nodeStyle(node)" @nodeCommand="handleNodeCommand"></EntityNode>

  </el-scrollbar>
  <NodeEditDialog ref="nodeEditDialogRef"></NodeEditDialog>
  <ColumnChooseDialog ref="columnChooseDialogRef"></ColumnChooseDialog>
</template>
<script lang="ts" setup>
import { nextTick, computed, watch, ref } from 'vue'
import { parseNodes } from './entityTreeUtil'
import initJsPlumb from './initJsPlumb'
import EntityNode from './EntityNode.vue'
import NodeEditDialog from './edit//NodeEditDialog.vue'
import ColumnChooseDialog from './column/ColumnChooseDialog.vue'

const props = defineProps(['modelValue'])
//Parse tree nodes from node list
const treeNodes = computed(() => parseNodes(props.modelValue))
//Once nodes are changed, repaint UI
watch(
  () => treeNodes.value,
  () => {
    nextTick(() => initJsPlumb(treeNodes.value));
  }, {
  immediate: true, deep: true
})
//Node style - to display in the correct position
const nodeStyle = computed(() => {
  return function (node) {
    //
    const top = node.leafAbove * 64 + 32
    const left = node.level * 320 + 32
    // console.log(node.entity.key,node.entity.name,node.leafAbove,top)
    return { top: top + 'px', left: left + 'px', position: 'absolute' }
  }
})
//Basic edit
const nodeEditDialogRef = ref()
//Column choose
const columnChooseDialogRef=ref()
function handleNodeCommand(command, node) {
  if ('basic' == command) {
    nodeEditDialogRef.value.showEdit(node, props.modelValue)
  }else  if ('fields' == command) {
    columnChooseDialogRef.value.show(node.entity, props.modelValue)
  }

}
//
function allowDrop(ev) {
  ev.preventDefault();
}
function handleDrop(event) {
  const data = event.dataTransfer.getData('text')
  console.log(data)

  if (!data) {
    return
  }
  const json = JSON.parse(data)
  //
  nodeEditDialogRef.value.showAdd(json, props.modelValue)
}
</script>
<style lang="scss" >
.entitity-tree {

  width: 100%;
  min-height: 280px;
  height: 320px;

  // background-color: brown;
  .entityTreeLabel {
    color: var(--el-text-color-regular);
    cursor: pointer;
    font-size: 2em;
  }
}
</style>