import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
//button config
 const imgConfig = {
  key: '_img',
  name: 'Image',
  description: '',
  icon: 'mdiImageArea',
  transform: function ({config}) {
    const result = {
      '~':  'img' ,
    }
    //
    for (const k of Object.keys(config) || []) {
        result[k] = config[k]
    }
    //
    return result
  },
  editor: {
    basic: {
      init: {
        alt: 'No picture'
      },
      ui: [
        uiUtil.createInput('src', 'Image URL'),
        uiUtil.createInput('alt', 'Alternative text'),
        uiUtil.createInputNumber('width', 'Width'),
        uiUtil.createInputNumber('height', 'Height'),

      ]
    },
    display: {
      init: {
        style: {
          'min-height': '10px',
          'min-width': '10px'
        }
      }
    }
  }
  // dataConfig:{
  //   //readonly:true,
  //   type:'String',
  // },
}
export default imgConfig