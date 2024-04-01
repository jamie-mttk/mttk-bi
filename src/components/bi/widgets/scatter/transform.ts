import { unref } from 'vue'
import { buildBaseOption, buildTransformEcharts } from '../utils/transformUtil'
import { safeGetArrayItem } from '../utils/transformTools'
import { getDistinctColumns } from '../utils/dataUtil'
import { formatData } from '../utils/tooltipUtil'
const validateRules = [{ key: 'dimension', label: '维度', min: 2 }]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //x axis config
  const xConfig = safeGetArrayItem(modelConfig, 'dimension', 0)
  //y axis config
  const yConfig = safeGetArrayItem(modelConfig, 'dimension', 1)
  //
  const option = {
    ...buildBaseOption({ config }),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      //  valueFormatter: (value,dataIndex) =>{

      //  return formatData(value,valueConfig);
      //  },
      formatter: function (param) {
        if (!Array.isArray || param.length == 0) {
          return ''
        }
        let result = '<div style="font-weight:700;">' + formatData(param[0].axisValue,xConfig) + '</div>'
        result += `<div style="display:grid;grid-template-columns: auto auto auto;grid-gap: 4px 8px;">`
        for(const p of param){
          result+='<div>'+(p.marker||'')+'</div>'
          result+='<div>'+(p.seriesName||'')+'</div>'
          result+='<div>'+formatData(p.value[1]||0,yConfig)+'</div>'
          
        }
        result += '</div>'
        return result
      }
    },
    xAxis: {
      name: safeGetArrayItem(modelConfig, 'dimension', 0)?.label
    },
    yAxis: {
      name: safeGetArrayItem(modelConfig, 'dimension', 1)?.label
    },
    dataset: [],
    series: []
  }
  //
  option.dataset.push({ sourceHeader: true, source: sourceData })
  //
  const optionSeriesOther = buildOptionSeriesOther(config)
  //
  const dimensionLength = modelConfig.dimension?.length || 0
  //series
  if (dimensionLength == 2) {
    //No dimension
    option.series.push({
      name: '显示值',
      symbolSize: config['symbol-size'] || 20,
      type: 'scatter',
      ...optionSeriesOther
    })
    option.legend.data = []
  } else if (dimensionLength == 3) {
    //Calculate the distinct list of third column
    const list = getDistinctColumns(sourceData, 2)
    //Set legend
    option.legend.data = list
    //

    for (let i = 0; i < list.length; i++) {
      const item = list[i]

      //create filter data
      option.dataset.push({
        transform: {
          type: 'filter',
          config: { dimension: 2, value: item }
        }
      })
      //create series
      option.series.push({
        name: item,
        symbolSize: config['symbol-size'] || 20,
        type: 'scatter',
        datasetIndex: i + 1,
        emphasis: {
          focus: 'series'
        },
        ...optionSeriesOther
      })
    }
  }
  //check whether there are   regression-curve
  const regressionCurve = config['regression-curve'] || 'none'

  if (regressionCurve != 'none' && sourceData && sourceData.length > 0) {
    //Do not create if sourceData is empty,this will cause echarts throw exception
    //cerate data set
    option.dataset.push({
      transform: {
        type: 'ecStat:regression',
        config: { method: regressionCurve, order: 3 }
      }
    })
    //create series
    option.series.push({
      name: '回归曲线',
      type: 'line',
      smooth: true,
      datasetIndex: option.dataset.length - 1,
      symbolSize: 0.1,
      symbol: 'circle',
      label: { show: true, fontSize: 16 },
      labelLayout: { dx: -40 },
      encode: { label: 2, tooltip: 1 }
    })
  }

  // console.log(JSON.stringify(option))
  return option
}

//
export const biScatterTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions

//
//show-range-area/show-average-line/highlight-min-max
function buildOptionSeriesOther(config) {
  const optionSeriesOther = {}
  if (config['show-range-area']) {
    optionSeriesOther.markArea = {
      silent: true,
      itemStyle: {
        color: 'transparent',
        borderWidth: 1,
        borderType: 'dashed'
      },
      data: [
        [
          {
            xAxis: 'min',
            yAxis: 'min'
          },
          {
            xAxis: 'max',
            yAxis: 'max'
          }
        ]
      ]
    }
  }
  //
  if (config['show-average-line']) {
    optionSeriesOther.markLine = {
      lineStyle: {
        type: 'solid'
      },
      label: { show: false },
      symbol: 'rect',
      data: [{ yAxis: 'average' }, { xAxis: 'average' }]
    }
  }
  //
  if (config['highlight-min-max']) {
    optionSeriesOther.markPoint = {
      data: [
        { type: 'max', name: 'Max' },
        { type: 'min', name: 'Min' }
      ]
    }
  }
  //
  return optionSeriesOther
}
