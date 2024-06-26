import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'
import { formatData } from '../utils/tooltipUtil'
import { baseConfigList } from './index'

const validateRules = [
  { key: 'dimension', min: 2 },
  { key: '_dimensionAndMetric', eq:3 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //


  const dataFinal = buildData(sourceData)

  //
  const option = {
    ...buildBaseOption({config,...baseConfigList}),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(0,0,0,0.2)',
          width: 1,
          type: 'solid'
        }
      }
    },
    valueFormatter(value){
      //Get value config from metric or dimension depends on where it is set
      const config=(modelConfig.metric?.length||0)==1?modelConfig.metric[0]:modelConfig.dimension[2]
      return formatData(value,config)
    },

    singleAxis: {
      name:safeGetArrayItem(modelConfig,'dimension',0)?.label,
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      type: 'time',
      axisPointer: {
        animation: true,
        label: {
          show: true
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.2
        }
      }
    },
    series: [
      {
        type: 'themeRiver',
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        },
        label: {
          show: false
        },
        data:dataFinal
      }
    ]
  }

  // console.log(JSON.stringify(option))
  return option
}

//
export const biThemeRiverTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions

//input: [['date','category','quantity'],['2023/1/1','Milk',120],['2023/1/2','Milk',100],['2023/1/2','Colo',90],['2023/1/2','Colo',110]]
//output:[['2023/1/1',120,'Milk'],['2023/1/2',100,'Milk'],['2023/1/2',90,'Colo'],['2023/1/2',110],'Colo']
//Please note the first lien should be removed!
function buildData(sourceData) {
  //
  const result = []
  //
  let isFirst=true
  for (const d of sourceData) {
    if(isFirst){
      //Skip first line
      isFirst=false
      continue
    }
    result.push([d[0],d[2],d[1]])
  }
  //
  // console.log(JSON.stringify(result,null,2))
  //
  return result
}
