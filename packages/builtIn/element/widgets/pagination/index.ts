import { paginationTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'

//pagination config
const paginationConfig = {
  key: '_pagination',
  name: 'Pagination',
  description: 'Basic pagination',
  icon: 'mdiBookOpenPageVariantOutline',
  sequence: 41,
  transform: paginationTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('layout'),
        uiUtil.createInputNumber('pager-count'),
        uiUtil.createSwitch('small'),
        uiUtil.createSwitch('background'),
        uiUtil.createInput('page-sizes'),
        uiUtil.createInput('prev-text'),
        uiUtil.createIconPicker('prev-icon'),
        uiUtil.createInput('next-text'),
        uiUtil.createIconPicker('next-icon'),
        uiUtil.createSwitch('disabled'),
        uiUtil.createSwitch('hide-on-single-page'),
        uiUtil.createSwitch('_sync_to_data', 'Synchronize currrent page and page size to data'),
        uiUtil.createInput('_key-current-page', 'Field name of current page in model value'),
        uiUtil.createInput('_key-total', 'Field name of total elements in model value'),
        uiUtil.createInput('_key-page-count', 'Field name of page count in model value'),
        uiUtil.createInput('_key-page-size', 'Field name of page size in model value')
      ],
      init: {
        layout: 'prev, pager, next, jumper, ->, total',
        'pager-count': 7,
        small: false,
        background: false,
        'page-sizes': '[10, 20, 30, 40, 50, 100]',
        //'default-page-size':10,
        disabled: false,
        'hide-on-single-page': false,
        _sync_to_data: true,
        '_key-current-page': 'page',
        '_key-total': 'total',
        '_key-page-size': 'size'
      }
    },
    data: {
      //readonly:true,
      type: 'Object'
    },
    event: {
      list:['size-change','current-change','prev-click','next-click'],
      init:[]
    },
    display: {
      init: {
        style: {
          margin: '6px 0'
        }
      }
    }
  }
}
//
export default paginationConfig
