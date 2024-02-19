import { biPieTransform } from './transform'
import { buildModel, buildOtherProp } from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'
//
const biPieConfig = {
  key: '_bi_pie',
  name: 'BI Pie',
  description: '',
  icon: 'mdiChartPie',
  sequence: 2,
  transform: biPieTransform,
  editor: {
    model: {
      name: '数据模型',
      sequence: 1,
      init: {
        type: 'pie'
      },
      ui: buildModel([
        'dimension',
        { _type: 'metric', prop:'metric',label: '度量', option: { maxRow: 1 } },
        'drilling',
        'refresh'
      ])
    },
    basic: {
      init: { 'series-radius': '65%' },
      ui: [
        widgetUtil.createInput('title-text', '标题'),
        widgetUtil.createInput('title-subtext', '副标题'),
        widgetUtil.createSelect('series-roseType', [ { label: '角度表示大小', value: 'radius' }, { label: '面积表示大小', value: 'area' } ], '玫瑰形状'),
        widgetUtil.createSwitch('border-radius', '边缘显示圆弧'),
        widgetUtil.createSelect(
          'series-radius',
          [
            { label: '大圆', value: '80%' },
            { label: '中圆', value: '65%' },
            { label: '小圆', value: '50%' },
            { label: '细环', value: ["45%","65%"] },
            { label: '中等', value: ["40%","70%"] },
            { label: '粗环', value: ["35%","75%"] }
          ],
          '半径形状'
        )
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biPieConfig
