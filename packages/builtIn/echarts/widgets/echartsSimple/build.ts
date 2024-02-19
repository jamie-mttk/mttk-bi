import { unref } from 'vue'
import {parsePieRadius,putIfHaveBatch,putIfHave,buildOptionOther,buildOptionDataset} from '../utils/echartsUtil'
import {smartJsonParse} from '@/utils/tools'
export function buildOption(config, data) {
  //
  const option = {}
  //
  const hasLegend = hasOptionLegend(data)
  //
  const hasTitle = buildOptionTitle(option, config, hasLegend)
  if (hasLegend) {
    buildOptionLegend(option, config)
  }
  //
  buildOptionGrid(option, config, hasTitle, hasLegend)
  //
  buildOptionTooltip(option, config)
  //
  buildOptionXAxis(option, config,data)
  //
  buildOptionYAxis(option, config)
  //series
  buildOptionSeries(option, config, data)

  //
  buildOptionOther(option, config)
  //build dataset, please note option other may have dataset
  buildOptionDataset(option,config,data)
  //
  //console.log(JSON.stringify(option,null,2))
  //
  return option
}
function buildOptionTitle(option, config, hasLegend) {
  if (!config['title-text'] && !config['title-subtext']) {
    return false
  }
  const optionTitle = { left: hasLegend ? 'left' : 'center' }
  option.title = optionTitle
  //
  putIfHave(optionTitle, config, 'title-text', 'text')
  putIfHave(optionTitle, config, 'title-subtext', 'subtext')
  //
  return true
}
function hasOptionLegend(data) {
  //
  data = unref(data)
  //
  try {
    if (data[0].length <= 2) {
      return false
    }
  } catch (e) {
    //console.log(e)
    //ignore,can not determine,do not show legend
    return false
  }
  //
  return true
}
function buildOptionLegend(option, config) {
  //Assume data is a two dimension array,if the first line has more than 2 columns, show legend

  //
  const optionLegend = { right: '10%' }
  option.legend = optionLegend
}
function buildOptionGrid(option, config, hasTitle, hasLegend) {
  //
  const optionGrid = {}
  option.grid = optionGrid
  //Calculte option top to have enough space to show title and legend
}

function buildOptionTooltip(option, config) {
  //
  const optionTooltip = {}
  option.tooltip = optionTooltip
  //pie only support item trigger
  optionTooltip['trigger'] = safeGetType(config) == 'pie' ? 'item' : 'axis'
}
//
function buildOptionXAxis(option, config,data) {
  if (safeGetType(config) == 'pie') {
    //no need to create for pie
    return
  }
  //
  const optionXAxis = { type: 'category' }
  option.xAxis = optionXAxis
}
// //try to get the xAsix name
// function getXAisName(config,data){
//   try{
    
//   if(config.dimensions){
//     return smartJsonParse(config.dimensions)[0]
//   }
//   return unref(data)[0][0]
// }catch(e){
//   console.log(e)
//   //if error ,no name is set
//   return undefined
// }
// }
//
function buildOptionYAxis(option, config) {
  if (safeGetType(config) == 'pie') {
    //no need to create for pie
    return
  }
  //
  const optionYAxis = { type: 'value' }
  option.yAxis = optionYAxis
}

//
function buildOptionSeries(option, config, data) {
  //
  data = unref(data)
  //
  const series = [] as object[]
  option.series = series
  //Create series based on the number of data column
  try {
    // console.log(data)
    const line = data[0]
    if (!data || !line || line.length <= 1) {
      //if there is no enough column,set a default series
      series.push({ type: safeGetType(config) })
      return
    }
    for (let i = 1; i < line.length; i++) {
      //If type is pie, all the charts will be overlapped~~
      const result = buildOptionSeriesSingle(config, line[i])
      if (result) {
        series.push(result)
      }
    }
  } catch (e) {
    //If error, create a default one
    series.push({ type: safeGetType(config) })
  }
  //
}
function buildOptionSeriesSingle(config, d) {
  const result = {}
  //
  const chartType = safeGetType(config)
  result.type = chartType

  if (chartType == 'line') {
    putIfHaveBatch(result, config, 'series', ['smooth'])
  } else if (chartType == 'bar') {
    putIfHaveBatch(result, config, 'series', ['barWidth', 'barGap'])
  } else if (chartType == 'pie') {
    putIfHaveBatch(result, config, 'series', ['roseType'])
    //radius
    if (config['series-radius']) {
      result['radius'] = parsePieRadius(config['series-radius'])
    }
    // //itemStyle.borderRadius
    // if (config['series-itemStyle-borderRadius']) {
    //   result['itemStyle'] = {}
    //   result['itemStyle']['borderRadius'] = config['series-itemStyle-borderRadius']
    // }
    // result['itemStyle'] = {}
    // result['itemStyle']['borderRadius']='5px'
    //buildOptionCommonWithSub(result, config, 'series', ['borderRadius'],'itemStyle')
    //putIfHaveBatch(result, config, 'series', ['roseType','radius','itemStyle.borderRadius'])
  }
  //

  //
  return result
}
//
function safeGetType(config) {
  return config['series-type'] || 'pie'
}

//************************************************************
//Util functions
//************************************************************
