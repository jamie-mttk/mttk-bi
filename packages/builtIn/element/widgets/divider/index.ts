import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'
//
const dividerConfig = {
  key: '_divider',
  name: 'Divider',
  description: '',
  icon: 'mdiLineScan',
  sequence:42,
  transform: buildWidgetFunc('el-divider',{}, (result, {config}) => {
    result['#']= config._content
  }),
  editor: {
    basic:{
      ui:[
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
      init: {
          direction: 'horizontal',
          'border-style': 'solid',
          'content-position': 'center'
      },
    }
  },

}
//
export default dividerConfig 