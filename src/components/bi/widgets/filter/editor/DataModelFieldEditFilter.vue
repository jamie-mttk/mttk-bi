<template>
  <el-form :model="modelValue" label-width="180px" label-position="right" size="small">
    <el-form-item label="标题">
      <el-input v-model="modelValue['label']" required />
    </el-form-item>

    <el-form-item label="展示类型">
      <el-select v-model="modelValue['_ui_mode']">
        <el-option label="输入" value="input" v-if="column.dataType == 'string'" />
        <el-option label="选择框" value="select" v-if="column.dataType == 'string'||column.dataType == 'integer' || column.dataType == 'number'" />
        <el-option
          label="数字输入"
          value="input-number"
          v-if="column.dataType == 'integer' || column.dataType == 'number'"
        />
        <el-option label="日期" value="datetime" v-if="column.dataType == 'datetime'" />
        <el-option label="时间" value="time" v-if="column.dataType == 'time'" />
      </el-select>
    </el-form-item>
    <el-form-item label="占用网格数" v-if="!mode">

      <el-input-number v-model="modelValue['_colSpan']" :min="1" :max="12" />
    </el-form-item>
    <el-form-item label="隐藏匹配方式选择" v-if="!mode && modelValue['_ui_mode'] != 'select'">
      <el-switch v-model="modelValue['_ui_hide_match']"></el-switch>
    </el-form-item>
    <!-- input -->
    <div v-if="modelValue['_ui_mode'] == 'input'">
      <el-form-item :label="'输入匹配方式'+initValuePrompt">
        <el-select v-model="modelValue['_ui_input_match_init']" clearable>
          <el-option-group v-for="group in inputOptions" :key="group.key">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <!-- Intial value set -->
      <el-form-item
        :label="'输入'+initValuePrompt"
        v-if="inputHasValueOptions.includes(modelValue['_ui_input_match_init'])"
      >
        <el-input v-model="modelValue['_ui_input_init']" clearable></el-input>
      </el-form-item>
    </div>
    <!-- select -->
    <div v-if="modelValue['_ui_mode'] == 'select'">
      <el-form-item label="支持多选">
        <el-switch v-model="modelValue['_ui_select_multiple']"></el-switch>
      </el-form-item>
      <el-form-item label="加载时机" v-if="modelValue['_ui_select_source'] != 'manual'">
        <el-select v-model="modelValue['_ui_select_load']">
          <el-option label="进入界面后立刻加载" value="preload" />
          <el-option label="输入过滤条件后加载" value="filter_load" />
        </el-select>
      </el-form-item>
      <el-form-item label="选项值来源">
        <el-radio-group v-model="modelValue['_ui_select_source']">
          <el-radio-button label="自动解析" value="auto" />
          <el-radio-button label="其他数据模型" value="datamodel" />
          <el-radio-button label="手工输入" value="manual" />
        </el-radio-group>
      </el-form-item>
      <div v-if="modelValue['_ui_select_source'] == 'datamodel'">
        <el-form-item label="来自数据模型"> 
          <el-select v-model="modelValue['_ui_select_source_datamodel']" clearable filterable @change="handleDatamodelChange">
            <el-option  v-for="item in datamodelList" :key="item._id" :label="item.name" :value="item._id" />
          </el-select>
        </el-form-item>
        <el-form-item label="值字段">
          <el-select v-model="modelValue['_ui_select_source_datamodel_value']" clearable filterable>
            <el-option  v-for="item in datamodelFieldList" :key="item.key" :label="item.label" :value="item.entity+'.'+item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="显示字段">
          <el-select v-model="modelValue['_ui_select_source_datamodel_label']" clearable filterable>
            <el-option  v-for="item in datamodelFieldList" :key="item.key" :label="item.label" :value="item.entity+'.'+item.key" />
          </el-select>
        </el-form-item>
      </div>
      <div v-if="modelValue['_ui_select_source'] == 'manual'">
        <el-form-item label="手工录入">
          <el-input v-model="modelValue['_ui_select_source_manual']" type="textarea" :rows="5"   />
          <el-alert  type="info" :closable="false" title="每行代表一个选项.通过分隔符波浪号(~)分开选项显示内容和值.~前是值,后面是显示内容;如果没有~则认为显示内容和值相同"/>
        </el-form-item>
      </div>
      <el-form-item :label="'选择输入'+initValuePrompt">
        <CriteriaSelect
          v-model="modelValue"
          :config="props.modelConfig"
          :c="{...modelValue,id:'_ui_select_init'}"
        >
      </CriteriaSelect>
    </el-form-item>
    </div>
    <!-- input number -->
    <div v-if="modelValue['_ui_mode'] == 'input-number'">
      <el-form-item :label="'数字输入匹配方式'+initValuePrompt" v-if="modelValue['_ui_mode'] == 'input-number'">
        <el-select v-model="modelValue['_ui_input-number_match_init']" clearable>
          <el-option
            v-for="item in inputNumberOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'数字输入'+initValuePrompt">
        <el-input-number
          :controls="false"
          v-model="modelValue['_ui_input-number_init']"
          clearable
        ></el-input-number>
      </el-form-item>
      <el-form-item
        :label="'数字输入'+initValuePrompt+'到'"
        v-if="'_RANGE' == modelValue['_ui_input-number_match_init']"
      >
        <el-input-number
          :controls="false"
          v-model="modelValue['_ui_input-number_init_to']"
          clearable
        ></el-input-number>
      </el-form-item>
    </div>
    <!-- datetime -->
    <div v-if="modelValue['_ui_mode'] == 'datetime'">
      <el-form-item :label="'日期匹配方式'+initValuePrompt">
        <el-select v-model="modelValue['_ui_datetime_match_init']" clearable>
          <el-option
            v-for="item in datetimeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'日期输入'+initValuePrompt">
        <el-select v-model="modelValue['_ui_datetime_init']" clearable>
          <el-option
            v-for="item in datetimeInitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="'日期输入'+initValuePrompt+'到'"
        v-if="'_RANGE' == modelValue['_ui_datetime_match_init']"
      >
        <el-select v-model="modelValue['_ui_datetime_init_to']" clearable>
          <el-option
            v-for="item in datetimeInitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
    <!-- time -->
    <div v-if="modelValue['_ui_mode'] == 'time'">
      <el-form-item :label="'时间匹配方式'+initValuePrompt">
        <el-select v-model="modelValue['_ui_time_match_init']" clearable>
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'时间输入'+initValuePrompt">
        <el-select v-model="modelValue['_ui_time_init']" clearable>
          <el-option
            v-for="item in timeInitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'时间输入'+initValuePrompt+'到'" v-if="'_RANGE' == modelValue['_ui_time_match_init']">
        <el-select v-model="modelValue['_ui_time_init_to']" clearable>
          <el-option
            v-for="item in timeInitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {ref,inject,unref,computed} from 'vue'
import { useVModels } from '@vueuse/core'
import {
  inputOptions,
  inputHasValueOptions,
  inputNumberOptions,
  datetimeOptions,
  datetimeInitOptions,
  timeOptions,
  timeInitOptions
} from '../data'
import  CriteriaSelect from '../render/CriteriaSelect.vue'
//model value - single config ,one  filter
//column - the column to edit
//prop   - filter,fixed
//option - { editComponent: DataModelFieldEditFilter },fixed
//option mode   true  - it is in some other component's filter configuration
//       false - it is in filter component
const props = defineProps(['modelValue','modelConfig', 'column', 'prop', 'option'])
const emit = defineEmits(['update:modelValue'])
//mode, refer to above option mode
const mode=computed(()=>{
  return !!props.option?.mode
})
//init value - whether to add init value to label depends on move
const initValuePrompt=computed(()=>mode.value?'值':'初始值')
//
const { modelValue } = useVModels(props, emit)
//
const globalContext=inject('globalContext')
const appContext = inject('appContext')
//All data model
const datamodelList=ref([])
//data model field list
const datamodelFieldList=ref([])
//
loadDatamodel();


//
function loadDatamodel(){
  globalContext.request({
    method: "GET",
    url: "/bi/dataModel/query",
    params: {
      app: appContext.getKey()
    }

  }).then(function (response) {
    datamodelList.value = response.list
    //
    handleDatamodelChange();
  });
}


function handleDatamodelChange(){
  const value=unref(modelValue)['_ui_select_source_datamodel']

  if(!value){
    datamodelFieldList.value=[]
    return
  }
  //First try to find in model list
  const datamodel=datamodelList.value.find(item=>item['_id']==value)
  if(!datamodel){
    // not found
    datamodelFieldList.value=[]
    return
  }
  //
  const result=[]
  addAllColumns(result,datamodel.columns)
  //
  datamodelFieldList.value=result
}
function addAllColumns(result,cols){
  for(const col of cols||[]){
    if(col.type=='hierarchy'){
      addAllColumns(result,col.children)
    }else{
      result.push(col)
    }
  }
}
</script>
