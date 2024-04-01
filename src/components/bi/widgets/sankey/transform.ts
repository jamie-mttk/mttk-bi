import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import { getDistinctColumns,  } from '../utils/dataUtil'
import { formatData } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'dimension', label: '维度', min: 2 },
  { key: '_dimensionAndMetric', eq: 3 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //
  //
  const data1 = getDistinctColumns(sourceData, 0)
  const data2 = getDistinctColumns(sourceData, 1)

  const dataFinal = buildData(data1, data2)
  const linksFinal=buildLink(sourceData);
  //
  const option = {
    ...buildBaseOption({config}),
    tooltip: {
      // formatter: function (params) {
      //   //
      //   console.log(params.value,params.data)

      //   //
      //   return params.data.source +'--'+params.data.target+'    '+params.data.value
      // }
      valueFormatter(value){
        //Get value config from metric or dimension depends on where it is set
        const config=(modelConfig.metric?.length||0)==1?modelConfig.metric[0]:modelConfig.dimension[2]
        return formatData(value,config)
      }
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        orient:config.orient||'horizontal',
        nodeAlign:config['node-align']||'justify',
        data: dataFinal,
        links:linksFinal
      }
    ]
  }

  // console.log(JSON.stringify(option))
  return option
}


//
export const biSankeyTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions

//data1 ['c0','c1']
//data2 ['g0','g1','g2']
//the result is like [{name:'c0'},{name:'c1'},{name:'g0'},{name:'g1'},{name:'g2'}]
function buildData(data1, data2) {
  //
  const result1 = [] as any[]
  //
  for (const d of data1) {
    if(!result1.includes(d)){
    result1.push(d)
  }
  }
  for (const d of data2) {
    if(!result1.includes(d)){
      result1.push(d)
    }
  }
  //
  const result=[] as any[]
  for(const r of result1){
    result.push({ name: r })
  }
  //
  return result
}
//
function buildLink(sourceData) {
  //
  const result = []
  //
  for (const d of sourceData) {
    result.push({
      source: d[0],
      target: d[1],
      value: d[2]
    })
  }
  //
  return result
}
