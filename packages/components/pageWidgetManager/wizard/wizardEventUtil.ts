
import { buildTreeData, treeCallback } from '@/utils/componentUtil'

export function buildSelectTreeData(sourceCode,componentRepository) {

  return buildTreeData(sourceCode, componentRepository, treeCallbackInternal)
}
 function treeCallbackInternal(type, info, componentRepository) {
    const node = treeCallback(type, info, componentRepository)
    if(type == 'component'){
      node.disabled=false
      //
      node.value=info.component.key
    }else{
      node.disabled=true
    }


    //
    return node
  }