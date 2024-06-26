import { biWordCloudTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
export const baseConfigList={excludeList:['xAxis','yAxis','dataZoom','legend','grid']}
//
const biWordCloudConfig = {
  key: '_bi_wordCloud',
  name: locale.t('bi.widgets.wordCloud.name'),
  description: '',
  icon: 'mdiCloudPrintOutline',
  sequence: 23,
  transform: biWordCloudTransform,
  editor: {
    model:buildModelFull({
        type: 'wordCloud'
      },[
        {
          _type: 'dimension',
          description: locale.t('bi.widgets.wordCloud.dimension_description'),
          option: { maxRow: 2, minRow: 1 }
        },
        {
          _type: 'metric',
          description: locale.t('bi.widgets.wordCloud.metric_description'),
          option: { maxRow: 1, minRow: 0 }
        },
      ...commonMoldelConfig
      ]),
    basic: {
      init: {shape:'circle',rotate:false },
      ui: [
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.wordCloud.name'),
          '~default':true,
          _children: [
            widgetUtil.createSelect(
              'shape',
              [
                { label: locale.t('bi.widgets.wordCloud.shape_circle'), value: 'circle' },
                { label: locale.t('bi.widgets.wordCloud.shape_cardioid'), value: 'cardioid' },
                { label:  locale.t('bi.widgets.wordCloud.shape_diamond'), value: 'diamond' },
                { label:  locale.t('bi.widgets.wordCloud.shape_triangle-forward'), value: 'triangle-forward' },
                { label:  locale.t('bi.widgets.wordCloud.shape_triangle'), value: 'triangle' },
                { label:  locale.t('bi.widgets.wordCloud.shape_pentagon'), value: 'pentagon' },
                { label:  locale.t('bi.widgets.wordCloud.shape_star'), value: 'star'}
              ],
              locale.t('bi.widgets.wordCloud.shape')
            ),
            widgetUtil.createSwitch('rotate', locale.t('bi.widgets.wordCloud.rotate'))
          ]},
        ...buildEchartsBaseUI(baseConfigList),

      ]
    },
    ...buildOtherProp()
  }
}

//
export default biWordCloudConfig
