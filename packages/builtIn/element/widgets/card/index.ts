import { computed, unref } from 'vue'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetWithDefaultSlotFunc, buildPanel } from '@/context/globalContext/componentRepository/util/transformUtil'
//card config
const cardConfig = {
  key: '_card',
  name: 'Card',
  description: 'Basic card',
  icon: 'mdiCardBulletedOutline',
  sequence: 21,
  transform: buildWidgetWithDefaultSlotFunc('el-card', {}, function (result, {config}) {
    //Set body style to 100% height, so it will automatically resized
    result['body-style']='height:100%;'
    //
    if (config._headerUseSlot) {
      result['#header'] = buildPanel(config, 'header')
    } else {
      delete result['#header']
    }
    //
    if (config._footerUseSlot) {
      result['#footer'] = buildPanel(config, 'footer')
    } else {
      delete result['#footer']
    }
    //
    // console.log(result)
  }),
  editor: {
    basic: {
      ui: function (data: any) {
        return [
          uiUtil.createSelect('shadow', ['always', 'never', 'hover']),
          uiUtil.createInput('header', undefined, {
            '~show': computed(() => !unref(data)._headerUseSlot)
          }),
          uiUtil.createSwitch('_headerUseSlot', 'Set header with drag and drop'),
          uiUtil.createInput('footer', undefined, {
            '~show': computed(() => !unref(data)._footerUseSlot)
          }),
          uiUtil.createSwitch('_footerUseSlot', 'Set footer with drag and drop')
        ]
      },
      init: {
        header: 'Card default title',
        shadow: 'always'
      }
    },
    display: {
      init: {
        style: {
          margin: '4px 0 4px 0'
        }
      }
    }
  }
}
//
export default cardConfig
