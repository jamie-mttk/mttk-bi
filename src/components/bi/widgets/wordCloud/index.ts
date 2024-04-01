import { biWordCloudTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import { widgetUtil } from 'mttk-lowcode-engine'

//
const biWordCloudConfig = {
  key: '_bi_wordCloud',
  name: 'BI词云',
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
          description: '第一个参数给出词,第二个(也可以在度量里给出)是值.',
          option: { maxRow: 2, minRow: 1 }
        },
        {
          _type: 'metric',
          description: '数值,可以在维度给出.',
          option: { maxRow: 1, minRow: 0 }
        },
        'filter', 'rowLimit',
        'refresh',
        'showSQL',
        'showData'
      ]),
    basic: {
      init: {shape:'circle',rotate:false },
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createSelect(
          'shape',
          [
            { label: '圆形', value: 'circle' },
            { label: '心形', value: 'cardioid' },
            { label: '钻石形', value: 'diamond' },
            { label: '向前三角形', value: 'triangle-forward' },
            { label: '向上三角形', value: 'triangle' },
            { label: '五边形', value: 'pentagon' },
            { label: '星形', value: 'star'}
          ],
          '显示形状'
        ),
        widgetUtil.createSwitch('rotate', '倾斜显示')
      ]
    },
    ...buildOtherProp()
  }
}

//
export default biWordCloudConfig
