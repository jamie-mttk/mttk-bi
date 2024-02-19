<script setup lang="ts">
import { computed, inject } from 'vue'


import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type {
  AllowDropType,
  NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type'
import { buildTreeData } from '@/utils/componentUtil'
//
//
const globalContext=inject('globalContext')
const context = inject('context')
//
// const components = computed(() => {
//   return context.codeManager.getCode().ui || []
// })
//
//root - Root node of the UI, this is a virtual node
//component - simple component(button) or complex component(tabs)
//container - the container node of complex node,el-tabs/layout(el-row/el-col)/el-collapse
//slot     - the _container component,it is under component, for example the slots of el-card
//inner|pre/next is for drop
//nodeType        allowDrag       inner      prev/next
//root            F               T           F
//component       T               *          T
//container       F               T           F
//slot           F               T           T
//* if there is default slot,return true;otherwise return false
const sourceData = computed(() => {
  return buildTreeData(context.codeManager.getCode(),globalContext.componentRepository);
})



//
function handleNodeClick(node) {
  context.choosedManager.set(node.data)
}

//
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
    // console.log(draggingNode.key+'==>'+ dropNode.key, dropType)
  context.componentManager.move(draggingNode.key, dropNode.key, dropType)
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {

  if (type == 'inner') {
    if (dropNode.data.nodeType == 'component') {
      // console.log(!!dropNode.data?.data?.config?.basic?._slot?.default,dropNode.data.data.key,dropNode.data.data)
      return !!dropNode.data?.data?.config?.basic?._slot?.default
    } else {
      return true;
    }
    // console.log('11:'+JSON.stringify(dropNode.data.nodeType))
    // return dropNode.data.nodeType != 'component'
  } else {
    return dropNode.data.nodeType == 'component' || dropNode.data.nodeType == 'slot'
  }
}
const allowDrag = (draggingNode: Node) => {
  //console.log(draggingNode.data.label+'~~'+draggingNode.data.allowDrag)
  return draggingNode.data.nodeType == 'component'
}
</script>

<template>
  <el-tree :data="sourceData" :highlight-current="true" draggable node-key="key" :default-expanded-keys="['_root']"
    @node-click="handleNodeClick" @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag">
    <template #default="{ node, data }">
      <span>
        <lc-icon :icon="node.data.icon"></lc-icon>
        <span style="margin-left:16px;">{{ node.label }}</span>
      </span>
    </template>
  </el-tree>
</template>


<style lang="scss" scoped></style>