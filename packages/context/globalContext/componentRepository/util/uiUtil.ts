
//Utilities to create widget UI


//Create a input
//prop: form prop
//label:optional, if not provided, format prop
//other:optional, additional properties
export function createInput(prop: string, label?: string, other?: object) {
  other=smartAddClearable(other)
    return createBase('el-input',prop,label,other)
}
export function createInputNumber(prop: string, label?: string, other?: object) {
  // other=smartAddClearable(other)
  return createBase('el-input-number',prop,label,other)
}
export function createSwitch(prop: string, label?: string, other?: object) {
    return createBase('el-switch',prop,label,other)
  }
  export function createColorPicker(prop: string, label?: string, other?: object) {
    return createBase('el-color-picker',prop,label,other)
  }
  export function createIconPicker(prop: string, label?: string, other?: object) {
    return createBase('lc-icon-picker',prop,label,other)
  }
  export function createSelect(prop: string, options:Array<any>|string,label?: string, other?: object) {
    other=smartAddClearable(other)
    //
    const result= createBase('el-select',prop,label,other)
    if(options){
        result['~options']=options
    }
    result['clearable']=true
    return result
  }
export function createBase(component:any,prop: string, label?: string, other?: object){
    checkProp(prop)
    //
    const result = {
      '~component': component,
      '~prop': prop,
      '~label': label || formatLabel(prop),
    }

    //
    applyOther(result, other)
    //
    // console.log(JSON.stringify(result))
    //
    return result
}
//
//Internal functions


function checkProp(prop) {
  //
  if (!prop) {
    throw new Error('Parameter prop is mandatory')
  }
}
function smartAddClearable(other){
  if(!other){
    other={}
  }
  other.clearable=true
  return other
}
//
function formatLabel(prop: string) {
  //replace
  let str = prop.replace(/-/g, ' ')
  str=str.replace(/_/g, ' ')
  str=str.replace(/~/g, ' ')
  str=str.trim()
  //uppercase first character
  str = str.substring(0, 1).toUpperCase() + str.substring(1)

  //
  return str
}

//
function applyOther(result: object, other?: object) {
  if (!other) {
    return
  }

  //
  for (const k of Object.keys(other)) {
    result[k] = other[k]
  }
}
