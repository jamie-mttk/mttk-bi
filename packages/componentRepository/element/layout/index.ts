import { layoutTransform } from './transform'
import * as uiUtil from '../../util/uiUtil'
//
const layoutConfig = {
  key: '_layout',
  name: 'Layout',
  description: 'Row col based layout',
  icon: 'mdiViewGridOutline',
  sequence:1,
  transform: layoutTransform,
  editor: [
    uiUtil.createInputNumber('gutter'),
    uiUtil.createSelect('justify',['start','end','center','space-around','space-between','space-evenly',]),
    uiUtil.createSelect('align',['top','middle','bottom',]),

    {
      '~component': 'lc-editable-list',
      '~label': 'cols',
      '~prop': '_container',
      labelColumn: 'span',
      editConfig: [
        uiUtil.createInputNumber('span'),
        uiUtil.createInputNumber('offset'),
        uiUtil.createInputNumber('push'),
        uiUtil.createInputNumber('pull'),
      ]
    }
  ],
  initConfig: {
    props: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      '_container': [
        { span: 12, offset: 0, push: 0, pull: 0 },
        { span: 12, offset: 0, push: 0, pull: 0 },
        { span: 24, offset: 0, push: 0, pull: 0 },
      ]
    }
  },
  initStyles: {
  }
}
//
export  default layoutConfig 