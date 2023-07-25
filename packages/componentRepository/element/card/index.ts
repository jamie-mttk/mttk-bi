import * as uiUtil from '../../util/uiUtil'
import {buildWidgetWithSlotChildrenFunc} from  '../../util/transformUtil'
//card config
 const cardConfig = {
  key: '_card',
  name: 'Card',
  description: 'Basic card',
  icon: 'mdiCardBulletedOutline',
  sequence:11,
  transform: buildWidgetWithSlotChildrenFunc('el-card'),
  editor: [
    uiUtil.createInput('header'),
    uiUtil.createSelect('shadow',['always','never','hover'])
  ],
  initConfig: {
    props: {
      header:'Card default title',
      shadow: 'always',
    }
  },
  initStyles: {
    margin: '4px 0 4px 0'
  }
}
//
export default cardConfig