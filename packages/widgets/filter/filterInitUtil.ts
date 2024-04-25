import dayjs from 'dayjs'

export function buildInitValue(modelConfig){

    const init = {}
    for (const c of modelConfig.filter || []) {
      if (c['_ui_mode'] == 'input') {
          tryCopyInit(init,c,c.id + '-match','_ui_input_match_init','LIKE')
          tryCopyInit(init,c,c.id ,'_ui_input_init')
      }  else if (c['_ui_mode'] == 'select') {
        tryCopyInit(init,c,c.id ,'_ui_select_init')
      }else if (c['_ui_mode'] == 'input-number') {
        tryCopyInit(init,c,c.id + '-match','_ui_input-number_match_init','>=')
        tryCopyInit(init,c,c.id ,'_ui_input-number_init')
        tryCopyInit(init,c,c.id+'-to' ,'_ui_input-number_init_to')
      }else if (c['_ui_mode'] == 'datetime') { 
        tryCopyInit(init,c,c.id + '-match','_ui_datetime_match_init','>=')
        tryCopyInit(init,c,c.id ,'_ui_datetime_init',undefined,calDatetime)
        tryCopyInit(init,c,c.id+'-to' ,'_ui_datetime_init_to',undefined,calDatetime)
      }else if (c['_ui_mode'] == 'time') { 
        tryCopyInit(init,c,c.id + '-match','_ui_time_match_init','>=')
        tryCopyInit(init,c,c.id ,'_ui_time_init',undefined,calTime)
        tryCopyInit(init,c,c.id+'-to' ,'_ui_time_init_to',undefined,calTime)
      }
    }
    //
    //  console.log(JSON.stringify(init,null,2))
    //
    return init;
  }
  
  //Try to copy init value to variable to lod the filter form
  //init  - the result filter form value
  //c     - filter config which is where the value to copy from
  //key   - the key  in result to copy  into
  //initKey - key in filter config to copy from
  //initValue - Optional,if init value is not found in filter config, use it instead
  //transform - Optional, it is a function to convert init value ,used to transform datetime/time
  function tryCopyInit(init,c,key,initKey,initValue?,transform?){
    //get init value from filter config
    let v=c[initKey]
    if(v==undefined){
      //not found, used init value instead
      v=initValue
    }
    //if neither in filter config nor in intivalue is found,return directly
    if(v==undefined){
      return
    }
    //Try transform
    if(transform && typeof transform=='function'){
      v=transform(v)
    }
    //
    init[key] = v      
  }
  

  function calDatetime(val){
  let result=dayjs()
  if(val!='now'){
    result=result.hour(0).minute(0).second(0).millisecond(0);
  }
  if(val=='t-1'){
    result=result.subtract(1, 'day')
  }else if(val=='t-2'){
    result=result.subtract(2, 'day')
  }else if(val=='t+1'){
    result=result.add(1, 'day')
  }else if(val=='t+2'){
    result=result.add(2, 'day')
  }else if(val=='m'){
    result=result.set('date',1)
  }else if(val=='m-1'){
    result=result.set('date',1).subtract(1, 'month')
  }else if(val=='m+1'){
    result=result.set('date',1).add(1, 'month')
  }else if(val=='y'){
    result=result.set('date',1).set('month',0)
  }else if(val=='y-1'){
    result=result.set('date',1).set('month',0).subtract(1, 'year')
  }else if(val=='y+1'){
    result=result.set('date',1).set('month',0).add(1, 'year')
  }
  //
  return result.format('YYYY-MM-DD HH:mm:ss') ;
  }
  
  function calTime(val){
    //
    if(val=='now'){
     return dayjs().format('HH:mm:ss') ;
    }else{
      return val
    }
  
  }