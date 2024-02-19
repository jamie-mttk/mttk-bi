<template>
    <div>
        <div class="lc-common-toolbar">
            <div class="left"></div>
            <el-button-group class="right">
                <el-button> <template #icon>
                        <lc-icon icon="mdiCalculatorVariantOutline"></lc-icon>
                    </template>增加计算字段</el-button>
                <el-button> <template #icon>
                        <lc-icon icon="mdiFileTreeOutline"></lc-icon>
                    </template>增加层级</el-button>
            </el-button-group>
        </div>

        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="key" border default-expand-all
            highlight-current-row row-class-name="isDragBox" class="draggableTreeTable">
            <el-table-column prop="key" label="字段" />
            <el-table-column prop="label" label="名称">
                <template #default="sp">
                    <el-input v-model="sp.row.label"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="字段类型">
                <template #default="sp">
                    <el-select v-model="sp.row.type" :disabled="true" suffix-icon="">
                        <el-option label="数据字段" value="field" />
                        <el-option label="计算字段" value="expression" />
                        <el-option label="层级结构" value="hierarchy" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="dataType" label="数据类型">
                <template #default="sp">
                    <el-select v-model="sp.row.dataType" v-if="sp.row.type != 'hierarchy'">
                        <el-option label="文本" value="string" />
                        <el-option label="整数" value="integer" />
                        <el-option label="数字" value="number" />
                        <el-option label="日期时间" value="datetime" />
                        <el-option label="时间" value="time" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="expression" label="表达式">
                <template #default="sp">
                    <el-input v-model="sp.row.expression"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="80px">
                <template #default="sp">
                    <lc-icon icon="mdiTrashCanOutline" style="cursor: pointer;"></lc-icon>
                </template>
            </el-table-column>
        </el-table>
        {{ tableData }}
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { smartMove, smartFind } from '../test1/itemMoveUti'
import { dm1 } from './data'

const tableData = reactive(dm1.columns)
//

//
let toIndex = -1
let fromIndex = -1

onMounted(() => {

    resetDragDrop();

})

function resetDragDrop() {
    //Wait a tick is necessary sicne we are handling the raw DOM
    nextTick(() => {
        const dragBox = document.querySelectorAll('.draggableTreeTable .isDragBox')
        dragBox.forEach((rowDom, index) => {
            //
            const item = smartFind(index, tableData)
            if (item.children && Array.isArray(item.children)) {
                //this is hierachy,not allow to drag but allow drop
            } else {
                //
            }
            rowDom.setAttribute('draggable', 'true')
            rowDom.ondragstart = () => dragStartItem(index)
            rowDom.ondragover = (evt) => dragOverItem(index, evt)
            rowDom.ondragend = () => dragEndItem()
        })
    })
}
function dragStartItem(index) {

    fromIndex = index
}
function dragOverItem(index, evt) {
    // console.log('dragOverItem',index,evt)
    evt.preventDefault();

    toIndex = index
}
function dragEndItem() {
    // 
    smartMove(fromIndex, toIndex, tableData)
    //Reset otherwise the table rows bind to wrong index/line no
    resetDragDrop()
}


</script>
<style scoped>
.isDragBox {
    cursor: move;
}
</style>