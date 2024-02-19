
//button config
 const htmlConfig = {
  key: '_html',
  name: 'HTML',
  description: 'HTML',
  icon: 'mdiLanguageHtml5',
  transform: function ({config}) {
    return  {
      '~': config.wrapBy || 'div' ,
      '#' : config.html || '' 
    }
  },
  editor: {
    basic: {
      init: {
          wrapBy: 'div',
          html: 'HTML  here'
      },
      ui: [
        {
          '~component': 'el-select',
          '~label': 'Wrap by',
          '~prop': 'wrapBy',
          clearable: true,
          '~options': [
            { value: 'div', label: 'div' },
            { value: 'span', label: 'span' }
          ]
        },
        {
          '~component': 'el-input',
          '~label': 'HTML',
          '~prop': 'html',
          '~description': 'Input HTML fragment here to render directly',
          type: 'textarea',
          rows: 6
        }
      ]
    },
    doisplay:{
      init:{
        style: {
        'min-height': '10px',
        'min-width': '10px'
      }}
    }
  },
  // dataConfig:{
  //   //readonly:true,
  //   type:'String',
  // },
  

}
export default htmlConfig