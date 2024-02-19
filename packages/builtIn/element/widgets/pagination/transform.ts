import { reactive, ref, unref, isRef } from 'vue'

export function paginationTransform({config, data}) {
  //console.log('pagination data:'+JSON.stringify(unref(value)))
  const result = {
    '~component': 'el-pagination',
    '~modelValueName': 'currentPage',
    //modelValue: unref(value)[config['_key-current-page'] || 'page'],
    '~modelValue': unref(data),
    '~modelValuePath': config['_key-current-page']||'page',
    '@update:current-page': function (wapperContext,pageNew) {
      if(!config['_sync_to_data']||!data){
        return;
      }
      if(isRef(data)){
        data.value[config['_key-current-page'] || 'page']=pageNew
      }else{
        data[config['_key-current-page'] || 'page']=pageNew
      }
    },
    '@update:page-size': function (wapperContext,sizeNew) {
      if(!config['_sync_to_data']||!data||!config['_key-page-size']){
        return;
      }
      //
      if(isRef(data)){
        data.value[config['_key-page-size'] || 'page']=sizeNew
      }else{
        data[config['_key-page-size'] || 'page']=sizeNew
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
      result[k] = JSON.parse(config[k])

      continue
    } else if (k == '_key-current-page') {
      //continue,it is model value
      continue
    } else if (k == '_sync_to_data') {
      //continue,it is a config
      continue
    } else if (k == '_key-total') {
      //
      result['total'] = unref(data)[config[k]]
      continue
    } else if (k == '_key-page-count') {
      result['page-count'] = unref(data)[config[k]]
      continue
    } else if (k == '_key-page-size') {
      result['page-size'] = unref(data)[config[k]]
      continue
    }
    //
    result[k] = config[k]
  }
  //Set total to 0 even if there is no data linked
  //Otherwise the pagination will not shown
  if (result['total'] == undefined) {
    result['total'] = 0
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
