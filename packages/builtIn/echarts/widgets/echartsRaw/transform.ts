//echarts should be imported even if it is not used because Vchart need it
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import {smartJsonParse} from '@/utils/tools'
import {buildOptionDataset,buildDefaultEvents} from '@/builtIn/echarts/widgets/utils/echartsUtil'

export function echartsRawTransform({config, data, contextWrap}) {
  //

  // console.log('BUILD:',config.option)
  //
  const option = smartJsonParse(config.option||'{}')
  //
  buildOptionDataset(option,config,data)
  //set data if needed
  //
  const result = {
    '~component': VChart ,
    option: option,
    // style: {
    //   height: config.height || '100%',
    //   width: config.width || '100%'
    // },
    // ...buildDefaultEvents(contextWrap)
  }
  return {'~':'div','#':result}
  //
  // return result;
}
