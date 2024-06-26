import { biRadarTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale} from 'mttk-lowcode-engine'
export const baseConfigList={excludeList:['grid','xAxis','yAxis','dataZoom']}

//
const biRadarConfig = {
  key: '_bi_radar',
  name: locale.t('bi.widgets.radar.name'),
  description: '',
  icon: 'mdiRadar',
  sequence: 21,
  transform: biRadarTransform,  
  editor: {
    model: buildModelFull({
        type: 'radar'
      },[

        { _type: 'dimension', description:locale.t('bi.widgets.radar.dimension_description'), option: { minRow:1,maxRow:1 } },
        { _type: 'metric', description:locale.t('bi.widgets.radar.metric_description'), option: { minRow:1 } },
        ...commonMoldelConfig
      ]),
    basic: {
      init: {'legend-left':'right','legend-orient':'vertical','shape':'polygon','radius':'75%'},
      ui: [
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.radar.name'),
          '~default':true,
          _children: [
            widgetUtil.createInput('radius', locale.t('bi.widgets.radar.radius'),{'~description':locale.t('bi.widgets.utils.indexUtil._valueDescription'),}),
            widgetUtil.createSelect(
              'shape',
              [
                { label: locale.t('bi.widgets.radar.shape_1'), value: 'polygon' },
                { label:locale.t('bi.widgets.radar.shape_2'), value: 'circle' },
              ],
              locale.t('bi.widgets.radar.shape')
            )
          ]
        },
        ...buildEchartsBaseUI(baseConfigList),

      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biRadarConfig