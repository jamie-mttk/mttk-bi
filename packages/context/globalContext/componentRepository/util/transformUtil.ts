import { computed } from 'vue'
import lcPanel from '@/components/panel/index.vue'
//Utilities used in widget transform

//Build  a widget with first parameter
//widget can be a string(name) or imported component
//paras is the parameters of transform
export function buildWidget(widget,paras?, option?) {
  return buildWidgetBase(widget,paras,option)
}
//Return a function which is a buildWidget
export function buildWidgetFunc(widget, option?,callback?: Function) {
  return function (paras) {
    const result = buildWidget(widget,paras,option)
    if (callback) {
      const r=callback(result, paras)
      if(r){
        return r;
      }
    }
    //
    //  console.log('BUILD',widget, config, value,result)
    // console.log('22222',result)
    //
    return result
  }
}

//Has a default slot children
export function buildWidgetWithDefaultSlot(widget: any, paras, option?: object) {
  const result = buildWidgetBase(widget, paras, option)
  result['#'] = buildPanel(paras.config)
  return result
}
export function buildWidgetWithDefaultSlotFunc(widget: any, option?: object, callback?: Function) {
  return function (paras) {
    const result = buildWidgetWithDefaultSlot(widget, paras, option)
    if (callback) {
      const r=callback(result, paras)
      if(r){
        return r;
      }
    }
    //

    return result
  }
}

export function copyProp(config: object, result: object, option?: object) {
  if (!config) {
    return
  }
  for (const k of Object.keys(config)) {
    if (shouldSkip(k, option)) {
      continue
    }
    //
    result[k] = config[k]
  }
}

//Copy all properties without the one started with Under Line (_)
export function copyPropWithoutUL(config: object, result: object) {
  copyProp(config, result, { regExpSkip: '^_' })
}
//Copy all the keys started with _ to result AND REMOVE THE _
export function copyPropWithUL(config: object, result: object) {
  //
  for (const k of Object.keys(config)) {
    if (!k.startsWith('_')) {
      continue
    }
    result[k.substring(1)] = config[k]
  }
}

//Build a panel under parameter c
export function buildPanel(config,slotName:String='default') {

  if (!config) {
    return
  }
  if (!config._slot) {
    config._slot = {}
  }
  if (!config._slot[slotName]) {
    config._slot[slotName] = []
  }
  return {
    '~component': lcPanel,
    '~modelValue': computed({
      get() {
        return config._slot[slotName]
      },
      set(value) {
        config._slot[slotName] = value
      }
    })
  }
}

//
//Below are private functions
//

//options
//1. slotChildren: slot default is a lcPanel children -- REMOVED
//2. regExpSkip Use for copy properties, if not provided("" means it is provided!) the default value is "^_"
// Reg expression string, for example "^_|^hello$|^world$"
//First multiple expression can be combined with "|" which means or
//Second, ^_ means start with _
//Finally ,^hello$ mean should exactly match hello
//3. regExpAccept ,similar to regExpSkip this is the reg expression to match the keys to accept
function buildWidgetBase(widget,paras?, option?) {
  const result = {
    '~component': widget,
    '~modelValue': paras?.data
  }

  //Copy properties
  if (!option) {
    //Create empty option
    option = {}
  }
  if (option.regExpSkip == undefined) {
    //Defaultly the prop key start with _ or ~ is skpped
    option.regExpSkip = '^_|^~'
  }
  //
  copyProp(paras?.config||{}, result, option)

  //
  return result
}

//Whether the k should be skipped
//return true is should be skipped
function shouldSkip(k: string, option?: object) {
  if (!option) {
    return false
  }
  if (shouldReject(k, option)) {
    return true
  }
  //
  return !shouldAccept(k, option)
}
//return true if reject
function shouldReject(k: string, option?: object) {
  //regExpSkip
  const regExpSkip = option.regExpSkip
  if (!regExpSkip) {
    //not set, not skip
    return false
  }
  //
  const pattern = new RegExp(regExpSkip)
  return pattern.test(k)
}
//return true if accept
function shouldAccept(k: string, option?: object) {
  //regExpAccept
  const regExpAccept = option.regExpAccept
  if (!regExpAccept) {
    //not set, accept all
    return true
  }
  //
  const pattern = new RegExp(regExpAccept)
  return pattern.test(k)
}

// function mergetOption(rawOption?: object, toMerge?: object) {
//   if (rawOption == undefined) {
//     //toMerge maybe undefined
//     return toMerge
//   } else {
//     if (toMerge == undefined) {
//       return rawOption
//     } else {
//       for (const k of Object.keys(toMerge)) {
//         rawOption[k] = toMerge[k]
//       }
//       //
//       return rawOption
//     }
//   }
// }
