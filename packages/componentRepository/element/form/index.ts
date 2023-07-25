import { computed,unref,isRef } from 'vue'
import { elementFormTransform } from './transform'
import * as uiUtil from '../../util/uiUtil'
//table config
const formConfig = {
  key: '_form',
  name: 'Form',
  description: 'Basic form',
  icon: 'mdiFormatColumns',
  sequence:3,
  transform: elementFormTransform,
  editor: [
    uiUtil.createSwitch('inline'),
    uiUtil.createSelect('label-position',['left','right','top']),
    uiUtil.createInput('label-width'),
      {
        '~component': 'lc-editable-list',
        '~label': 'Items',
        '~prop': '_items',
        labelColumn: 'label',
        editConfig:function(d){return  [
          uiUtil.createInput('label'),
          uiUtil.createInput('prop'),
          uiUtil.createSwitch('required'),
          uiUtil.createSelect('~controllerType',['input','select','switch','container']),
          uiUtil.createSelect('_type',['text','textarea'],undefined,{'~show': computed(() =>  (unref(d)['~controllerType'])=='input')}),
          uiUtil.createInput('_placeholder',undefined,{'~show': computed(() =>  (unref(d)['~controllerType'])!='switch')}),
          uiUtil.createSwitch('_clearable',undefined,{'~show': computed(() =>  (unref(d)['~controllerType'])!='switch')}),
          uiUtil.createInput('_active-text',undefined,{'~show': computed(() =>  (unref(d)['~controllerType'])=='switch')}),
          uiUtil.createInput('_inactive-text',undefined,{'~show': computed(() =>  (unref(d)['~controllerType'])=='switch')}),
          uiUtil.createInput('~options',undefined,{'~show': computed(() =>  (unref(d)['~controllerType'])=='select')}),

        ]}
      }
    ]
  ,
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
      _items: [
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
//
export default formConfig 