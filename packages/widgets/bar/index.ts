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
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.bar.name'),
          '~default':true,
          _children: [
            widgetUtil.createSwitch('stack', locale.t('bi.widgets.bar.stack')),
            widgetUtil.createInput('barWidth', locale.t('bi.widgets.bar.barWidth'),{'~description':locale.t('bi.widgets.utils.indexUtil._valueDescription'),}),
          ]
        },
        ...buildEchartsBaseUI(),

      ]
    },
    ... buildOtherProp()
  }
}

export default biBarConfig
