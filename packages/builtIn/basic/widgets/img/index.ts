
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
        {
          '~component': 'el-input',
          '~label': 'Image URL',
          '~prop': 'src'
        },
        {
          '~component': 'el-input',
          '~label': 'Alternative text',
          '~prop': 'alt'
        },
        {
          '~component': 'el-input-number',
          '~label': 'Width',
          '~prop': 'width'
        },
        {
          '~component': 'el-input-number',
          '~label': 'Height',
          '~prop': 'height'
        }
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