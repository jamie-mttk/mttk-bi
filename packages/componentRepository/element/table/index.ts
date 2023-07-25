import {computed,unref} from 'vue'
import { tableTransform } from './transform'
import * as uiUtil from '../../util/uiUtil'
//table config
const tableConfig = {
  key: '_table',
  name: 'Table',
  description: 'Basic table',
  icon: 'mdiTable',
  sequence:4,
  transform: tableTransform,
  editor: [
    uiUtil.createSwitch('stripe'),
    uiUtil.createSwitch('border'),
    uiUtil.createInput('empty-text'),

    {
      '~component': 'lc-editable-list',
      '~label': 'Columns',
      '~prop': '_columns',
      labelColumn: 'label',
      editConfig: function (d) {
        return [
          uiUtil.createInput('label'),
          uiUtil.createInput('prop'),
          uiUtil.createInput('width'),
          uiUtil.createSelect('align',['left','center','right',]),
          uiUtil.createSelect('type',['selection','index','container',]),
          uiUtil.createSelect('_formatter','#method',undefined,{ '~show': computed(() =>  !unref(d)['type']),}),
        ]
      }
    }
  ],
  dataConfig: {
    modelValueName: 'data',
    //readonly:true,
    type: 'Array'
  },
  initConfig: {
    props: {
      border: true,
      'empty-text': 'No data is found!',
      _columns: [
        {
          type: 'selection'
        },
        {
          type: 'index',
          label: '#'
        },
        {
          prop: 'date',
          label: 'Date'
        },
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]
    }
  },
  initStyles: {
    display: 'block',
    width: '100%',
    margin: '4px 0 4px 0'
  },
  events:['row-click','row-dblclick','cell-click','cell-dblclick','select']  
}
//
export default tableConfig 