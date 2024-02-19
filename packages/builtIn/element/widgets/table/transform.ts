
import * as transformUtil from '@/context/globalContext/componentRepository/util/transformUtil'

export function tableTransform({config, data,context}) {

  const result=transformUtil.buildWidget('el-table',config)
  result.data=data
  result['#'] =buildColumns(config,context)
  return result
}

function buildColumns(config: any,context) {
  const columns = [] as object[]
  //
  for (const c of config._container || []) {
    columns.push(buildColumn(c,context))
  }
  
  //
  return columns
}
function buildColumn(c: any,context) {
  const column = transformUtil.buildWidget('el-table-column',{config:c})
  if(!c.type && c['_formatter']){
    //use slot can render HTML,but first it is hard to get the required parameters;second,the slot does not support function which returns array
    column.formatter=function(){
      //the undefined is the wrapperContext which is not available[I can be available but need a long deep parameter transfer]
      return context.methodManager.methodCall({method:c['_formatter']},undefined,...arguments)
    
    }
    // column.slots = {}
    // console.log(arguments)
    // //column.slots.default=buildSlotFormatter(context,c['_formatter'],...arguments)
    // column.slots.default=context.methodManager.methodCall({method:c['_formatter']})
  }else if(c.type=='container'){
    column['#']=transformUtil.buildPanel(c)
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


// function buildSlotFormatter(context,formatter,...args) {
//   console.log(args)
//   //
//   const col = ()=> context.methodManager.methodCall({method:formatter},...args)
  
//   //
//   return col
// }