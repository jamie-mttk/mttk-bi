export function radioTransform(config: any, options) {
  //
  if (!options) {
    return
  }
  //
  const valueOptions = options.value
  if (!valueOptions) {
    return
  }
  //hard code
  const mode='button';
  //
  if (Array.isArray(valueOptions)) {
    //build wrap array
    config['#'] = parseOptionsArray(options, valueOptions, mode)
  } else if (typeof valueOptions == 'function') {
    //If the function returns a Promise, we should await here
    config['#'] = parseOptionsFunction(options, valueOptions, mode)
  } else {
    throw 'Unsupported value option type:' + typeof valueOptions
  }
}
//parse options array to wrap options
function parseOptionsArray(options, value, mode) {
  const labelField = options.labelField || 'label'
  const valueField = options.valueField || 'value'
  //
  const result = [] as object[]
  //
  for (const v of value) {
    result.push({
      '~component': mode == 'standard' ? 'el-radio' : 'el-radio-button' ,
      label: v[valueField],
      '#': '' + v[labelField]
      
    })
  }
  //
  return result
}
//
function parseOptionsFunction(options, value, mode) {
  //Evaluate function
  return parseOptionsArray(options,  value(),mode)
}
