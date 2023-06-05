import { collapseTransform } from './transform'
//
export const collapseConfig = {
  key: '_collapse',
  name: 'Collapse',
  description: 'Basic collapse',
  icon: 'Reading',
  transform: collapseTransform,
  editor: [
//If accordion is true,the modelValue is a String
//So far only one data type is supported
    // {
    //   '~component': 'el-switch',
    //   '~label': 'Accordion',
    //   '~prop': 'accordion'
    // },
    {
      '~component': 'lc-editable-list',
      '~label': 'Items',
      '~prop': '_container',
      labelColumn: 'title',
      editConfig: [
		 {
          '~component': 'el-input',
          '~label': 'Title',
          '~prop': 'title'
        },
		{
          '~component': 'el-switch',
          '~label': 'Disabled',
          '~prop': 'disabled'
        },
      ]
    }
  ],
  dataConfig:{
    // modelValueName:'model',
    //readonly:true,
    type:'Array',
  },
  initConfig: {
    props: {
      accordion: false,
      '_container': [
        {
          title: 'Collapse 1'
        },
        {
          title: 'Collapse 2'
        },
        {
          title: 'Collapse 3'
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