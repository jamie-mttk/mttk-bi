<template>

<!-- Here we can NOT use el-scrollbar,otherwise the JsPlumb endpoint will not display in correct position   -->
<div class="entitity-tree" id="entityTreePanel" @dragover="allowDrop" @drop="handleDrop">
    <EntityNode v-for="node in treeNodes" :key="node.entity?.key" :modelValue="node" :id="'pn_' + node.entity?.key"
      :style="nodeStyle(node)" @nodeCommand="handleNodeCommand"></EntityNode>

  </div>
  <NodeEditDialog ref="nodeEditDialogRef"></NodeEditDialog>
  <ColumnChooseDialog ref="columnChooseDialogRef"></ColumnChooseDialog>
</template>
<script lang="ts" setup>
import { nextTick, computed, watch, ref,unref } from 'vue'
import { useVModels } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import { parseNodes } from './entityTreeUtil'
import initJsPlumb from './initJsPlumb'
import EntityNode from './EntityNode.vue'
import NodeEditDialog from './edit//NodeEditDialog.vue'
import ColumnChooseDialog from './column/ColumnChooseDialog.vue'
import {findRelationIndex,findEntityIndex,findColumnIndex} from '../../util/modelUtil'


const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)

//Parse tree nodes from node list
const treeNodes = computed(() => parseNodes(unref(modelValue)))
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
  }else  if ('delete' == command) {  
    ElMessageBox.confirm(
    '请问确定删除此节点吗?删除会删除实体、字段和关联',
    '警告',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(() => {
      handleDelete(node)
    })
  }

}
//Delete node
function handleDelete(node){
  //Delete relation
  if(node.relation){
    const index=findRelationIndex(modelValue.value,node.relation.source,node.relation.target)
    if(index>=0){
      modelValue.value.relations.splice(index,1)
    }
  }
  //Delete columns
  //try to delte 1000 times to avoid infinite loop
  for(let i=0;i<10000;i++){
    if(!tryDelete(node.entity.key)){
      //if no one left to delete,exit loop
      break;
    }
  }
  //Delete entity
  const index=findEntityIndex(modelValue.value,node.entity.key)
  if(index>=0){
    modelValue.value.entities.splice(index,1)
  }
}
//Delete one matching column,return true if find and deleted;if not found, return false
function tryDelete(entity){
  const index=findColumnIndex(modelValue.value,entity)
  if(index>=0){
    modelValue.value.columns.splice(index,1)
    //
    return true
  }else{
    return false
  }
}
//
function allowDrop(ev) {
  ev.preventDefault();
}
function handleDrop(event) {
  const data = event.dataTransfer.getData('text')


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
  position:absolute;
  // background-color: brown;
  .entityTreeLabel {
    color: var(--el-text-color-regular);
    cursor: pointer;
    font-size: 2em;
  }
}
</style>