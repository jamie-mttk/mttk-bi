<template>
    <div>
        <div class="lc-common-toolbar">
            <div class="left">下面表格可拖动排序或放到层级结构上</div>
            <el-button-group class="right">
                <el-button @click="refreshFields"> <template #icon>
                        <lc-icon icon="mdiReload"></lc-icon>
                    </template>刷新字段 </el-button>

                <el-button @click="showAddExpressionDialog = true"> <template #icon>
                        <lc-icon icon="mdiCalculatorVariantOutline"></lc-icon>
                    </template>增加计算字段 </el-button>
                <el-button @click="showAddHierarchyDialog = true"> <template #icon>
                        <lc-icon icon="mdiFileTreeOutline"></lc-icon>
                    </template>增加层级</el-button>

            </el-button-group>
        </div>

        <el-table :data="modelValue.columns" style="width: 100%; margin-bottom: 20px" row-key="key" border
            default-expand-all highlight-current-row row-class-name="isDragBox" class="draggableTreeTable">
            <el-table-column prop="key" label="字段" >
                <template #default="sp">
                <lc-icon :icon="fieldIcon(sp.row)"  size="1.2em" color="#A9A9A9" style="margin-right:4px"> </lc-icon>
                {{sp.row.key  }}
                </template>
                </el-table-column>
            <el-table-column prop="label" label="名称">
                <template #default="sp">
                    <el-input v-model="sp.row.label"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="字段类型">
                <template #default="sp">
                    <el-select v-model="sp.row.type" :disabled="true" suffix-icon="">
                        <el-option label="表字段" value="field" />
                        <el-option label="计算字段" value="expression" />
                        <el-option label="层级结构" value="hierarchy" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="dataType" label="数据类型">
                <template #default="sp">
                    <el-select v-model="sp.row.dataType" v-if="sp.row.type != 'hierarchy'">
                        <el-option v-for="type in dataTypeList" :key="type.value" :label="type.label" :value="type.value" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="expression" label="表达式">
                <template #default="sp">
                    <el-input v-model="sp.row.expression" v-if="sp.row.type == 'expression'"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="80px">
                <template #default="sp">
                    <lc-icon icon="mdiTrashCanOutline" style="cursor: pointer;" @click="handleDelete(sp.row)"></lc-icon>
                </template>
            </el-table-column>
        </el-table>

        <AddExpressionDialog v-model="showAddExpressionDialog" :callback="handleAddExpression"></AddExpressionDialog>
        <AddHierarchyDialog v-model="showAddHierarchyDialog" :callback="handleAddHierarchy"></AddHierarchyDialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, inject,computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { smartMove, smartFind, smartDelete } from './itemMoveUti'
import AddExpressionDialog from './AddExpressionDialog.vue'
import AddHierarchyDialog from './AddHierarchyDialog.vue'
import { dataTypeList } from './data'

import { useVModels } from '@vueuse/core'
//
const globalContext = inject('globalContext')

//modelValue is field list
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//mdiFileTreeOutline
const fieldIcon=computed(()=>(row)=>{ 
    if(row.type=='hierarchy'){
        return 'mdiFileTreeOutline'
    }else if(row.type=='expression'){
        return 'mdiCalculatorVariantOutline'
    }else{
        return ''
    }
})
//
const showAddExpressionDialog = ref(false)
function handleAddExpression(data) {
    modelValue.value.columns.push(data)
    //
    resetDragDrop();
}
//
const showAddHierarchyDialog = ref(false)
function handleAddHierarchy(data) {
    modelValue.value.columns.push(data)
    //
    resetDragDrop();
}
//Delete row
function handleDelete(row) {
    ElMessageBox.confirm(
        '确定删除字段:' + row.key + '?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '放弃',
            type: 'warning',
        }
    )
        .then(() => {
            smartDelete(row, modelValue?.value.columns)
            //
            resetDragDrop();
        })

}
function refreshFields() {
    ElMessageBox.confirm(
        '刷新字段会用数据库中字段替换当前所有字段,层级字段和计算字段会保留,是否继续?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '放弃',
            type: 'warning',
        }
    )
        .then(() => {
            //
            //
            globalContext.request({
                method: "POST",
                url: '/dataModel/loadFields',
                data: modelValue.value,
            }).then(function (response) {
                refreshFieldsInternal(response.data)
                //
                resetDragDrop();
            });
        })
}
function refreshFieldsInternal(fields) {
    //clear existing type fields
    clearColumns(modelValue.value.columns);
    //add all fields
    for (const field of fields) {
        //
        field.type = 'field'
        //
        modelValue.value.columns.push(field)
        //
        // console.log('####',field)
    }
}
//remove all the fields of type field
function clearColumns(columns) {
    for (let i = columns.length; i--; i >= 0) {
        const field = columns[i];
        // console.log(i, field, field.type)
        if (field.type == 'field') {
            columns.splice(i, 1)
            continue;
        }
        //
        if (field.children && Array.isArray(field.children) && field.children.length > 0) {
            //
            clearColumns(field.children);
        }
    }
}
//
//Drag and drop related
//
watch(
    () => modelValue.value.columns,
    () => {
        //once data is changed, reset Drag and drop
        resetDragDrop();
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
    evt.preventDefault();

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