<template>
    <el-row :gutter="0" style="width:380px;">
        <el-col :span="14">
            <el-form :model="report" label-position="top" class="dataModelHolderForm">
                <slot></slot>
            </el-form>

        </el-col>
        <el-col :span="10">
            <el-form label-position="top">
                <el-form-item label="数据模型">
                    <SelectRemote v-model="props.modelValue.dataModel" @dataChanged="handleDataChanged"
                        :url="'/dataModel/query?app=' + props.app" :request="props.request" placeholder="请选择模型">
                    </SelectRemote>
                </el-form-item>

                <DataModelTree :modelValue="dataModel"></DataModelTree>

            </el-form>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive, provide, onMounted,inject } from 'vue'
import DataModelTree from './DataModelTree.vue'
import SelectRemote from './SelectRemote.vue'

//modelValue defines the report definition,not the data model definition
const props = defineProps(['modelValue', 'app', 'request'])
const emit = defineEmits(['update:modelValue'])
//Report definition
const report = reactive(props.modelValue)
//Data model object 
const dataModel = ref({})
//
provide('dataModel', dataModel)
//
// const context=inject('context')

//
function handleDataChanged(value) {
    dataModel.value = value

    // emit('update:modelValue', model.value)
}

//Fix drop issue on firefox 
onMounted(() => {
    //Prevent firefox to open new page once item is dropped
    document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
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