<template>
  <span @click="handleDataAuth" v-data-auth:auth="props.data">
    <slot>
        <el-button v-bind="$attrs">数据权限</el-button>
    </slot>
  </span>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import ResourceAuthorityDialog from './ResourceAuthorityDialog.vue'
import {dynamicRender} from 'mttk-vue-wrap'
const globalContext = inject('globalContext')

const props=defineProps(['data','resource'])

function handleDataAuth(){
    showDataAuthDialog(props.data,props.resource)
}


function showDataAuthDialog(data,resource){
    const visible = ref(false)
    const formData=ref(data)
    if(!formData.value._authorities){
      formData.value._authorities=[]
    }
    //
    if(formData.value._authorities.findIndex(item=>item.type=='ownerGroup')<0){
      formData.value._authorities.unshift({type:'ownerGroup',operations:['access','edit','del']})
    }
    //
    const config = {
      '~': ResourceAuthorityDialog,
      '~modelValue': visible,
      '~modelValueName':'visible',
      data:formData,
      resource,
    }
    dynamicRender(config, globalContext.vueApp._context, {
      removeEvent: 'close'
    })
    //
    visible.value = true
}

</script>