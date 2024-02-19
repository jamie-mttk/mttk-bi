
//Find entity from model by key
export function findEntity(model, key) {
  if(!key){
    return
  }
    for (const entity of model.entities || []) {
      if (entity.key == key) {
        return entity
      }
    }
  }
  //Find relation by source and target (Entity key)
  export function findRelation(model, source,target) {
    for (const relation of model.relations || []) {
      if (relation.source == source && relation.target == target) {
        return relation
      }
    }
  }
//Return a promise
  export function loadEntityColumnsPromise(request,model,entity){
    return    request({
      method: "POST",
      url: 'dataModel/loadEntityFields',
      params:{model},
      data: entity
    })
  }
  //Load all the columns of the given entity
  //request - axios request
  //model   - model id
  //entity  - entity JSON
  //data    - it is a VUE ref used to return loaded data
  export function loadEntityColumns(request,model,entity,data){

    if(!entity){
      data.value=[]
      return
    }
    loadEntityColumnsPromise(request,model,entity).then(function (response) {
        //
        data.value=response.data
      });
  }
  //Find all the choosed columns from model by entity key
  export function findColumns(model,entity){
    return model.columns.filter((c)=>c.entity==entity)
  }