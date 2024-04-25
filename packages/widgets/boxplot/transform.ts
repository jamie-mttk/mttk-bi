import { unref } from 'vue'
import { buildTransformEcharts } from '../utils/transformUtil'
import * as echarts from 'echarts';
import *  as ecSimpleTransform from 'echarts-simple-transform';

const validateRules = [
  { key: 'dimension',  min: 1 },
  { key: 'metric',  min: 0 },
  { key: '_dimensionAndMetric', eq: 2}
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  echarts.registerTransform(ecSimpleTransform.aggregate);
  //
  const modelConfig = fullConfig.config.model||{}
  const sourceData = unref(data).data || []
  //
  if(!modelConfig.dimension||((modelConfig.dimension.length||0+modelConfig.metric?.length||0)!=2)){

    return {}
  }
  //
  const nameConfig=modelConfig.dimension[0]
  const valueConfig=modelConfig.metric?.length>0?modelConfig.metric[0]:modelConfig.dimension[1]
  //
  const option = {
    title: {
      text: config['title-text'] || '',
      subtext: config['title-subtext'] || '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      confine: true
    },
    dataset: [
      {
        id: 'raw',
        sourceHeader : true,
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
                { name: 'min', from: valueConfig.label, method: 'min' },
                { name: 'Q1', from: valueConfig.label, method: 'Q1' },
                { name: 'median', from: valueConfig.label, method: 'median' },
                { name: 'Q3', from: valueConfig.label, method: 'Q3' },
                { name: 'max', from: valueConfig.label, method: 'max' },
                { from: nameConfig.label }
              ],
              groupBy: nameConfig.label
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
      nameLocation: 'middle',

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
          color: '#b8c5f2'
        },
        encode: {
          x: ['min', 'Q1', 'median', 'Q3', 'max'],
          y: nameConfig.label,
          itemName: [nameConfig.label],
          tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
        }
      }]
  }

    // console.log(JSON.stringify(option))
  return option
}



//
export const biBoxplotTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions