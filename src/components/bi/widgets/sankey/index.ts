import { biSankeyTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'

//
const biSankeyConfig = {
  key: '_bi_sankey',
  name: 'BI桑基图',
  description: '',
  icon: 'mdiChartSankeyVariant',
  sequence: 33,
  transform: biSankeyTransform,
  editor: {
    model: buildModelFull({
        type: 'sankey'
      },[
        {
          _type: 'dimension',
          description: '前两个参数给出源和目标,第三个(也可以在度量里给出)是值.',
          option: { maxRow: 3, minRow: 2 }
        },
        {
          _type: 'metric',
          description: '度量给出x轴和y轴交点的值.',
          option: { maxRow: 1, minRow: 0 }
        },
        'filter','rowLimit',
        'refresh',
        'showSQL',
        'showData'
      ]),
    basic: {
      init: { orient: 'horizontal','node-align':'justify' },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSelect(
          'orient',
          [
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' }
          ],
          '方向'
        ),
        widgetUtil.createSelect(
          'node-align',
          [
            { label: '双端对齐', value: 'justify' },
            { label: '左对齐', value: 'left' },
            { label: '右对齐', value: 'right' }
          ],
          '节点对齐方式'
        ),
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biSankeyConfig
