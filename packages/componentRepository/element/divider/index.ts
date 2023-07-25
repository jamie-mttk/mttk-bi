import * as uiUtil from '../../util/uiUtil'
import { buildWidgetFunc } from '../../util/transformUtil'
//
const dividerConfig = {
  key: '_divider',
  name: 'Divider',
  description: '',
  icon: 'mdiLineScan',
  sequence:8,
  transform: buildWidgetFunc('el-divider',(result,  config,) => {
    //Lable is the default slot content
    result.slots.default = config['_content'] || ''
  }),
  editor: [
    uiUtil.createInput('_content'),
    uiUtil.createSelect('direction', ['horizontal', 'vertical']),
    uiUtil.createSelect('border-style', [
      'none',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset'
    ]),
    uiUtil.createSelect('content-position',  ['left', 'right', 'center']),

  ],
  initConfig: {
    props: {
      direction: 'horizontal',
      'border-style': 'solid',
      'content-position': 'center'
    }
  },
  initStyles: {}
}
//
export default dividerConfig 