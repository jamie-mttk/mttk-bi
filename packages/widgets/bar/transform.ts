import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'
import {createTooltip} from '../utils/tooltipUtil'
const validateRules=[
  {key:'dimension',min:1},
  {key:'metric',min:1}
]

// const axis_setting_values={
//   'bl':{
//     x:{position:'bottom',inverse:false},
//     y:{position:'left',inverse:false},
//   },
//   'br':{
//     x:{position:'bottom',inverse:true},
//     y:{position:'right',inverse:false},
//   },
//   'tl':{
//     x:{position:'top',inverse:false},
//     y:{position:'left',inverse:true},
//   },
//   'tr':{
//     x:{position:'top',inverse:true},
//     y:{position:'right',inverse:true},
//   },
// }

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  const modelConfig=fullConfig.config.model
  //
  // const axis_setting_value=axis_setting_values[config['axis-setting']||'bl']
  
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
      name:config.reverse ?safeGetArrayItem(modelConfig,'metric',0)?.label:safeGetArrayItem(modelConfig,'dimension',0)?.label,
      // ...(axis_setting_value?.x||{})
    },
    yAxis: {
      type: config.reverse ? 'category' : 'value',
      //y can not set name since it may have more than one
      // ...(axis_setting_value?.y||{})
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