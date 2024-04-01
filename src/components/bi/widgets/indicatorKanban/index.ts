import { biIndicatorKanbanTransform } from './transform'
import { buildModelFull, buildOtherProp } from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'
//

//
const biIndicatorKanbanConfig = {
  key: '_bi_indicatorKanban',
  name: 'BI指标看板',
  description: '',
  icon: 'mdiNumeric10BoxMultipleOutline',
  sequence: 13,
  transform: biIndicatorKanbanTransform,
  editor: {
    model: buildModelFull({
        type: 'indicatorKanban'
      },[
        'dimension',
        { _type: 'metric', prop:'metric',label: '度量', option: { maxRow: 1 } },

        'filter','rowLimit',
        'interval',
        'refresh','showSQL','showData',
      ]),
    basic: {
      init: {  qtyPerRow:4},
      ui: [
        widgetUtil.createInput('title-text', '标题'),
        widgetUtil.createInput('title-subtext', '副标题'),
        widgetUtil.createInputNumber('qtyPerRow', '每行个数',{min:1}),
        
      ]
    },
    ...buildOtherProp({initStyle:{height:''}})
  }
}

//
export default biIndicatorKanbanConfig
