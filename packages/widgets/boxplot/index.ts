import { biBoxplotTransform } from './transform'
import {buildModelFull,buildOtherProp,commonMoldelConfig,buildEchartsBaseUI} from '../utils/indexUtil'
import {locale} from 'mttk-lowcode-engine'



//
const biBoxplotConfig = {
  key: '_bi_boxplot',
  name: locale.t('bi.widgets.boxplot.name'),
  description: '',
  icon: 'mdiDnsOutline',
  sequence: 31,
  transform: biBoxplotTransform,  
  editor: {
    model: buildModelFull( {
        type: 'boxplot'
      },[
        { _type: 'dimension', description:locale.t('bi.widgets.boxplot.dimension_description'), option: { maxRow: 2,minRow:1 } },
        { _type: 'metric', description:locale.t('bi.widgets.boxplot.metric_description'), option: { maxRow: 1,minRow:0 } },
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
export default  biBoxplotConfig