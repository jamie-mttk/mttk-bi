

const functions = {}
export default function useFunctionRepository(globalContext) {
  //
  function regist(key: string, func: Function) {
    functions[key] = func
  }
  //
  function registBatch(funcs:object){
    for(const k of Object.keys(funcs)){
      regist(k,funcs[k])
    }
  }
  function get(key: string) {
    return functions[key]
  }
  function list() {
    return Object.keys(functions)
  }


  //
  return { regist,registBatch, get, list }
}
