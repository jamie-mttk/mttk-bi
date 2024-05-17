import { biCrossTableTransform } from './transform'
import { buildModelFull, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
const biTableConfig = {
  key: '_bi_crossTable',
  name: locale.t('bi.widgets.crossTable.name'),
  description: '',
  icon: 'mdiTableHeadersEye',
  sequence: 3,
  transform: biCrossTableTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'table',
        dumpMode: 'JSON'
      },
      [
        { _type: 'dimension',  description:locale.t('bi.widgets.crossTable.dimension_description'), option: { minRow: 2,maxRow:2 } },
        { _type: 'metric',  description:locale.t('bi.widgets.crossTable.dimension_description'), option: { minRow: 1} },
        ...commonMoldelConfig
      ]
    ),
    basic: {
      init: { border: true, stripe: false },
      ui: [
        widgetUtil.createSwitch('border', locale.t('bi.widgets.crossTable.border')),
        widgetUtil.createSwitch('stripe', locale.t('bi.widgets.crossTable.stripe')),
      ]
    },
    ...buildOtherProp({initDisplay:false})
  }
}

//
export default biTableConfig
