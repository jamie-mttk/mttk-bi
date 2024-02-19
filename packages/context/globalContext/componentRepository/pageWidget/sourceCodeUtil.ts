import { ElMessage } from 'element-plus'

import { buildHandleController } from '@/utils/componentUtil'

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

export function findDataByKey(key: string, sourceCode: Object) {
  return findDataByKeyInternal(key, sourceCode.data || [])
}

export function findDataByKeyWithError(key: string, sourceCode: Object) {
  const found = findDataByKey(key, sourceCode)
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
function findCompontByKeyInternal(key: string, controllers) {
  return buildHandleController(({ controller, index, controllers }) => {
    if (controller.key == key) {
      return controller
    }
  })({ key }, controllers)
}

function findDataByKeyInternal(key: string, dataList) {
  for (const d of dataList) {
    if (key == d.key) {
      return d
    }
  }
  return undefined
}
