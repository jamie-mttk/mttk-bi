
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {  buildWidgetWithDefaultSlot,buildPanel } from '@/context/globalContext/componentRepository/util/transformUtil'
//dialog config
const dialogConfig = {
  key: '_dialog',
  name: 'Dialog',
  description: 'Dialog',
  icon: 'mdiDockWindow',
  sequence: 31,
  transform: function ({config,  context}) {
 

    if (context.mode.value == 'edit') {
      //edit - use card to simulate
      const result = buildWidgetWithDefaultSlot('el-card',{config})
      //Since dialog footer is defaully align to right
      const footerConfig=buildPanel(config, 'footer')
      footerConfig.style={'text-align': 'right'}
      result['#footer'] = footerConfig
      //Always show

      //The attribute name of card tile is header
      result.header = (result.title || 'No title') + ' [Please note: This drawer is NOT WYSIWYG]'
    

      //Set style so the card can float from CSS flow
      result.style = {
        position: 'absolute',
        top: '10%',
        // right: '25%',
        // bottom: '20%',
        left: '15%',
        width:config.width||'50%',
        overflow: 'auto',
        'z-index':999
      }
      //

      //
      return result
    } else {
      const result= buildWidgetWithDefaultSlot('el-dialog',{config})
      result['#footer'] = buildPanel(config, 'footer')
      return result;
    }
  },
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('title'),
        uiUtil.createInput('width'),
        uiUtil.createSwitch('modal', 'Show shadowing layer/Modal'),
        uiUtil.createSwitch('close-on-click-modal', 'Close on click modal'),
        uiUtil.createSwitch('close-on-press-escape', 'Close on press escape'),
        uiUtil.createSwitch('show-close', 'Show close'),
        uiUtil.createSwitch('append-to-body', 'Append to body'),
        uiUtil.createSwitch('destroy-on-close', 'Destroy on close'),
        uiUtil.createSwitch('fullscreen'),
        uiUtil.createSwitch('draggable'),
        uiUtil.createSwitch('center', 'Header and footer align to center')
      ],
      init: {
        title: 'Dialog default title',
        width: '50%',
        modal: false,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'show-close': true,
        'append-to-body': false,
        'destroy-on-close': false,
        fullscreen: false,
        draggable: true,
        center: false
      }
    },
    data: {
      type: 'Boolean',
      init: {
        mode: 'fixed',
        dataContent: 'true'
      }
    },
    display: {}
  }
}
//
export default dialogConfig
