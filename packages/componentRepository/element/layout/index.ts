import { layoutTransform } from './transform'

//
export  const layoutConfig = {
  key: '_layout',
  name: 'Layout',
  description: 'Row col based layout',
  icon: 'Memo',
  transform: layoutTransform,
  editor: [
    {
      '~component': 'el-input-number',
      '~label': 'Gutter',
      '~prop': 'gutter'
    },
    {
      '~component': 'el-select',
      '~label': 'Justify',
      '~prop': 'justify',
      '~options': [
          { value: 'start', label: 'Start' },
          { value: 'end', label: 'End' },
          { value: 'center', label: 'Center' },
          { value: 'space-around', label: 'Space around' },
          { value: 'space-between', label: 'Space between' },
          { value: 'space-evenly', label: 'Space evenly' }
        ]      
    },
    {
      '~component': 'el-select',
      '~label': 'Align',
      '~prop': 'align',
      '~options': [
          { value: 'top', label: 'Top' },
          { value: 'middle', label: 'Middle' },
          { value: 'bottom', label: 'Bottom' }
        ]
      
    },
    {
      '~component': 'lc-editable-list',
      '~label': 'cols',
      '~prop': '_container',
      labelColumn: 'span',
      editConfig: [
        {
          '~component': 'el-input-number',
          '~label': 'Span',
          '~prop': 'span'
        },
        {
          '~component': 'el-input-number',
          '~label': 'Offset',
          '~prop': 'offset'
        },
        {
          '~component': 'el-input-number',
          '~label': 'Push',
          '~prop': 'push'
        },
        {
          '~component': 'el-input-number',
          '~label': 'Pull',
          '~prop': 'pull'
        }
      ]
    }
  ],
  initConfig: {
    props: {
      gutter: 0,
      Justify: 'start',
      align: 'top',
      '_container': [
        { span: 24, offset: 0, push: 0, pull: 0 },
        { span: 24, offset: 0, push: 0, pull: 0 },
        { span: 24, offset: 0, push: 0, pull: 0 },
      ]
    }
  },
  initStyles: {
  }
}