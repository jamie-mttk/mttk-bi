import { computed, unref } from 'vue'
import { inputTransform } from './transform'
//input config
export const inputConfig = {
  key: '_input',
  name: 'Input',
  description: 'Basic input',
  icon: 'ScaleToOriginal',
  transform: inputTransform,
  editor: function (data: any) {
    return [
      {
        '~component': 'el-select',
        '~label': 'Type',
        '~prop': 'type',
        clearable: true,
        //options is not a standard el-select prop,the transform will handle it
        '~options': [
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
        ]
      },
      {
        '~component': 'el-input',
        '~label': 'Place holder',
        '~prop': 'placeholder',
        clearable: true
      },
      {
        '~component': 'el-switch',
        '~label': 'Clearable',
        '~prop': 'clearable',
        '~show': computed(() => unref(data).type != 'textarea')
      },
      {
        '~component': 'el-switch',
        '~label': 'Disabled',
        '~prop': 'disabled'
      },
      {
        '~component': 'el-select',
        '~label': 'Size',
        '~prop': 'size',
        clearable: true,
        '~options': ['large', 'default', 'small']
      },
      {
        '~component': 'el-input-number',
        '~label': 'Min length',
        '~prop': 'minlength',
        clearable: true
      },
      {
        '~component': 'el-input-number',
        '~label': 'Max length',
        '~prop': 'maxlength',
        clearable: true
      },
      {
        '~component': 'el-switch',
        '~label': 'Show word limit',
        '~prop': 'show-word-limit',
        '~show': computed(() => unref(data).type == 'textarea' || unref(data).type == 'text')
      },
      {
        '~component': 'el-input-number',
        '~label': 'Rows',
        '~prop': 'rows',
        '~show': computed(() => unref(data).type == 'textarea')
      },
      {
        '~component': 'el-switch',
        '~label': 'Show password',
        '~prop': 'show-password',
       // '~show': computed(() => unref(data).type == 'password')
      },
      {
        '~component': 'lc-icon-picker',
        '~label': 'Prefix icon',
        '~prop': 'prefix-icon'
      },
      {
        '~component': 'lc-icon-picker',
        '~label': 'Suffix icon',
        '~prop': 'suffix-icon'
      }
    ]
  },
  dataConfig: {
    //readonly:true,
    type:'String',
  },
  initConfig: {
    props: {

    }
  },
  initStyles: {
    margin:'6px 0',
  }
}
