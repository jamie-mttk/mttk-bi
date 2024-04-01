import { biBoxplotTransform } from './transform'
import {buildModel,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'



//
const biBoxplotConfig = {
  key: '_bi_boxplot',
  name: 'BI盒须图',
  description: '',
  icon: 'mdiDnsOutline',
  sequence: 31,
  transform: biBoxplotTransform,  
  editor: {
    model: {
      name: '数据模型',

      init: {
        type: 'boxplot'
      },
      ui: buildModel([
        { _type: 'dimension', description:'给出项目名称和值(也可以再度量给出).', option: { maxRow: 2,minRow:1 } },
        { _type: 'metric', description:'值(也可以在维度给出).', option: { maxRow: 1,minRow:0 } },
        'filter','rowLimit',
        'refresh','showSQL','showData',
      ]),
    },
    basic: {
      init: {},
      ui: [
        widgetUtil.createBase('lc-theme-select','echarts-theme','Echarts主题'),
        widgetUtil.createInput('title-text','标题'),
        widgetUtil.createInput('title-subtext','副标题'),

      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biBoxplotConfig