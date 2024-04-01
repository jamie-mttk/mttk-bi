import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'

import { formatData } from '../utils/tooltipUtil'
import 'echarts-wordcloud';

const validateRules = [
  { key: 'dimension', label: '维度', min: 1 },
  { key: '_dimensionAndMetric', eq: 2 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //


  const dataFinal = buildData(sourceData)

  //
  const option = {
    ...buildBaseOption({config}),
    tooltip: {
      valueFormatter(value){
        //Get value config from metric or dimension depends on where it is set
        const config=(modelConfig.metric?.length||0)==1?modelConfig.metric[0]:modelConfig.dimension[2]
        return formatData(value,config)
      }
    },
    series: [
      {
        type: 'wordCloud',
        shape: config.shape||'circle',
        keepAspect: false,

        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: config.rotate?[-90, 90]:[0, 0],
        rotationStep:config.rotate?45:0,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
                return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')';
            }
        },
        emphasis: {
            textStyle: {
                textShadowBlur: 3,
                textShadowColor: '#333'
            }
        },

        data: dataFinal
    }
    ]
  }

  // console.log(JSON.stringify(option))
  return option
}



//
export const biWordCloudTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions

//input：[['goods','quantity'],['goods1',12],['goods2',15],['goods3',45],['goods4',52]]
//the result is like [{name:'goods1',value:12},{name:'goods2',value:15},{name:'goods3',value:45},{name:'goods4',value:52},]
function buildData(sourceData) {
  //
  const result = []
  //
  let isFirst=true
  for (const d of sourceData) {
    if(isFirst){
      //Skip first line
      isFirst=false
      continue
    }
    //
    result.push({
      name: d[0],
      value: d[1]
    })
  }
  //
  // console.log(JSON.stringify(result,null,2))
  //
  return result
}
