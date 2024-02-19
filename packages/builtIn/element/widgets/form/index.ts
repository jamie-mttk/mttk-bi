import { computed, unref, isRef } from 'vue'
import { elementFormTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { createUniqueString } from '@/utils/tools'
//table config
const formConfig = {
  key: '_form',
  name: 'Form',
  description: 'Basic form',
  icon: 'mdiFormatColumns',
  sequence: 13,
  transform: elementFormTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createSwitch('inline'),
        uiUtil.createSelect('label-position', ['left', 'right', 'top']),
        uiUtil.createInput('label-width'),
        {
          '~component': 'lc-editable-list',
          '~label': 'Items',
          '~prop': '_container',
          labelColumn: 'label',
          editConfig: function (d) {
            return [
              uiUtil.createInput('label'),
              uiUtil.createInput('prop'),
              uiUtil.createSwitch('required'),
              uiUtil.createSelect('~controllerType', [
                'input',
                'input-number',
                'select',
                'switch',
                'container'
              ]),
              uiUtil.createSelect('_type', ['text', 'textarea'], undefined, {
                '~show': computed(() => unref(d)['~controllerType'] == 'input')
              }),
              uiUtil.createSwitch('_controls', 'Show controls', {
                '~show': computed(() => unref(d)['~controllerType'] == 'input-number'),
                '~default': true
              }),
              uiUtil.createInput('_placeholder', undefined, {
                '~show': computed(() => unref(d)['~controllerType'] != 'switch')
              }),
              uiUtil.createSwitch('_clearable', undefined, {
                '~show': computed(() => unref(d)['~controllerType'] != 'switch')
              }),
              uiUtil.createInput('_active-text', undefined, {
                '~show': computed(() => unref(d)['~controllerType'] == 'switch')
              }),
              uiUtil.createInput('_inactive-text', undefined, {
                '~show': computed(() => unref(d)['~controllerType'] == 'switch')
              }),
              uiUtil.createInput('~options', undefined, {
                '~show': computed(() => unref(d)['~controllerType'] == 'select')
              })
            ]
          }
        }
      ],
      init: {
        inline: false,
        'label-position': 'top',
        'label-width': '50px',
        _container: [
          { label: 'Name', prop: 'name', type: 'input',key:createUniqueString() },
          { label: 'Address', prop: 'address', type: 'input',key:createUniqueString()  }
        ]
      }
    },
    data: {
      modelValueName: 'model',
      //readonly:true,
      type: 'Object'
    },
    display: {
      init: {
        style: {
          display: 'block',
          width: '100%',
          margin: '4px 0 4px 0'
        }
      }
    }
  }
}
//
export default formConfig
