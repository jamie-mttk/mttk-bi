import {computed} from 'vue'
import Panel from '@/components/panel/index.vue'

export function formTransform(config: any, value: any) {

  const result = {
    sys: {
      component: 'el-form'
    },
    props: {
      //
      model: value
    },
    slots: { default: { type: 'wrap', value: [] } }
  }
  //
  for (const k of Object.keys(config) || []) {
    if (k != 'items') {
      result.props[k] = config[k]
    }
  }
  //build default
  result.slots.default.value = buildItems(config,value)
  //
  //console.log(JSON.stringify(result,null,2))
  //
  return  result
}

function buildItems(config: any,value: any) {
  let items = []
  //
  for (let c of config.items || []) {
    items.push(buildItem(c,value))
  }
  //
  return items
}
function buildItem(c: any,value: any) { 
  //
  const item = {
    sys: {
      component: 'el-form-item'
    },
    props: {},
    slots: { default: { type: 'wrap', value: [buildController(c,value)] } }
  }
  //props
  for (const k of Object.keys(c)) {
    if (k.startsWith('_')||k.startsWith('~')) {
      continue
    }
    item.props[k] = c[k]
  }
  //
  //item.slots.default.value.push(buildController(c,value)) 
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
  //
  for (const k of Object.keys(c)) {
    if (!k.startsWith('_')) {
      continue
    }
    slot.props[k.substring(1)] = c[k]
  }
}
function buildSwitch(c:any,slot:any){
  slot.sys.component="el-switch"
  //
  for (const k of Object.keys(c)) {
    if (!k.startsWith('_')) {
      continue
    }
    slot.props[k.substring(1)] = c[k]
  }
}
function buildSelect(c:any,slot:any){
  slot.sys.component="el-select"
  //
  for (const k of Object.keys(c)) {
    if (!k.startsWith('_')||k.startsWith('__')) {
      continue
    }
    slot.props[k.substring(1)] = c[k]
  }
  //Select options
 buildSelectOptions(c,slot)
}
function buildSelectOptions(c:any,slot:any){
  const options =[]
  //
  for (const v of c['__options']||[]) {
    options.push({
        sys: { component: "el-option" },
        props: {
          label: v['label'],
          value: v['value'],
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