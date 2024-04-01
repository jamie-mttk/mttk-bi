import { biHeatmapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'

//
const biHeatmapConfig = {
  key: '_bi_heatmap',
  name: 'BI热力图',
  description: '',
  icon: 'mdiFilmstripBoxMultiple',
  sequence: 43,
  transform: biHeatmapTransform,
  editor: {
    model: buildModelFull({
        type: 'heatmap'
      },[
        {
          _type: 'dimension',
          description: '维度分别给出x和y轴的值.',
          option: { maxRow: 2, minRow: 2 }
        },
        {
          _type: 'metric',
          description: '度量给出x轴和y轴交点的值.',
          option: { maxRow: 1, minRow: 1 }
        },
        'filter','rowLimit',
        'refresh',
        'showSQL',
        'showData'
      ]),
    basic: {
      init: { 'split-area-mode': 'both' },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSelect(
          'split-area-mode',
          [
            { label: '都不', value: 'none' },
            { label: '横轴(x)', value: 'x' },
            { label: '纵轴(y)', value: 'y' },
            { label: '横纵轴', value: 'both' }
          ],
          '轴分区线显示'
        ),
        widgetUtil.createSwitch('show-label', '方块上显示数值')
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biHeatmapConfig
