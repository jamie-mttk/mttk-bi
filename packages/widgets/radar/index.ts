import { biRadarTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import {locale} from 'mttk-lowcode-engine'
//
const biRadarConfig = {
  key: '_bi_radar',
  name: locale.t('bi.widgets.radar.name'),
  description: '',
  icon: 'mdiRadar',
  sequence: 21,
  transform: biRadarTransform,  
  editor: {
    model: buildModelFull({
        type: 'radar'
      },[

        { _type: 'dimension', description:locale.t('bi.widgets.radar.dimension_description'), option: { minRow:1,maxRow:1 } },
        { _type: 'metric', description:locale.t('bi.widgets.radar.metric_description'), option: { minRow:1 } },
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
export default  biRadarConfig