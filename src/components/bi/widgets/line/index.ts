import { biLineTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp } from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'
//
const biLineConfig = {
  key: '_bi_line',
  name: 'BI折线图',
  description: '',
  icon: 'mdiChartBellCurveCumulative',
  sequence: 12,
  transform: biLineTransform,
  editor: {
    model: buildModelFull({ type: 'line' }, [
      'dimension',
      'metric',
      'drilling',
      'filter', 'rowLimit',
      'refresh',
      'showSQL',
      'showData'
    ]),
    basic: {
      init: {smooth:true,},
      ui: [
        ...buildEchartsBaseUI(),
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
export default biLineConfig
