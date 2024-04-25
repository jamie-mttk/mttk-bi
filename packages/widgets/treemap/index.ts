import { biTreemapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'

//
const biTreemapConfig = {
  key: '_bi_treemap',
  name: locale.t('bi.widgets.treemap.name'),
  description: '',
  icon: 'mdiChartTree',
  sequence: 31,
  transform: biTreemapTransform,
  editor: {
    model: buildModelFull({
        type: 'treemap'
      },[
        {
          _type: 'dimension',
          description: locale.t('bi.widgets.treemap.dimension_description'),
          option: { maxRow: 10, minRow: 1 }
        },
        {
          _type: 'metric',
          description: locale.t('bi.widgets.treemap.metric_description'),
          option: { maxRow: 1, minRow: 0 }
        },
      ...commonMoldelConfig
      ]),
    basic: {
      init: { 'leaf-depth': 1,'upper-label':false },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInputNumber('leaf-depth', locale.t('bi.widgets.treemap.leaf-depth'),{min:0}),
        widgetUtil.createSwitch('upper-label', locale.t('bi.widgets.treemap.upper-label')),
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biTreemapConfig
