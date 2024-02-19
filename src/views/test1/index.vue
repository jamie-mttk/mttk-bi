<template>
  <el-button @click="test1">TEST 1</el-button>
  <el-button @click="test2">TEST 2</el-button><br><br>
  <EntityTree :modelValue="tree"></EntityTree>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { dm1, dm2 } from './data'

import EntityTree from './EntityTree.vue'
// import {tools} from 'mttk-lowcode-engine'
//
const modelValue = reactive(dm2)
const tree = buildTree(modelValue)
applyLeafCount(tree)
applyLeafAbove([tree])
//
// console.log(showTree(tree))
//
function test1() {


 
}
function test2() {

}
function showTree(node) {
  let result = ''
  for (let i = 0; i < node.level; i++) {
    result = result + ' '
  }
  //
  result = result + node.entity.key+'['+node.entity.name+']' + '~' + node.leafCount + '==>' + node.leafAbove + '\r\n'
  //
  for (const nd of node.children) {
    result = result + showTree(nd)
  }



  //
  return result
}

//Calculate the tree leaf count
//Recursive call may has stack error if the stack is too high
function applyLeafCount(node) {
  if (node.children.length == 0) {
    node.leafCount = 1
    return 1
  }
  //
  let count = 0
  for (const child of node.children) {
    count += applyLeafCount(child)
  }
  node.leafCount = count
  return count;
}

//Calculate the left above this node, in fact ,it is the row the node to display in the tree
function applyLeafAbove(nodes) {
  if (nodes.length == 0) {
    return
  }
  //The initial value if the parent's leftAbove or 1(if no parent)
  let count = nodes[0].parent?.leafAbove || 0
  for (const node of nodes) {
    node.leafAbove = count

    //Please note , set leaf above first and then count
    // console.log(count,node.leafCount, count+node.leafCount)
    count += node.leafCount
    // console.log(count)
    applyLeafAbove(node.children)
  }

}


//Convert data model tables to tree structure
function buildTree(modelValue) {
  //root is the first entity
  const entities = modelValue.entities || []
  if (entities.length <= 0) {
    //No entity,return directly
    return
  }
  //
  const root = { entity: entities[0], parent: undefined, level: 0, relation: undefined, children: [] }
  //
  applyChildren(modelValue, root)
  //
  return root;
}
function applyChildren(modelValue, parent) {
  for (const relation of modelValue.relations || []) {
    //

    if (relation.source == parent.entity.key) {
      //
      const entity = findEntity(modelValue, relation.target)
      if (!entity) {
        //no entity found, maybe it is delete but the relation is not removed
        continue;
      }
      const node = { entity, parent, level: parent.level + 1, relation: relation, children: [] }
      parent.children.push(node)
      //
      applyChildren(modelValue, node)
    }
  }
}

function findEntity(modelValue, key) {
  for (const entity of modelValue.entities || []) {
    if (entity.key == key) {
      return entity
    }
  }
}

</script>

<style></style>
