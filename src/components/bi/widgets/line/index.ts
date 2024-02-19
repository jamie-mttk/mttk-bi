import { biLineTransform } from './transform'
import {buildModel,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'
//
const biLineConfig = {
  key: '_bi_line',
  name: 'BI折线图',
  description: '',
  icon: 'mdiChartBellCurveCumulative',
  sequence: 2,
  transform: biLineTransform,  editor: {
    model: {
      name: '数据模型',
      sequence: 1,
      init: {
        type: 'line'
      },
      ui: buildModel([
        'dimension',
        'metric',
        'drilling',
        'refresh'
      ]),
    },
    basic: {
      init: {},
      ui: [
        widgetUtil.createInput('title-text','标题'),
        widgetUtil.createInput('title-subtext','副标题'),
        widgetUtil.createSwitch('smooth', '平滑曲线'),
        widgetUtil.createSwitch('areaMode', '面积填充'),
        widgetUtil.createSwitch('stack', '堆叠'),
        widgetUtil.createSwitch('reverse', '坐标切换')
      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biLineConfig