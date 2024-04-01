import { biBarTransform } from './transform'

import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'
//
const biBarConfig = {
  key: '_bi_bar',
  name: 'BI 柱状图',
  description: '',
  icon: 'mdiChartBar',
  sequence: 13,
  transform: biBarTransform,
  editor: {
    model: buildModelFull( {
        type: 'bar'
      },[
        'dimension',
        'metric',
        'drilling',
        'filter',
        'rowLimit',
        'refresh','showSQL','showData',
      ]),
    basic: {
      init: {},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSwitch('stack', '堆叠'),
        widgetUtil.createSwitch('reverse', '坐标切换')
      ]
    },
    ... buildOtherProp()
  }
}

export default biBarConfig
