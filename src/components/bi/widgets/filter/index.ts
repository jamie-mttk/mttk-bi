import { biFilterTransform } from './transform'
import { buildModel, buildOtherProp } from '../utils/indexUtil'
import { computed } from 'vue'
import { widgetUtil } from 'mttk-lowcode-engine'
import DataModelFieldEditFilter from './DataModelFieldEditFilter.vue'

//
const biFilterConfig = {
  key: '_bi_filter',
  name: 'BI筛选器',
  description: '',
  icon: 'mdiFilterPlusOutline',
  sequence: 1,
  transform: biFilterTransform,
  editor: {
    model: {
      name: '数据模型',
      sequence: 1,
      init: {
        type: 'line'
      },
      ui: buildModel([
        {//Please note:type should be dimension or metric
          _type: 'dimension',
          prop: 'filter',
          label: '过滤条件',
          option: { editComponent: DataModelFieldEditFilter },
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
        },
        {
          _type:'normal',
          label: '显示查询按钮',
          prop: 'showButton',
          item:{
            '~': 'el-switch',
          }
        },
        {
          _type:'normal',
          label: '每行控件数',
          prop: 'qtyPerRow',
          item:{
            '~': 'el-select',
            '#': [
              { '~': 'el-option', label: '1', value: 1 },
              { '~': 'el-option', label: '2', value: 2 },
              { '~': 'el-option', label: '3', value: 3 },
              { '~': 'el-option', label: '4', value: 4 },
              { '~': 'el-option', label: '6', value: 6 },
              { '~': 'el-option', label: '8', value: 8 },
              { '~': 'el-option', label: '12', value: 12 }
            ],
          }
        },
        {
          _type:'normal',
          label: '标题宽度',
          prop: 'labelWidth',
        }, 

      ])
    },
    basic: {
      init: {},
      ui: [
        widgetUtil.createInput('title-text', '标题'),
        widgetUtil.createInput('title-subtext', '副标题'),
        widgetUtil.createSwitch('smooth', '平滑曲线'),
        widgetUtil.createSwitch('areaMode', '面积填充'),
        widgetUtil.createSwitch('stack', '堆叠'),
        widgetUtil.createSwitch('reverse', '坐标切换')
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biFilterConfig
