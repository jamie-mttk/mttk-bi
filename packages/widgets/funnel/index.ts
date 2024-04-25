import { biFunnelTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import {locale} from 'mttk-lowcode-engine'
//
const biFunnelConfig = {
  key: '_bi_funnel',
  name: locale.t('bi.widgets.funnel.name'),
  description: '',
  icon: 'mdiFilterSettings',
  sequence: 32,
  transform: biFunnelTransform,  
  editor: {
    model: buildModelFull({
        type: 'funnel'
      },[
        { _type: 'dimension', description:locale.t('bi.widgets.funnel.dimension_description'), option: { maxRow: 1,minRow:1 } },
        { _type: 'metric', description:locale.t('bi.widgets.funnel.metric_description'), option: { maxRow: 1,minRow:1 } },
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
export default  biFunnelConfig