import {computed,unref} from 'vue'
import { tableTransform } from './transform'

//table config
export const tableConfig = {
  key: '_table',
  name: 'Table',
  description: 'Basic table',
  icon: 'Document',
  transform: tableTransform,
  editor: [
    {
      '~component': 'el-switch',
      '~label': 'Stripe',
      '~prop': 'stripe'
    },
    {
      '~component': 'el-switch',
      '~label': 'Border',
      '~prop': 'border'
    },
    {
      '~component': 'el-input',
      '~label': 'Empty text',
      '~prop': 'empty-text'
    },
    {
      '~component': 'lc-editable-list',
      '~label': 'Columns',
      '~prop': 'columns',
      labelColumn: 'label',
      editConfig: function (d) {
        return [
          {
            '~component': 'el-input',
            '~label': 'Label',
            '~prop': 'label'
          },
          {
            '~component': 'el-input',
            '~label': 'Prop',
            '~prop': 'prop'
          },
          {
            '~component': 'el-input',
            '~label': 'Width',
            '~prop': 'width'
          },
          {
            '~component': 'el-select',
            '~label': 'Align',
            '~prop': 'align',
            clearable: true,
            '~options': [
              { code: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' }
            ]
          },
          {
            '~component': 'el-select',
            '~label': 'Type',
            '~prop': 'type',
            clearable: true,
            '~options': [
              { value: 'selection', label: 'Selection' },
              { value: 'index', label: 'Index' },
              { value: 'container', label: 'Container' }
            ]
          },
          //formatter can no be used since it is a standard element ui table item property
          {
            '~component': 'el-select',
            '~label': 'Formatter',
            '~prop': '_formatter',
            clearable: true,
            '~options': '#method',
            '~show': computed(() =>  !unref(d)['type']),
          },
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
      columns: [
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
  }
}
