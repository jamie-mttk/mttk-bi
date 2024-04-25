//echarts should be imported even if it is not used because Vchart need it
import { unref} from 'vue'

import { buildTransform } from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'

import { formatData } from '../utils/tooltipUtil'
import Statistic from './Statistic.vue'
import {precheck} from '../utils/transformPrecheck'
const validateRules = [
  { key: 'metric', min: 1 },
  { key: '_dimensionAndMetric', min: 1}
]
function buildResult({ config, data, context, key, contextWrap, fullConfig }) {
  const chechResult=precheck({ config, data, context, key, contextWrap, fullConfig },validateRules,undefined)
  if(chechResult){
    return chechResult
  }
  
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
  validateRules,
  undefined
)
