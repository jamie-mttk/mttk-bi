import { biSankeyTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'

//
const biSankeyConfig = {
  key: '_bi_sankey',
  name: locale.t('bi.widgets.sankey.name'),
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
          description: locale.t('bi.widgets.sankey.dimension_description'),
          option: { maxRow: 3, minRow: 2 }
        },
        {
          _type: 'metric',
          description: locale.t('bi.widgets.sankey.metric_description'),
          option: { maxRow: 1, minRow: 0 }
        },
        ...commonMoldelConfig
      ]),
    basic: {
      init: { orient: 'horizontal','node-align':'justify' },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSelect(
          'orient',
          [
            { label: locale.t('bi.widgets.sankey.orient_horizontal'), value: 'horizontal' },
            { label:  locale.t('bi.widgets.sankey.orient_vertical'), value: 'vertical' }
          ],
          locale.t('bi.widgets.sankey.orient')
        ),
        widgetUtil.createSelect(
          'node-align',
          [
            { label: locale.t('bi.widgets.sankey.node-align_justify'), value: 'justify' },
            { label: locale.t('bi.widgets.sankey.node-align_left'), value: 'left' },
            { label: locale.t('bi.widgets.sankey.node-align_right'), value: 'right' }
          ],
          locale.t('bi.widgets.sankey.node-align')
        ),
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biSankeyConfig
