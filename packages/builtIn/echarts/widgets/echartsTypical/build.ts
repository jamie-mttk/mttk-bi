import {parsePieRadius,putIfHaveBatch,putIfHave,buildOptionOther,buildOptionDataset} from '../utils/echartsUtil'
import {smartJsonParse} from '@/utils/tools'
export function buildOption(config,data) {

  //
  const option = {}
  //
  buildOptionCommon(option, config, 'title', ['text', 'subtext', 'left', 'top'])
  //
  buildOptionCommon(option, config, 'legend', ['icon', 'formatter', 'orient', 'left', 'top'])
  //
  buildOptionCommon(option, config, 'grid', ['show', 'left', 'top', 'right', 'bottom'])
  //
  buildOptionCommon(option, config, 'tooltip', ['trigger', 'formatter'])
  //
  buildOptionCommon(option, config, 'xAxis', ['name', 'inverse', 'type'], true)
  buildOptionCommonWithSub(option, config, 'xAxis', ['show', 'formatter'], 'axisLabel')
  //
  buildOptionCommon(option, config, 'yAxis', ['name', 'inverse', 'type'], true)
  buildOptionCommonWithSub(option, config, 'yAxis', ['show', 'formatter'], 'axisLabel')
  //series
  buildOptionSeries(option, config)
  //
  buildOptionOther(option, config)
  //build dataset, please note option other may have dataset
  buildOptionDataset(option,config,data)
  //
  // console.log(JSON.stringify(option,null,2))
  //
  return option
}
//
function buildOptionSeries(option, config) {
  const series = [] as object[]
  option.series = series
  //
  const seriesConfig=config.series || []
  if(!config.series||seriesConfig.length<=0){
    series.push({type:'pie'})
    //If there is no series set, create a default one so the echarts will display something
    return
  }
  //
  for (const c of seriesConfig) {
    const result = buildOptionSeriesSingle(c)
    if (result) {
      series.push(result)
    }
  }
  //
  //console.log(JSON.stringify(series,null,2))
}
function buildOptionSeriesSingle(config) {
  //
  if (config['series-config'] == 'customize') {
    //
    const customizeOptionStr = config['series-customize-option']
    if (!customizeOptionStr) {
      return undefined
    } else {
      return smartJsonParse(customizeOptionStr)
    }
  } else if (config['series-config'] == 'ui') {
    //
    return buildOptionSeriesSingleUI(config)
  }
}
function buildOptionSeriesSingleUI(config) {
  const result = {}
  //
  putIfHaveBatch(result, config, 'series', ['type', 'name', 'stack'])
  //
  const chartType = config['series-type']

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
    //itemStyle.borderRadius
    if (config['series-itemStyle-borderRadius']) {
      result['itemStyle'] = {}
      result['itemStyle']['borderRadius'] = config['series-itemStyle-borderRadius']
    }
    //buildOptionCommonWithSub(result, config, 'series', ['borderRadius'],'itemStyle')
    //putIfHaveBatch(result, config, 'series', ['roseType','radius','itemStyle.borderRadius'])
  }
  //
  return result
}


//Common option handling
function buildOptionCommon(
  option,
  config,
  prefix,
  optionKeyArray: string[],
  buildDefault: boolean = false
) {
  if (config[prefix + '-config'] == 'ui') {
    const optionUI = {}
    option[prefix] = optionUI
    putIfHaveBatch(optionUI, config, prefix, optionKeyArray)
  } else if (config[prefix + '-config'] == 'customize') {
    buildOptionCustomize(option, config, prefix, buildDefault)
  }
}












//************************************************************
//Util functions
//************************************************************
//Common option handling - the prefix is under some node,only for ui mode
function buildOptionCommonWithSub(option, config, prefix, optionKeyArray: string[], nodeKey) {
  if (config[prefix + '-config'] != 'ui') {
    return
  }
  //

  //
  const optionUI = {}
  option[prefix][nodeKey] = optionUI
  //
  for (const k of optionKeyArray) {
    putIfHave(optionUI, config, prefix + '-' + nodeKey + '-' + k, k)
  }
}


//Common customize option handling
function buildOptionCustomize(option, config, prefix: string, buildDefault: boolean) {
  let customizeOptionStr = config[prefix + '-customize-option']
  if (!customizeOptionStr) {
    if (buildDefault) {
      customizeOptionStr = '{}'
    } else {
      return
    }
  }
  //
  option[prefix] =smartJsonParse(customizeOptionStr)
}


