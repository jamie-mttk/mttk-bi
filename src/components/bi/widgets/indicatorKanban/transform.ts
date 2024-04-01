//echarts should be imported even if it is not used because Vchart need it
import { unref} from 'vue'

import { buildTransform } from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'

import { formatData } from '../utils/tooltipUtil'
import Statistic from './Statistic.vue'

function buildResult({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  //
  return build()

  function build() {
    const result={
      '~':Statistic,
      data:buildData(),
      qtyPerRow:config.qtyPerRow||4,
      title:config['title-text']||'',
      subtitle:config['title-subtext']||'',
    }
    return result;
  }
  function buildData(){
    //
    const metricConfig=safeGetArrayItem(modelConfig,'metric',0)
    const subtitle= metricConfig?.label||''
    //
    const dataFinal=[] as any
    let isFirst=true
    //Whether dimension is set
    const hasDimension=!!safeGetArrayItem(modelConfig,'dimension',0)
    for(const d of (unref(data).data||[])){
      if(isFirst){
        isFirst=false
        continue
      }
      //
      dataFinal.push({'title':hasDimension?d[0]:subtitle,'subtitle':hasDimension?subtitle:'','value':formatData(hasDimension?d[1]:d[0],metricConfig)})
    }

    return dataFinal;
  }
}

//
export const biIndicatorKanbanTransform = buildTransform(
  buildResult,
  [{ key: 'metric', label: '度量', min: 1 }],
  undefined
)
