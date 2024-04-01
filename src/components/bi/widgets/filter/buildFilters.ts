import { inputHasValueOptions } from './data'
//build all filters of the given data model
export  function buildFilters(context, dataModel) {
  const filters = []

  //Find all the filters
  const filterComponents = findMatchFilters()
  //Loop to build one by one
  for (const filterComponent of filterComponents) {
    //
    for (const f of filterComponent?.config?.model?.filter || []) {
      //Load data
      const data = context.d.g(filterComponent.config.data.dataKey) || {}
      //
      buildFilterSingle(filters, data, f)
    }
  }
  //
  // console.log(filters)
  //
  return filters

  //Find all matching filter filterComponents
  function findMatchFilters() {
    const filterComponents = []
    context.componentManager.navigate({}, function ({ controller }) {
      if (controller.type != '_bi_filter') {
        return
      }
      //check data model
      if (controller.config.model.dataModel != dataModel) {
        return
      }
      //
      filterComponents.push(controller)
    })
    //
    return filterComponents
  }
 
}

//filters: filters to add 
//data:data of the filter
//f:   filterConfig
export function buildFilterSingle(filters, data, f) {
  //
  if (f._ui_mode == 'input') {
    buildFilterSingleInput(filters,data, f)
  } else if (f._ui_mode == 'select') {
    buildFilterSingleSelect(filters,data, f)
  } else if (f._ui_mode == 'input-number') {
    buildFilterSingleInputNumber(filters,data, f)
  } else if (f._ui_mode == 'datetime') {
    buildFilterSingleDatetime(filters,data, f)
  } else if (f._ui_mode == 'time') {
    buildFilterSingleTime(filters,data, f)
  } else {
    //ignore
  }
}

function buildFilterSingleInput(filters,data, f) {
  const match = data[f.id + '-match']
  const dt = data[f.id]

  if (!match) {
    return
  }
  if (inputHasValueOptions.includes(match)) {
    //that means we need a value
    if (dt) {
      filters.push({ key: f.key, operation: match, value: dt })
    }
  } else {
    filters.push({ key: f.key, operation: match })
  }
}
//
function buildFilterSingleSelect(filters,data, f) {
  const multiple = f['_ui_select_multiple']
  const dt = data[f.id]
  if (!dt || (multiple && dt.length == 0)) {
    //This condition can match all the three input match mode
    return
  }
  //
  const r = { key: f.key, operation: '', value: dt }

  filters.push(r)
  //
  if (multiple) {
    r.operation = 'IN'
  } else {
    //
    r.operation = '='
  }
}
function buildFilterSingleInputNumber(filters,data, f) {
  const match = data[f.id + '-match']

  if(!match){
    return
  }

  if (match == '_RANGE') {
    //
    if (data[f.id] != undefined) {
      filters.push({ key: f.key, operation: '>=', value: data[f.id] })
    }

    if (data[f.id + '-to'] != undefined) {
      filters.push({ key: f.key, operation: '<', value: data[f.id + '-to'] })
    }
  } else {
    //
    //
    if (data[f.id] == undefined) {
      return
    }
    //
    filters.push({ key: f.key, operation: match || '>=', value: data[f.id] })
  }
}
function buildFilterSingleDatetime(filters,data, f) {
  buildFilterSingleCommon(filters,data, f)
}
function buildFilterSingleTime(filters,data, f) {
  buildFilterSingleCommon(filters,data, f)
}

//datetime,date have the same functionality,so wrap logic in this function
function buildFilterSingleCommon(filters,data, f) {
  const match =data[f.id + '-match']

  if(!match){
    return
  }
  if (match == '_RANGE') {
     //
     if (data[f.id] != undefined) {
      filters.push({ key: f.key, operation: '>=', value: data[f.id] })
    }

    if (data[f.id + '-to'] != undefined) {
      filters.push({ key: f.key, operation: '<', value: data[f.id + '-to'] })
    }
   
  } else {
    //
    //
    if (data[f.id] == undefined) {
      return
    }
    //
    filters.push({ key: f.key, operation: match , value: data[f.id] })
  }
}
