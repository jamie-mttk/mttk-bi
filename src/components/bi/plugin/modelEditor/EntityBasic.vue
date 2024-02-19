<template>
    <el-form :model="modelValue" label-width="120px">
        <el-form-item label="模型方式">
            <el-radio-group v-model="modelValue.type"  prop="type">
                <el-radio-button v-for="t in modelTypeList" :key="t.value" :label="t.value">{{ t.label }}</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="表/视图"  prop="entity" v-if="modelValue.type == 'entity'">
            <el-select v-model="modelValue.entity" :filterable="true" placeholder="请选择或从左边拖拽" @drop="handleEntityDrop" >
                <el-option v-for="entity in props.entities" :key="entity.schema + '.' + entity.name" :label="entity.name"
                    :value="entity.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="SQL"  prop="sql" v-if="modelValue.type == 'sql'">
            <el-input v-model="modelValue.sql" type="textarea" rows="4" ref="sqlRef" @drop="handleSqlDrop"/>
        </el-form-item>
    </el-form>
</template>
   
<script setup lang="ts">
import {ref} from 'vue'
import { useVModels } from '@vueuse/core'
import {modelTypeList} from './data'

const props = defineProps(['modelValue','entities'])
const emit=defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
const sqlRef=ref(null)
function parseEntityName(event){
    const data=event.dataTransfer.getData('text')
    if(!data){
        return
    }
    const json=JSON.parse(data)
    return json.name
}
//
function handleEntityDrop(event){
    const name=parseEntityName(event)
    if(!name){
        return
    }
    modelValue.value.entity=name
}
function handleSqlDrop(event){
    const name=parseEntityName(event)
    if(!name){
        return
    }
    //
    let index = sqlRef?.value?.textarea?.selectionStart;
    if(index){
        modelValue.value.sql= modelValue.value.sql.substring(0,index) + name +modelValue.value.sql.substring(index)
    }else{
        modelValue.value.sql=modelValue.value.sql+name
    }
}
</script>
   
<style scoped></style>
     