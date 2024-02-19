<template>
  <el-table ref="dragTable" :data="tableData" style="width: 100%" border fit highlight-current-row
    :row-class-name="activeClass" class="outputTable">
    <el-table-column label="日期" width="180">
      <template #default="{ row }">
        <span>{{ row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template #default="{ row }">
        <span>{{ row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column label="拖拽">
      <template #default>
        <span style="cursor: pointer;" class="el-icon-setting">MOVE</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted, nextTick } from 'vue'


const dragTable = ref(null)
//
let newDragIndex=undefined
let dragIndex=undefined

function activeClass({ row, rowIndex }) {
  // console.log(rowIndex === newDragIndex,rowIndex , newDragIndex)
  if (rowIndex === newDragIndex) {
    return 'isDragBox active-drag'
  }
  return 'isDragBox'
}
onMounted(() => {
  nextTick(() => {
    const dragBox = document.querySelectorAll('.outputTable .isDragBox')
    dragBox.forEach((i, idx) => {
      i.setAttribute('draggable', 'true')
      i.ondragstart = () => dragStartItem(idx)
      i.ondragover = (evt) => dragOverItem(idx,evt)
      i.ondragend = () => dragEndItem()
    })
  })

})
function dragStartItem(idx) {
  console.log('dragStartItem',idx)
  dragIndex = idx
}
function dragOverItem(index,evt) {
  console.log('dragOverItem',index,evt)
  evt.preventDefault();

 newDragIndex = index
}
function dragEndItem() {
  console.log('dragEndItem')
  const data = tableData[dragIndex]
  tableData.splice(dragIndex, 1)
  tableData.splice(newDragIndex, 0, data)
  // newDragIndex=-1
}










const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
</script>

<style>
.isDragBox{
    cursor: move;
    position: relative;
}
.active-drag{
     position: relative;
      &::after {
        content: '';
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #4B79F3;
        z-index:99;
  }
}
</style>