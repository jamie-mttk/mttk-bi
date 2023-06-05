import { computed,isRef,unref  } from 'vue'
import { sampleTransform } from './transform'
//sample config
export const sampleConfig = {
  key: '_sample',
  name: 'Demo page 1',
  description: 'To demostrate a page can be configured',
  icon: 'OfficeBuilding',
  transform: sampleTransform,
  editor:function (data: any) {

    return [
      {
        '~component': 'el-input',
        '~label': 'API URL',
        '~prop': '_api_url',
        // '~show': computed(() => {
        //   return data['inline']}),
      },
      {
        '~component': 'el-switch',
        '~label': 'Form Inline',
        '~prop': '_form_inline'
      },
      // {
      //   '~component': 'el-select',
      //   '~label': 'Form Label position',
      //   '~prop': 'label-position',
      //   clearable: true,
      //   '~options': [
      //       { value: 'left', label: 'Left' },
      //       { value: 'right', label: 'Right' },
      //       { value: 'top', label: 'Top' }
      //     ]        
      // },
      {
        '~component': 'el-input',
        '~label': 'Form Label width',
        '~prop': '_form_label-width',
        // '~show': computed(() => {
        //   return data['inline']}),
      },
      {
        '~component': 'lc-editable-list',
        '~label': 'Form Items',
        '~prop': '_form_items',
        labelColumn: 'label',
        editConfig:function(d){return  [
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
            '~component': 'el-select',
            '~label': 'Controller Type',
            '~prop': '~controllerType',
            '~options':  [
                { value: 'input', label: 'Input' },
                { value: 'select', label: 'Select' },
                { value: 'switch', label: 'Switch' }
              ]
            
          },
          {
            '~component': 'el-select',
            '~label': 'Input Type',
            '~prop': '_type',
            '~show': computed(() =>  (isRef(d)?d.value['~controllerType']:d['~controllerType'])=='input'),
            '~options': [
                { value: 'text', label: 'Text' },
                { value: 'textarea', label: 'Text area' }
              ]
            
          },
          {
            '~component': 'el-input',
            '~label': 'Placeholder',
            '~prop': '_placeholder',
            '~show': computed(() =>  (isRef(d)?d.value['~controllerType']:d['~controllerType'])!='switch'),
          },
          {
            '~component': 'el-switch',
            '~label': 'Clearable',
            '~prop': '_clearable',
            '~show': computed(() =>  (isRef(d)?d.value['~controllerType']:d['~controllerType'])!='switch'),
          },
          {
            '~component': 'el-input',
            '~label': 'Active text',
            '~prop': '_active-text',
            '~show': computed(() =>  (isRef(d)?d.value['~controllerType']:d['~controllerType'])=='switch'),
          },
          {
            '~component': 'el-input',
            '~label': 'Inactive text',
            '~prop': '_inactive-text',
            '~show': computed(() =>  (isRef(d)?d.value['~controllerType']:d['~controllerType'])=='switch'),
          },
          {
            '~component': 'el-switch',
            '~label': 'Required',
            '~prop': 'required',
          },
          // {
          //   '~component': 'el-switch',
          //   '~label': 'Multiple',
          //   '~prop': '_multiple',
          //   '~show': computed(() =>  (isRef(d)?d.value['~controllerType']:d['~controllerType'])=='select'),
          // },
        ]}
      },
      {
        '~component': 'lc-editable-list',
        '~label': 'Table Columns',
        '~prop': '_table_columns',
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
    ]
  },
  // dataConfig:{

  //   //readonly:true,
  //   type:'Object',
  // },
  initConfig: {
    props: {
     
    }
  },
  initStyles: {
    
  }
}
