import { unref, ref } from 'vue'

import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import {dynamicRender} from 'mttk-vue-wrap'
import ExtendTableColumn from '../../components/ExtendTableColumn.vue'

  //Functions insdide transform
  export function showSQL(context,data) {
    //get data
    const sqls = unref(data).sqls || []
    let content = undefined
    if (!sqls || sqls.length == 0) {
      content = { '~': 'el-empty', description: '没有SQL' }
    } else {
      content = { '~': 'el-form', 'label-position': 'top', '#': [] }
      //
      const { copy,isSupported } = useClipboard()
      //
      for (const sql of sqls) {
        //
        content['#'].push({
          '~': 'el-form-item',
          '#label':{
            '~':'div',
            '#':[sql.type,{
              '~':'lc-icon',
              '~show':isSupported,
              'icon':'mdiContentCopy',
              tooltip:'点击拷贝',
              style:{cursor:'pointer','margin-left':'10px'},
              '@click':function (){
                copy(sql.sql);
                ElMessage({
                  message: '拷贝完成.',
                  type: 'success',
                })
              },
            }]
          },
          '#': {
            '~': 'el-input',
            '~modelValue': sql.sql,
            type: 'textarea',
            rows: 6,
            readonly: true
          }
        })
      }
    }

    const visible = ref(false)
    const config = {
      '~': 'el-drawer',
      '~modelValue': visible,
      title: '查看SQL',
      direction: 'btt',
      size: '75%',
      '#': content
    }
    dynamicRender(config, context.appContext.globalContext.vueApp._context, {
      removeEvent: 'close'
    })
    visible.value = true
  }

  export function showData(context,data,fullConfig) {

    //get data
    const dt = unref(data).data || []
    const content =(!dt || dt.length == 0)?{ '~': 'el-empty', description: '没有数据' }:buildDataTable(dt,fullConfig)
    
    const visible = ref(false)
    const config = {
      '~': 'el-drawer',
      '~modelValue': visible,
      title: '查看数据',
      direction: 'btt',
      size: '80%',
      '#': content
    }
    dynamicRender(config, context.appContext.globalContext.vueApp._context, {
      removeEvent: 'close'
    })
    visible.value = true
  }

 function buildDataTable(data, fullConfig) {
  //store table columns
  const columns = []
  //Used to store all dimensions and  metrics,used to convert data is needed
  //If dump mode==JSON, no need to convert so set it value to undefined
  //Otherwise set to empty array
  const dimenionAndMetric=fullConfig?.config?.model?.dumpMode== 'JSON'?undefined:[]
  //
  const result = {
    '~component': 'el-table',
    style: { height: '100%' },
    border: true,
    stripe: true,
    '#': columns
  }
  //Index column
  columns.push({
    '~': 'el-table-column',
    type: 'index',
    label:'#',
    width: '50'
  })
  //
  parseColumns()
  //
  result.data=buildData()
  //
  return result

  //parse columns from metric and dimension
  function parseColumns() {
    parseColumnsPrefix('dimension')
    parseColumnsPrefix('metric')
  }
  function parseColumnsPrefix(prefix) {
    for (const k of Object.keys(fullConfig.config.model || {})) {
      if (!k.startsWith(prefix)) {
        continue
      }
      const value = fullConfig.config.model[k]
      for (const c of value) {
        //add a new column
        columns.push({
          '~': ExtendTableColumn,
          prop: c.id,
          label: c.label || c.key
        })
        //
        if(dimenionAndMetric!=undefined){
          dimenionAndMetric.push(c)
        }
      }
    }
  }
  function buildData(){
    if(dimenionAndMetric==undefined){
      //no need to convert
      return data;
    }
    //
    const dataConerted=[]
    let ifFirstLine=true
    for(const dt of data){
      if(ifFirstLine){
        //Skip first line
        ifFirstLine=false
        continue;
      }
        //
        const d={}
        dataConerted.push(d)
      for(let i=0;i<Math.min(dt.length,dimenionAndMetric.length);i++){
        //
        d[dimenionAndMetric[i].id]=dt[i]
       
      }
    }
    //
    // console.log(JSON.stringify(dataConerted,null,2))
    //
    return dataConerted;
  }
}
