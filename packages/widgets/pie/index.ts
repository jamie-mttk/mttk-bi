import { biPieTransform } from './transform'
import { buildModelFull,  buildOtherProp,buildEchartsBaseUI ,commonMoldelConfig} from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
const biPieConfig = {
  key: '_bi_pie',
  name: locale.t('bi.widgets.pie.name'),
  description: '',
  icon: 'mdiChartPie',
  sequence: 13,
  transform: biPieTransform,
  editor: {
    model: buildModelFull({
        type: 'pie'
      },[
        'dimension',
        { _type: 'metric', prop:'metric',label: locale.t('bi.widgets.pie.metric'), option: { maxRow: 1 } },
        'drilling',
       ...commonMoldelConfig
      ]),
    basic: {
      init: { 'series-radius': '65%' },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSelect('series-roseType', [ { label: locale.t('bi.widgets.pie.series-roseType_radius'), value: 'radius' }, { label:locale.t('bi.widgets.pie.series-roseType_area'), value: 'area' } ], locale.t('bi.widgets.pie.series-roseType')),
        widgetUtil.createSwitch('border-radius', locale.t('bi.widgets.pie.border-radius')),
        widgetUtil.createSelect(
          'series-radius',
          [
            { label: locale.t('bi.widgets.pie.series-radius_1'), value: '80%' },
            { label:locale.t('bi.widgets.pie.series-radius_2'), value: '65%' },
            { label:locale.t('bi.widgets.pie.series-radius_3'), value: '50%' },
            { label: locale.t('bi.widgets.pie.series-radius_4'), value: ["45%","65%"] },
            { label: locale.t('bi.widgets.pie.series-radius_5'), value: ["40%","70%"] },
            { label: locale.t('bi.widgets.pie.series-radius_6'), value: ["35%","75%"] }
          ],
          locale.t('bi.widgets.pie.series-radius')
        )
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biPieConfig
