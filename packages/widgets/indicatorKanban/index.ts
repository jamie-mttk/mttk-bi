import { biIndicatorKanbanTransform } from './transform'
import { buildModelFull, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//

//
const biIndicatorKanbanConfig = {
  key: '_bi_indicatorKanban',
  name: locale.t('bi.widgets.indicatorKanban.name'),
  description: '',
  icon: 'mdiNumeric10BoxMultipleOutline',
  sequence: 23,
  transform: biIndicatorKanbanTransform,
  editor: {
    model: buildModelFull({
        type: 'indicatorKanban'
      },[
        'dimension',
        { _type: 'metric', prop:'metric',label: locale.t('bi.widgets.indicatorKanban.metric'), option: { maxRow: 1,minRow:1 } },

       ...commonMoldelConfig
      ]),
    basic: {
      init: {  qtyPerRow:4},
      ui: [
        widgetUtil.createInput('title-text', locale.t('bi.widgets.indicatorKanban.title-text')),
        widgetUtil.createInput('title-subtext', locale.t('bi.widgets.indicatorKanban.title-subtext')),
        widgetUtil.createInputNumber('qtyPerRow', locale.t('bi.widgets.indicatorKanban.qtyPerRow'),{min:1}),
        
      ]
    },
    ...buildOtherProp({initStyle:{height:''}})
  }
}

//
export default biIndicatorKanbanConfig
