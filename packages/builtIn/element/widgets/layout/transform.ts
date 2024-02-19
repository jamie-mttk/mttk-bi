import { computed } from 'vue'
import * as transformUtil from '@/context/globalContext/componentRepository/util/transformUtil'

export function layoutTransform({config}) {
  //
  const result = transformUtil.buildWidget('el-row', {config})
  //build default
  result['#'] = buildCols(config)
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
  return transformUtil.buildWidgetWithDefaultSlot('el-col',{config:c})
}
