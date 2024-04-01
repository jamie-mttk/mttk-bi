<template>
    <el-dialog v-model="dialogVisible" title="模型实体编辑" width="75%" :close-on-click-modal="false"
        :close-on-press-escape="false" :draggable="true">
        <el-row :gutter="16">
            <el-col :span="14">
                <NodeEditBasic v-model="dataBasic" ref="nodeEditBasicRef"></NodeEditBasic>
            </el-col>
            <el-col :span=10>
                <NodeEditJoin v-model="dataJoin" :model="modelSaved" :isEditing="isEditing" :dataBasic="dataBasic"
                    ref="nodeEditJoinRef">
                </NodeEditJoin>
            </el-col>
        </el-row>
        <template #footer>

            <span class="dialog-footer">
                <el-switch v-model="useRemarkAsName" style="margin-right:64px" active-text="导入时字段名称使用数据库中字段备注" />
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue'
import NodeEditBasic from './NodeEditBasic.vue'
import NodeEditJoin from './NodeEditJoin.vue'
import { tools } from 'mttk-lowcode-engine'
import { findEntity, findRelation, loadEntityColumnsPromise, mergeJson } from '../../../util/modelUtil'
//
const globalContext = inject('globalContext')

//mode, add/edit
const isEditing = ref(true)
//Data of basic
const dataBasic = ref({})
//Data of join edit
const dataJoin = ref({})
//
const useRemarkAsName = ref(true)
//
const dialogVisible = ref(false)
//Save model data
let modelSaved = undefined
//This is used to edit existing node
function showEdit(node, model) {
    modelSaved = model;
    isEditing.value = true
    dialogVisible.value = true
    //Just copy entity to edit sicne the structure is same
    dataBasic.value = tools.deepCopy(node.entity)
    //Build join data
    //console.log('@@@@@@@@@',node.relation)
    if (!node.relation) {
        //That means it is the first node
        dataJoin.value = {}
    } else {

        dataJoin.value = tools.deepCopy(node.relation)
    }
}
function showAdd(json, model) {
    // console.log(JSON.stringify(json))
    modelSaved = model;
    isEditing.value = false
    dialogVisible.value = true
    //
    const entityKey = 'e'+tools.createUniqueString()
    //Create default data basic
    if (json.type == 'SQL') {
        dataBasic.value = {
            "key": entityKey,
            "type": "SQL",
        }
    } else {
        dataBasic.value = {
            "key": entityKey,
            "type": json.type,
            "catalog": json.catalog,
            "schema": json.schema,
            "table": json.name,
            name: json.description || json.name,
            "alias": json.name,
        }
    }
    //Create relation data if needed
    if (modelSaved && modelSaved.entities && modelSaved.entities.length > 0) {
        //Only create relation if it is NOT the first entity
        dataJoin.value = {
            "target": entityKey,
            "joinType": "LEFT JOIN",
            "keys": [{}]
        }


    }



}
//
defineExpose({ showEdit, showAdd })
//
const nodeEditBasicRef = ref()
const nodeEditJoinRef = ref()
function handleConfirm() {
    Promise.all([nodeEditBasicRef.value.validateFunc(), nodeEditJoinRef.value.validateFunc()]).then(function () {
        //
        handleUpdate()

    });

}
function handleUpdate() {
    if (isEditing.value) {
        handleUpdateEdit()
        //
        dialogVisible.value = false
    } else {
        handleUpdateAdd()
    }

}
function handleUpdateEdit() {
    //Update entity
    const entity = findEntity(modelSaved, dataBasic.value.key);
    if (entity) {
        mergeJson(entity, dataBasic.value)
    }
    //Update relation
    const relation = findRelation(modelSaved, dataJoin.value.source, dataJoin.value.target);
    if (relation) {
        mergeJson(relation, dataJoin.value)
    }
    //

}
function handleUpdateAdd() {
    //Add entity
    modelSaved.entities.push(dataBasic.value)
    //Add relation
    if(dataJoin.value.target){
        modelSaved.relations.push(dataJoin.value)
    }
    //Add all columns
    loadEntityColumnsPromise(globalContext.request, modelSaved._id, dataBasic.value).then(function (response) {
        for (const item of response.data || []) {
            modelSaved.columns.push({
                "key": 'c'+tools.createUniqueString(),
                "entity": dataBasic.value.key,
                "dataType": item.dataType,
                "label": useRemarkAsName.value ? item.label : item.key,
                "type": "field",
                "column": item.key
            })
        }
        //
        dialogVisible.value = false
    })

}

</script>