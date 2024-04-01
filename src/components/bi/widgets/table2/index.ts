import { biTableTransform } from './transform'
import { buildModel, buildOtherProp } from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'
//
const biTableConfig = {
  key: '_bi_table2',
  name: 'BI表格2',
  description: '',
  icon: 'mdiTableLarge',
  sequence: 2,
  transform: biTableTransform,
  editor: {
    model: {
      name: '数据模型',
      sequence: 1,
      init: {
        type: 'table',
        dumpMode: 'JSON',
      },
      ui: buildModel([
        { _type: 'dimension', dimension:'metric',label: '维度', option: { minRow: 0 } },
        { _type: 'metric', prop:'metric',label: '度量', option: { minRow: 0 } },
        'refresh'
      ])
    },
    basic: {
      init: { showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        allowColumnResizing: true,
        _DxHeaderFilter:false },
      ui: [
        widgetUtil.createInput('title-text', '标题'),
        widgetUtil.createSwitch('showBorders', '显示边框'),
        widgetUtil.createSwitch('showColumnLines', '显示列线'),
        widgetUtil.createSwitch('showRowLines', '显示行线'),
        widgetUtil.createSwitch('allowColumnResizing', '列改变宽度'),
        widgetUtil.createSwitch('_DxFilterRow', '显示行过滤'),
        widgetUtil.createSwitch('_DxHeaderFilter', '显示表头过滤'),
        widgetUtil.createSwitch('_DxFilterPanel', '显示过滤面板'),
        widgetUtil.createSwitch('_DxColumnChooser', '显示列选择器'),
        widgetUtil.createSwitch('_DxColumnFixing', '固定列'),

      ]
    },
    ...buildOtherProp()
  }
}

//
export default biTableConfig
