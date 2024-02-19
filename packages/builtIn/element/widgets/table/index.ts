import { computed, unref } from 'vue'
import { tableTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { createUniqueString } from '@/utils/tools'
//table config
const tableConfig = {
  key: '_table',
  name: 'Table',
  description: 'Basic table',
  icon: 'mdiTable',
  sequence: 14,
  transform: tableTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createSwitch('stripe'),
        uiUtil.createSwitch('border'),
        uiUtil.createInput('empty-text'),
        {
          '~component': 'lc-editable-list',
          '~label': 'Columns',
          '~prop': '_container',
          labelColumn: 'label',
          editConfig: function (d) {
            return [
              uiUtil.createInput('label'),
              uiUtil.createInput('prop'),
              uiUtil.createInput('width'),
              uiUtil.createSelect('align', ['left', 'center', 'right']),
              uiUtil.createSelect('type', ['selection', 'index', 'container']),
              uiUtil.createSelect('_formatter', '#method', undefined, {
                '~show': computed(() => !unref(d)['type'])
              })
            ]
          }
        }
      ],
      init: {
        border: true,
        'empty-text': 'No data is found!',
        _container: [
          {
            type: 'selection',
            key:createUniqueString() 
          },
          {
            type: 'index',
            label: '#',
            key:createUniqueString() 
          },
          {
            prop: 'date',
            label: 'Date',
            key:createUniqueString() 
          },
          {
            prop: 'name',
            label: 'Name',
            key:createUniqueString() 
          },
          {
            prop: 'address',
            label: 'Address',
            key:createUniqueString() 
          }
        ]
      }
    },
    event: {
      list: ['row-click', 'row-dblclick', 'cell-click', 'cell-dblclick', 'select']
    },
    data: {
      modelValueName: 'data',
      //readonly:true,
      type: 'Array',
      init:{
        "mode": "fixed",
        "dataContent": "[{\"date\":\"2023-12-23\",\"name\":\"Tom\",\"address\":\"Who know it?\"},\n{\"date\":\"2023-01-02\",\"name\":\"Jack\",\"address\":\"May be in the city?\"},\n{\"date\":\"2021-11-12\",\"name\":\"Alice\",\"address\":\"In castle?\"}\n]"
      }
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
export default tableConfig
