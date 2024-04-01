import { biWaterfallTransform } from './transform'

import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'

//
const biWaterfallConfig = {
  key: '_bi_waterfall',
  name: 'BI瀑布图',
  description: '',
  icon: 'mdiChartWaterfall',
  sequence: 14,
  transform: biWaterfallTransform,
  editor: {
    model: buildModelFull( {
        type: 'waterfall'
      },[
        'dimension',
        { _type: 'metric', description:'给出数据,可正可负.', option: { maxRow: 1,minRow:1 } },
        'drilling',
        'rowLimit',
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

export default biWaterfallConfig
