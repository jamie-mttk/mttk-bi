import { ref, watch, nextTick } from 'vue'
import {deepCopy} from '@/utils/tools'
export default function codeManager() {
  const code = ref({})
  //
  const dirty = ref(false)
  //
  watch(
    code,
    (codeNew, codeOld) => {
      if (codeOld['_id']) {
        //Chagne to dirty only the previous code is not empty
        // console.log('=============')
        // console.log(JSON.stringify(codeOld))
        // console.log(JSON.stringify(codeNew))
        //
        dirty.value = true
      }
    },
    { deep: true, }
  )
  //
  function getCode() {
    return code.value
  }
  //
  function setCode(codeNew: object) {
    // throw new Error('TEST')
    code.value = codeNew
    //wait watch to to called
    nextTick(() => {
      
      dirty.value = false
    })
  }
  //Create a new component key
  function createComponentKey(type: string) {
    let componentIndex = code.value.componentIndex || 0
    componentIndex++
    code.value.componentIndex = componentIndex
    //
    return type + '_' + componentIndex
  }
  //Delete component by key
  //Return the deleted component,return undefined if not deleted
  function delComponent(key: string) {
    return deleteController(key, getCode().ui)
  }

  function duplicateComponent(key: string) {
    return duplicateController(key, getCode().ui)
  }

  //type inner/before/after,refer to tree component
  function moveComponent(keyFrom: string, keyTo: String, type: string) {
    const component = delComponent(keyFrom)
    if (!component) {
      return false
    }
    //
    if (type == 'inner') {
      if ('_ROOT' == keyTo) {
        getCode().ui.push(component)
        return true
      }
      //Inner means put node in the children of node  KeyTo
      const parent = findMoveInner(keyTo)
      if (!parent) {
        return false
      }
      //
      if (parent.type == '_container') {
        if (!parent.config.props['_children']) {
          parent.config.props['_children'] = []
        }
        parent.config.props['_children'].push(component)
      } else {
        if (!parent['_children']) {
          parent['_children'] = []
        }
        parent['_children'].push(component)
      }
      //
      return true
    } else {
      const moveInfo = findMove(keyTo)
      //console.log(moveInfo)
      if (!moveInfo) {
        return false
      }
      let index = moveInfo[1]
      if (type == 'before') {
        //No need to reduce index...
        //index--
      } else {
        index++
      }
      const parent = moveInfo[0]
      if (parent) {
        if (parent.type == '_container') {
          if (!parent.config.props['_children']) {
            parent.config.props['_children'] = []
          }
          parent.config.props['_children'].splice(index, 0, component)
        } else {
          if (!parent['_children']) {
            parent['_children'] = []
          }
          parent['_children'].splice(index, 0, component)
        }
      } else {
        //It is ROOT
        getCode().ui.splice(index, 0, component)
      }
      //
      return true
    }
  }
  //
  //private functions
  //
  //Try to delete from this controller list or childrens
  //return true if delete successfully
  function deleteController(key: string, controllers: array) {
    if (!controllers) {
      return undefined
    }
    for (let i = 0; i < controllers.length; i++) {
      const controller = controllers[i]
      if (controller.key == key) {
        return controllers.splice(i, 1)[0]
      }
      //check _container _children level
      if (controller.config?.props && controller.config.props['_container']) {
        for (const cc of controller.config.props['_container']) {
          if (cc['_children']) {
            const deleted = deleteController(key, cc['_children'])
            if (deleted) {
              return deleted
            }
          }
        }
      }
      //check _children level
      if (controller.config?.props && controller.config.props['_children']) {
        const deleted = deleteController(key, controller.config.props['_children'])
        if (deleted) {
          return deleted
        }
      }
    }
    //
    return undefined
  }

  //try to duplicate controller
  //key is the controller key to duplciate,controllers is the controllers to match the key
  //if controller has children, try to duplicated in the children
  function duplicateController(key: string, controllers: Array) {
    if (!controllers) {
      return undefined
    }
    for (let i = 0; i < controllers.length; i++) {
      const controller = controllers[i]
      if (controller.key == key) {
       //
       const controllerNew=deepCopy(controller)
       controllerNew.key=createComponentKey(controllerNew.type)
       controllers.splice(i, 0,controllerNew);
       return controllerNew
      }
      //check _container _children level
      if (controller.config?.props && controller.config.props['_container']) {
        for (const cc of controller.config.props['_container']) {
          if (cc['_children']) {
            const duplicated = duplicateController(key, cc['_children'])
            if (duplicated) {
              return duplicated
            }
          }
        }
      }
      //check _children level
      if (controller.config?.props && controller.config.props['_children']) {
        const duplicated = duplicateController(key, controller.config.props['_children'])
        if (duplicated) {
          return duplicated
        }
      }
    }
    //
    return undefined
  }
  //Find component where the inner move to drop to
  function findMoveInner(key: string) {
    return findMoveInnerInternal(key, getCode().ui)
  }
  function findMoveInnerInternal(key: string, controllers: array) {
    if (!controllers) {
      return undefined
    }
    for (const controller of controllers) {
      //Please note,it is not allow to drop under component directly,so do NOT need to check the key of controller
      //check _container _children level
      if (controller.config?.props && controller.config.props['_container']) {
        for (const cc of controller.config.props['_container']) {
          if (cc.key == key) {
            //Here,we need to check whether _container is matched since it can be a drop inner target
            return cc
          }
          if (cc['_children']) {
            const found = findMoveInnerInternal(key, cc['_children'])
            if (found) {
              return found
            }
          }
        }
      }
      //check _children level
      if (controller.config?.props && controller.config.props['_children']) {
        if (controller.key == key) {
          //Need to check here since simple container can be inner drop target
          return controller
        }
        const found = findMoveInnerInternal(key, controller.config.props['_children'])
        if (found) {
          return found
        }
      }
    }
    //
    return undefined
  }

  //
  function findMove(key: string) {
    return findMoveInternal(key, getCode().ui, undefined)
  }

  //before/after move,return an array,the first one is parent node(return undefined if it is root),the second one is the index of the target key
  function findMoveInternal(key: string, controllers: array, parent) {
    if (!controllers) {
      return undefined
    }
    for (let i = 0; i < controllers.length; i++) {
      const controller = controllers[i]
      if (controller.key == key) {
        return [parent, i]
      }
      //check _container _children level
      if (controller.config?.props && controller.config.props['_container']) {
        for (const cc of controller.config.props['_container']) {
          if (cc['_children']) {
            const found = findMoveInternal(key, cc['_children'], cc)
            if (found) {
              return found
            }
          }
        }
      }
      //check _children level
      if (controller.config?.props && controller.config.props['_children']) {
        const found = findMoveInternal(key, controller.config.props['_children'], controller)
        if (found) {
          return found
        }
      }
    }
    //
    return undefined
  }
  //
  return { setCode, getCode, createComponentKey, delComponent, moveComponent,duplicateComponent, dirty }
}
