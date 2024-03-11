//Find entity index from model by key
export function findEntityIndex(model, key) {
  if (!key) {
    return -1
  }
  for (let i=0;i<model.entities.length;i++) {
    const entity=model.entities[i]
    if (entity.key == key) {
      return i
    }
  }
  //
  return -1
}

//Find entity from model by key
export function findEntity(model, key) {
  const index = findEntityIndex(model,key)
  if (index >= 0) {
    return model.entities[index]
  } else {
    return undefined
  }
}
//Find relation index by source and target (Entity key)
export function findRelationIndex(model, source, target) {
  for (let i = 0; i < model.relations.length; i++) {
    const relation = model.relations[i]
    if (relation.source == source && relation.target == target) {
      return i
    }
  }
  //
  return -1
}
//Find column index of the given entity key
export function findColumnIndex(model, entity) {
  for (let i = 0; i < model.columns.length; i++) {
    const column = model.columns[i]
    if (column.entity==entity) {
      return i
    }
  }
  //
  return -1
}
//Find column index of the given entity key
export function findColumnIndexByKey(model, columnKey) {
  for (let i = 0; i < model.columns.length; i++) {
    const column = model.columns[i]
    if (column.key==columnKey) {
      return i
    }
  }
  //
  return -1
}
export function findColumnByKey(model, columnKey) {
  const index = findColumnIndexByKey(model,columnKey)
  if (index >= 0) {
    return model.columns[index]
  } else {
    return undefined
  }
}
//Find relation by source and target (Entity key)
export function findRelation(model, source, target) {
  const index = findRelationIndex(model, source, target)
  if (index >= 0) {
    return model.relations[index]
  } else {
    return undefined
  }
}
//Return a promise
export function loadEntityColumnsPromise(request, model, entity) {
  return request({
    method: 'POST',
    url: 'dataModel/loadEntityFields',
    params: { model },
    data: entity
  })
}
//Load all the columns of the given entity
//request - axios request
//model   - model id
//entity  - entity JSON
//data    - it is a VUE ref used to return loaded data
export function loadEntityColumns(request, model, entity, data) {
  if (!entity) {
    data.value = []
    return
  }
  loadEntityColumnsPromise(request, model, entity).then(function (response) {
    //
    data.value = response.data
  })
}
//Find all the choosed columns from model by entity key
export function findColumns(model, entity) {
  const result=model.columns.filter((c) => c.entity == entity)
  //And we also need to find all the children
  for(const column of model.columns){
      for(const child of column.children||[]){
        //
        if(child.entity==entity){
          result.push(child)
        }
      }    
  }
  //
  return result;
}



//
export function mergeJson(jsonTarget, jsonSource) {
  for (const k of Object.keys(jsonSource)) {
      jsonTarget[k] = jsonSource[k]
  }
}
