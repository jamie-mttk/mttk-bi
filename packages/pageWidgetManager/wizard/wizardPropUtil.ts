
export function buildTreeData(sourceCode,repositoryManager) {
	return buildTreeNodes(sourceCode.ui,repositoryManager)
}
function buildTreeNodes(vv,repositoryManager) {
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

      if(!node.children){
      node.children = []
    }

      //
      for (const c of v.config.props['_container']) {
        //Please note the data is set to v,so once tree node clicked the layout/tabs will be choosed
        const container = { label: c.label || c.span || '##',  key: c.key, icon: 'Folder',nodeType:'container' }
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
        const children = buildTreeNodes(v.config.props['_children'],repositoryManager);
        for(const child of children||[]){
          node.children.push(child)
        }
      
    }
  }
  //
  return nodes;

}

//Build tree node,return undefined if it can not be built
function buildTreeNode(v,repositoryManager) {
  if (!v.key) {
    return undefined;
  }
  //
  const node= { label: v.config?.props?.label || v.key, icon: findComponentIcon(v.type,repositoryManager), key: v.key, nodeType: v.type == '_container' ? 'panel' : 'component' }

  //
  if(v.type){
	//This is a component,find the first level properties
	node.children=buildComponentProps(v.type,v,repositoryManager)
  }
  //
  return node
}
function buildComponentProps(type,v,repositoryManager){
	const props=[]
	//
	const comp=repositoryManager.componentByKey(type)
	if(!comp||!comp.editor){
		return props
	}
	let editor=comp.editor
	if(typeof editor=='function'){
		editor=editor(v.config?.props||{})
	}


	//
	if(!Array.isArray(editor)||editor.length==0){
		return props
	}
	//
	for(const e of editor){

		props.push({label:e['~label'],key:'___prop:'+v.key+':'+e['~prop'],data:{type:'prop',ui:v.key,prop:e['~prop']}})
	}

	//
	return props; 
}

//
function findComponentIcon(type: string,repositoryManager) {  
  const component = repositoryManager.componentByKey(type)
  return component?.icon || 'Handbag'
}