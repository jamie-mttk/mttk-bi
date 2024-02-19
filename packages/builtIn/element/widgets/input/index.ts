import { computed, unref } from 'vue'

import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'

//input config
const inputConfig = {
  key: '_input',
  name: 'Input',
  description: 'Basic input',
  icon: 'mdiFormTextbox',
  sequence: 12,
  transform: buildWidgetFunc('el-input', {},(result, {config}) => {
    handleIconIfHave(result, config, 'prefix')
    handleIconIfHave(result, config, 'suffix')
  }),
  editor: {
    basic: {
      init: { type: 'text', clearable: true, size: 'default' },
      ui: function ({config}) {
        return [
          uiUtil.createSelect('type', [
            'text',
            'textarea',
            'password',
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'time',
            'url',
            'week'
          ]),
          uiUtil.createInput('placeholder'),
          uiUtil.createSwitch('clearable', undefined, {
            '~show': computed(() => unref(config).type != 'textarea')
          }),
          uiUtil.createSwitch('disabled'),
          uiUtil.createSelect('size', ['large', 'default', 'small']),
          uiUtil.createInputNumber('minlength', 'Min length'),
          uiUtil.createInputNumber('maxlength', 'Max length'),
          uiUtil.createSwitch('show-word-limit', undefined, {
            '~show': computed(() => unref(config).type == 'textarea' || unref(config).type == 'text')
          }),
          uiUtil.createInputNumber('rows', undefined, {
            '~show': computed(() => unref(config).type == 'textarea')
          }),
          uiUtil.createSwitch('show-password'),
          uiUtil.createIconPicker('_prefix-icon'),
          uiUtil.createIconPicker('_suffix-icon')
        ]
      }
    },
    data: {
      type: 'String',
      init: {
        mode: 'fixed',
        dataContent: 'Fixed data'
      }
    },
    event: {
      list: ['input', 'change'],
      init: []
    },
    display: {
      init: {
        style: {
          margin: '6px 0'
        },
        class: ''
      }
    },
    // demo: {
    //   icon: 'mdiAccountBoxOutline',
    //   name: 'Demo',
    //   ui: [
    //     uiUtil.createSwitch('hello'),
    //     uiUtil.createSelect('world', ['American', 'China', 'Russia'])
    //   ],
    //   init: {
    //     hello: true,
    //     world: 'China'
    //   }
    // }
  }
}

//
//
function handleIconIfHave(result: object, config: any, slotName: string) {
  const icon = config['_' + slotName + '-icon']
  // console.log('@@@:'+slotName+'==>'+icon)
  if (!icon) {
    return
  }

  result['#' + slotName] = { '~component': 'lc-icon', icon: icon, size: '1.5em' }
}

//
export default inputConfig
