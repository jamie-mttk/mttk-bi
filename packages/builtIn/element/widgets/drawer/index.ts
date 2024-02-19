import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {  buildWidgetWithDefaultSlot,buildPanel } from '@/context/globalContext/componentRepository/util/transformUtil'
//drawer config
const drawerConfig = {
  key: '_drawer',
  name: 'Drawer',
  description: 'Drawer',
  icon: 'mdiPauseBoxOutline',
  sequence: 32,
  transform: function ({config,  context}) {


    if (context.mode.value == 'edit') {
      //edit - use card to simulate
      const result = buildWidgetWithDefaultSlot('el-card',{config})
      //
      const footerConfig=buildPanel(config, 'footer')
      footerConfig.style={'text-align': 'right'}
      result['#footer'] = footerConfig
      //Always show

      //The attribute name of card tile is header
      result.header = (result.title || 'No title') + ' [Please note: This drawer is NOT WYSIWYG]'
      

      //Set style so the card can float from CSS flow
      const styleBase = {
        position: 'absolute',
        overflow: 'auto',
        'z-index':999
      }
     //Set position depends on direction
     const direction=config.direction||'rtl'
     if(direction=='rtl'){
      result.style={
        right:0,
        top:0,
        height:'100%',
        width:config.size||'30%',
        ...styleBase
      }
     }else if(direction=='ltr'){
      result.style={
        left:0,
        top:0,
        height:'100%',
        width:config.size||'30%',
        ...styleBase
      }
    }else if(direction=='ttb'){
      result.style={
        left:0,
        top:0,
        width:'100%',
        height:config.size||'30%',
        ...styleBase
      }
    }else if(direction=='btt'){
      result.style={
        left:0,
        bottom:0,
        width:'100%',
        height:config.size||'30%',
        ...styleBase
      }
    }
      

      //
      return result
    } else {
      const result= buildWidgetWithDefaultSlot('el-drawer',{config})
      result['#footer'] = buildPanel(config, 'footer')
      return result;
    }
  },
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('title'),
        uiUtil.createInput('size'),
        uiUtil.createSwitch('modal', 'Show shadowing layer/Modal'),
        uiUtil.createSwitch('close-on-click-modal', 'Close on click modal'),
        uiUtil.createSwitch('close-on-press-escape', 'Close on press escape'),
        uiUtil.createSwitch('show-close', 'Show close'),
        uiUtil.createSwitch('append-to-body', 'Append to body'),
        uiUtil.createSwitch('destroy-on-close', 'Destroy on close'),
        uiUtil.createSwitch('with-header','Show header'),
        uiUtil.createSelect('direction', ['rtl' , 'ltr' , 'ttb' , 'btt' ]),
      ],
      init: {
        title: 'Drawer default title',
        size: '30%',
        modal: false,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'show-close': true,
        'append-to-body': false,
        'destroy-on-close': false,
        'with-header': true,
        direction: 'rtl',
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
export default drawerConfig
