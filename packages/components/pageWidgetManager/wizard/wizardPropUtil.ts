import { buildTreeData, treeCallback } from '@/utils/componentUtil'

export function buildTreeDataInternal(sourceCode, componentRepository) {
  return buildTreeData(sourceCode, componentRepository, treeCallbackInternal)

  function treeCallbackInternal(type, info, componentRepository) {
    const node = treeCallback(type, info, componentRepository)
    if (type == 'component') {   
      node.children = buildComponentProps(info.component.type, info.component)

    }
    //
    return node
  }

  function buildComponentProps(type, v) {
    const props = []
    //
    const comp = componentRepository.componentByKey(type)
    if (!comp || !comp.editor?.basic?.ui) {
      return props
    }
    let ui = comp.editor.basic.ui
    if (typeof ui == 'function') {
      ui = ui(v.config?.basic || {})
    }

    //
    if (!Array.isArray(ui) || ui.length == 0) {
      return props
    }
    //
    for (const e of ui) {
      props.push({
        label: e['~label'],
        icon:'mdiFocusFieldHorizontal',
        key: '___prop:' + v.key + ':' + e['~prop'],
        data: { type: 'prop', ui: v.key, prop: e['~prop'] }
      })
    }

    //
    return props
  }
}
