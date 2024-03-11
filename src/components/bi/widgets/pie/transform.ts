import {buildTransformEcharts} from '../utils/transformUtil'
import {createTooltip} from '../utils/tooltipUtil'
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
      trigger: 'item',
      formatter:function(param){
        return createTooltip(param,fullConfig)
      }
      // valueFormatter: (value,dataIndex) =>{
      //   return formatMetric(value,dataIndex,fullConfig)
      // }
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
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

//return error info is valdiate failed,otherwise return undefined
function validate({ config, data, context, key, contextWrap, fullConfig }) {

  return undefined
}




//
export const biPieTransform = buildTransformEcharts(buildOption, validateRules,validate)