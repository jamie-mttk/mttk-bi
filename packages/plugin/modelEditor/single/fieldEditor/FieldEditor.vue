<template>
  <div class="toolbar-table-container">
    <div class="lc-common-toolbar toolbar">
      <div class="left">{{ $t('bi.plugin.modelEditor.single.fieldEditor.prompt') }}</div>
      <el-button-group class="right">

        <el-button @click="handleModifyExpression()">
          <template #icon>
            <lc-icon icon="mdiCalculatorVariantOutline"></lc-icon> </template
          >{{$t('bi.plugin.modelEditor.single.fieldEditor.addExpression')}} 
        </el-button> 
        <!-- Add hierachy can only used to organize field? Remove this feature and reconsider!-->
<!--         
        <el-button @click="showAddHierarchyDialog = true">
          <template #icon>
            <lc-icon icon="mdiFileTreeOutline"></lc-icon> </template
          >{{$t('bi.plugin.modelEditor.single.fieldEditor.addHierarchy')}}</el-button
        > -->
      </el-button-group>
    </div>
    
      <el-table
        :data="modelValue.columns"
        style="width: 100%"
        row-key="key"
        border
        default-expand-all
        highlight-current-row
        row-class-name=""
        class="draggableTreeTable table-area"
        v-fullHeight="8"
      >
        <el-table-column prop="" label="" width="32px"></el-table-column>
        <el-table-column prop="" :label="$t('bi.plugin.modelEditor.single.fieldEditor.drag')" width="60px">
          <template #default>
            <span> <lc-icon class="isDragBox" icon="mdiDialpad"></lc-icon></span>
          </template>
        </el-table-column>

        <el-table-column prop="column" :label="$t('bi.plugin.modelEditor.single.fieldEditor.field')">
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
        <el-table-column prop="label" :label="$t('_._.name')">
          <template #default="sp">
            <el-input v-model="sp.row.label"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="entity" :label="$t('bi.plugin.modelEditor.single.fieldEditor.entity')">
          <template #default="sp">
            {{ findEntity(modelValue, sp.row.entity)?.name }}
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('bi.plugin.modelEditor.single.fieldEditor.type')">
          <template #default="sp">
            <el-select v-model="sp.row.type" :disabled="true">
              <el-option :label="$t('bi.plugin.modelEditor.single.fieldEditor.field')" value="field" />
              <el-option :label="$t('bi.plugin.modelEditor.single.fieldEditor.expression')" value="expression" />
              <el-option :label="$t('bi.plugin.modelEditor.single.fieldEditor.hierarchy')" value="hierarchy" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="dataType" :label="$t('bi.plugin.modelEditor.single.fieldEditor.dataType')">
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
        <el-table-column prop="expression" :label="$t('bi.plugin.modelEditor.single.fieldEditor.expression')">
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
        <el-table-column prop="" :label="$t('_._.operation')" width="100px">
          <template #default="sp">
            <lc-icon
              icon="mdiTrashCanOutline"
              style="cursor: pointer"
              @click="handleDelete(sp.row)"
            ></lc-icon>
          </template>
        </el-table-column>
      </el-table>
   
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
import { ref, watch, nextTick,  computed } from 'vue'
import { useVModels } from '@vueuse/core'
import { tools, vFullHeight,locale } from 'mttk-lowcode-engine'
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
    return { icon: 'mdiFileTreeOutline', tooltip: locale.t('bi.plugin.modelEditor.single.fieldEditor.hierarchy') }
  } else if (row.type == 'expression') {
    return { icon: 'mdiCalculatorVariantOutline', tooltip: locale.t('bi.plugin.modelEditor.single.fieldEditor.expression') }
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
  ElMessageBox.confirm(locale.t('bi.plugin.modelEditor.single.fieldEditor.deleteConfirm',[row.label]), 
  locale.t('_._.warning'), {
    confirmButtonText: locale.t('_._.ok'),
    cancelButtonText: locale.t('_._.cancel'),
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
