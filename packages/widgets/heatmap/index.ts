import { biHeatmapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
export const baseConfigList={excludeList:['legend']}
//
const biHeatmapConfig = {
  key: '_bi_heatmap',
  name: locale.t('bi.widgets.heatmap.name'),
  description: '',
  icon: 'mdiFilmstripBoxMultiple',
  sequence: 43,
  transform: biHeatmapTransform,
  editor: {
    model: buildModelFull({
        type: 'heatmap'
      },[
        {
          _type: 'dimension',
          description: locale.t('bi.widgets.heatmap.dimension_description'),
          option: { maxRow: 2, minRow: 2 }
        },
        {
          _type: 'metric',
          description: locale.t('bi.widgets.heatmap.metric_description'),
          option: { maxRow: 1, minRow: 1 }
        },
        ...commonMoldelConfig
      ]),
    basic: {
      init: { 'yAxis-type': 'category','show-label':true },
      ui: [
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.heatmap.name'),
          '~default':true,
          _children: [
            // widgetUtil.createSelect(
            //   'split-area-mode',
            //   [
            //     { label: locale.t('bi.widgets.heatmap.split-area-mode_none'), value: 'none' },
            //     { label:locale.t('bi.widgets.heatmap.split-area-mode_x'), value: 'x' },
            //     { label: locale.t('bi.widgets.heatmap.split-area-mode_y'), value: 'y' },
            //     { label:locale.t('bi.widgets.heatmap.split-area-mode_both'), value: 'both' }
            //   ],
            //   locale.t('bi.widgets.heatmap.split-area-mode')
            // ),
            widgetUtil.createSwitch('show-label', locale.t('bi.widgets.heatmap.show-label'))
          ]},
        ...buildEchartsBaseUI(baseConfigList),

      ]
    },
    ...buildOtherProp()
  }
}

//
export default biHeatmapConfig
