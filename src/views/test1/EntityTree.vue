<template>
    <el-scrollbar class="entitity-tree" id="entityTreePanel">

        <EntityNode v-for="node in treeNodes" :key="node.entity.key" :modelValue="node" :id="'pn_' + node.entity.key"
            :style="nodeStyle(node)"></EntityNode>

    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import initJsPlumb from './initJsPlumb'
import EntityNode from './EntityNode.vue'
const props = defineProps(['modelValue'])
//
const treeNodes = allNodes(props.modelValue)

onMounted(() => {
    initJsPlumb(treeNodes);

})


//Get all the nodes in the tree
function allNodes(tree) {
    const result = [tree]
    //
    allNodesInternal(result, tree.children)
    return result;
}
function allNodesInternal(result, nodes) {
    for (const node of nodes) {
        result.push(node)
        //
        allNodesInternal(result, node.children)
    }
}
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

</script>
<style lang="scss" >
.entitity-tree {

    width: 100%;
    min-height: 280px;
    height:320px;
    // background-color: brown;
    .entityTreeLabel{
        // background-color: red;
        cursor: pointer;
        font-size: 2em;
    }
}
</style>