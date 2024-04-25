import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'
import {createTooltip} from '../utils/tooltipUtil'
const validateRules=[
  {key:'dimension',min:1},
  {key:'metric',min:1}
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
      type: config.reverse ? 'category' : 'value'
    },
    series: [],

  }
  //series
  //series
  for (const c of fullConfig?.config.model.metric || []) {
    option.series.push({
      type: 'line',
      name:c.label||c.column,
      stack: config.stack?'x' : '',
      areaStyle:config.areaMode?{}:undefined,
      smooth:!!config.smooth,
    })
  }
  return option
}


//
export const biLineTransform = buildTransformEcharts(buildOption, validateRules,undefined)