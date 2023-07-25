import { htmlTransform } from './transform'
//button config
export const htmlConfig = {
  key: '_html',
  name: 'HTML',
  description: 'HTML',
  icon: 'mdiLanguageHtml5',
  transform: htmlTransform,
  editor: [
    {
      '~component': 'el-select',
      '~label': 'Wrap by',
      '~prop': 'wrapBy',
      clearable: true,
      '~options': [
        { code: 'div', label: 'div' },
        { value: 'span', label: 'span' },
      ]
    },  
    {
      '~component': 'el-input',
      '~label': 'HTML',
      '~prop': 'html',
      '~description':'Input HTML fragment here to render directly',
      'type':'textarea',
      rows:6,
    },
    

  ],
  // dataConfig:{
  //   //readonly:true,
  //   type:'String',
  // },
  initConfig: {
    props: {
      wrapBy:'div',
      html: 'HTML  here',
    }
  },
  initStyles: {
    'min-height':'10px',
    'min-width':'10px',
  }
}
