//echarts should be imported even if it is not used because Vchart need it
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import { buildOption } from './build'
// import {buildDefaultEvents} from ../utils/echartsUtil'

export function echartsSimpleTransform({config, data,  contextWrap}) {
  //


  //
  const option = buildOption(config, data)
    //
    // console.log('BUILD:',JSON.stringify(option))
  //
  const result = {
    '~component': VChart ,
    option: option,
    autoresize:true,
    // style: {
    //   height: config.height || '100%',
    //   width: config.width || '100%'
    // },
    // ...buildDefaultEvents(contextWrap)
  }
  //
  return {'~':'div','#':result}
}
