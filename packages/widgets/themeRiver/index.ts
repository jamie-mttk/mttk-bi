import { biThemeRiverTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import {locale} from 'mttk-lowcode-engine'
//
const biThemeRiverConfig = {
  key: '_bi_themeRiver',
  name: locale.t('bi.widgets.themeRiver.name'),
  description: '',
  icon: 'mdiWavesArrowRight',
  sequence: 32,
  transform: biThemeRiverTransform,
  editor: {
    model: buildModelFull( {
        type: 'themeRiver'
      },[
        {
          _type: 'dimension',
          description: locale.t('bi.widgets.themeRiver.dimension_description'),
          option: { maxRow: 3, minRow: 2 }
        },
        {
          _type: 'metric',
          description: locale.t('bi.widgets.themeRiver.metric_description'),
          option: { maxRow: 1, minRow: 0 }
        },
       ...commonMoldelConfig
      ]),
    basic: {
      init: {  },
      ui: [
        ...buildEchartsBaseUI(),

      ]
    },
    ...buildOtherProp()
  }
}

//
export default biThemeRiverConfig
