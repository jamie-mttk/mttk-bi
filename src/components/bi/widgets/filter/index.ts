import { biFilterTransform } from './transform'
import { buildModelFull, buildOtherProp } from '../utils/indexUtil'

import DataModelFieldEditFilter from './editor/DataModelFieldEditFilter.vue'

export const filterIndexOptions = {option: { editComponent: DataModelFieldEditFilter },
  checkDrop: function (dropList, dropped, toDrop) {
    //Set default value
    //Choose default value if not set
    if (dropped.dataType == 'string') {
      toDrop._ui_mode = 'input'
      toDrop._ui_input_match = 'LIKE'
    } else if (dropped.dataType == 'integer' || dropped.dataType == 'number') {
      toDrop._ui_mode = 'input-number'
      toDrop['_ui_input-number_match'] = '>'
    } else if (dropped.dataType == 'datetime') {
      toDrop._ui_mode = 'datetime'
      toDrop['_ui_input-datetime_match'] = '_CUSTOMIZE'
    } else if (dropped.dataType == 'time') {
      toDrop._ui_mode = 'time'
      toDrop['_ui_input-time_match'] = '_CUSTOMIZE'
    }
  }
}


//
const biFilterConfig = {
  key: '_bi_filter',
  name: 'BI筛选器',
  description: '',
  icon: 'mdiFilterPlusOutline',
  sequence: 1,
  transform: biFilterTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'filter',
        showButton: true,
        qtyPerRow: 6
      },
      [
        {
          //Please note:type should be dimension or metric
          _type: 'dimension',
          prop: 'filter',
          label: '过滤条件',
          description: '拖入字段设置过滤方式',
          ...filterIndexOptions,
        },
        {
          _type: 'normal',
          label: '显示重置按钮',
          prop: 'showButtonReset',
          item: {
            '~': 'el-switch'
          }
        },
        {
          _type: 'normal',
          label: '每行控件数',
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
          label: '标题宽度',
          prop: 'labelWidth'
        }
      ]
    ),

    ...buildOtherProp({ initDisplay: false })
  }
}

//
export default biFilterConfig

//
