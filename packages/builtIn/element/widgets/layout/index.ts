import { layoutTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { createUniqueString } from '@/utils/tools'
//
const layoutConfig = {
  key: '_layout',
  name: 'Layout',
  description: 'Row col based layout',
  icon: 'mdiViewGridOutline',
  sequence: 1,
  transform: layoutTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createInputNumber('gutter'),
        uiUtil.createSelect('justify', [
          'start',
          'end',
          'center',
          'space-around',
          'space-between',
          'space-evenly'
        ]),
        uiUtil.createSelect('align', ['top', 'middle', 'bottom']),
        {
          '~component': 'lc-editable-list',
          '~label': 'cols',
          '~prop': '_container',
          labelColumn: 'span',
          editConfig: [
            uiUtil.createInputNumber('span'),
            uiUtil.createInputNumber('offset'),
            uiUtil.createInputNumber('push'),
            uiUtil.createInputNumber('pull')
          ]
        }
      ],
      init: {
        gutter: 0,
        justify: 'start',
        align: 'top',
        _container: [
          { span: 12, offset: 0, push: 0, pull: 0, key: createUniqueString()},
          { span: 12, offset: 0, push: 0, pull: 0, key: createUniqueString()},
          { span: 24, offset: 0, push: 0, pull: 0, key: createUniqueString()}
        ]
      }
    },
    display: {
      init: {
        style: {
          width: '100%'
        },
        class: ''
      }
    },
  }
}
//
export default layoutConfig
