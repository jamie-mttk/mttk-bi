<template>
  <div class="toolbar-table-container">
    <div class="lc-common-toolbar toolbar">
      <div class="left">下面表格可拖动排序或放到层级结构上</div>
      <el-button-group class="right">
        <el-button @click="handleModifyExpression()">
          <template #icon>
            <lc-icon icon="mdiCalculatorVariantOutline"></lc-icon> </template
          >增加计算字段
        </el-button>
        <el-button @click="showAddHierarchyDialog = true">
          <template #icon>
            <lc-icon icon="mdiFileTreeOutline"></lc-icon> </template
          >增加层级</el-button
        >
      </el-button-group>
    </div>
    <lcFullHeight>
      <el-table
        :data="modelValue.columns"
        style="width: 100%"
        row-key="key"
        border
        default-expand-all
        highlight-current-row
        row-class-name=""
        class="draggableTreeTable table-area"
        height="calc(100% - 16px)"
      >
        <el-table-column prop="" label="" width="32px"></el-table-column>
        <el-table-column prop="" label="拖拽" width="55px">
          <template #default>
            <span> <lc-icon class="isDragBox" icon="mdiDialpad"></lc-icon></span>
          </template>
        </el-table-column>

        <el-table-column prop="column" label="字段">
          <template #default="sp">
            <lc-icon
              :icon="fieldIcon(sp.row).icon"
              :tooltip="fieldIcon(sp.row).tooltip"
              size="1.2em"
              color="#A9A9A9"
              style="margin-right: 4px"
            >
            </lc-icon>
            {{ sp.row.column }}
          </template>
        </el-table-column>
        <el-table-column prop="label" label="名称">
          <template #default="sp">
            <el-input v-model="sp.row.label"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="entity" label="实体">
          <template #default="sp">
            {{ findEntity(modelValue, sp.row.entity)?.name }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型">
          <template #default="sp">
            <el-select v-model="sp.row.type" :disabled="true">
              <el-option label="表字段" value="field" />
              <el-option label="计算字段" value="expression" />
              <el-option label="层级结构" value="hierarchy" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="dataType" label="数据类型">
          <template #default="sp">
            <el-select v-model="sp.row.dataType" v-if="sp.row.type != 'hierarchy'">
              <el-option
                v-for="type in dataTypeList"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="expression" label="表达式">
          <template #default="sp">
            <el-input v-model="sp.row.expression" v-if="sp.row.type == 'expression'">
              <template #suffix>
                <lc-icon
                  icon="mdiPencilOutline"
                  style="cursor: pointer"
                  @click="handleModifyExpression(sp.row)"
                >
                </lc-icon>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="80px">
          <template #default="sp">
            <lc-icon
              icon="mdiTrashCanOutline"
              style="cursor: pointer"
              @click="handleDelete(sp.row)"
            ></lc-icon>
          </template>
        </el-table-column>
      </el-table>
    </lcFullHeight>
  </div>

  <AddExpressionDialog
    v-model="showAddExpressionDialog"
    v-model:data="editExpressionData"
    :model="modelValue"
    :callback="expressionDialogCallback"
  ></AddExpressionDialog>
  <AddHierarchyDialog
    v-model="showAddHierarchyDialog"
    :callback="hierarchyDialogCallback"
  ></AddHierarchyDialog>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, inject, computed } from 'vue'
import { useVModels } from '@vueuse/core'
import { tools, lcFullHeight } from 'mttk-lowcode-engine'
import { ElMessageBox } from 'element-plus'
import { smartMove, smartDelete } from './itemMoveUti'
import AddExpressionDialog from './AddExpressionDialog.vue'
import AddHierarchyDialog from './AddHierarchyDialog.vue'
import { dataTypeList } from '../../../../data'
import { findEntity, findColumnByKey, mergeJson } from '../../util/modelUtil'

//modelValue is field list
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//mdiFileTreeOutline
const fieldIcon = computed(() => (row) => {
  if (row.type == 'hierarchy') {
    return { icon: 'mdiFileTreeOutline', tooltip: '层级机构' }
  } else if (row.type == 'expression') {
    return { icon: 'mdiCalculatorVariantOutline', tooltip: '计算字段' }
  } else {
    return {}
  }
})
//
const showAddExpressionDialog = ref(false)
const editExpressionData = ref({})
function handleModifyExpression(data = {}) {
  editExpressionData.value = data

  showAddExpressionDialog.value = true
}
function expressionDialogCallback(data) {
  if (!data.key) {
    //New created
    data.key = 'e'+tools.createUniqueString()
    modelValue.value.columns.push(data)
  } else {
    //Edit
    const columnExist = findColumnByKey(modelValue?.value, data.key)
    //
    if (columnExist) {
      mergeJson(columnExist, data)
    }
  }

  //
  resetDragDrop()
}
//
const showAddHierarchyDialog = ref(false)

function hierarchyDialogCallback(data) {
  modelValue.value.columns.push(data)
  //
  resetDragDrop()
}
//Delete row
function handleDelete(row) {
  ElMessageBox.confirm('确定删除字段:' + row.label + '?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '放弃',
    type: 'warning'
  }).then(() => {
    smartDelete(row, modelValue?.value.columns)
    //
    resetDragDrop()
  })
}

//
//Drag and drop related
//
watch(
  () => modelValue.value.columns,
  () => {
    //once data is changed, reset Drag and drop
    resetDragDrop()
  },
  { immediate: true, deep: true }
)
//
let toIndex = -1
let fromIndex = -1

function resetDragDrop() {
  //Wait a tick is necessary sicne we are handling the raw DOM
  nextTick(() => {
    const dragBox = document.querySelectorAll('.draggableTreeTable .isDragBox')
    dragBox.forEach((rowDom, index) => {
      //
      // const item = smartFind(index, modelValue?.value.columns)
      // if (item.children && Array.isArray(item.children)) {
      //     //this is hierachy,not allow to drag but allow drop
      // } else {
      //     //
      // }
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
  evt.preventDefault()

  toIndex = index
}
function dragEndItem() {
  //
  smartMove(fromIndex, toIndex, modelValue?.value.columns)
  //Reset otherwise the table rows bind to wrong index/line no
  resetDragDrop()
}
</script>
<style scoped>
.isDragBox {
  cursor: move;
}
</style>
