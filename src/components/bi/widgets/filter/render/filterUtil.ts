import { computed,unref } from 'vue'

import {buildInitValue} from '../filterInitUtil'
import CriteriaInput from './CriteriaInput.vue'
import CriteriaInputNumber from './CriteriaInputNumber.vue'
import CriteriaSelect from './CriteriaSelect.vue'
import CriteriaDatetime from './CriteriaDatetime.vue'
import CriteriaTime from './CriteriaTime.vue'

//build filter configuration
export default function build(modelValue, config, fullConfig,context) {
  //

  //
  if (!config.filter || config.filter.length == 0) {
    //
    return { '~': 'span', '#': '没有选择任何筛选条件,请在右侧面板中编辑' }
  }
  //
  //Calcluate col span according to qtyPerRow
  //for example if qtyPerRow==6,then colspan=4
  //if qtyPerRow1=12, then colspan=2
  //if qtyPerRow1=4, then colspan=6
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
  } as any
  //
  for (const c of config.filter || []) {
    const formItem = {
      '~': 'el-form-item',
      label: c.label,
      class: 'el-col el-col-' + calColSpan(colSpan,c,),
      '#': buildController(modelValue, config, c)
    }
    //
    result['#'].push(formItem)
    //
  }

  //buttons

    //Search button
    const formItemButton = [{
        '~': 'el-button',
        type: 'primary',
        '@click': ()=>  context.mitt.emit('bi_filter_reload',config.dataModel),
        '#': '查询'
      }]
    


  if (config.showButtonReset) {
    //Search button
    formItemButton.push({
        '~': 'el-button',
        type: 'danger',
        '@click': ()=>{
          //
          const dataKey = fullConfig.config.data.dataKey
          const init=buildInitValue(config)
          context.d.set(dataKey, init)
        },
        '#': '重置'
      })

  }
  //
  result['#'].push({
    '~': 'el-form-item',
    label: ' ', //Set an empty label so the button will shown in item content area
    // class: 'el-col el-col-' + colSpan,
    style:{'align-items': 'flex-end',  'align-self': 'flex-end','flex-grow':1},
    '#': {'~':'el-button-group',style:{'margin-left':'auto'},'#':formItemButton}
  })
  //
  return result
}
function buildController(modelValue, config, c) {
  //
  if (c._ui_mode == 'input') {
    return {'~':CriteriaInput,'~modelValue':modelValue,config,c}
  } else if (c._ui_mode == 'select') {
    return buildControllerSelect(modelValue, config, c)
  } else if (c._ui_mode == 'input-number') {
    return {'~':CriteriaInputNumber,'~modelValue':modelValue,config,c}
  } else if (c._ui_mode == 'datetime') {
    return {'~':CriteriaDatetime,'~modelValue':modelValue,config,c}
  } else if (c._ui_mode == 'time') {
    return {'~':CriteriaTime,'~modelValue':modelValue,config,c}
  } else {
    return {
      '~': 'div',
      '#': 'Not support:' + c._ui_mode
    }
  }
}


//select
function buildControllerSelect(modelValue, config, c) {

  return {
    '~': CriteriaSelect,
    '~modelValue':modelValue,config,c
  }
}

//Calculate the col span based on 
function calColSpan(colSpan,c) {
  return Math.min(24,colSpan*(c._colSpan||1))
}

//
export function buildModelValue(modelValue, key) {
  return computed({
    get: () => unref(modelValue)[key],
    set: (val) => {
      unref(modelValue)[key] = val
    }
  })
}
