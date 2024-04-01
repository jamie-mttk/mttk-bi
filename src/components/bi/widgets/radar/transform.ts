import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'

import { formatData, } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'dimension', label: '维度', min: 1 }
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
      console.log(params,params.value)
      let result='<div style="font-weight:700;">' + (params.data?.name || '') + '</div>'
      result+=`<div style="display:grid;grid-template-columns: auto auto auto;grid-gap: 4px 8px;">`
      //i start from 1 to skip first row since it is not value
      for(let i=1;i<modelConfig.dimension.length;i++){
        const c=modelConfig.dimension[i]
          result+='<div>' + (params.marker || '') + '</div>'
          result+='<div>' + (c.label || '') + '</div>'
          result+='<div>' + (formatData(params.value[i-1],c) || '') + '</div>'
      
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
    //

    //Each line except frist one is an item
    legend.push(item[0])
  
    //one line of dataFinal
    const d=[]
    dataFinal.push({name:item[0],value:d})
    for(let i=0;i<modelConfig.dimension?.length||0;i++){
      if(i==0 ){
        continue;
      }
      //
      const dm=modelConfig.dimension[i]
       //
       indicatorObj[dm.label]=Math.max(indicatorObj[dm.label]||0,item[i])
      d.push(item[i])
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
