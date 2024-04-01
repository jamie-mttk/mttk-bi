import { biScatterTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp } from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'

//
const biScatterConfig = {
  key: '_bi_scatter',
  name: 'BI散点图',
  description: '',
  icon: 'mdiChartScatterPlot',
  sequence: 14,
  transform: biScatterTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'scatter'
      },
      [
        {
          _type: 'dimension',
          description:
            '维度前两个为x轴和y轴的数字,第三个可选.如果存在则按照第三个字段分组显示前两个字段.',
          option: { maxRow: 3, minRow: 2 }
        },
        'filter','rowLimit',
        'refresh',
        'showSQL',
        'showData'
      ]
    ),

    basic: {
      init: { 'regression-curve': 'none', 'symbol-size': 20 },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSelect(
          'regression-curve',
          [
            { label: '无', value: 'none' },
            { label: '线性回归', value: 'linear' },
            { label: '指数回归', value: 'exponential' },
            { label: '对数回归', value: 'logarithmic' },
            { label: '多项式回归', value: 'polynomial' }
          ],
          '拟合回归曲线'
        ),
        widgetUtil.createInputNumber('symbol-size', '符号大小'),
        widgetUtil.createSwitch('show-range-area', '显示范围框'),
        widgetUtil.createSwitch('show-average-line', '显示平均线'),
        widgetUtil.createSwitch('highlight-min-max', '高亮最值')
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biScatterConfig
