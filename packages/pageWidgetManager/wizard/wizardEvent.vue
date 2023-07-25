<template>
       <div>
        <el-alert title="Map the event of internal component to component to created." type="success"
            style="margin-bottom: 10px;" />
        <el-table ref="wizardEventTableRef" :data="tableData" style="width: 100%">
            <el-table-column property="ui" label="UI component" />
            <el-table-column property="event" label="Original event" />
            <el-table-column property="eventRaise" label="Event to raise" />
            <el-table-column label="Operation" >
                <template #default="sp">
                <el-button-group>
                    <el-button @click="handleAdd">Add</el-button>
                    <el-button @click="handleEdit(sp)">Edit</el-button>
                    <el-button @click="handleDelete(sp)">Delete</el-button>
                </el-button-group>
                </template>
            </el-table-column>
            <template #empty>
                <el-button @click="handleAdd">Add a new event mapping</el-button>
            </template>
        </el-table>
       
        <WizardEventDialog ref="wizardEventDialogRef"></WizardEventDialog>
    </div>
</template>
<script setup lang="ts">
import { ref,} from 'vue'
import { ElMessageBox } from 'element-plus'
import {deepCopy,createUniqueString} from '@/utils/tools'
import WizardEventDialog from './wizardEventDialog.vue'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    }
})
//
const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
}>()
//
const tableData=ref(props.modelValue.events)
//
const wizardEventDialogRef=ref()
//The row index editing
let editingIndex=-1
//
function handleAdd(){
  editingIndex=-1
   //
   wizardEventDialogRef.value.show({key:createUniqueString()},props.modelValue,callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  wizardEventDialogRef.value.show(rowCopied,props.modelValue,callback)
}

const callback=(dataNew:Object)=>{
  if(editingIndex<0){
    //add
    tableData.value.push(dataNew)
  }else{
    //edit
    tableData.value[editingIndex]=dataNew
  }
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    'Will you want to delte this event',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    }
  )
    .then(() => {
     //
     tableData.value.splice(sp.$index,1);
    })
}


//
function beforeClose(done) {   
    //
    const d = props.modelValue
    d.events = tableData.value
    //
    emit('update:modelValue', d)
    //
    done();
}
//
defineExpose({ beforeClose })
</script>
  