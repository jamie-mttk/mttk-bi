import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import { getDistinctColumns, arrayToIndexMap } from '../utils/dataUtil'
import {getMetricOrDimension,safeGetArrayItem} from '../utils/transformTools'
import { formatData } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'dimension', label: '维度', min: 2 },
  { key: 'metric', label: '度量', min: 1 }
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
    ...buildBaseOption({config}),
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
    xAxis: {
      type: 'category',
      name:safeGetArrayItem(modelConfig,'dimension',0)?.label,
      data: dataX,
      splitArea: {
        show: config['split-area-mode'] == 'x' || config['split-area-mode'] == 'both'
      }
    },
    yAxis: {
      type: 'category',
      name:safeGetArrayItem(modelConfig,'dimension',1)?.label,
      data: dataY,
      splitArea: {
        show: config['split-area-mode'] == 'y' || config['split-area-mode'] == 'both'
      }
    },
    visualMap: {
      min: 0,
      max: maxVal,
      show: false
    },
    series: [
      {
        name: getMetricOrDimension(modelConfig)?.label,
        type: 'heatmap',
        data: dataFinal,
        label: {
          show: !!config['show-label'],
          formatter:function(params){

            return formatData(params.value[2], modelConfig.metric[0]) 
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  //  console.log(JSON.stringify(option))
  return option
}
//
export const biHeatmapTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
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