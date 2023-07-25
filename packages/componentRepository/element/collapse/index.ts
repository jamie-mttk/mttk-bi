import { collapseTransform } from './transform'
import * as uiUtil from '../../util/uiUtil'
//
const collapseConfig = {
  key: '_collapse',
  name: 'Collapse',
  description: 'Basic collapse',
  icon: 'mdiArrowCollapseVertical',
  sequence:12,
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
        uiUtil.createInput('title'),
        uiUtil.createSwitch('disabled'),
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
//
export default collapseConfig 