import * as transformUtil from '@/context/globalContext/componentRepository/util/transformUtil'

export const collapseTransform=   transformUtil.buildWidgetFunc('el-collapse',{}, (result, {config}) => {
    result['#'] = buildItems(config)
  })


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
  const item=transformUtil.buildWidgetWithDefaultSlot('el-collapse-item',{config:c})
  //set name,it should be string
  item['name'] = ''+index
  //
  return item
}
