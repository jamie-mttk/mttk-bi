<template>
  <el-select  v-model="modelValue"  filterable   :remote="remoteLoad" :remote-method="remoteMethod" :placeholder="placeholder" :multiple="multiple">
    <el-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { ref, inject,onMounted,computed } from 'vue'

import { useVModels } from '@vueuse/core'
//
const props = defineProps(['modelValue', 'config','c'])
const emit = defineEmits(['update:modelValue'])
//
//
const { modelValue } = useVModels(props, emit)
//select options,load from remote
const options=ref([])
const globalContext=inject('globalContext')
//
const loadMode=computed(()=>
  props.c['_ui_select_load']||'preload'
)
const remoteLoad=computed(()=>loadMode.value=='filter_load')

const placeholder=computed(()=>loadMode.value=='filter_load'?'请输入过滤条件后获取下拉框内容':'请选择')

const multiple=computed(()=>!!props.c['_ui_select_multiple'])
//
onMounted(()=>{
    if(loadMode.value=='preload'){
      loadData();
    }
})

const remoteMethod = (filter: string) => {
    loadData(filter)

}
function loadData(filter){
    const requestBody={dataModel:props.config?.dataModel,column:props.c,filter}
    
    globalContext.request.post('/bi/columnValues', requestBody).then(function (response) {
      //
      options.value=response.data
    })
}
</script>
