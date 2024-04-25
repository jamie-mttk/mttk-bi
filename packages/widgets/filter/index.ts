import { biFilterTransform } from './transform'
import { buildModelFull, buildOtherProp } from '../utils/indexUtil'

import DataModelFieldEditFilter from './editor/DataModelFieldEditFilter.vue'
import {locale} from 'mttk-lowcode-engine'

export const filterIndexOptions = function (mode=false){
  return {option: { editComponent: DataModelFieldEditFilter,mode },
  checkDrop: function (dropList, dropped, toDrop) {

    //Set default value
    //Choose default value if not set
    if (dropped.dataType == 'string') {
      toDrop._ui_mode = 'input'
      toDrop._ui_input_match_init = 'LIKE'
    } else if (dropped.dataType == 'integer' || dropped.dataType == 'number') {
      toDrop._ui_mode = 'input-number'
      toDrop['_ui_input-number_match_init'] = '>='
    } else if (dropped.dataType == 'datetime') {
      toDrop._ui_mode = 'datetime'
      toDrop['_ui_datetime_match_init'] = '_RANGE'
    } else if (dropped.dataType == 'time') {
      toDrop._ui_mode = 'time'
      toDrop['_ui_time_match_init'] = '_RANGE'
    }
  }
}}


//
const biFilterConfig = {
  key: '_bi_filter',
  name: locale.t('bi.widgets.filter.name'),
  description: '',
  icon: 'mdiFilterPlusOutline',
  sequence: 1,
  transform: biFilterTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'filter',
        showButtonReset: true,
        qtyPerRow: 4,
        labelWidth:'120px',
        lablePosition:'left',
      },
      [
        {
          //Please note:type should be dimension or metric
          _type: 'dimension',
          prop: 'filter',
          label: locale.t('bi.widgets.filter.filter_label'),
          description: locale.t('bi.widgets.filter.filter_description'),
          ...filterIndexOptions(false),
        },
        {
          _type: 'normal',
          label:locale.t('bi.widgets.filter.showButtonReset'),
          prop: 'showButtonReset',
          item: {
            '~': 'el-switch'
          }
        },
        {
          _type: 'normal',
          label: locale.t('bi.widgets.filter.qtyPerRow'),
          prop: 'qtyPerRow',
          item: {
            '~': 'el-select',
            '#': [
              { '~': 'el-option', label: '1', value: 1 },
              { '~': 'el-option', label: '2', value: 2 },
              { '~': 'el-option', label: '3', value: 3 },
              { '~': 'el-option', label: '4', value: 4 },
              { '~': 'el-option', label: '6', value: 6 },
              { '~': 'el-option', label: '8', value: 8 },
              { '~': 'el-option', label: '12', value: 12 },
              { '~': 'el-option', label: '24', value: 24 }
            ]
          }
        },
        {
          _type: 'normal',
          label: locale.t('bi.widgets.filter.labelWidth'),
          prop: 'labelWidth'
        },
        {
          _type: 'normal',
          label: locale.t('bi.widgets.filter.labelPosition'),
          prop: 'labelPosition',
          item: {
            '~': 'el-select',
            '#': [
              { '~': 'el-option', label: locale.t('bi.widgets.filter.labelPosition_left'), value: 'left'},
              { '~': 'el-option', label: locale.t('bi.widgets.filter.labelPosition_right'), value: 'right'},
              { '~': 'el-option', label: locale.t('bi.widgets.filter.labelPosition_top'), value: 'top' },

            ]
          }
        },
      ]
    ),

    ...buildOtherProp({ initDisplay: false })
  }
}

//
export default biFilterConfig

//
