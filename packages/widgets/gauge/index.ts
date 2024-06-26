import { biGaugeTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import {widgetUtil,locale} from 'mttk-lowcode-engine'
export const baseConfigList={excludeList:['xAxis','yAxis','dataZoom','legend','grid']}

//
const biGaugeConfig = {
  key: '_bi_gauge',
  name: locale.t('bi.widgets.gauge.name'),
  description: '',
  icon: 'mdiGauge',
  sequence: 22,
  transform: biGaugeTransform,  
  editor: {
    model: buildModelFull({
        type: 'gauge'
      },[

        { _type: 'metric', description:locale.t('bi.widgets.gauge.metric_description'), option: { maxRow: 1,minRow:1 } },
        ...commonMoldelConfig
      ]),
    
    basic: {
      init: {radius:'75%', startAngle : 225,endAngle : -45, clockwise : true},
      ui: [
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.gauge.name'),
          '~default':true,
          _children: [
            widgetUtil.createInput('radius', locale.t('bi.widgets.gauge.radius'),{'~description':locale.t('bi.widgets.utils.indexUtil._valueDescription'),}),
            widgetUtil.createInputNumber('startAngle', locale.t('bi.widgets.gauge.startAngle')),
            widgetUtil.createInputNumber('endAngle', locale.t('bi.widgets.gauge.endAngle')),
            widgetUtil.createSwitch('clockwise', locale.t('bi.widgets.gauge.clockwise')),
          ]
        },
        ...buildEchartsBaseUI(baseConfigList),

      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biGaugeConfig