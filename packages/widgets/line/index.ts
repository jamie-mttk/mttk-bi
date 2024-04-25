import { biLineTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
const biLineConfig = {
  key: '_bi_line',
  name: locale.t('bi.widgets.line.name'),
  description: '',
  icon: 'mdiChartBellCurveCumulative',
  sequence: 12,
  transform: biLineTransform,
  editor: {
    model: buildModelFull({ type: 'line' }, [
      'dimension',
      'metric',
      'drilling',
    ...commonMoldelConfig
    ]),
    basic: {
      init: {smooth:true,},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSwitch('smooth', locale.t('bi.widgets.line.smooth')),
        widgetUtil.createSwitch('areaMode',locale.t('bi.widgets.line.areaMode')),
        widgetUtil.createSwitch('stack', locale.t('bi.widgets.line.stack')),
        widgetUtil.createSwitch('reverse',locale.t('bi.widgets.line.reverse'))
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biLineConfig
