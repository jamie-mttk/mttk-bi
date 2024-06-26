import { unref } from 'vue'
import { buildTransformEcharts } from '../utils/transformUtil'
import * as echarts from 'echarts'
import * as ecSimpleTransform from 'echarts-simple-transform'
import { formatData } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'dimension', min: 1 },
  { key: 'metric', min: 0 },
  { key: '_dimensionAndMetric', eq: 2 }
]

const tooltopName=['min','Q1','median','Q3','max']
function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  echarts.registerTransform(ecSimpleTransform.aggregate)
  //
  const modelConfig = fullConfig.config.model || {}
  const sourceData = unref(data).data || []
  //
  // console.log(modelConfig.dimension.length,modelConfig.metric?.length,((modelConfig.dimension.length||0)+(modelConfig.metric?.length||0)),(modelConfig.dimension.length||0+modelConfig.metric?.length||0)!=2)
  // if(!modelConfig.dimension||((modelConfig.dimension.length||0+modelConfig.metric?.length||0)!=2)){

  //   return {}
  // }
  //
  const nameConfig = modelConfig.dimension[0]
  const valueConfig =
    modelConfig.metric?.length > 0 ? modelConfig.metric[0] : modelConfig.dimension[1]
  //
  const option = {
    title: {
      text: config['title-text'] || '',
      subtext: config['title-subtext'] || '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        //
        const value = params[0].value
        // console.log(value, params)
        //
        const config =
          modelConfig.metric.length > 0 ? modelConfig.metric[0] : modelConfig.dimension[1]
        //
        let result = '<div style="font-weight:700;">' + (value[value.length - 1] || '') + '</div>'
        result += `<div style="display:grid;grid-template-columns: auto auto auto;grid-gap: 4px 8px;">`
        for (let i = 0; i < value.length - 1; i++) {
          result += '<div>' + (params[0].marker || '') + '</div>'
          result += '<div>' + (i<tooltopName.length?tooltopName[i]:'') + '</div>'
          result += '<div>' + (formatData(value[i], config) || '') + '</div>'
        }
        result += '</div>'

        // //
         return result
      }
    },
    dataset: [
      {
        id: 'raw',
        sourceHeader: true,
        source: sourceData
      },
      {
        id: 'aggregate',
        fromDatasetId: 'raw',
        transform: [
          {
            type: 'ecSimpleTransform:aggregate',
            config: {
              resultDimensions: [
                { name: 'min', from: valueConfig.id, method: 'min' },
                { name: 'Q1', from: valueConfig.id, method: 'Q1' },
                { name: 'median', from: valueConfig.id, method: 'median' },
                { name: 'Q3', from: valueConfig.id, method: 'Q3' },
                { name: 'max', from: valueConfig.id, method: 'max' },
                { name: nameConfig.label, from: nameConfig.id }
              ],
              groupBy: nameConfig.id
            }
          },
          {
            type: 'sort',
            config: {
              dimension: 'Q3',
              order: 'asc'
            }
          }
        ]
      }
    ],
    xAxis: {
      name: nameConfig.label,
      nameLocation: 'middle'
    },
    yAxis: {
      type: 'category'
    },
    grid: {
      bottom: 100
    },
    legend: {
      selected: { detail: false }
    },

    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        datasetId: 'aggregate',
        itemStyle: {
          color: '#b8c5f2',
          // borderColor:'#b8c5f2',
          borderWidth: 1
        },
      
        encode: {
          x: ['min', 'Q1', 'median', 'Q3', 'max'],
          y: nameConfig.label,
          itemName: [nameConfig.label],
          tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
        }
      }
    ]
  }

  //  console.log(JSON.stringify(option))
  return option
}

//
export const biBoxplotTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions
