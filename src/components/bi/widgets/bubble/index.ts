import { biBubbleTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'



//
const biBubbleConfig = {
  key: '_bi_bubble',
  name: 'BI气泡图',
  description: '',
  icon: 'mdiScatterPlotOutline',
  sequence: 41,
  transform: biBubbleTransform,  
  editor: {
    model: buildModelFull({
        type: 'bubble'
      },[
        { _type: 'dimension', description:'维度分别给出x和y轴的值.', option: { maxRow: 2,minRow:2 } },
        { _type: 'metric', description:'度量给出x轴和y轴交点的值.', option: { maxRow: 1,minRow:1 } },
        'filter','rowLimit',
        'refresh','showSQL','showData',
      ]),
    basic: {
      init: {'symbol-size':40,'symbol-size-base':5,'split-line-mode':'x'},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInputNumber('symbol-size','符号最大大小'),
        widgetUtil.createInputNumber('symbol-size-base','符号基本大小'),
        widgetUtil.createSelect(
          'split-line-mode',
          [
            { label: '都不', value: 'none' },
            { label: '横轴(x)', value: 'x' },
            { label: '纵轴(y)', value: 'y' },
            { label: '横纵轴', value: 'both' },

          ],
          '轴分割线显示'
        ),
      ]
    },
    ... buildOtherProp()
  }
}

//
export default  biBubbleConfig