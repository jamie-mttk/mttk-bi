<template>
    <div @dragover="allowDrop" @drop="handleDragDrop" style="min-height:32px;width:100%;font-size:0.9em;">
        <div style="position:absolute;top:-32px;right:10px;font-size:0.8em;">
            <el-tooltip :show-after="1000" :content="qtyTip" placement="top">{{qtyInfo}}</el-tooltip>
            </div>
        <div v-if="dropList.length == 0" style="height:32px;color:#ccc;text-align: center;border:2px dashed antiquewhite;">
           {{ $t('bi.components.dataModelFieldDrop.empty') }}</div>
          
        <VueDraggable v-else v-model="dropList" handle=".handle" @end="handleUpdateModelValue">
            <DataModelField v-for="d in dropList" :key="d.id" :modelValue="d" :modelConfig="props.modelValue"  :prop="$props.prop" :option="$props.option" style="margin:4px;"
                @delete="handleDelete">
            </DataModelField>
        </VueDraggable>
        
    </div>
</template>
<script lang="ts" setup>
import { computed,reactive,ref } from 'vue'
import DataModelField from './DataModelField.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { ElMessage } from 'element-plus'
import { tools,locale} from 'mttk-lowcode-engine'

//modelValue is modelConfig
const props = defineProps([ 'prop', 'checkDrop', 'option'])
const model=defineModel("modelValue")

//the below line code is not reactive, if user change the model, dimension/metric/... will not cleared
// const dropList = computed(()=>props.modelValue[props.prop] || [])
// const dropList = ref(props.modelValue[props.prop] || [])
if(!model.value[props.prop]){
    model.value[props.prop]=[]
}
const dropList = computed({
  get: () =>{
    return model.value[props.prop] || []},
  set: (val) => {
    model.value[props.prop]=val
  }
})

//
const qtyTip=computed(()=>{
    return locale.t('bi.components.dataModelFieldDrop.tip',[dropList.value.length,(props.option.minRow||0),(props.option.maxRow||locale.t('bi.components.dataModelFieldDrop.infinit'))])
})
//
const qtyInfo=computed(()=>{
    return dropList.value.length+'~'+(props.option.minRow||0) + '/' +  (props.option.maxRow||'∞')
})

//
function allowDrop(ev) {
        ev.preventDefault();
    }
//
function handleDragDrop(evt) {

    const text = evt.dataTransfer.getData('fieldJSON')
    if (!text) {
        return;
    }

    const dropped = JSON.parse(text)
    //It is possible to drop the same field, for example to have different aggregation
    //If it is alreay existed,do not allow to drop
    // if (dropList.value.find((item) => item.key == dropped.key)) {
    //     //Existed ignore
    //     ElMessage.error('Data existed.')
    //     return
    // }
    //
    if (props.option?.maxRow != undefined) {
        if (dropList.value.length >= props.option?.maxRow) {
            //max row exceed
            ElMessage.error(locale.t('bi.components.dataModelFieldDrop.validateError',[ props.option?.maxRow]))
            return
        }
    }
    //No need to copy since it is parse above
    const toDrop = dropped
    toDrop.id="F_"+tools.createUniqueString()
    //Check option to add SUM/COUNT
    if ((props.prop||'').startsWith('metric')) {
        if (dropped.dataType == 'number' || dropped.dataType == 'integer') {
            toDrop['_aggregation'] = 'SUM'

        } else {
            toDrop['_aggregation'] = 'COUNT'
        }
    }

    //
    if (props.checkDrop && typeof props.checkDrop == 'function') {
        const result = props.checkDrop(dropList.value, dropped, toDrop)
        if (result) {
            ElMessage.error(result)
            return
        }
    }
    //

    //
    dropList.value.push(toDrop)
    // handleUpdateModelValue();
    //

}

//
function handleDelete(data) {
    const index = dropList.value.findIndex(
        (item) => {
            // console.log(item, data)
            return item.key == data.key
        }
    )
    if (index >= 0) {
        dropList.value.splice(index, 1);
        //
        // handleUpdateModelValue();

    }

}
// function handleUpdateModelValue() {
//     let v = props.modelValue
//     v[props.prop] = dropList.value
//     // console.log('handleUpdateModelValue',props.modelValue,JSON.stringify(dropList.value,null,2))
//     emit('update:modelValue', v)
// }
</script>
