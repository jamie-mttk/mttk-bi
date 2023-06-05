export function radioTransform(config: any, options) {
  //
  if (!options) {
    return
  }

  //
  if (!config.slots) {
    config.slots = {}
  }
  //
  let valueOptions = options.value
  if (!valueOptions) {
    return
  }
  //hard code
  const mode='button';
  //
  if (Array.isArray(valueOptions)) {
    //build wrap array
    config['#']['#'] = parseOptionsArray(options, valueOptions, mode)
  } else if (typeof valueOptions == 'function') {
    //If the function returns a Promise, we should await here
    config['#']['#'] = parseOptionsFunction(options, valueOptions, mode)
  } else {
    throw 'Unsupported value option type:' + typeof valueOptions
  }
}
//parse options array to wrap options
function parseOptionsArray(options, value, mode) {
  let labelField = options.labelField || 'id'
  let valueField = options.valueField || 'name'
  //
  let result = []
  //
  for (let v of value) {
    result.push({
      sys: { component: mode == 'standard' ? 'el-radio' : 'el-radio-button' },
      props: {
        label: v[valueField]
      },
      slots: {
        default: '' + v[labelField]
      }
    })
  }
  //
  return result
}
//
function parseOptionsFunction(options, value, mode) {
  //Evaluate function
  return parseOptionsArray(options, result, value())
}
