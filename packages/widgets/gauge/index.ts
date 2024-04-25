import { biGaugeTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import {locale} from 'mttk-lowcode-engine'
//
const biGaugeConfig = {
  key: '_bi_gauge',
  name: locale.t('bi.widgets.gauge.name'),
  description: '',
  icon: 'mdiGauge',
  sequence: 22,
  transform: biGaugeTransform,  
  editor: {
    model: buildModelFull({
        type: 'gauge'
      },[

        { _type: 'metric', description:locale.t('bi.widgets.gauge.metric_description'), option: { maxRow: 1,minRow:1 } },
        ...commonMoldelConfig
      ]),
    
    basic: {
      init: {},
      ui: [
        ...buildEchartsBaseUI(),

      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biGaugeConfig