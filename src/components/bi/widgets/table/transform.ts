//echarts should be imported even if it is not used because Vchart need it
import { ref, unref,computed } from 'vue'
import ExtendTableColumn from '../../components/ExtendTableColumn.vue'
import { buildTransform } from '../utils/transformUtil'
import { wrapResult } from '../../utils/biTool'
import {formatData} from '../utils/tooltipUtil'

function buildResult({ config, data, context, key, contextWrap, fullConfig }) {
  // console.log('build result is called')
  //Current page,used for client pagination
  const page = ref(1)
  //
  const modelConfig = fullConfig.config.model
  //Table
  const resultTable = buildTable()
  //Title
  const resultTitle = buildTitle()
  //Pagination
  const resultPagination = buildPagination()
  //
  if (!resultTitle && !resultPagination) {
    //
    return  resultTable
  } else {
    const result = { '~': 'div', '#': [resultTitle, resultTable, resultPagination] }
    //
    return result
  }

  function buildTable() {
    const result = {'~component': 'el-table',

      style: { height: '100%' },
      border: config.border != undefined ? !!config.border : true,
      stripe: config.stripe != undefined ? !!config.stripe : false
    }
    //data
    if("CLIENT"==modelConfig.pagination?.mode){
      //
      result.data=computed(()=>{
  
        //
        let pageSize=modelConfig.pagination?.size||10
        if(pageSize<=0){
          pageSize=10
        }
        //
        return (unref(data).data||[]).slice((page.value-1)*pageSize,page.value*pageSize,)
      })
    }else{
      result.data=unref(data).data
    }
    //Columns
    const columns = []
    result['#'] = columns
    //
    if(config._showIndex){
      columns.push({
        '~': 'el-table-column',
        type:'index',
        label:'#',
        width:'50'
      })
    }
    for (const c of modelConfig.dimension || []) {
      addColumn(columns, c,'dimension')
    }
    for (const c of modelConfig.metric || []) {
      addColumn(columns, c,'metric')
    }
    //
    return result
  }

  function buildPagination() {

    const paginationMode = modelConfig.pagination?.mode || 'NONE'

    if ('CLIENT' == paginationMode) {
      return buildPaginationClient()
    } else if ('SERVER' == paginationMode) {
      return buildPaginationServer()
    } else {
      return undefined
    }
  }
  function buildPaginationClient() {
    const result = {
      '~': 'el-pagination',
      '~modelValue': page,
      '~modelValueName': 'current-page',
      'hide-on-single-page': false,
      layout: 'prev, pager, next',
      'page-size': modelConfig.pagination?.size || 10,
      total: (unref(data).data||[]).length,
    }   
    //

    //
    return result
  }
  function buildPaginationServer() {
    //
    const currentPage= computed({
      get: () => {
        const dd=context.d.getWithDefault('data_bi_charts_pagination_' + key,1)
        // console.log('get page returns ',dd)
        return dd
      },
      set: (val) => {
        console.log('set page to ',val)
        context.d.s('data_bi_charts_pagination_' + key,val)
      }
    })
    // const currentPage=ref(unref(data)?.pagination?.page||1)
    const result = {
      '~': 'el-pagination',
      '~modelValue': currentPage,
      '~modelValueName': 'current-page',
      'hide-on-single-page': false,
      layout: 'prev, pager, next',
      'page-size':unref(data)?.pagination?.size || 10,
      total: unref(data)?.pagination?.total||0,
      '@change':function(){
        context.mitt.emit('bi-chart-reload-' + key, { reset: false, showError: true })
      }
    }   
    //
    return result
  }
  function buildTitle() {
    const title = config._title
    if (!title) {
      return undefined
    }
    //
    return {
      '~': 'div',
      style: {
        'text-align': 'center',
        'font-size': '1.2em',
        'font-weight': 700,
        'margin-top': '8px',
        'margin-bottom': '4px'
      },
      '#': title
    }
  }
}

function addColumn(columns, c,type='metric') {
  columns.push({
    '~': ExtendTableColumn,
    prop: c.id,
    label: c.label || c.key,
    align:type=='metric'?'right':'left',

    '#':function({row,$index}){
      if($index<0){
        return undefined
      }

      return formatData(row[c.id],c)

    }
  })
}
//return error info is valdiate failed,otherwise return undefined
// config, data, context, key, contextWrap, fullConfig 
function validate({  fullConfig }) {
  if (
    (fullConfig?.config?.model?.dimension?.length || 0) <= 0 &&
    (fullConfig?.config?.model?.metric?.length || 0) <= 0
  ) {
    return '度量和维度字少必须选择一个'
  }
  //
  return undefined
}

//
export const biTableTransform = buildTransform(buildResult, [], validate)
