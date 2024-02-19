<template>
  <el-table :data="tableData" border>
    <el-table-column prop="key" label="Key" />
    <el-table-column prop="description" label="Description" />
    <el-table-column fixed="right" label="Operations" width="220px">
      <template #default="sp">
        <el-button-group>
          <el-button type="primary" @click="handleAdd()">Add</el-button>
          <el-button type="success" @click="handleEdit(sp)">Edit</el-button>
          <el-button type="danger" @click="handleDelete(sp)">Delete</el-button>

        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
      Please <el-button type="primary" @click="handleAdd()">Add</el-button> a new record
    </template>
  </el-table>

  <MethodEditorDialog ref="methodEditorDialogRef"></MethodEditorDialog>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import MethodEditorDialog from './MethodEditorDialog.vue'


import { deepCopy } from '@/utils/tools'
//Refer to the popup dialog
const methodEditorDialogRef = ref()

//The row index editing
let editingIndex = -1
//
const context = inject('context')
//
function handleAdd() {
  editingIndex = -1
  //
  methodEditorDialogRef.value.show({
    paras: [{
      "key": "contextWrap",
      "type": "Object"
    }], code: ''
  }, callback)
}
function handleEdit(sp) {
  editingIndex = sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  methodEditorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  if (editingIndex < 0) {
    //add
    tableData.value.push(dataNew)
  } else {
    //edit
    tableData.value[editingIndex] = dataNew
  }
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this method',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
      //
      tableData.value.splice(sp.$index, 1);
    })

}

//table data
const tableData = computed(() => {
  return context.codeManager.getCode().methods
})


</script>
