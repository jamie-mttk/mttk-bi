import methodOpenPage from './util/methodOpenPage'
import { ElMessage } from 'element-plus'
//Create method manager
export default function methodManager(context: object) {
  //Dynamically call method
  function methodCall(event: object|string, ...args) {
    const methodName=(typeof event=='string')?event:event.method
    const method = findMethod(methodName)
    if (!method) {
      ElMessage.error('No method is foun by:' + methodName)
      return 
    }
    const argNames = buildArgNames(method.paras || [], ...args)
    // console.log(argNames)
    // console.log(args)
    //
    // argNames.push('c')
    // argValues.push(context)
    try {
      const func = new Function('c', ...argNames, method.code)
      return func(context, ...args)
    } catch (e) {

      ElMessage({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: 'Executing method '+methodName+' failed<br>' +e
      })
      //
      console.log(e)
      return undefined
    }
  }
  //Dynamically call script
  function scriptCall(event: object|string, ...args) {
    const code=(typeof event=='string')?event:event.code
    const argNames = buildArgNames([], ...args)
    // console.log(argsName)
    // console.log(args)
    try {
      return new Function('c', ...argNames, code)(context, ...args)
    } catch (e) {
      ElMessage({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: 'Executing script failed<br>' + e
      })
      console.log(e)
      return undefined
    }
  }
  function buildArgNames(argNames: string[], ...args) {
    const argsName = [] as string[]
    if (argNames && argNames.length > 0) {
      //User has provide para names,use it no matther how many arguments are really available
      argsName[0] = 'wrapperContext'
      //
      for (let i = 0; i < argNames.length; i++) {
        argsName[i + 1] = argNames[i].key || 'arg' + (i + 1)
      }
    } else {
      //
      for (let i = 0; i < args.length; i++) {
        if (i == 0) {
          argsName[i] = 'wrapperContext'
        } else {
          //i start from 1,so it is arg1,arg2,arg3
          argsName[i] = 'arg' + i
        }
      }
    }
    return argsName
  }
  //
  //Find method from code
  function findMethod(method: string) {
    for (const m of context.codeManager.getCode().methods || []) {
      if (m.key == method) {
        return m
      }
    }
    return undefined
  }
  function m(event: object|string, ...args) {
    return methodCall(event, ...args)
  }
  function s(event: object|string) {
    return scriptCall(event)
  }
  //
  function openPage(options: object) {
    methodOpenPage(context, options)
  }
  //
  return { methodCall, scriptCall, m, s, openPage }
}
