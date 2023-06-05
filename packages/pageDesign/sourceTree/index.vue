<script setup lang="ts">
import { computed, inject } from 'vue'


import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type {
  AllowDropType,
  NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type'

//
//
const context = inject('context')
//
const components = computed(() => {
  return context.codeManager.getCode().ui || []
})
//
//root - Root node of the UI, this is a virtual node
//component - simple component(button) or complex component(tabs)
//container - the container node of complex node
//panel     - the _container component,it is a little different with component
//nodeType        allowDrag       inner       prev/next
//root            F               T           F
//component       T               F           T
//container       F               T           F
//panel           T               T           T

const sourceData = computed(() => {
  return  buildTreeNodes(components.value);
})
//build tree nodes from array
//retur undefined if vv is not an array
function buildTreeNodes(vv) {
  //
  if (!Array.isArray(vv) || vv.length <= 0) {
    return undefined;
  }
  const nodes = []
  //
  for (const v of vv) {
    const node = buildTreeNode(v)
    if (!node) {
      continue;
    }
    //
    nodes.push(node)
    //check _container- _children  level
    if (v.config?.props && v.config.props['_container']
      && Array.isArray(v.config.props['_container']) && v.config.props['_container'].length > 0) {
      //
      node.children = []
      //
      for (const c of v.config.props['_container']) {
        //Please note the data is set to v,so once tree node clicked the layout/tabs will be choosed
        const container = { label: c.label || c.span || '##', data: v, key: c.key, icon: 'Folder',nodeType:'container' }
        node.children.push(container)
        //
        const children = buildTreeNodes(c['_children']);
        if (children) {
          container.children = children
        }
      }
    }
    //Check _children level (No _container level)
    if (v.config?.props && v.config.props['_children']
      && Array.isArray(v.config.props['_children']) && v.config.props['_children'].length > 0) {
      node.children = buildTreeNodes(v.config.props['_children']);
    }
  }
  //
  return nodes;
}
//Build tree node,return undefined if it can not be built
function buildTreeNode(v) {
  if (!v.key) {
    return undefined;
  }
  //console.log(JSON.stringify(v))
  //
  return { label: v.config?.props?.label || v.key, icon: findComponentIcon(v.type), key: v.key, data: v, nodeType: v.type == '_container' ? 'panel' : 'component' }
}
//
function findComponentIcon(type: string) {  
  const component = context.repositoryManager.componentByKey(type)
  return component?.icon || 'Handbag'
}
//
function handleNodeClick(node) {
  context.choosedManager.setChoosed(node.data)
}

//
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  //console.log(draggingNode.label+'==>'+ dropNode.label, dropType)
  context.codeManager.moveComponent(draggingNode.key, dropNode.key, dropType)
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (type == 'inner') {
    // console.log('11:'+JSON.stringify(dropNode.data.nodeType))
    return dropNode.data.nodeType != 'component'
  } else {
    return dropNode.data.nodeType == 'component' || dropNode.data.nodeType == 'component'
  }
}
const allowDrag = (draggingNode: Node) => {
  //console.log(draggingNode.data.label+'~~'+draggingNode.data.allowDrag)
  return draggingNode.data.nodeType == 'component' || draggingNode.data.nodeType == 'panel'
}
</script>

<template>

  <el-tree :data="sourceData" :highlight-current="true" draggable node-key="key" :default-expanded-keys="['_ROOT']"
    @node-click="handleNodeClick" @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag">
    <template #default="{ node, data }">
      <span>


        <span> <el-icon class="icon">
            <component :is="node.data.icon" />
          </el-icon></span>
        <span style="margin-left:16px;">{{ node.label }}</span>
      </span>
    </template>
  </el-tree>
</template>


<style lang="scss" scoped></style>