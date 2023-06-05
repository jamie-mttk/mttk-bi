import { dividerTransform } from './transform'
//
export const dividerConfig = {
  key: '_divider',
  name: 'Divider',
  description: '',
  icon: 'SemiSelect',
  transform: dividerTransform,
  editor: [
    {
      '~component': 'el-input',
      '~label': 'Content',
      '~prop': 'content',
      clearable: true
    },
    {
      '~component': 'el-select',
      '~label': 'Direction',
      '~prop': 'direction',
      clearable: true,
      '~options': [
        'horizontal:Horizontal',
        'vertical:Vertical',
      ]
    },
    {
      '~component': 'el-select',
      '~label': 'Border style',
      '~prop': 'border-style',
      clearable: true,
      '~options': [
        'none',
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
      ]
    },
    {
      '~component': 'el-select',
      '~label': 'Content position',
      '~prop': 'content-position',
      clearable: true,
      '~options': [
        'left',
        'right',
        'center',
      ]
    },

  ],
  initConfig: {
    props: {
      direction: 'horizontal',
      'border-style': 'solid',
      'content-position':'center',
    }
  },
  initStyles: {
  }
}
