import { computed,isReactive,isRef } from 'vue'
import { formTransform } from './transform'

//table config
export const formConfig = {
  key: '_form',
  name: 'Form',
  description: 'Basic form',
  icon: 'SetUp',
  transform: formTransform,
  editor: function (data: any) {
    return [
      {
        '~component': 'el-switch',
        '~label': 'Inline',
        '~prop': 'inline',
        '~description':'If checked, the label and controller is at the same line',
      },
      {
        '~component': 'el-select',
        '~label': 'Label position',
        '~prop': 'label-position',
        clearable: true,
        '~options': [
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' },
            { value: 'top', label: 'Top' }
          ]
        
      },
      {
        '~component': 'el-input',
        '~label': 'Label width',
        '~prop': 'label-width',
        // '~show': computed(() => {
        //   return data['inline']}),
      },
      {
        '~component': 'lc-editable-list',
        '~label': 'Items',
        '~prop': 'items',
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
                { value: 'switch', label: 'Switch' },
                { value: 'container', label: 'Container' }
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
      }
    ]
  },
  dataConfig:{
    modelValueName:'model',
    //readonly:true,
    type:'Object',
  },
  initConfig: {
    props: {
      inline: true,
      'label-position': 'left',
      'label-width': '50px',
      items: [
        { label: 'Name', prop: 'name', type: 'input' },
        { label: 'Address', prop: 'address', type: 'input' }
      ]
    }
  },
  initStyles: {
    display: 'block',
    width: '100%',
    margin: '4px 0 4px 0'
  }
}
