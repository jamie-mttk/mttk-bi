import { biBubbleTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import  {widgetUtil,locale} from 'mttk-lowcode-engine'



//
const biBubbleConfig = {
  key: '_bi_bubble',
  name: locale.t('bi.widgets.bubble.name'),
  description: '',
  icon: 'mdiScatterPlotOutline',
  sequence: 41,
  transform: biBubbleTransform,  
  editor: {
    model: buildModelFull({
        type: 'bubble'
      },[
        { _type: 'dimension', description:locale.t('bi.widgets.bubble.dimension_description'), option: { maxRow: 2,minRow:2 } },
        { _type: 'metric', description:locale.t('bi.widgets.bubble.metric_description'), option: { maxRow: 1,minRow:1 } },
       ...commonMoldelConfig
      ]),
    basic: {
      init: {'symbol-size':40,'symbol-size-base':5,'split-line-mode':'x'},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInputNumber('symbol-size',locale.t('bi.widgets.bubble.symbol-size')),
        widgetUtil.createInputNumber('symbol-size-base',locale.t('bi.widgets.bubble.symbol-size-base')),
        widgetUtil.createSelect(
          'split-line-mode',
          [
            { label: locale.t('bi.widgets.bubble.split-line-mode_none'), value: 'none' },
            { label: locale.t('bi.widgets.bubble.split-line-mode_x'), value: 'x' },
            { label:locale.t('bi.widgets.bubble.split-line-mode_y'), value: 'y' },
            { label: locale.t('bi.widgets.bubble.split-line-mode_both'), value: 'both' },

          ],
          locale.t('bi.widgets.bubble.split-line-mode'),
        ),
      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biBubbleConfig