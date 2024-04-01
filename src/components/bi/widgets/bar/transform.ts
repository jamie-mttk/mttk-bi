import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'
import {createTooltip} from '../utils/tooltipUtil'
const validateRules=[
  {key:'dimension',label:'维度',min:1},
  {key:'metric',label:'度量',min:1}
]


function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  const modelConfig=fullConfig.config.model
  //
  const option = {
    ...buildBaseOption({config}),
    tooltip: {
      trigger: 'axis', 
      formatter:function(param){
        return createTooltip(param,fullConfig)
      },
    },

    xAxis: {
      type: config.reverse ? 'value' : 'category',
      name:config.reverse ?safeGetArrayItem(modelConfig,'metric',0)?.label:safeGetArrayItem(modelConfig,'dimension',0)?.label
    },
    yAxis: {
      type: config.reverse ? 'category' : 'value',
      //y can not set name since it may have more than one
    },
    series: [],

  }
  //series
  for (const c of fullConfig?.config.model.metric || []) {
    option.series.push({
      type: 'bar',
      id: c.id,
      name:c.label||c.column,
      stack: config.stack ? 'x' : ''
    })
  }
  return option
}

//
export const biBarTransform = buildTransformEcharts(buildOption, validateRules,undefined)