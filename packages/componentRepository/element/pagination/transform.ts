import { reactive, ref, unref,isRef } from 'vue'

export function paginationTransform(config: any, value: any) {
  //console.log('pagination data:'+JSON.stringify(unref(value)))
  const result = {
    sys: {
      component: 'el-pagination',
      modelValueName: 'currentPage',
      //modelValue: unref(value)[config['_key-current-page'] || 'page'],
      modelValue:  unref(value),
      modelValuePath:config['_key-current-page'] || 'page',
    },
    props: {
      //
    },
    events: {
      'update:current-page': function (wapperContext,pageNew) {
        if(!config['_sync_to_data']||!value){
          return;
        }
        if(isRef(value)){
          value.value[config['_key-current-page'] || 'page']=pageNew
        }else{
          value[config['_key-current-page'] || 'page']=pageNew
        }
      },
      'update:page-size': function (wapperContext,sizeNew) {
        if(!config['_sync_to_data']||!value||!config['_key-page-size']){
          return;
        }
        //
        if(isRef(value)){
          value.value[config['_key-page-size'] || 'page']=sizeNew
        }else{
          value[config['_key-page-size'] || 'page']=sizeNew
        }
      }
    }
  }

  //Copy properties
  for (const k of Object.keys(config)) {
    if (!config[k]) {
      continue
    }

    if (k == 'page-sizes') {
      //convert  from string to array
      result.props[k] = JSON.parse(config[k])

      continue
    } else if (k == '_key-current-page') {
      //continue,it is model value
      continue
    } else if (k == '_sync_to_data') {
      //continue,it is a config
      continue
    } else if (k == '_key-total') {
      //
      result.props['total'] = unref(value)[config[k]]
      continue
    } else if (k == '_key-page-count') {
      result.props['page-count'] = unref(value)[config[k]]
      continue
    } else if (k == '_key-page-size') {
      result.props['page-size'] = unref(value)[config[k]]
      continue
    }
    //
    result.props[k] = config[k]
  }
  //Set total to 0 even if there is no data linked
  //Otherwise the pagination will not shown
  if (result.props['total'] == undefined) {
    result.props['total'] = 0
  }
  // //test
  //  result.props['page-size']=10
  // //result.props['page-count']=20
  // result.props['total']=200
  // // result.props['page-sizes']=[10,    20,    30,    40,    50,    100  ]
  // // result.props['default-page-size']=12
  // result.props['layout']="sizes,prev, pager, next"
  //
  //console.log(JSON.stringify(result, null, 2))
  //console.log(result)
  //
  return result
}
