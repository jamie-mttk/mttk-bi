import { tabsTransform } from './transform'
//
export const tabsConfig = {
  key: '_tabs',
  name: 'Tabs',
  description: 'Basic tabs',
  icon: 'Operation',
  transform: tabsTransform,
  editor: [
    {
      '~component': 'el-select',
      '~label': 'Type',
      '~prop': 'type',
      '~options': [
          { value: 'card', label: 'Card' },
          { value: 'border-card', label: 'Border Card' }
        ]
      
    },
    {
      '~component': 'el-select',
      '~label': 'Tab position',
      '~prop': 'tab-position',
      '~options':  [
          { value: 'top', label: 'Top' },
          { value: 'right', label: 'Right' },
          { value: 'bottom', label: 'Bottom' },
          { value: 'left', label: 'Left' }
        ]
      
    },
    {
      '~component': 'el-switch',
      '~label': 'Stretch',
      '~prop': 'stretch'
    },
    {
      '~component': 'lc-editable-list',
      '~label': 'Tabs',
      '~prop': '_container',
      labelColumn: 'label',
      editConfig: [
        {
          '~component': 'el-input',
          '~label': 'Label',
          '~prop': 'label'
        }
      ]
    }
  ],
  dataConfig:{
    // modelValueName:'model',
    //readonly:true,
    type:'Number',
  },
  initConfig: {
    props: {
      type: 'border-card',
      'tab-position': 'top',
      stretch: false,
      '_container': [
        {
          label: 'Tab 1'
        },
        {
          label: 'Tab 2'
        },
        {
          label: 'Tab 3'
        }
      ]
    }
  },
  initStyles: {
    display:'block',
    width:'100%',
    margin:'4px 0 4px 0'
  }
}