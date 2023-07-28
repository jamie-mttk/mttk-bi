import {computed} from 'vue'
import Panel from '@/components/panel/index.vue'
import * as transformUtil from '../../util/transformUtil'
export function elementFormTransform(config: any, value: any) {
 
  const result=transformUtil.buildWidget('el-form',config,value)
  //build default
  result.slots.default = buildItems(config,value)
  //
  return  result
}

function buildItems(config: any,value: any) {
  const items = [] as object[]
  //
  for (const c of config._items || []) {
    items.push(buildItem(c,value))
  }
  //
  return items
}
function buildItem(c: any,value: any) { 
  //
  const item =transformUtil.buildWidget('el-form-item',c)
  item.slots.default=buildController(c,value)
  //
  return item

}
function buildController(c:any,value:any){
  const controllerType = c['~controllerType'] || 'input'
  //
  if (controllerType == 'container') {
   return  buildContainer(c)  
  }
 //
 const slot = {
  sys: {
    modelValue:value,
    modelValuePath:c.prop,
  },
  props: {},
};
//
  if (controllerType == 'input') {
   buildInput(c,slot)
  }else  if (controllerType == 'input-number') {
    buildInputNumber(c,slot)
  }else if (controllerType == 'switch') {
    buildSwitch(c,slot)
  }else if (controllerType == 'select') {
    buildSelect(c,slot)
  }else{
    throw new Error('Unsuported type:'+controllerType)
  }
  //

  //
  return slot;

}
function buildInput(c:any,slot:any){
  //
  slot.sys.component="el-input"
  transformUtil.copyPropWithUL(c,slot)
  //

}

function buildInputNumber(c:any,slot:any){
  //
  slot.sys.component="el-input-number"
  transformUtil.copyPropWithUL(c,slot)
  //

}
function buildSwitch(c:any,slot:any){
  slot.sys.component="el-switch"
  transformUtil.copyPropWithUL(c,slot)
}
function buildSelect(c:any,slot:any){
  slot.sys.component="el-select"
  transformUtil.copyPropWithUL(c,slot)
  //Select options
 buildSelectOptions(c,slot)
}
function buildSelectOptions(c:any,slot:any){
  const options =[] as object[]
  //
  const raw=c['~options']||''
  //Assume ~options is seperated by , and may have : to sperate value and label
  const items=raw.split(',');
  //
  for (const item of items) {
    const split=item.split(':')
    options.push({
        sys: { component: "el-option" },
        props: {
          label: split.length>1?split[1]:split[0],
          value: split[0],
        }
      }
   );
  }
  
 // console.log(JSON.stringify(options,null,2))
  //
  slot.slots={}
  slot.slots.default={ type: 'wrap', value: options}
}


function buildContainer(c:any){
  //
  return {
    sys: {
      component: Panel,
      modelValue: computed({
        get() {
          return c['_children'] || []
        },
        set(value) {
          c['_children'] = value
        }
      })
    },
  }
}