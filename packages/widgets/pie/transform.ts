import { buildBaseOption, buildTransformEcharts } from '../utils/transformUtil'
import { safeGetArrayItem } from '../utils/transformTools'
import { createTooltip } from '../utils/tooltipUtil'
import { baseConfigList } from './index'
import {safeParseJon} from '../utils/shareUtil'
const validateRules = [
  { key: 'dimension', min: 1 },
  { key: 'metric', min: 1 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const metricConfig = safeGetArrayItem(fullConfig.config.model, 'metric', 0)
  //
  const option = {
    ...buildBaseOption({ config, ...baseConfigList }),
    tooltip: {
      trigger: 'item',
      formatter: function (param) {
        return createTooltip(param, fullConfig)
      }
      // valueFormatter: (value,dataIndex) =>{
      //   return formatMetric(value,dataIndex,fullConfig)
      // }
    },

    series: [
      {
        type: 'pie',
        name: metricConfig?.label || metricConfig?.column,
        roseType: config['series-roseType'] || '',
         //convert '["45%","65%"]'  to ["45%","65%"] if needed
        radius: safeParseJon(config['series-radius'] || '60%'),
        itemStyle: {
          borderRadius: config['border-radius'] ||0,
          borderColor: '#fff',
          borderWidth: config['border-radius'] ? 2 : 0
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  //Here we copy the left/right/top/bottom from grid
  option.series[0].left = option.grid.left
  option.series[0].right = option.grid.right
  option.series[0].top = option.grid.top
  option.series[0].bottom = option.grid.bottom

  //
  return option
}

//
export const biPieTransform = buildTransformEcharts(buildOption, validateRules, undefined)
