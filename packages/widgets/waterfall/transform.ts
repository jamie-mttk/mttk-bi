import { unref } from 'vue'
import { buildBaseOption, buildTransformEcharts } from '../utils/transformUtil'
import { safeGetArrayItem } from '../utils/transformTools'
import { formatData } from '../utils/tooltipUtil'
import { baseConfigList } from './index'
const validateRules = [
  { key: 'dimension',min: 1 },
  { key: 'metric', min: 1 }
]


function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  const modelConfig = fullConfig.config.model
  const metricConfig = safeGetArrayItem(modelConfig, 'metric', 0)
  //
  const { dimenions, dataBase, dataPositive,dataNegative, hasPositive,hasNegative,total } = buildData(data)

  //
  const option = {
    ...buildBaseOption({ config, ...baseConfigList ,options:{'xAxis-name':safeGetArrayItem(modelConfig,'dimension',0)?.label}}),

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
       const value=params[1].value=='-'?(-1*params[2].value):params[1].value
        return  params[1].name +"<br/>"+ params[1].seriesName + ' : ' + formatData(value,metricConfig) + '<br/>' + 'Total : '+formatData(total,metricConfig);
      }
    },
    series: [
      //It is transparent
      {
        name: 'Total',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: dataBase
      },
   
      
    ]
  }
  //
  option.xAxis.data=dimenions
  //
  if(hasPositive){
    option.series.push(   {
      type: 'bar',
   
      name: (metricConfig?.label || metricConfig?.column),
      stack: 'Total',
      data: dataPositive
    })
  }
  if(hasNegative){
    option.series.push({
      type: 'bar',
   
      name: (metricConfig?.label || metricConfig?.column)+' negative',
      stack: 'Total',
      data: dataNegative
    } )
  }
  //
  return option
}
//build the first transparent series
function buildData(data) {
  const dt = unref(data).data

  //
  const dimenions = []
  const dataBase = []
  const dataPositive = []
  const dataNegative = []
  // const dataRaw=[]
  let total = 0
  let hasPositive=false
  let hasNegative=false
  //The first row is data set title,ignore
  if (dt && Array.isArray(dt) && dt.length > 0) {
    for (let i = 1; i < dt.length; i++) {
      //d is an array with two items: first is dimension, second is metric
      const d = dt[i]
      //
      dimenions.push(d[0])
      // dataRaw.push(d[1])
      //
      if (d[1] >= 0) {
        dataPositive.push(d[1])
        dataNegative.push('-')
        dataBase.push(total)
        //
        hasPositive=true
      } else {
        dataPositive.push('-')
        dataNegative.push(-1 * d[1])
        dataBase.push(total + d[1])
        //
        hasNegative=true
      }
      //
      total += d[1]

    }
  }
  //
  return { dimenions, dataBase, dataPositive,dataNegative, hasPositive,hasNegative,total }
}

//
export const biWaterfallTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})
