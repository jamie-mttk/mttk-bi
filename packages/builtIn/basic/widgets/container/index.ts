import {buildPanel} from '@/context/globalContext/componentRepository/util/transformUtil'

//
 const containerConfig = {
  key: '_container',
  name: 'Container',
  description: 'An components container,use to set style or visibility',
  icon: 'mdiCheckboxBlankOutline',
  transform: function({config}) {
    //
   return buildPanel(config)
  },
  editor: {
    display: {
      init: {
        style: {
          display: 'block',
          width: '100%',
          'min-height': '32px',
          margin: '10px'
        }
      }
    }
  }
}

export default containerConfig