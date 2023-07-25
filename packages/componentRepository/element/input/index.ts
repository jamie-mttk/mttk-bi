import { computed, unref } from 'vue'

import * as uiUtil from '../../util/uiUtil'
import {buildWidgetFunc} from  '../../util/transformUtil'

//input config
const inputConfig = {
  key: '_input',
  name: 'Input',
  description: 'Basic input',
  icon: 'mdiFormTextbox',
  sequence:2,
  transform: buildWidgetFunc('el-input',(result,config)=>{
    handleIconIfHave(result,config,'prefix')
    handleIconIfHave(result,config,'suffix')
  }),
  editor: function (data: any) {
    return [
      uiUtil.createSelect('type',['text','textarea','password','button','checkbox','color','date','datetime-local','email','file','hidden','image','month','number','radio','range','reset','search','submit','tel','time','url','week']),
      uiUtil.createInput('placeholder'),
      uiUtil.createSwitch('clearable',undefined,{'~show': computed(() => unref(data).type != 'textarea')}),
      uiUtil.createSwitch('disabled'),
      uiUtil.createSelect('size',['large', 'default', 'small']),
      uiUtil.createInputNumber('minlength','Min length'),
      uiUtil.createInputNumber('maxlength', 'Max length'),
      uiUtil.createSwitch('show-word-limit',undefined,{'~show': computed(() => unref(data).type == 'textarea' || unref(data).type == 'text')}),
      uiUtil.createInputNumber('rows',undefined,{ '~show': computed(() => unref(data).type == 'textarea')}),
      uiUtil.createSwitch('show-password'),
      uiUtil.createIconPicker('_prefix-icon'),
      uiUtil.createIconPicker('_suffix-icon'),
    ]
  },
  dataConfig: {
    //readonly:true,
    type:'String',
  },
  initConfig: {
    props: {

    }
  },
  initStyles: {
    margin:'6px 0',
  }
}

//
//
function handleIconIfHave(result:object,config:any,slotName:string){

  const icon=config['_'+slotName+'-icon']
  // console.log('@@@:'+slotName+'==>'+icon)
  if(!icon){
    return 
  }

  result.slots[slotName]={'~component':'lc-icon',icon:icon,size:'1.5em'}

}

//
export default inputConfig