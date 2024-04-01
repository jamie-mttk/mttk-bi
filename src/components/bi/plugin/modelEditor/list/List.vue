<template>
    <div class="toolbar-table-container" style="margin:0 24px 0 8px;">
        <div class="lc-common-toolbar toolbar" style="background-color: var(--el-color-primary)">
            <div class="left" style="font-weight: bold; color: var(--el-color-white);">BI数据模型</div>
            <el-button-group class="right">
                <el-button @click="handleAddModel"> <template #icon>
                        <lc-icon icon="mdiPlus"></lc-icon>
                    </template>新增模型</el-button>
            </el-button-group>
        </div>
        <el-table :data="modelList" class="table-area" v-fullHeight="8">
            <el-table-column prop="name" label="名称" width="320px"/>
            <el-table-column prop="_connectionName" label="数据库连接" idth="320px"/>
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="_insertTime" label="创建时间" width="200px">
                <template #default="sp">
                    {{ formatDateTime(sp.row._insertTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="_updateTime" label="更新时间" width="200px">
                <template #default="sp">
                    {{ formatDateTime(sp.row._updateTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240px">
                <template #default="sp">
                    <el-button-group>
                    <el-button  @click="handleEdit(sp.row)">编辑</el-button>
                    <el-button  @click="handleDelete(sp.row)">删除</el-button>
                    <lcDataAuthButton :data="sp.row" resource="dataModel">
                    </lcDataAuthButton>
                </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <AddModelDialog v-model="showAddModelDialog" :callback="handleCallback"></AddModelDialog>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import { formatDateTime } from '../../../utils/biTool'
import AddModelDialog from './AddModelDialog.vue'

import { lcDataAuthButton,vFullHeight } from 'mttk-lowcode-engine'

//
const emit = defineEmits(['edit'])
//
const globalContext = inject('globalContext')
const appContext = inject('appContext')
//
const showAddModelDialog = ref(false)
function handleAddModel() {
    showAddModelDialog.value = true
}
function handleCallback(model) {
    globalContext.request({
        method: "POST",
        url: '/bi/dataModel/save',
        data: model,
    }).then(function (response) {
        //
        handleEdit(response)
    })
}
function handleDelete(model) {
    ElMessageBox.confirm(
        '确定删除模型:' + model.name + '?删除后引用的页面会异常!',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '放弃',
            type: 'warning',
        }
    ).then(() => {
        //
        globalContext.request({
            method: "POST",
            url: '/bi/dataModel/delete',
            params: {
                id: model['_id']
            }
        }).then(function () {
            loadModelList();
        });
    })
}

//model list
const modelList = ref([])


function loadModelList() {
    //Load mode list
    globalContext.request({
        method: "GET",
        url: '/bi/dataModel/query',
        params: {
            app: appContext.getKey()
        }
    }).then(
        function (response) {
            modelList.value = response.list
        }
    )
}
loadModelList();
//
function handleEdit(model) {
    emit('edit', model._id)
}
</script>