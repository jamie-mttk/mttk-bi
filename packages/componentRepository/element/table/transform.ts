
import * as transformUtil from '../../util/transformUtil'

export function tableTransform(config: any, value: any,pageContext) {

  const result=transformUtil.buildWidget('el-table',config)
  result.props.data=value
  result.slots.default =buildColumns(config,pageContext)
  return result
}

function buildColumns(config: any,pageContext) {
  const columns = [] as object[]
  //
  for (const c of config._columns || []) {
    columns.push(buildColumn(c,pageContext))
  }
  
  //
  return columns
}
function buildColumn(c: any,pageContext) {
  const column = transformUtil.buildWidget('el-table-column',c)
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
    column.slots.default=transformUtil.buildPanel(c)
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


// function buildSlotFormatter(pageContext,formatter,...args) {
//   console.log(args)
//   //
//   const col = ()=> pageContext.methodManager.methodCall({method:formatter},...args)
  
//   //
//   return col
// }