import { computed,inject } from 'vue'
import Panel from '@/components/panel/index.vue'

export function tableTransform(config: any, value: any) {
  //console.log('data:'+JSON.stringify(value))
  const pageContext=inject('context')
  //
  const result = {
    sys: {
      component: 'el-table'
    },
    props: {
      //use model value to set
       data: value,
    },
    slots: { default: { type: 'wrap',value:[]} }
  }
  //
  for (const k of Object.keys(config) || []) {
    if (k != 'items') {
      result.props[k] = config[k]
    }
  }
  //build default
  result.slots.default.value =buildColumns(config,pageContext)
  //
  return result
}

function buildColumns(config: any,pageContext) {
  const columns = []
  //
  for (let c of config.columns || []) {
    columns.push(buildColumn(c,pageContext))
  }
  
  //
  return columns
}
function buildColumn(c: any,pageContext) {
  let column = {
    sys: {
      component: 'el-table-column'
    },
    props: {}
  }
  //props
  for (let k of Object.keys(c)) {
    if (k.startsWith('_')) {
      continue
    }
    column.props[k] = c[k]
  }
  if(!c.type && c['_formatter']){
    //use slot can render HTML,but first it is hard to get the required parameters;second,the slot does not support function which returns array
    column.props.formatter=function(){
      //the undefined is the wrapperContext which is not available[I can be available but need a long deep parameter transfer]
      return pageContext.methodManager.methodCall({method:c['_formatter']},undefined,...arguments)
    
    }
    // column.slots = {}
    // console.log(arguments)
    // //column.slots.default=buildSlotFormatter(pageContext,c['_formatter'],...arguments)
    // column.slots.default=pageContext.methodManager.methodCall({method:c['_formatter']})
  }else if(c.type=='container'){
    column.slots = {}
    column.slots.default=buildSlotContainer(c)
  }
  // if ('address' == c.prop) {
  //   column.slots = {}
  //   column.slots.default = {}
  //   // column.slots.default.type = 'wrap'
  //   // column.slots.default.value = function (sp) {
  //   //   return buildSlot(c, sp)
  //   // }
  //   column.slots.default=buildSlot(c)
  // }
  //If there is a formatter, try to handle this
  // if (c._formatter){
  // column.slots={default:c._formatter}
  // }
  //
  return column
}

function buildSlotContainer(c) {
  const col = {
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
    // props: {},
    // events: {
    //   // click: function () {
    //   //   console.log('TEST TO SHOW')
    //   //   console.log(arguments)
    //   //   //arguments[0].emit('click',...arguments)
    //   // }
    // }
  }
  //
  return col
}
// function buildSlotFormatter(pageContext,formatter,...args) {
//   console.log(args)
//   //
//   const col = ()=> pageContext.methodManager.methodCall({method:formatter},...args)
  
//   //
//   return col
// }