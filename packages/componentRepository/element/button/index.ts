import { buttonTransform } from './transform'
//button config
export const buttonConfig = {
  key: '_button',
  name: 'Button',
  description: 'Basic button',
  icon: 'SwitchButton',
  transform: buttonTransform,
  editor: [
    {
      '~component': 'el-input',
      '~label': 'Label',
      '~prop': 'label',
      clearable: true
    },
    {
      '~component': 'el-select',
      '~label': 'Type',
      '~prop': 'type',
      clearable: true,
      //options is not a standard el-select prop,the transform will handle it
      '~options': [
        'primary:Primary',
        'success:Success',
        'warning:Warning',
        'danger:Danger',
        'info:Info'
      ]
    },
    {
      '~component': 'el-switch',
      '~label': 'Disabled',
      '~prop': 'disabled'
    },
    {
      '~component': 'el-color-picker',
      '~label': 'Color',
      '~prop': 'color'
    },

  ],
  initConfig: {
    props: {
      type: 'primary',
      label: 'button'
    }
  },
  initStyles: {
    display: 'inline-block',
    margin: '4px 0 4px 0'
  }
}
