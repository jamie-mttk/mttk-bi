import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'

import { formatData, } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'dimension', min: 1 },
  { key: 'metric', min: 1 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {

  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //
  const {legend,indicator,dataFinal}=buildData(sourceData,modelConfig)
  //
  const option = {
    ...buildBaseOption({config,skipLegend:true}),

    tooltip: {
      trigger: 'item',
      formatter: function(params){
      // console.log(params,params.value)
      let result='<div style="font-weight:700;">' + (params.data?.name || '') + '</div>'
      result+=`<div style="display:grid;grid-template-columns: auto auto auto;grid-gap: 4px 8px;">`
      //
      for(let i=0;i<modelConfig.metric.length;i++){
        const c=modelConfig.metric[i]
          result+='<div>' + (params.marker || '') + '</div>'
          result+='<div>' + (c.label || '') + '</div>'
          result+='<div>' + (formatData(params.value[i],c) || '') + '</div>'
      
      }
      result+='</div>';

  
      //
      return result
      }   
    },
    legend:{
      orient:'vertical',
      right:'48px',
      top:'4px',
      data:legend
    },
    radar: {
      // shape: 'circle',
       indicator: indicator,
    },
    series: [
      {
        name: '',
        type: 'radar',
         data: dataFinal
      }
    ]
  }

  //  console.log(JSON.stringify(option,null,2))
  return option
}

//return error info is valdiate failed,otherwise return undefined
function validate({ config, data, context, key, contextWrap, fullConfig }) {
  return undefined
}

//
export const biRadarTransform = buildTransformEcharts(buildOption, validateRules, validate,)


//

function buildData(sourceData,modelConfig){
  const legend=[]
  //the structure is item:value
  const indicatorObj={}
  const dataFinal=[]
  //
  let isFirstRow = true
  for (const item of sourceData) {
    if (isFirstRow) {
      isFirstRow = false
      continue
    }
    //The firs is the items to compare
    legend.push(item[0])
  
    //one line of dataFinal
    const d=[]
    dataFinal.push({name:item[0],value:d})
    for(let i=0;i<modelConfig.metric?.length||0;i++){
      //
      const dm=modelConfig.metric[i]
       //
       indicatorObj[dm.label]=Math.max(indicatorObj[dm.label]||0,item[i+1])
      d.push(item[i+1])
    }

  }
  //transform indicator
  const indicator=[]
  for(const k of Object.keys(indicatorObj)){
    indicator.push({name:k,max:indicatorObj[k]})
  }

  //
  return {legend,indicator,dataFinal}

}
