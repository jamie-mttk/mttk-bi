import { deepCopy } from '@/utils/tools'
import {computed} from 'vue'
import {buildHandleController} from '@/utils/componentUtil'
export default function componentManager(context: object) {
  //Create a new component key
  function createKey(type: string) {
    let componentIndex = context.codeManager.getCode().componentIndex || 0
    componentIndex++
    context.codeManager.getCode().componentIndex = componentIndex
    //
    return type + '_' + componentIndex
  }
  //Delete component by key
  //Return the deleted component,return undefined if not deleted
  function del(key: string) {
    return deleteController(key, context.codeManager.getCode().ui)
  }

  function duplicate(key: string) {
    return duplicateController(key, context.codeManager.getCode().ui)
  }
  function find(key: string) {
    return findController(key, context.codeManager.getCode().ui)
  }
  //type inner/before/after,refer to tree component
  function move(keyFrom: string, keyTo: String, type: string) {
    //
      // console.log(keyFrom, keyTo, type)
    //
    const component = find(keyFrom)

    if (!component) {
      return false
    }
    //Should delete first,otherwise after moving there are two components with same key; del will delete the FIRST one which does not make sense
    del(keyFrom)
    //
    if (!moveFirst(keyTo, type, component)) {
      return false
    }
    //
    return component
  }
  const renderMode=computed({
    get: () => context.codeManager.getCode().renderMode||'flex',
    set: (newRenderMode) => {
      context.codeManager.getCode().renderMode=newRenderMode
    }
  })

  
    function navigate(para,callback) {
      return buildHandleController(callback)(para, context.codeManager.getCode().ui)
    }
  //
  //private functions
  //
  //Move to target first
  function moveFirst(keyTo: String, type: string, component) {
    //
    if (type == 'inner') {
      if ('_root' == keyTo) {
        context.codeManager.getCode().ui[0].config.basic._slot.default.push(component)
        return true
      }
      //
      return addControllerBelow(keyTo, component, context.codeManager.getCode().ui)
    } else {
      return appendController(keyTo, type, component, context.codeManager.getCode().ui)
    }
  }
  //
  function appendController(key, type, component, controllers) {
    return buildHandleController(({ controller, index, controllers }) => {
      if (controller.key == key) {
        //found
        //Index to append
        const indexToAppend = type == 'before' ? index : index + 1
        controllers.splice(indexToAppend, 0, component)

        //
        return true
      }
    })({ key, type, component }, controllers)
  }
  //Add component to component or part of component of keyTo
  function addControllerBelow(keyTo, component, controllers) {
    const spited = keyTo.split('.')
    const keyAndSlot = spited.length == 1 ? [keyTo, 'default'] : spited

    //
    return buildHandleController(({ controller, position }) => {
      if (keyAndSlot[0] == controller.key) {
        if ((position == 'component')) {
          if (!controller.config) {
            controller.config = {}
          }
          if (!controller.config.basic) {
            controller.config.basic = {}
          }
          if (!controller.config.basic._slot) {
            controller.config.basic._slot = {}
          }
          if (!controller.config.basic._slot[keyAndSlot[1]]) {
            controller.config.basic._slot[keyAndSlot[1]] = []
          }
          //
          controller.config.basic._slot[keyAndSlot[1]].push(component)
          //
          return true
        } else if (position == 'container') {
          //
          if (!controller._slot) {
            controller._slot = {}
          }
          if (!controller._slot[keyAndSlot[1]]) {
            controller._slot[keyAndSlot[1]] = []
          }
          //
          controller._slot[keyAndSlot[1]].push(component)
          //
          return true
        } else {
          return false
        }
      }
    })({ keyAndSlot, component }, controllers)
  }

  //Try to delete from this controller list or childrens
  //return true if delete successfully
  function deleteController(key, controllers) {
    return buildHandleController(({ controller, index, controllers }) => {
      if (controller.key == key) {
        return controllers.splice(index, 1)[0]
      }
    })({ key }, controllers)
  }
  function duplicateController(key: string, controllers) {
    return buildHandleController(({ controller, index, controllers }) => {
      if (controller.key == key) {
        //
        const controllerNew = deepCopy(controller)
        controllerNew.key = createKey(controllerNew.type)
        controllers.splice(index, 0, controllerNew)
        return controllerNew
      }
    })({ key }, controllers)
  }
  function findController(key: string, controllers) {
    return buildHandleController(({ controller, index, controllers }) => {
      if (controller.key == key) {
        return controller
      }
    })({ key }, controllers)
  }
  
  //
  //
  return {
    createKey,
    del,
    move,
    duplicate,
    find,
    navigate,
    renderMode
  }
}
