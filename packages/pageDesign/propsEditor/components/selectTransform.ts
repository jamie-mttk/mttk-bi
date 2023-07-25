import { isRef, computed } from 'vue'
export function selectTransform(config: any, itemConfig, pageContext?: object) {
  // console.log(config)
  //Automatically add filterable to true is allow-create is set
  if(config['allow-create']){
    config['filterable']=true
  }
//
  let options=itemConfig['~options']
  if (isRef(options)) {
    options = options.value
  }

  //
  if (!options) {
    return
  }
  //
  if (Array.isArray(options)) {
    //build wrap array
    config['#'] = parseOptionsArray(options)

  } else if (typeof options == 'function') {
    //If the function returns a Promise, we should await here
    config['#'] = parseOptionsFunction(options)
  } else if (typeof options == 'string') {

    if (options == '#method') {
      config['#'] =  methodOptions(pageContext).value
    } else if (options == '#data') {
      config['#'] =  dataOptions(pageContext).value
    } else if (options == '#computed') {
      config['#'] =  computedOptions(pageContext).value
    } else if (options == '#api') {
      config['#'] =  apiOptions(pageContext).value
    } else {
      throw 'If options is string,it should be some special values,now it is' + options
    }
  } else {
    throw 'Unsupported value options type:' + typeof options
  }
}
//parse options array to wrap options
function parseOptionsArray(options) {
  if (!Array.isArray(options)) {
    return
  }
  //
  const result = [] as object[]
  //
  for (const o of options) {
    if (typeof o == 'string') {
      //
      const vv = parseOptionString(o)
      result.push({
        sys: { component: 'el-option' },
        props: {
          label: vv[1],
          value: vv[0]
        }
      })
    } else if (typeof o == 'object') {
      result.push({
        sys: { component: 'el-option' },
        props: {
          label: o.label,
          value: o.value
        }
      })
    } else {
      throw 'Unsupported value option type:' + typeof o
    }
  }
  //
  return result
}
//
function parseOptionsFunction(options) {
  //Evaluate function
  return parseOptionsArray(options())
}

function parseOptionString(o: string) {
  const index = o.indexOf(':')
  if (index < 0) {
    //no :,label=value
    return [o, o]
  } else {
    return [o.substring(0, index), o.substring(index + 1)]
  }
}
//
function dataOptions(context) {
  //all data list
  return  computed(() =>
    context.codeManager.getCode().data.map((item: Object) => {return {
      sys: { component: 'el-option' },
      props: { value: item.key, label: item.description }
    }})
  )
}
//
function computedOptions(context) {
  //all data list
  return  computed(() =>
    context.codeManager.getCode().computed.map((item: Object) => {return {
      sys: { component: 'el-option' },
      props: { value: item.key, label: item.description }
    }})
  )
}
//
function apiOptions(context) {
  //all data list
  return  computed(() =>
    context.codeManager.getCode().apis.map((item: Object) => {return {
      sys: { component: 'el-option' },
      props: { value: item.key, label: item.description }
    }})
  )
}
//
function methodOptions(context) {
  //all data list
  return  computed(() =>
    context.codeManager.getCode().methods.map((item: Object) => {return {
      sys: { component: 'el-option' },
      props: { value: item.key, label: item.description }
    }})
  )
}
// //Computed list
// const computedList = computed(() =>
//   context.codeManager.getCode().computed.map((item: Object) => {
//     return { value: item.key, label: item.description }
//   })
// )
// //API list
// const apiList = computed(() =>
//   context.codeManager.getCode().apis.map((item: Object) => {
//     return { value: item.key, label: item.description }
//   })
// )
// //Method list
// const methodList = computed(() =>
//   context.codeManager.getCode().methods.map((item: Object) => {
//     return { value: item.key, label: item.description }
//   })
// )
