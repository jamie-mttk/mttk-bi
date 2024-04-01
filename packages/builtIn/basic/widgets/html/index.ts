import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
//button config
const htmlConfig = {
  key: '_html',
  name: 'HTML',
  description: 'HTML',
  icon: 'mdiLanguageHtml5',
  transform: function ({ config }) {
    return {
      '~': config.wrapBy || 'div',
      '#': config.html || ''
    }
  },
  editor: {
    basic: {
      init: {
        wrapBy: 'div',
        html: 'HTML  here'
      },
      ui: [
        uiUtil.createSelect('wrapBy', ['div', 'span'],'Wrap by'),
        uiUtil.createInput('html', 'HTML', {
          '~description': 'Input HTML fragment here to render directly',
          type: 'textarea',
          rows: 6
        })

      ]
    },
    doisplay: {
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
export default htmlConfig
