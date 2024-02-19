export default function buildFilters(context, dataModel) {
  const filters = []

  //Find all the filters
  const filterControllers = findAllFilters()
  //Loop to build one by one
  for (const controller of filterControllers) {
    //
    for (const f of controller?.config?.model?.filter || []) {
        //Load data
        const data=context.d.g(controller.config.data.dataKey)||{}
        //
      buildFilterSingle( controller, data,f)
    }
  }
  //
  // console.log(filters)
  //
  return filters

  //Find all matching filter controllers
  function findAllFilters() {
    const filterControllers = []
    context.componentManager.navigate({}, function ({ controller }) {
      if (controller.type != '_bi_filter') {
        return
      }
      //check data model
      if (controller.config.model.dataModel != dataModel) {
        return
      }
      //
      filterControllers.push(controller)
    })
    //
    return filterControllers
  }
  function buildFilterSingle( controller, data,f) {
    //
    if (f._ui_mode == 'input') {
        buildFilterSingleInput(data,f)
    } else if (f._ui_mode == 'select') {
        buildFilterSingleSelect(data,f)
    } else if (f._ui_mode == 'input-number') {
        buildFilterSingleInputNumber(data,f)
    } else if (f._ui_mode == 'datetime') {
        buildFilterSingleDatetime(data,f)
    } else if (f._ui_mode == 'time') {
        buildFilterSingleTime(data,f)
    } else {
      //ignore
    }
  }

  function buildFilterSingleInput(data, f) {
    const dt=data[f.id]
    if(!dt){
        //This condition can match all the three input match mode
        return;
    }
    //
    const r={key:f.key,operation:'',value:dt}
    filters.push(r)
    //
    if (f['_ui_input_match'] == '_CUSTOMIZE') {
        //
        r.operation=data[f.id+ '-match']
      } else {
        //
        r.operation=f['_ui_input_match']
      }
      //Apply default operation
      if(!r.operation){
        r.operation='LIKE'
      }
      //
    
  }
  //
  function buildFilterSingleSelect(data,f) {
    const multiple=f['_ui_select_multiple']
    const dt=data[f.id]
    if(!dt||(multiple && dt.length==0)){
        //This condition can match all the three input match mode
        return;
    }
    //
    const r={key:f.key,operation:'',value:dt}
    filters.push(r)
    //
    if (multiple) {
        r.operation='IN'
      } else {
        //
        r.operation='='
      }

}
function buildFilterSingleInputNumber(data, f) {
  const match=f['_ui_input-number_match']
  if(match=='_RANGE'){
    //
    if(data[f.id]!=undefined){
      filters.push({key:f.key,operation:'>=',value:data[f.id]})
    }
    if(data[f.id+ '-to']!=undefined){
      filters.push({key:f.key,operation:'<',value:data[f.id+ '-to']})
    }
  }else if(match=='_CUSTOMIZE'){
     //
     if(data[f.id]==undefined){
      return;
    }
    //
    filters.push({key:f.key,operation: data[f.id+ '-match']||'>=',value:data[f.id]})
  }else{
    //
     //
     if(data[f.id]==undefined){
      return;
    }
    //
    filters.push({key:f.key,operation:match||'>=',value:data[f.id]})
  }
}
function buildFilterSingleDatetime(data, f) {
  buildFilterSingleCommon(data,f,'_ui_input-datetime_match')
}
function buildFilterSingleTime(data, f) {
  buildFilterSingleCommon(data,f,'_ui_input-time_match')
}

//datetime,date have the same functionality,so wrap logic in this function
function buildFilterSingleCommon(data, f,matchKey) {
  const match=f[matchKey]
  if(match=='_RANGE'){
    const dt=data[f.id]

    if(!dt||!Array.isArray(dt)||dt.length!=2){
      return
    }

    //
    if(dt[0]!=undefined){
      filters.push({key:f.key,operation:'>=',value:dt[0]})
    }
    if(dt[1]!=undefined){
      filters.push({key:f.key,operation:'<',value:dt[1]})
    }

  }else if(match=='_CUSTOMIZE'){
     //
     console.log((data[f.id]==undefined),data[f.id])
     if(data[f.id]==undefined){
      return;
    }
    //
    filters.push({key:f.key,operation: data[f.id+ '-match']||'>=',value:data[f.id]})
  }else{
    //
     //
     if(data[f.id]==undefined){
      return;
    }
    //
    filters.push({key:f.key,operation:match||'>=',value:data[f.id]})
  }
}
}
