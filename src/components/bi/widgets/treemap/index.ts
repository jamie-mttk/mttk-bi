import { biTreemapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'

//
const biTreemapConfig = {
  key: '_bi_treemap',
  name: 'BI矩形树图',
  description: '',
  icon: 'mdiChartTree',
  sequence: 31,
  transform: biTreemapTransform,
  editor: {
    model: buildModelFull({
        type: 'treemap'
      },[
        {
          _type: 'dimension',
          description: '前面参数给出层级,最后一个(也可以在度量里给出)是值.层级参数需要设置排序!',
          option: { maxRow: 10, minRow: 1 }
        },
        {
          _type: 'metric',
          description: '度量给出值,也可以在维度你给出.',
          option: { maxRow: 1, minRow: 0 }
        },
        'filter','rowLimit',
        'refresh',
        'showSQL',
        'showData'
      ]),
    basic: {
      init: { 'leaf-depth': 1,'upper-label':false },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInputNumber('leaf-depth', '初始显示层级',{min:0}),
        widgetUtil.createSwitch('upper-label', '显示上级标题'),
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biTreemapConfig
