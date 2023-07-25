import { computed } from 'vue'
import Panel from '@/components/panel/index.vue'
import * as transformUtil from '../../util/transformUtil'

export function layoutTransform(config: any) {
  //
  const result = transformUtil.buildWidget('el-row', config)
  //build default
  result.slots.default = buildCols(config)
  //

  //
  return result
}

function buildCols(config: any) {
  const cols = [] as object[]
 
  //
  for (const c of config['_container'] || []) {
    cols.push(buildCol(c))
  }
  //
  return cols
}
function buildCol(c: any) {
  return transformUtil.buildWidgetWithSlotChildren('el-col',c)
}
