import { imgTransform } from './transform'
//button config
export const imgConfig = {
  key: '_img',
  name: 'Image',
  description: '',
  icon: 'Picture',
  transform: imgTransform,
  editor: [
    {
      '~component': 'el-input',
      '~label': 'Image URL',
      '~prop': 'src',
    },
    {
      '~component': 'el-input',
      '~label': 'Alternative text',
      '~prop': 'alt',
    },
    {
      '~component': 'el-input-number',
      '~label': 'Width',
      '~prop': 'width',
    },
    {
      '~component': 'el-input-number',
      '~label': 'Height',
      '~prop': 'height',
    },

  ],
  // dataConfig:{
  //   //readonly:true,
  //   type:'String',
  // },
  initConfig: {
    props: {
      alt:'No picture',

    }
  },
  initStyles: {
    'min-height':'10px',
    'min-width':'10px',
  }
}
