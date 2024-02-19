import { tabsTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
//
const tabsConfig = {
  key: '_tabs',
  name: 'Tabs',
  description: 'Basic tabs',
  icon: 'mdiTab',
  sequence: 22,
  transform: tabsTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createSelect('type', ['card', 'border-card']),
        uiUtil.createSelect('tab-position', ['top', 'right', 'bottom', 'left']),
        uiUtil.createSwitch('stretch'),
        {
          '~component': 'lc-editable-list',
          '~label': 'Tabs',
          '~prop': '_container',
          labelColumn: 'label',
          editConfig: [uiUtil.createInput('label')]
        }
      ],
      init: {
        type: 'border-card',
        'tab-position': 'top',
        stretch: false,
        _container: [
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
    data: {
      // modelValueName:'model',
      //readonly:true,
      type: 'Number'
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
export default tabsConfig
