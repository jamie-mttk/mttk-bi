import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'
import { createTooltip } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'dimension',  min: 1 },
  { key: 'metric', min: 1 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {

  const metricConfig=safeGetArrayItem(fullConfig.config.model,'metric',0)
  //
  const option = {
    ...buildBaseOption({config}),

    tooltip: {
      trigger: 'item',
      formatter:function(param){
        return createTooltip(param,fullConfig)
      
      }
    },


    series: [
      {
        type: 'funnel',
        name:metricConfig?.label||metricConfig?.column,
        label: {
          show: true,
          position: 'inside'
        },

        emphasis: {
          label: {
            fontSize: 20
          }
        }
      }
    ]
  }

  // console.log(JSON.stringify(option))
  return option
}

//
export const biFunnelTransform = buildTransformEcharts(buildOption, validateRules, undefined,)

//Internal functions
