<template>
  <el-row :gutter="4">
    <el-col :span="12">
      <el-form :model="model.config.model" label-position="top" class="dataModelHolderForm">
        <slot></slot>
      </el-form>
    </el-col>
    <el-col :span="12">
      <el-form label-position="top">
        <el-form-item label="数据模型">
          <SelectRemote
            v-model="model.config.model.dataModel"
            @dataChanged="handleDataChanged"
            :url="'/bi/dataModel/query?app=' + appContext.getKey()"
            :request="appContext.globalContext.request"
            placeholder="请选择模型"
          >
          </SelectRemote>
        </el-form-item>

        <DataModelTree :modelValue="dataModel"></DataModelTree>
      </el-form>
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
    if(model.value.config?.model?.dimension){
        model.value.config.model.dimension=[]
    }
    if(model.value.config?.model?.metric){
        model.value.config.model.metric=[]
    }
    if(model.value.config?.model?.filter){
        model.value.config.model.filter=[]
    }
    if(model.value.config?.model?.drilling){
        model.value.config.model.drilling=[]
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
<style lang="scss">
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
