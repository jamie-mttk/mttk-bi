import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'
//button config
const buttonConfig = {
  key: '_button',
  name: 'Button',
  description: 'Basic button',
  icon: 'mdiButtonCursor',
  sequence: 11,
  transform: buildWidgetFunc('el-button',{}, (result, {config}) => {
    //Lable is the default slot content
    // console.log('@@@@@@@@@@@@@@@@@@')
    result['#default'] = config['_label'] || 'Button'


  }),
  // transform: function () {
  //   return {
  //     '~': 'el-button',
  //     '#': 'JAMIE',
  //     '^onMounted': function () {
  //       alert('333')
  //       console.log('MOUNTED IS CALLED in EL_BUTTON')
  //     }
  //   }
  // },
  editor: {
    basic: {
      init: { type: 'primary', _label: 'Button', size: 'default' },
      ui: [
        uiUtil.createInput('_label'),
        uiUtil.createSelect('type', ['primary', 'success', 'warning', 'danger', 'info']),
        uiUtil.createSelect('size', ['large', 'default', 'small']),
        uiUtil.createSwitch('disabled'),
        uiUtil.createColorPicker('color', undefined, {
          predefine: ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']
        })
      ]
    },
    data: false,
    event: {
      list: ['click'],
      init: []
    },
    display: {
      init: {
        style: {
          display: 'inline-block',
          margin: '4px 0 4px 0'
        },
        class: ''
      }
    }
    // demo2: {
    //   icon: 'mdiAccountBoxOutline',
    //   name: 'Demo2',
    //   ui: {
    //     '~':'div',
    //     '#':'Hello world'
    //   },
    //   init: {
    //     hello: true,
    //     world: 'China'
    //   }
    // }
  }
  // initConfig: {
  //   props: {
  //     type: 'primary',
  //     _label: 'button'
  //   }
  // },
  // initStyles: {
  //   display: 'inline-block',
  //   margin: '4px 0 4px 0'
  // }
}
//
export default buttonConfig
