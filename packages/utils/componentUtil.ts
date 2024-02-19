import { createUniqueString } from '@/utils/tools'
//Build component tree
//callback is a function which will be callback once a tree node is found
//It has two parameters:First is type,second one is a json, the content depends on the value of first parameter
//   Type           Description                         Second parameter
//  - root          Root of the page                    Root source code
//  - component     A simple or complex component       Key component is the component source code
//  - container     For example a tab page              component：the component of the container;container: this container source code:sequence of the slot
//  - slot    For example the slot inside a tab page  component：the component of the slot;key:slot key;index
export function buildTreeData(code, componentRepository, callback?) {
  if (callback == undefined) {
    callback = treeCallback
  }
  //
  return buildTreeNodeList(code.ui || [])

  //build tree nodes from array
  //retur [] if components is not an array
  function buildTreeNodeList(components) {
    //
    if (!Array.isArray(components) || components.length <= 0) {
      return []
    }
    const nodes = []
    //Create node for each component
    for (const v of components) {
      //Here we found a normal component or root
      const node = callback(
        v.type == '_container' ? 'root' : 'component',
        { component: v },
        componentRepository
      )
      if (!node) {
        continue
      }
      //
      nodes.push(node)
      //check slot, the possible component of this case is el-card
      if (v.config?.basic?._slot && Object.keys(v.config?.basic?._slot).length > 0) {
        mergetChildren(node, buildSlotNode(v.config.basic._slot, v))
        // node.children = buildSlotNode(v.config.basic._slot, v)
      }
      //Here to check slot under _container, the possible component of this case is layout or tabs/collapse
      if (v.config?.basic?._container && v.config?.basic?._container.length > 0) {
        //
        if (!node.children) {
          node.children = []
        }
        for (let i = 0; i < v.config.basic._container.length; i++) {
          const c = v.config.basic._container[i]
          if (!c._slot) {
            //If no slot,just return;for example ,it is a normal form item or table column
            continue
          }
          if (!c.key) {
            //Without key moving on tree will NOT work
            c.key = createUniqueString()
          }

          //Here we found container,
          const nd = callback('container', { component: v, container: c, index: i })

          if (nd) {
            mergetChildren(nd, buildSlotNode(c._slot, c))
            // nd.children= buildSlotNode(c._slot, c)
            node.children.push(nd)
          }
        }
      }
    }
    //
    return nodes
  }
  //
  function buildSlotNode(slot, v) {
    //
    const children = []
    if (!slot) {
      return children
    }
    //
    const keysCount = Object.keys(slot).length
    //
    for (const k of Object.keys(slot)) {
      const childNodes = buildTreeNodeList(slot[k])
      //This is the node of slot
      if (keysCount > 1) {
        const node = callback('slot', { component: v, key: k })
        if (node) {
          mergetChildren(node, childNodes)
          // node.children=childNodes
          children.push(node)
        }
      } else {
        //If there is only one slot, the components are linked under parent directly
        return childNodes
      }
    }
    //
    return children
  }
}
//add children to node.children,try to merge if node.children is alreay existed
function mergetChildren(node, children = []) {
  if (node.children && Array.isArray(node.children) && node.children.length > 0) {
    //that means node.children is not empty
    for (const child of children) {
      node.children.push(child)
    }
  } else {
    node.children = children
  }
}
//Default tree callback to build tree node
export function treeCallback(type, info, componentRepository?) {
  if (type == 'root') {
    return {
      label: 'ROOT',
      icon: 'mdiFileTreeOutline',
      key: info.component?.key,
      data: info.component,
      nodeType: 'root'
    }
  } else if (type == 'component') {
    return {
      label:
        info.component.config?.basic?.label ||
        info.component.config?.basic?.name ||
        info.component.key,
      icon: findComponentIcon(componentRepository, info.component.type),
      key: info.component.key,
      data: info.component,
      nodeType: 'component'
    }
  } else if (type == 'container') {
    return {
      key: info.container.key,
      label: info.container.label || info.container.name || info.index,
      icon: 'mdiTextBoxOutline',
      data: info.component,
      nodeType: 'container'
    }
  } else if (type == 'slot') {
    return {
      label: info.key,
      icon: 'mdiOrderBoolAscendingVariant',
      key: info.component.key + '.' + info.key,
      data: info.component,
      nodeType: 'slot'
    }
  } else {
    //Do nothing,will not come here
    console.log(arguments)
  }
}
//
export function findComponentIcon(componentRepository, type: string) {
  const component = componentRepository.componentByKey(type)
  return component?.icon || 'mdiHelpBoxMultipleOutline'
}

//
//Navigate through all the components used to find/delete or move component
//
export function buildHandleController(callback) {
  return function handleController(para, controllers) {
    //
    if (!controllers) {
      return undefined
    }
    for (let i = 0; i < controllers.length; i++) {
      const controller = controllers[i]
      const done1 = callback({ index: i, controller, controllers, para, position: 'component' })
      if (done1) {
        //done
        return done1
      }
      //
      const done2 = handleUnderSlot(
        buildHandleController(callback),
        para,
        controller.config?.basic?._slot
      )
      if (done2) {
        return done2
      }
      //check container
      if (controller.config?.basic?._container && controller.config.basic._container.length > 0) {
        for (let i = 0; i < controller.config.basic._container.length; i++) {
          const cc = controller.config.basic._container[i]
          const done3 = callback({
            index: i,
            controller: cc,
            controllers: controller.config.basic._container,
            para,
            position: 'container'
          })
          if (done3) {
            //done
            return done3
          }
          const done4 = handleUnderSlot(buildHandleController(callback), para, cc._slot)
          if (done4) {
            return done4
          }
        }
      }
    }
    //
    return undefined
  }
}

//Handle all slot under slot with callback and para
function handleUnderSlot(callback, para, slot) {
  if (!slot) {
    return undefined
  }
  //
  for (const k of Object.keys(slot)) {
    const v = slot[k]
    const done = callback(para, v)
    if (done) {
      return done
    }
  }
  //not delete
  return undefined
}
