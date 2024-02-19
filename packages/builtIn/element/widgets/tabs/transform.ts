import * as transformUtil from '@/context/globalContext/componentRepository/util/transformUtil'

export const tabsTransform=transformUtil.buildWidgetFunc('el-tabs',{}, (result, {config}) => {
  //build default
  result['#'] = buildTabs(config)
  //
  return  result
})

function buildTabs(config: any) {
  const tabs = [] as object[]
  //index used to set tab name
  let index = 0
  //
  for (const c of config['_container'] || []) {
    tabs.push(buildTab(c, index++))
  }
  //
  return tabs
}
function buildTab(c: any, index:number) {
  const tab = transformUtil.buildWidgetWithDefaultSlot('el-tab-pane',{config:c})
  //set name
  tab['name'] = index
  //Lazy is needed,otherwise all the component will be shown once tab is displayed first time
  tab['lazy'] = true
  //
  return tab
}
