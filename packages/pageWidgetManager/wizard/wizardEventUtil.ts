
export function buildSelectTreeData(sourceCode,repositoryManager) {
	return buildTreeNodes(sourceCode.ui,repositoryManager)
}
function buildTreeNodes(vv,repositoryManager) {
  console.log(vv)
	//
	if (!Array.isArray(vv) || vv.length <= 0) {
		return undefined;
	}
	//
	const nodes = []
	//
	for (const v of vv) {
    const node = buildTreeNode(v,repositoryManager)
    if (!node) {
      continue;
    }
    //
    nodes.push(node)
    //check _container- _children  level
    if (v.config?.props && v.config.props['_container']
      && Array.isArray(v.config.props['_container']) && v.config.props['_container'].length > 0) {
      //
      node.children = []
      //
      for (const c of v.config.props['_container']) {
        //Please note the data is set to v,so once tree node clicked the layout/tabs will be choosed
        const container = { label: c.label || c.span || '##',  value: c.key, icon: 'Folder',disabled: true, }
        node.children.push(container)
        //
        const children = buildTreeNodes(c['_children'],repositoryManager);
        if (children) {
          container.children = children
        }
      }
    }
    //Check _children level (No _container level)
    if (v.config?.props && v.config.props['_children']
      && Array.isArray(v.config.props['_children']) && v.config.props['_children'].length > 0) {
      node.children = buildTreeNodes(v.config.props['_children'],repositoryManager);
    }
  }
  //
  // console.log(nodes)
  //
  return nodes;

}

//Build tree node,return undefined if it can not be built
function buildTreeNode(v,repositoryManager) {
  if (!v.key) {
    return undefined;
  }
  //
  const node= { label: v.config?.props?.label || v.key, icon: findComponentIcon(v.type,repositoryManager), value: v.key,disabled: v.type == '_container'}

  //
  return node
}


//
function findComponentIcon(type: string,repositoryManager) {  
  const component = repositoryManager.componentByKey(type)
  return component?.icon || 'Handbag'
}