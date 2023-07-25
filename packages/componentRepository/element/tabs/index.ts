import { tabsTransform } from './transform'
import * as uiUtil from '../../util/uiUtil'
//
const tabsConfig = {
  key: '_tabs',
  name: 'Tabs',
  description: 'Basic tabs',
  icon: 'mdiTab',
  sequence:14,
  transform: tabsTransform,
  editor: [
    uiUtil.createSelect('type',['card','border-card']),
    uiUtil.createSelect('tab-position',['top','right','bottom','left']),
    uiUtil.createSwitch('stretch'),
    {
      '~component': 'lc-editable-list',
      '~label': 'Tabs',
      '~prop': '_container',
      labelColumn: 'label',
      editConfig: [
        uiUtil.createInput('label'),
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
//
export default tabsConfig 