

export function createTooltip(params, fullConfig) {
  let result = ''
  //We need to skip the dimensions from data
  const dimensionCount = countDimension(fullConfig)

  if (Array.isArray(params)) {
    if (params.length > 0) {
      result += buildTitle(params[0])
    }
    result += startGrid()
    for (let i = 0; i < params.length; i++) {
      result += createSingle(params[i], i, dimensionCount, fullConfig)
    }
    result += endGrid()
  } else {
    result += buildTitle(params)
    result += startGrid()
    result += createSingle(params, 0, dimensionCount, fullConfig)
    result += endGrid()
  }

  //
  return result
}
function startGrid() {
  return `<div style="display:grid;grid-template-columns: auto auto auto;grid-gap: 4px 8px;">`
}
function endGrid() {
  return '</div>'
}
function buildTitle(param) {
  return '<div style="font-weight:700;">' + (param?.name || '') + '</div>'
}
function createSingle(param, index, dimensionCount, fullConfig) {
  //The marker normally is a filled circle
  let result = '<div>' + (param.marker || '') + '</div>'
  //serial name, it seems the meaning is different betweeen params is an array and params is an object
  result += '<div>' + param.seriesName + '</div>'
  //
  const metricIndex = dimensionCount + index
  if (param.data.length <= metricIndex) {
    //it will not happen!
    return result
  }
  //
  const value = param.data[metricIndex]
  //
  const metricConfig = findMetric(index, fullConfig)
  //
  // result += ' : '
  result += '<div style="text-align: right">' + formatData(value, metricConfig) + '</div>'
  // result += '<br>'
  //
  return result
}

//Find metric by dataIndex
function findMetric(dataIndex, fullConfig) {
  const modelConfig = fullConfig?.config?.model || {}
  for (const k of Object.keys(modelConfig)) {
    if (k.startsWith('metric')) {
      const cc = modelConfig[k] || []
      for (const c of cc) {
        if (dataIndex == 0) {
          return c
        }
        //
        dataIndex--
      }
    }
  }
}
//Count how many dimension is set
function countDimension(fullConfig) {
  let count = 0
  const modelConfig = fullConfig?.config?.model || {}
  for (const k of Object.keys(modelConfig)) {
    if (k.startsWith('dimension')) {
      const cc = modelConfig[k] || []
      count += cc.length
    }
  }
  return count
}

export function formatData(value, config) {
  try {
    if (
      config?.dataType == 'number' ||
      config?.dataType == 'integer'
    ) {
      if(!value){
        //value may be undefined or null
        value=0
      }
      return formatDataNumber(value, config)
    } else {
      return value
    }
  } catch (error) {
    console.log('formatData error', error)
    return value
  }
}
function formatDataNumber(value, config) {

  //
  if (typeof value!='number'){
    return value;
  }

  //Converter - valueNew is numeric
  const { value: valueConverted, suffix: suffixConver } = formatDataNumberConvert(value, config)
  //Decimal Point
  let valueStr = formatDataNumberPoint(valueConverted, config)
  //Thousandth mark
  valueStr = formatDataNumberThousandthMark(valueStr, config)
  //negative
  valueStr = formatDataNumberNegative(valueStr, config)
  //
  return (
    (config._format_number_prefix || '') +
    valueStr +
    (suffixConver || '') +
    (config._format_number_suffix || '')
  )
}
//try converter if it is configured
//Return is {value,suffix} suffix may be undefined
function formatDataNumberConvert(value, config) {
  if (typeof value == 'string') {
    value = parseFloat(value)
  }
  //
  const converter = config._format_number_converter || 'none'
  if (converter == 'ch_auto') {

    //
    if (Math.abs(value) < 10000) {
      //
      return { value }
    } else if (Math.abs(value) < 1000000) {
      //wan  - DO NOT DO i18n for below line
      return { value: value / 10000, suffix: '万' }
    } else if (Math.abs(value) < 10000 * 10000) {
      //baiwan  - DO NOT DO i18n for below line
      return { value: value / 1000000, suffix: '百万' }
    } else {
      //yi  - DO NOT DO i18n for below line
      return { value: value / (10000 * 10000), suffix: '亿' }
    }
  } else if (converter == 'en_auto') {
    //
    if (Math.abs(value) < 1000) {
      //
      return { value }
    } else if (Math.abs(value) < 1000 * 1000) {
      //K
      return { value: value / 1000, suffix: 'K' }
    } else {
      //M
      return { value: value / (1000 * 1000), suffix: 'M' }
    }
  } else if (converter == 'percentage') {
    return { value: value * 100, suffix: '%' }
  } else if (converter == 'ch_qian') {
    // DO NOT DO i18n for below line
    return { value: value / 1000, suffix: '千' }
  } else if (converter == 'ch_wan') {
    // DO NOT DO i18n for below line
    return { value: value / 10000, suffix: '万' }
  } else if (converter == 'ch_baiwan') {
    // DO NOT DO i18n for below line
    return { value: value / 1000000, suffix: '百万' }
  } else if (converter == 'ch_qianwan') {
    // DO NOT DO i18n for below line
    return { value: value / 10000000, suffix: '千万' }
  } else if (converter == 'ch_yi') {
    // DO NOT DO i18n for below line
    return { value: value / (10000 * 10000), suffix: '亿' }
  } else if (converter == 'en_k') {
    return { value: value / 1000, suffix: 'K' }
  } else if (converter == 'en_m') {
    return { value: value / 1000000, suffix: 'M' }
  } else {
    return { value }
  }
}
//Hander decimal point by config
function formatDataNumberPoint(value, config) {
  const c = config._format_number_point
  if (c == undefined) {
    //not provided,do nothing
    return value.toString()
  }
  return value.toFixed(c)
}
function formatDataNumberThousandthMark(value, config) {
  const c = config._format_number_thousandth_mark
  if (!c) {
    return value
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
function formatDataNumberNegative(value, config) {
  const c = config._format_number_negative
  if (!c || c != 'bracketed') {
    return value
  }
  //
  if (value.startsWith('-')) {
    //
    return '(' + value.substring(1) + ')'
  } else {
    return value
  }
}
