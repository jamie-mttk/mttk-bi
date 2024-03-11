<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="access" label="访问" width="100">
            <template #default="sp">
                <el-switch v-model="sp.row['access']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="add" label="增加" width="100">

            <template #default="sp">
                <el-switch v-model="sp.row['add']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="edit" label="编辑" width="100">

            <template #default="sp">
                <el-switch v-model="sp.row['edit']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="del" label="删除" width="100">
            <template #default="sp">
                <el-switch v-model="sp.row['del']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="auth" label="授权" width="100">
            <template #default="sp">
                <el-switch v-model="sp.row['auth']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="all" label="所有数据" width="100">

            <template #default="sp">
                <el-switch v-model="sp.row['all']" @change="handleChange" />
            </template>
        </el-table-column>
    </el-table>

</template>


<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
//
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const globalContext = inject('globalContext')
//Table data
const tableData = ref([])
//
onMounted(() => init())
//
async function init() {
    const authorities = (await globalContext.request.get('/account/authorities')).list

    tableData.value = buildTableData(authorities, props.modelValue)
}
//
function buildTableData(authorities, roleAuthorities) {
    const result = []
    for (const a of authorities) {
        const authority = {}
        result.push(authority)
        //
        authority.key = a.key
        authority.name = a.name

        //
        const authorityRole =roleAuthorities[a.key]
        handleAuthSingle(authority, authorityRole, 'access')
        handleAuthSingle(authority, authorityRole, 'add')
        handleAuthSingle(authority, authorityRole, 'edit')
        handleAuthSingle(authority, authorityRole, 'del')
        handleAuthSingle(authority, authorityRole, 'all')
    }
    //
    return result;
}
function handleAuthSingle(authority, authorityRole, operation) {
    authority[operation] = authorityRole ? authorityRole.includes(operation) : false
}
function buildRoleAuthorities() {
    const authorities = {}
    for (const dt of tableData.value) {
        const r = []
        authorities[dt.key] = r
        pushIfTrue(r, dt, 'access')
        pushIfTrue(r, dt, 'add')
        pushIfTrue(r, dt, 'edit')
        pushIfTrue(r, dt, 'del')
        pushIfTrue(r, dt, 'all')
    }
    return authorities;
}
function pushIfTrue(r, dt, operation) {
    if (dt[operation]) {
        r.push(operation)
    }
}

function handleChange() {
    emit('update:modelValue', buildRoleAuthorities())
}

</script>


<style lang="scss" scoped></style>