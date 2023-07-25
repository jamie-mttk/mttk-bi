import * as transformUtil from '../../util/transformUtil'

export function collapseTransform(config: any, value: any) {
  //
  const result=transformUtil.buildWidget('el-collapse',config,value)

  //build default
  result.slots.default = buildItems(config)
  //
  //console.log(JSON.stringify(result.props,null,2))
  //console.log(JSON.stringify(result,null,2))
  //
  return  result
}

function buildItems(config: any) {
  const collapse = []
  //index used to set tab name
  let index = 0
  //
  for (const c of config['_container'] || []) {
    collapse.push(buildItem(c, index++))
  }
  //
  return collapse
}
function buildItem(c: any, index:number) {
  const item=transformUtil.buildWidgetWithSlotChildren('el-collapse-item',c)
  //set name,it should be string
  item.props['name'] = ''+index
  //
  return item
}
