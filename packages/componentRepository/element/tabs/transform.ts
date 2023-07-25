import { computed } from 'vue'
import Panel from  '@/components/panel/index.vue'
import * as transformUtil from '../../util/transformUtil'

export function tabsTransform(config: any, value: any) {
  //
  const result=transformUtil.buildWidget('el-tabs',config,value)
  //build default
  result.slots.default = buildTabs(config)

  //
  return  result
}

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
  const tab = transformUtil.buildWidgetWithSlotChildren('el-tab-pane',c)
  //set name
  tab.props['name'] = index
  //Lazy is needed,otherwise all the component will be shown once tab is displayed first time
  tab.props['lazy'] = true
  //
  return tab
}
