import { computed } from 'vue'
import SelectRemote from './SelectRemote.vue'

//build filter configuration
export default function build(modelValue, config,callbackFunc) {
  //
  if (!config.filter || config.filter.length == 0) {
    //
    return { '~': 'span', '#': '没有选择任何筛选条件,请在右侧面板中编辑' }
  }
  //
  //Calcluate col span according to qtyPerRow
  const colSpan = Math.min(Math.max(1, Math.floor(24 / (config.qtyPerRow || 6))), 24)

  //
  const result = {
    '~': 'el-form',
    model: modelValue,
    inline: true,
    size: 'small',
    'label-width': config.labelWidth || '80px',
    class: 'el-row bi-filter-form',
    '#': []
  }
  //
  for (const c of config.filter || []) {
    const formItem = {
      '~': 'el-form-item',
      label: c.label,
      class: 'el-col el-col-' + colSpan * colSpanRate(c),
      '#': buildController(modelValue, config, c,callbackFunc )
    }
    //
    result['#'].push(formItem)
    //
  }
  if (config.showButton) {
    //Search button
    const formItemButton = {
      '~': 'el-form-item',
      label: ' ', //Set an empty label so the button will shown in item content area
      class: 'el-col el-col-' + colSpan,
      '#': {
        '~': 'el-button',
        type: 'primary',
        '@click':callbackFunc(true),
        '#': '过滤'
      }
    }
    result['#'].push(formItemButton)
  }
  //
  return result
}
function buildController(modelValue, config, c,callbackFunc ) {
  //
  if (c._ui_mode == 'input') {
    return buildControllerInput(modelValue, config, c,callbackFunc )
  } else if (c._ui_mode == 'select') {
    return buildControllerSelect(modelValue, config, c,callbackFunc)
  } else if (c._ui_mode == 'input-number') {
    return buildControllerInputNumber(modelValue, config, c,callbackFunc)
  } else if (c._ui_mode == 'datetime') {
    return buildControllerDateTime(modelValue, config, c,callbackFunc)
  } else if (c._ui_mode == 'time') {
    return buildControllerTime(modelValue, config, c,callbackFunc)
  } else {
    return {
      '~': 'div',
      '#': 'Not support:' + c._ui_mode
    }
  }
}
//input
function buildControllerInput(modelValue, config, c,callbackFunc ) {
  if (c._ui_input_match == '_CUSTOMIZE') {
    return buildControllerInputCustomize(modelValue, config, c,callbackFunc )
  } else {
    return buildControllerInputNormal(modelValue, config, c,callbackFunc )
  }
}
function buildControllerInputNormal(modelValue, config, c,callbackFunc ) {
  return {
    '~': 'el-input',
    '@change':callbackFunc(),
    '~modelValue': buildModelValue(modelValue, c.id)
  }
}
function buildControllerInputCustomize(modelValue, config, c,callbackFunc ) {
  return {
    '~': 'span',
    style: { display: 'inline-flex', width: '100%' },
    '#': [
      {
        '~': 'el-select',
        style: { 'flex-basis': '90px', 'flex-shrink': 0, 'margin-right': '2px' },
        '@change':callbackFunc(),
        '#': [
          { '~': 'el-option', label: '精确匹配', value: '=' },
          { '~': 'el-option', label: '模糊匹配', value: 'LIKE' }
        ],
        '~modelValue': buildModelValue(modelValue, c.id + '-match')
      },
      {
        '~': 'el-input',
        style: { 'flex-basis': '100%' },
        '@change':callbackFunc(),
        '~modelValue': buildModelValue(modelValue, c.id)
      }
    ]
  }
}
//select
function buildControllerSelect(modelValue, config, c,callbackFunc) {
  //let valueKey=c.id
  //Use different key since data type is different ,otherwise select error occure once multple flag is changed
  if(c._ui_select_multiple){
    modelValue[c.id]=[]
  }else{
    modelValue[c.id]=undefined
  }
  return {
    '~': SelectRemote,
    '@change':callbackFunc(),
    '~modelValue': buildModelValue(modelValue, c.id),
    config: config,
    c: c
  }
}
//input-number
function buildControllerInputNumber(modelValue, config,c, callbackFunc) {
  if (c['_ui_input-number_match'] == '_CUSTOMIZE') {
    return buildControllerInputNumberCustomize(modelValue, config, c,callbackFunc)
  } else if (c['_ui_input-number_match'] == '_RANGE') {
    return buildControllerInputNumberRange(modelValue, config, c,callbackFunc)
  } else {
    return buildControllerInputNumberNormal(modelValue, config, c,callbackFunc)
  }
}
function buildControllerInputNumberNormal(modelValue, config, c,callbackFunc) {
  return {
    '~': 'el-input-number',
    '@change':callbackFunc(),
    controls: false,
    style: { width: '100%' },
    '~modelValue': buildModelValue(modelValue, c.id)
  }
}
function buildControllerInputNumberCustomize(modelValue, config, c,callbackFunc) {
  return {
    '~': 'span',
    style: { display: 'inline-flex', width: '100%' },
    '#': [
      {
        '~': 'el-select',
        '@change':callbackFunc(),
        style: { 'flex-basis': '90px', 'flex-shrink': 0, 'margin-right': '2px' },
        '#': [
          { '~': 'el-option', label: '等于', value: '=' },
          { '~': 'el-option', label: '大于', value: '>' },
          { '~': 'el-option', label: '大于等于', value: '>=' },
          { '~': 'el-option', label: '小于', value: '<' },
          { '~': 'el-option', label: '小于等于', value: '<=' }
        ],
        '~modelValue': buildModelValue(modelValue, c.id + '-match')
      },
      {
        '~': 'el-input-number',
        '@change':callbackFunc(),
        controls: false,
        style: { 'flex-basis': '100%' },
        '~modelValue': buildModelValue(modelValue, c.id)
      }
    ]
  }
}
function buildControllerInputNumberRange(modelValue, config, c,callbackFunc) {
  return {
    '~': 'span',
    style: { display: 'inline-flex', width: '100%' },
    '#': [
      {
        '~': 'el-input-number',
        '@change':callbackFunc(),
        controls: false,
        style: { width: '100%' },
        '~modelValue': buildModelValue(modelValue, c.id)
      },

      {
        '~': 'span',
        '#': '~'
      },
      {
        '~': 'el-input-number',
        '@change':callbackFunc(),
        controls: false,
        style: { width: '100%' },
        '~modelValue': buildModelValue(modelValue, c.id + '-to')
      }
    ]
  }
}
//datetime
function buildControllerDateTime(modelValue, config, c,callbackFunc) {
  if (c['_ui_input-datetime_match'] == '_CUSTOMIZE') {
    return buildControllerDateTimeCustomize(modelValue, config, c,callbackFunc)
  } else if (c['_ui_input-datetime_match'] == '_RANGE') {
    return buildControllerDateTimeRange(modelValue, config, c,callbackFunc)
  } else {
    return buildControllerDateTimeNormal(modelValue, config, c,callbackFunc)
  }
}
//   <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"/>

function buildControllerDateTimeNormal(modelValue, config, c,callbackFunc) {
  //
    modelValue[c.id]=undefined
 //
  return {
    '~': 'el-date-picker',
    '@change':callbackFunc(),
    type: 'datetime',
    format: 'YYYY-MM-DD HH:mm:ss',
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    style: { width: '100%' },
    '~modelValue': buildModelValue(modelValue, c.id)
  }
}
function buildControllerDateTimeCustomize(modelValue, config, c,callbackFunc) {
  //
  modelValue[c.id]=undefined
  //
  return {
    '~': 'span',
    style: { display: 'inline-flex', width: '100%' },
    '#': [
      {
        '~': 'el-select',
        '@change':callbackFunc(),
        style: { 'flex-basis': '90px', 'flex-shrink': 0, 'margin-right': '2px' },
        '#': [
          { '~': 'el-option', label: '等于', value: '=' },
          { '~': 'el-option', label: '大于', value: '>' },
          { '~': 'el-option', label: '大于等于', value: '>=' },
          { '~': 'el-option', label: '小于', value: '<' },
          { '~': 'el-option', label: '小于等于', value: '<=' }
        ],
        '~modelValue': buildModelValue(modelValue, c.id + '-match')
      },
      {
        '~': 'el-date-picker',
        '@change':callbackFunc(),
        type: 'datetime',
        format: 'YYYY-MM-DD HH:mm:ss',
        'value-format': 'YYYY-MM-DD HH:mm:ss',
        style: { 'flex-basis': '100%' },
        '~modelValue': buildModelValue(modelValue, c.id)
      }
    ]
  }
}

function buildControllerDateTimeRange(modelValue, config, c,callbackFunc) {
  //
  modelValue[c.id]=undefined
  //
  return {
    '~': 'el-date-picker',
    '@change':callbackFunc(),
    type: 'datetimerange',
    'range-separator': '~',
    format: 'YYYY-MM-DD HH:mm:ss',
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    style: { width: '100%' },
    '~modelValue': buildModelValue(modelValue, c.id)
  }
}
//time
function buildControllerTime(modelValue, config, c,callbackFunc) {
  if (c['_ui_input-time_match'] == '_CUSTOMIZE') {
    return buildControllerTimeCustomize(modelValue, config, c,callbackFunc)
  } else if (c['_ui_input-time_match'] == '_RANGE') {
    return buildControllerTimeRange(modelValue, config, c,callbackFunc)
  } else {
    return buildControllerTimeNormal(modelValue, config, c,callbackFunc)
  }
}
//   <el-time-picker v-model="value1" type="time" placeholder="Select date and time" format="HH:mm:ss" value-format="HH:mm:ss"/>

function buildControllerTimeNormal(modelValue, config, c,callbackFunc) {
  modelValue[c.id]=undefined
  //
  return {
    '~': 'el-time-picker',
    '@change':callbackFunc(),
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss',
    style: { width: '100%' },
    '~modelValue': buildModelValue(modelValue, c.id)
  }
}
function buildControllerTimeCustomize(modelValue, config, c,callbackFunc) {
  modelValue[c.id]=undefined
  //
  return {
    '~': 'span',
    style: { display: 'inline-flex', width: '100%' },
    '#': [
      {
        '~': 'el-select',
        '@change':callbackFunc(),
        style: { 'flex-basis': '90px', 'flex-shrink': 0, 'margin-right': '2px' },
        '#': [
          { '~': 'el-option', label: '等于', value: '=' },
          { '~': 'el-option', label: '大于', value: '>' },
          { '~': 'el-option', label: '大于等于', value: '>=' },
          { '~': 'el-option', label: '小于', value: '<' },
          { '~': 'el-option', label: '小于等于', value: '<=' }
        ],
        '~modelValue': buildModelValue(modelValue, c.id + '-match')
      },
      {
        '~': 'el-time-picker',
        '@change':callbackFunc(),
        format: 'HH:mm:ss',
        'value-format': 'HH:mm:ss',
        style: { 'flex-basis': '100%' },
        '~modelValue': buildModelValue(modelValue, c.id)
      }
    ]
  }
}

function buildControllerTimeRange(modelValue, config, c,callbackFunc) {
  modelValue[c.id]=[]
  //
  return {
    '~': 'el-time-picker',
    '@change':callbackFunc(),
    'is-range': true,
    'range-separator': '~',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss',
    style: { width: '100%' },
    '~modelValue': buildModelValue(modelValue, c.id)
  }
}

//Calculate the col span rate
function colSpanRate(c) {
  if (c._colSpanRate == 'no') {
    return 1
  } else if (c._colSpanRate == 'yes') {
    return 2
  }
  //Otherwise,auto check
  if (c._ui_mode == 'datetime' && c['_ui_input-datetime_match'] == '_RANGE') {
    return 2
  }
  //
  return 1
}

//
function buildModelValue(modelValue, key) {
  return computed({
    get: () => modelValue[key],
    set: (val) => {
      modelValue[key] = val
    }
  })
}
