import { biGaugeTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
//
const biGaugeConfig = {
  key: '_bi_gauge',
  name: 'BI仪表盘',
  description: '',
  icon: 'mdiGauge',
  sequence: 22,
  transform: biGaugeTransform,  
  editor: {
    model: buildModelFull({
        type: 'gauge'
      },[

        { _type: 'metric', description:'给出仪表盘显示的数据值.', option: { maxRow: 1,minRow:1 } },
        'filter','rowLimit',
        'refresh','showSQL','showData',
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