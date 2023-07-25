import { computed } from 'vue'
import lcPanel from '@/components/panel/index.vue'
//Utilities used in widget transform

//Build  a widget with given widget
//widget can be a string(name) or imported component
//value will be set to modelValue
export function buildWidget(widget: any, config: any, value?: any) {
  return buildWidgetBase(widget, config, value)
}
//Return a function which is a buildWidget
export function buildWidgetFunc(widget: any,callback?:Function) {
  return function (config: any, value?: any,context?:object, wrapperContext?:object) {
    const result=buildWidget(widget, config, value)
    if(callback){
      callback(result,config,value,context,wrapperContext)
    }
    return result
  }
}
export function buildWidgetWithSlotChildren(
  widget: any,
  config: any,
  value?: any,
  option?: object
) {
  return buildWidgetBase(widget, config, value, mergetOption({ slotChildren: true }, option))
}
export function buildWidgetWithSlotChildrenFunc(widget: any,option?:object,callback?:Function) {
  return function (config: any, value?: any,context?:object, wrapperContext?:object) {
    const result=buildWidgetBase(widget, config, value, mergetOption({ slotChildren: true }, option))
    if(callback){
      callback(result,config,value,context,wrapperContext)
    }
    return result
  }
}


export function copyProp(config: object, result: object, option?: object) {
  for (const k of Object.keys(config)) {
    if (shouldSkip(k, option)) {
      continue
    }
    //
    result.props[k] = config[k]
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
    result.props[k.substring(1)] = config[k]
  }
}

export function buildPanel(c) {
  const panel = {
    sys: {
      component: lcPanel,
      modelValue: computed({
        get() {
          return c['_children'] || []
        },
        set(value) {
          c['_children'] = value
        }
      })
    }
    // props: {},
    // events: {
    //   // click: function () {
    //   //   console.log('TEST TO SHOW')
    //   //   console.log(arguments)
    //   //   //arguments[0].emit('click',...arguments)
    //   // }
    // }
  }
  //
  return panel
}

//
//Below are private functions
//

//options
//1. slotChildren: slot default is a lcPanel children
//2. regExpSkip Use for copy properties, if not provided("" means it is provided!) the default value is "^_"
// Reg expression string, for example "^_|^hello$|^world$"
//First multiple expression can be combined with "|" which means or
//Second, ^_ means start with _
//Finally ,^hello$ mean should exactly match hello
//3. regExpAccept ,similar to regExpSkip this is the reg expression to match the keys to accept
function buildWidgetBase(widget: any, config: any, value?: any, option?: any) {
  const result = {
    sys: {
      component: widget,
      modelValue: value
    },
    props: {},
    slots: {}
  }
  //Slot children
  if (option && option.slotChildren) {
    const slotChildrenName = option.slotChildrenName || 'default'
    result.slots[slotChildrenName] = {
      sys: {
        component: lcPanel,
        modelValue: computed({
          get() {
            return config['_children'] || []
          },
          set(valueNew) {
            config['_children'] = valueNew
          }
        })
      }
    }
  }
  //Copy properties
  if (!option) {
    //Create empty option
    option = {}
  }
  if (option.regExpSkip == undefined) {
    //Defaultly the prop key start with _ is skpped
    option.regExpSkip = '^_|^~'
  }
  //
  copyProp(config, result, option)
  //

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

function mergetOption(rawOption?: object, toMerge?: object) {
  if (rawOption == undefined) {
    //toMerge maybe undefined
    return toMerge
  } else {
    if (toMerge == undefined) {
      return rawOption
    } else {
      for (const k of Object.keys(toMerge)) {
        rawOption[k] = toMerge[k]
      }
      //
      return rawOption
    }
  }
}
