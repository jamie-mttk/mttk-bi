<template>
  <el-row :gutter="4">
    <el-col :span="12">
      <el-form :model="model.config.model" label-position="top" class="dataModelHolderForm">
        <slot></slot>
      </el-form>
    </el-col>
    <el-col :span="12" >
      <div style="font-size:14px;font-weight:400;line-height:22px;color:var(--el-text-color-regular);margin-bottom:8px;">{{ $t('bi.components.dataModelHolder.name') }}</div>
          <SelectRemote filterable
            v-model="model.config.model.dataModel"
            @dataChanged="handleDataChanged"
            :url="'/bi/dataModel/query?app=' + appContext.getKey()"
            :request="appContext.globalContext.request"
            
          >
          </SelectRemote>
        <DataModelTree :modelValue="dataModel"    ></DataModelTree>

    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted, inject } from 'vue'
import DataModelTree from './DataModelTree.vue'
import SelectRemote from './SelectRemote.vue'

//modelValue defines the report definition,not the data model definition
const model = defineModel({ type: Object })
//
const appContext = inject('appContext')

//Data model object
const dataModel = ref({})
//
provide('dataModel', dataModel)
//
// const context=inject('context')

//
function handleDataChanged(value, flag) {
  //
  dataModel.value = value
  //set chart title
  if (flag) {
    //flag==true means it is really changed data model,false means it is called during startup
    //set title automatically if it is not set
    if (!model.value.config?.basic['title-text']) {
      model.value.config.basic['title-text'] = value.name
    }
    // console.log(model.value)
    //clear dimension/metric/filter
    clearAll(['dimension','metric','filter','drilling'])
  }
}
function clearAll(prefixList:Array<string>){
  for(let key of Object.keys(model.value.config.model)){
    //
    for(const p of prefixList){
      if(key.startsWith(p)){
        model.value.config.model[key]=[]
        break;
      }
    }
  } 
}
//Fix drop issue on firefox
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
})
</script>
<style lang="scss" >
 .el-select-dropdown__wrap{

  max-height:100%;
}
// Reduce label height to set some padding in fiield drop, so the drop area become bigger
// .dataModelHolderForm11 {
//     .el-form-item {
//         margin-bottom: 0px;
//         .el-form-item__label {
//             margin-bottom: 0px !important;
//             line-height: 18px !important;
//         }
//     }

// }
</style>
