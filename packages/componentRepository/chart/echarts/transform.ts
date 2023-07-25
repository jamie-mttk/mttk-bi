//echarts should be imported even if it is not used because Vchart need it
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import { buildOption } from './build'
import {buildDefaultEvents} from '../utils/echartsUtil'

export function echartsTransform(config: any, data: any, context, wrapperContext) {
  //

  //console.log('BUILD:')
  //
  const option = buildOption(config, data)
  //
  const result = {
    sys: { component: VChart },
    props: {
      option: option,
      autoresize:true,
      theme: config.theme || 'light'
    },
    slots: {},
    styles: {
      height: config.height || '100%',
      width: config.width || '100%'
    },
    events:buildDefaultEvents(wrapperContext)
  }
  //  if('edit'==context.mode.value){
  //   //under edit mode,wrap with mask
  //   return {'~component':CompMask,'#':result}
  //  }else{
  //   return result;
  //  }
  return result
}
