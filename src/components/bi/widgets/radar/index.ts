import { biRadarTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp } from '../utils/indexUtil'




//
const biRadarConfig = {
  key: '_bi_radar',
  name: 'BI雷达图',
  description: '',
  icon: 'mdiRadar',
  sequence: 21,
  transform: biRadarTransform,  
  editor: {
    model: buildModelFull({
        type: 'radar'
      },[

        { _type: 'dimension', description:'第一个参数给出比较项目,后面给出比较数值.', option: { minRow:1 } },
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
export default  biRadarConfig