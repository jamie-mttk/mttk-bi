import * as uiUtil from '../../util/uiUtil'
import { buildWidgetFunc } from '../../util/transformUtil'
//button config
const buttonConfig = {
  key: '_button',
  name: 'Button',
  description: 'Basic button',
  icon: 'mdiButtonCursor',
  sequence: 2,
  transform: buildWidgetFunc('el-button',(result,  config,) => {
    //Lable is the default slot content
    result.slots.default = config['_label'] || 'Button'
  }),

  editor: [
    uiUtil.createInput('_label'),
    uiUtil.createSelect('type', ['primary', 'success', 'warning', 'danger', 'info']),
    uiUtil.createSwitch('disabled'),
    uiUtil.createColorPicker('color', undefined, {
      predefine: ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']
    })
  ],
  initConfig: {
    props: {
      type: 'primary',
      _label: 'button'
    }
  },
  initStyles: {
    display: 'inline-block',
    margin: '4px 0 4px 0'
  },
  events:['click']  
}
//
export default buttonConfig
