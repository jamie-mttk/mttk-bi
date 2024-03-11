import { biTableTransform } from './transform'
import { buildModel, buildOtherProp } from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'
//
const biTableConfig = {
  key: '_bi_table',
  name: 'BI表格',
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
        'rowLimit',
        'pagination',
        'refresh', 'showSQL','showData'
      ])
    },
    basic: {
      init: { border: true,
        stripe: false, },
      ui: [
        widgetUtil.createInput('_title', '标题'),
        widgetUtil.createSwitch('border', '显示边框'),
        widgetUtil.createSwitch('stripe', '显示斑马条纹'),
        widgetUtil.createSwitch('_showIndex', '显示序号'),
  

      ]
    },
    ...buildOtherProp(false)
  }
}

//
export default biTableConfig