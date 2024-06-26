import { unref } from 'vue'
import { buildBaseOption, buildTransformEcharts } from '../utils/transformUtil'
import { getDistinctColumns, arrayToIndexMap } from '../utils/dataUtil'
import { safeGetArrayItem } from '../utils/transformTools'
import { formatData } from '../utils/tooltipUtil'
import { baseConfigList } from './index'

const validateRules = [
  { key: 'dimension', min: 2 },
  { key: 'metric', min: 1 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //
  const dataX = getDistinctColumns(sourceData, 0)
  const dataY = getDistinctColumns(sourceData, 1)
  const dataFinal = buildData(sourceData, dataX, dataY)
  const maxVal = calMaxValue(sourceData)
  //
  const option = {
    ...buildBaseOption({
      config,
      ...baseConfigList,
      options:{'xAxis-name': safeGetArrayItem(modelConfig, 'dimension', 0)?.label,
      'yAxis-name': safeGetArrayItem(modelConfig, 'dimension', 1)?.label}
    }),
    tooltip: {
      formatter: function (params) {
        //
        const metricConfig = modelConfig.metric[0]
        //
        let result = '<div style="font-weight:700;">' + (dataY[params.value[1]] || '') + '</div>'
        result += `<div style="display:grid;grid-template-columns: auto auto auto;grid-gap: 4px 8px;">`
        result += '<div>' + (params.marker || '') + '</div>'
        result += '<div>' + (dataX[params.value[0]] || '') + '</div>'
        result += '<div>' + (formatData(params.value[2], metricConfig) || '') + '</div>'
        result += '</div>'

        //
        return result
      }
    },

    series: [
      {
        name: '',
        type: 'scatter',
        symbolSize: function (val) {
          const symboSize = config['symbol-size'] || 40
          let symboSizeBase = config['symbol-size-base'] || 5
          if (symboSizeBase >= symboSize) {
            symboSizeBase = symboSize / 2
          }
          return (Math.abs(val[2]) / maxVal) * (symboSize - symboSizeBase) + symboSizeBase
        },
        data: dataFinal,
        animationDelay: function (idx) {
          return idx * 5
        }
      }
    ]
  }
  //
  option.xAxis.data=dataX
  option.yAxis.data=dataY
  // console.log(JSON.stringify(option))
  return option
}

//
export const biBubbleTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions
//data is like [['Company name','Goods name','Amount'],['c0','g0',12],['c0','g1',23],['c1','g0',22],['c1','g1',32],['c1','g2',25]]
//dataX ['c0','c1']
//dataY ['g0','g1','g2']
//the result is like [['Company name','Goods name','Amount'],[0,0,12],[0,1,23],[1,0,22],[1,1,32],[1,2,25]]
//The
function buildData(data, dataX, dataY) {
  //Conver to map structure for quick finding
  const mapX = arrayToIndexMap(dataX)
  const mapY = arrayToIndexMap(dataY)

  //
  const result = []
  //
  let isFirstRow = true
  for (const item of data) {
    if (isFirstRow) {
      //First row is title,just copy
      result.push(item)
      isFirstRow = false
      continue
    }

    const r = []
    result.push(r)
    //x
    r.push(mapX[item[0]])
    //y
    r.push(mapY[item[1]])
    //value
    r.push(item[2])
  }
  // console.log(JSON.stringify(result,null,2))
  //
  return result
}

function calMaxValue(data) {
  //Calculate the max of abs value column(col 2),this is used to calcuate symbol/Funnel size
  let maxVal = 0
  let isFirstRow = true
  for (const item of data) {
    if (isFirstRow) {
      isFirstRow = false
      continue
    }
    maxVal = Math.max(maxVal, Math.abs(item[2]))
  }
  return maxVal
}
