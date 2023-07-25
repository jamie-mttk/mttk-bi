import { ElMessage } from 'element-plus'
export function findCompontByKey(key: string, sourceCode: Object) {
  return findCompontByKeyInternal(key, sourceCode.ui || [])
}
export function findCompontByKeyWithError(key: string, sourceCode: Object) {
  const found = findCompontByKey(key, sourceCode)
  if (!found) {
    ElMessage.error('No component is found by key:' + key)
    
    //console.log(JSON.stringify(sourceCode))
    return
  }
  //
  return found
}

export function findDataByKey(key:string, sourceCode: Object){

    return findDataByKeyInternal(key,sourceCode.data||[])
}

export function findDataByKeyWithError(key:string, sourceCode: Object){

    const found= findDataByKey(key,sourceCode)
    if (!found) {
        ElMessage.error('No data is found by key:' + key)
        return
      }
      //
      return found
}






//******************************* 
//* Internal functions
//******************************* 
function findCompontByKeyInternal(key: string, controllers: Array) {

  if (!controllers) {
    return undefined
  }
  for (let i = 0; i < controllers.length; i++) {
    const controller = controllers[i]
    if (controller.key == key) {
      return controller
    }
    //check _container _children level
    if (controller.config?.props && controller.config.props['_container']) {
      for (const cc of controller.config.props['_container']) {
        if (cc['_children']) {
          const found = findCompontByKeyInternal(key, cc['_children'])
          if (found) {
            return found
          }
        }
      }
    }
    //check _children level
    if (controller.config?.props && controller.config.props['_children']) {
      const found = findCompontByKeyInternal(key, controller.config.props['_children'])
      if (found) {
        return found
      }
    }
  }
  //
  return undefined
}

function findDataByKeyInternal(key: string, dataList: Array) {

    for (const d of dataList) {
      if (key == d.key) {
        return d
      }
    }
    return undefined
  }
  
