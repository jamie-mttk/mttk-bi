import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'

import { formatData, } from '../utils/tooltipUtil'
const validateRules = [
  { key: 'metric', label: '度量', min: 1 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {


  //
  const option = {
    ...buildBaseOption({config}),

    tooltip: {
      show:false,
    },
    series: [
      {
        type: 'gauge',
        label: {
          show: true,
          position: 'inside'
        },
        //Move a little below if there is a title
        center: ['50%', config['title-text']?'60%':'50%'],
        detail: {
          valueAnimation: true,
          formatter: function(params){            
            return formatData(params,fullConfig.config.model.metric[0]||{});
          }

        },
      }
    ]
  }

  // console.log(JSON.stringify(option))
  return option
}


//
export const biGaugeTransform = buildTransformEcharts(buildOption, validateRules, undefined,)

