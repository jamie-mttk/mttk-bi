import { biWaterfallTransform } from './transform'

import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import {locale} from 'mttk-lowcode-engine'
export const baseConfigList={excludeList:['legend']}
//
const biWaterfallConfig = {
  key: '_bi_waterfall',
  name: locale.t('bi.widgets.waterfall.name'),
  description: '',
  icon: 'mdiChartWaterfall',
  sequence: 14,
  transform: biWaterfallTransform,
  editor: {
    model: buildModelFull( {
        type: 'waterfall'
      },[
        'dimension',
        { _type: 'metric', description:locale.t('bi.widgets.waterfall.metric_description'), option: { maxRow: 1,minRow:1 } },

       ...commonMoldelConfig
      ]),
    basic: {
      init: {},
      ui: [
        ...buildEchartsBaseUI(baseConfigList),
      ]
    },
    ... buildOtherProp()
  }
}

export default biWaterfallConfig
