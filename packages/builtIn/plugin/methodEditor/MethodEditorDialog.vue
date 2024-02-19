<template>
    <el-dialog v-model="dialogVisible" title="Method editor" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">


            <el-form-item label="Key" prop="key" required>
                <el-input v-model="formData.key" />
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="Parameters" prop="paras" class="draggable-dummy">
                <el-table :data="formData.paras" style="width: 100%" row-key="key">
                    <el-table-column  label="Drag">
                        <lcIcon icon="mdiDrag" class="table-drag-handle" size="2em"></lcIcon>
                        </el-table-column>
                  
                    <el-table-column prop="key" label="Key" />
                    <el-table-column prop="description" label="Description" />
                    <el-table-column prop="type" label="Data type" />
                    <el-table-column fixed="right" label="Operations" width="240px">
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
            </el-form-item>
            <el-form-item prop="code">
                <template #label>
                    <el-popover placement="bottom" title="How to use" :width="640" trigger="click"
                        content="this is content, this is content, this is content">
                        <template #reference>
                            <span> Code <lcIcon icon="mdiHelpCircleOutline" size="1.2em"></lcIcon></span>
                        </template>
                        The first parameter of method is c which is page context.<br>
                        If the parameter names are provided above, you can use it directly.<br>
                        Otherwise,argument names will be set to arg0/arg1...<br>
                        And please also note, if method is triggered by event, warpContext will be added automatically.<br>
                        You need to set parameter name manually,otherwise it is arg0
                        as the second parameter after context.
                    </el-popover>
                </template>
                <b-ace-editor v-model="formData.code" lang="javascript" width="100%" height="40vh" :readonly="false"
                    :font-size="14"></b-ace-editor>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                    Save
                </el-button>
                <!-- <el-button @click="test">Test</el-button> -->
            </span>
        </template>
    </el-dialog>
    <MethodParaEditorDialog ref="methodParaEditorDialogRef"></MethodParaEditorDialog>
</template>
  
<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import MethodParaEditorDialog from './MethodParaEditorDialog.vue'
import { deepCopy } from '@/utils/tools'
import lcIcon from '@/components/icon/index.vue'
import Sortable from 'sortablejs'
//The row index editing
let editingIndex = -1
const methodParaEditorDialogRef = ref()

//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {
    // console.log('DATA SET TO '+JSON.stringify(data))
    formData.value = data
    callbackSaved = callback;
    dialogVisible.value = true
    //
    nextTick(()=>rowDraggable())
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function;
//
const dataEditorFormRef = ref<FormInstance>()
//
//
function handleAdd() {
    editingIndex = -1
    //
    methodParaEditorDialogRef.value.show({}, callback)
}
function handleEdit(sp) {
    editingIndex = sp.$index
    //Deep copy to avoid form to change the table data directly
    const rowCopied = deepCopy(sp.row)
    methodParaEditorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
    if (editingIndex < 0) {
        //add
        formData.value.paras.push(dataNew)
    } else {
        //edit
        formData.value.paras[editingIndex] = dataNew
    }
}
//Delete
const handleDelete = (sp) => {
    //
    formData.value.paras.splice(sp.$index, 1);
}
//
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            //
            dialogVisible.value = false
            //
            if (callbackSaved) {
                callbackSaved(formData.value)
            }
        }
    })
}
//Make table row draggable
function rowDraggable() {
        //Prevent firefox to open new page once item is dropped
        document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };

    // console.log('bbbb',document.querySelector('.draggable-dummy'))
    const tbody = document.querySelector('.draggable-dummy .el-table__body tbody')
    // console.log('aaaa',tbody)
    if(!tbody){
        console.log('no table is found,drag and drop disabeld')
        return
    }
    Sortable.create(tbody, {
        handle: '.table-drag-handle', // handle's class
        animation: 150,
        onEnd({ newIndex, oldIndex }) {

            const currRow = formData.value.paras.splice(oldIndex, 1)[0]
            formData.value.paras.splice(newIndex, 0, currRow)
        }
    })
}
// function test(){
//     rowDraggable()
// }

//
defineExpose({ show })
</script>
<style scoped></style>
  