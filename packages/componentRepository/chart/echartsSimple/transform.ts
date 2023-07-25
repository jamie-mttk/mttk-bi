//echarts should be imported even if it is not used because Vchart need it
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import { buildOption } from './build'
import {buildDefaultEvents} from '../utils/echartsUtil'

export function echartsSimpleTransform(config: any, data: any, context, wrapperContext) {
  //

  //console.log('BUILD:')
  //
  const option = buildOption(config, data)
  //
  const result = {
    sys: { component: VChart },
    props: {
      option: option,
    },
    slots: {},
    styles: {
      height: config.height || '100%',
      width: config.width || '100%'
    },
    events:buildDefaultEvents(wrapperContext)
  }
  //
  return result;
}
