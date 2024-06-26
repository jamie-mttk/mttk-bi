import { biScatterTransform } from './transform'
import {
  buildModelFull,
  buildEchartsBaseUI,
  buildOtherProp,
  commonMoldelConfig
} from '../utils/indexUtil'
import { widgetUtil, locale } from 'mttk-lowcode-engine'

//
const biScatterConfig = {
  key: '_bi_scatter',
  name: locale.t('bi.widgets.scatter.name'),
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
          description: locale.t('bi.widgets.scatter.dimension_description'),
          option: { maxRow: 3, minRow: 2 }
        },
        ...commonMoldelConfig
      ]
    ),

    basic: {
      init: { 'regression-curve': 'none', 'symbol-size': 20 ,'xAxis-name':'value'},
      ui: [
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.scatter.name'),
          '~default': true,
          _children: [
            widgetUtil.createSelect(
              'regression-curve',
              [
                { label: locale.t('bi.widgets.scatter.regression-curve_none'), value: 'none' },
                { label: locale.t('bi.widgets.scatter.regression-curve_linear'), value: 'linear' },
                {
                  label: locale.t('bi.widgets.scatter.regression-curve_exponential'),
                  value: 'exponential'
                },
                {
                  label: locale.t('bi.widgets.scatter.regression-curve_logarithmic'),
                  value: 'logarithmic'
                },
                {
                  label: locale.t('bi.widgets.scatter.regression-curve_polynomial'),
                  value: 'polynomial'
                }
              ],
              locale.t('bi.widgets.scatter.regression-curve')
            ),
            widgetUtil.createInputNumber('symbol-size', locale.t('bi.widgets.scatter.symbol-size')),
            widgetUtil.createSwitch(
              'show-range-area',
              locale.t('bi.widgets.scatter.show-range-area')
            ),
            widgetUtil.createSwitch(
              'show-average-line',
              locale.t('bi.widgets.scatter.show-average-line')
            ),
            widgetUtil.createSwitch(
              'highlight-min-max',
              locale.t('bi.widgets.scatter.highlight-min-max')
            )
          ]
        },
        ...buildEchartsBaseUI()
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biScatterConfig
