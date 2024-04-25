import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import {safeGetArrayItem} from '../utils/transformTools'
import {createTooltip} from '../utils/tooltipUtil'
const validateRules=[
  {key:'dimension',min:1},
  {key:'metric',min:1}
]


function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const metricConfig=safeGetArrayItem(fullConfig.config.model,'metric',0)
  //
  const option = {
    ...buildBaseOption({config,skipLegend:true}),
    tooltip: {
      trigger: 'item',
      formatter:function(param){
        return createTooltip(param,fullConfig)
      }
      // valueFormatter: (value,dataIndex) =>{
      //   return formatMetric(value,dataIndex,fullConfig)
      // }
    },
    
    series: [
      {
        type: 'pie',
        name:metricConfig?.label||metricConfig?.column,
        roseType: config['series-roseType'] || '',
        radius: config['series-radius']|| '60%',
        itemStyle:{
          borderRadius: config['border-radius']?10:0,
          borderColor: '#fff',
          borderWidth: config['border-radius']?2:0
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',

          }
        }
      }
    ],

  }

  return option
}


//
export const biPieTransform = buildTransformEcharts(buildOption, validateRules,undefined)