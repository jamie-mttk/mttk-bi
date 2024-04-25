import { biBarTransform } from './transform'

import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import  {widgetUtil,locale} from 'mttk-lowcode-engine'
//
const biBarConfig = {
  key: '_bi_bar',
  name: locale.t('bi.widgets.bar.name'),
  description: '',
  icon: 'mdiChartBar',
  sequence: 13,
  transform: biBarTransform,
  editor: {
    model: buildModelFull( {
        type: 'bar'
      },[
        'dimension',
        'metric',
        'drilling',
        ...commonMoldelConfig
      ]),
    basic: {
      init: {statck:false,'axis-setting':'bl'},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSwitch('stack', locale.t('bi.widgets.bar.stack')),
        widgetUtil.createSwitch('reverse', locale.t('bi.widgets.bar.reverse')),
        // widgetUtil.createSelect(
        //   'axis-setting',
        //   [
        //     { label: 'X坐标在下Y坐标在左', value: 'bl' },
        //     { label: 'X坐标在下Y坐标在右', value: 'br' },
        //     { label: 'X坐标在上Y坐标在左', value: 'tl' },
        //     { label: 'X坐标在上Y坐标在右', value: 'tr' },
        //   ],
        //   'Axis setting'
        // )
      ]
    },
    ... buildOtherProp()
  }
}

export default biBarConfig
