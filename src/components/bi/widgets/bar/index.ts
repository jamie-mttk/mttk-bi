import { biBarTransform } from './transform'

import {buildModel,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'
//

//button config
const biBarConfig = {
  key: '_bi_bar',
  name: 'BI 柱状图',
  description: '',
  icon: 'mdiChartBar',
  sequence: 2,
  transform: biBarTransform,
  editor: {
    model: {
      name: '数据模型',
      sequence: 1,
      init: {
        type: 'bar'
      },
      ui: buildModel([
        'dimension',
        'metric',
        'drilling',
        'rowLimit',
        'refresh','showSQL','showData',
      ]),
    },
    basic: {
      init: {},
      ui: [
        widgetUtil.createInput('title-text','标题'),
        widgetUtil.createInput('title-subtext','副标题'),
        widgetUtil.createSwitch('stack', '堆叠'),
        widgetUtil.createSwitch('reverse', '坐标切换')
      ]
    },
    ... buildOtherProp()
  }
}

export default biBarConfig
