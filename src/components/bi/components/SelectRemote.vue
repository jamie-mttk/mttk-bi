<template>
    <el-select v-model="dataModelChoosed" size="default" @change="dataChanged">
        <el-option v-for="item in dataModelList" :key="item['_id']" :label="item.name" :value="item['_id']" />
    </el-select>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
const props = defineProps(['modelValue', 'url', 'request'])
//dataChanged will be fired while select changed or after datamodel list loaded
//the first para is datamodel object
//the second is a boolean,true:select changed ;false,list loaded
const emit = defineEmits(['update:modelValue','dataChanged'])


//Data model list
const dataModelList = ref([])
//data model choosed
const dataModelChoosed = ref(props.modelValue)

props.request({
    method: "get",
    url: props.url
})
    .then(function (response) {
        //
        dataModelList.value = response.list
        //
        fireDataChanged(false)
    })
function dataChanged() {
    emit('update:modelValue', dataModelChoosed.value)
     //
     fireDataChanged(true)
}
//
function fireDataChanged(flag){
    for(const d of dataModelList.value){
        if(d['_id']==dataModelChoosed.value){         
            emit('dataChanged',d,flag)
        }
    }

}
</script>
  