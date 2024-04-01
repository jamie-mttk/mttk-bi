<template>
  <el-select
    v-model="modelValueValue"
    filterable
    clearable
    :remote="remoteLoad"
    :remote-method="remoteMethod"
    :placeholder="placeholder"
    :multiple="multiple"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script lang="ts" setup>
import { ref, unref, inject, onMounted, computed } from 'vue'

//modelValue is the form model value input in filter editor
//config is the model config
//c is  one filter  config
const model = defineModel({ type: Object })
const props = defineProps(['config', 'c'])

//
const modelValueValue = computed({
  get: () => {
    const v = unref(model)[props.c.id]
    if (props.c._ui_select_multiple) {
      if (Array.isArray(v)) {
        return v
      } else {
        //that means the value isn invalid, so we need to reset it to array
        return []
      }
    } else {
      if (Array.isArray(v)) {
        return undefined
      } else {
        return v
      }
    }
  },
  set: (val) => {
    unref(model)[props.c.id] = val
  }
})

//select options
//each item has label and value field
const options = ref([])
const globalContext = inject('globalContext')
//
const loadMode = computed(() => {
  if (props.c['_ui_select_source'] == 'manual') {
    //if mannual input,always preload
    return 'preload'
  } else {
    return props.c['_ui_select_load'] || 'preload'
  }
})
//whether remote load
const remoteLoad = computed(() => loadMode.value == 'filter_load')

const placeholder = computed(() =>
  loadMode.value == 'filter_load' ? '请输入过滤条件后获取下拉框内容' : '请选择'
)

const multiple = computed(() => !!props.c['_ui_select_multiple'])
//
onMounted(() => {
  if (loadMode.value == 'preload') {
    loadData()
  }
})

const remoteMethod = (filter: string) => {
  loadData(filter)
}
function loadData(filter?) {
  const source = props.c['_ui_select_source'] || 'auto'
  if (source == 'auto') {
    loadDataAuto(filter)
  } else if (source == 'datamodel') {
    loadDataDatamodel(filter)
  } else if (source == 'manual') {
    loadDataManual(filter)
  } else {
    //should not come here
  }
}
//auto
function loadDataAuto(filter) {
  const requestBody = {
    dataModel: props.config?.dataModel,
    column: props.c,
    filter: filter || ''
  }
  globalContext.request.post('/bi/columnValues', requestBody).then(function (response) {
    //
    options.value = response.data.map((item) => {
      return { label: item, value: item }
    })
  })
}

function loadDataDatamodel(filter) {
  if (
    !props.c['_ui_select_source_datamodel'] ||
    !props.c['_ui_select_source_datamodel_label'] ||
    !props.c['_ui_select_source_datamodel_value']
  ) {
    options.value = []
    return
  }

  //
  const labelSplit = props.c['_ui_select_source_datamodel_label'].split('.')
  const valueSplit = props.c['_ui_select_source_datamodel_value'].split('.')
  //
  const filterInBody = []
  if (filter) {
    filterInBody.push({ key: labelSplit[1], operation: 'LIKE', value: filter })
  }
  const requestBody = {
    config: {
      dumpMode: 'JSON',
      dataModel: props.c['_ui_select_source_datamodel'],
      dimension: [
        { id: 'label', entity: labelSplit[0], key: labelSplit[1] },
        { id: 'value', entity: valueSplit[0], key: valueSplit[1] }
      ],
      // pagination: {
      //   mode: 'SERVER',
      //   page: 1,
      //   size: 100
      // }
    },
    filters: filterInBody
  }
  globalContext.request.post('/bi/build', requestBody).then(function (response) {
    //
    // console.log(response.data)
    options.value = response.data
  })
}
function loadDataManual(filter) {
  const val = props.c['_ui_select_source_manual']
  if (!val) {
    options.value = []
    return
  }
  const result = []
  for (const row of val.split('\n')) {
    if (!row) {
      continue
    }
    const items = row.split('~')
    result.push({ value: items[0], label: items.length > 1 ? items[1] : items[0] })
  }
  // console.log(result)
  //
  options.value = result
}
</script>
