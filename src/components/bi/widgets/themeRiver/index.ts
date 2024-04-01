import { biThemeRiverTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'


//
const biThemeRiverConfig = {
  key: '_bi_themeRiver',
  name: 'BI河流图',
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
          description: '前两个参数给出时间和主题,第三个(也可以在度量里给出)是值.',
          option: { maxRow: 3, minRow: 2 }
        },
        {
          _type: 'metric',
          description: '度量给出x轴和y轴交点的值.',
          option: { maxRow: 1, minRow: 0 }
        },
        'filter','rowLimit',
        'refresh',
        'showSQL',
        'showData'
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
