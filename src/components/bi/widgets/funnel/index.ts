import { biFunnelTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
//
const biFunnelConfig = {
  key: '_bi_funnel',
  name: 'BI漏斗图',
  description: '',
  icon: 'mdiFilterSettings',
  sequence: 32,
  transform: biFunnelTransform,  
  editor: {
    model: buildModelFull({
        type: 'funnel'
      },[
        { _type: 'dimension', description:'给出漏斗的数据项目.', option: { maxRow: 1,minRow:1 } },
        { _type: 'metric', description:'给出漏斗的数据值.', option: { maxRow: 1,minRow:1 } },
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
export default  biFunnelConfig