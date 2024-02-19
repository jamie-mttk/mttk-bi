import {buildTransformEcharts} from '../utils/transformUtil'

const validateRules=[
  {key:'dimension',label:'维度',min:1},
  {key:'metric',label:'度量',min:1}
]


function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const option = {
    title: {
      text: config['title-text'] || '',
      subtext: config['title-subtext'] || '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
      // formatter:function(param){
      //   return param.seriesName+'<br>'+param.name+'   '+param.data[1]
      // }
    },
    xAxis: {
      type: config.reverse ? 'value' : 'category'
    },
    yAxis: {
      type: config.reverse ? 'category' : 'value'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [],

  }
  //series
  //series
  for (const c of fullConfig?.config.model.metric || []) {
    option.series.push({
      type: 'line',
      stack: config.stack?'x' : '',
      areaStyle:config.areaMode?{}:undefined,
      smooth:!!config.smooth,
    })
  }
  return option
}

//return error info is valdiate failed,otherwise return undefined
function validate({ config, data, context, key, contextWrap, fullConfig }) {

  return undefined
}


//
export const biLineTransform = buildTransformEcharts(buildOption, validateRules,validate)