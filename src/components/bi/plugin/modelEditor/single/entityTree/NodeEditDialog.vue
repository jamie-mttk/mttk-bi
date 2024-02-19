<template>
    <el-dialog v-model="dialogVisible" title="模型实体编辑" width="50%"  :close-on-click-modal="false" :close-on-press-escape="false" >
      <el-row>
        <el-col :span="16">
            <NodeEditBasic v-model="data"></NodeEditBasic>
            <NodeEditJoin v-model="dataJoin" :fieldsParent="fieldsParent" :fieldsThis="fieldsThis"></NodeEditJoin>
       
        </el-col>
        <el-col :span="8">
            <NodeEditFields :fields="fields"></NodeEditFields>
        </el-col>
      </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" >
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import NodeEditBasic from './NodeEditBasic.vue'
import NodeEditJoin from './NodeEditJoin.vue';
import NodeEditFields from './NodeEditFields.vue'
const props = defineProps(['modelValue', 'callback'])
const emit = defineEmits(['update:modelValue'])
//
const dialogVisible=ref(false)
//FORM DATA
const data = ref({})
const dataJoin=ref({
    parent:'订单表',
    type:'LEFT JOIN',
    fields:[{sourceKey:'b',targetKey:'f3'}]
})
//
const fieldsParent=['a','b','c','d']
const fieldsThis=['f1','f2','f3','f4','f5']

const fields=[{label:'订单编号',column:'id'},{label:'订单日期',column:'order_time'},{label:'订单金额',column:'amount'}]
//
function show(){
    dialogVisible.value=true
    console.log(arguments)
}
//
defineExpose({show})
</script>