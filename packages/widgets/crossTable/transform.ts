//echarts should be imported even if it is not used because Vchart need it
import { ref, unref, computed } from 'vue'

import { buildTransform } from '../utils/transformUtil'
import { precheck } from '../utils/transformPrecheck'
// import { wrapResult } from '../../utils/biTool'
import { formatData } from '../utils/tooltipUtil'

const validateRules=[
  {key:'dimension',min:2},
  {key:'metric',min:1}
]

function buildResult({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const chechResult = precheck(
    { config, data, context, key, contextWrap, fullConfig },
    validateRules,
    undefined
  )
  if (chechResult) {
    return chechResult
  }

  //
  const modelConfig = fullConfig.config.model
  //
  const {columnConfig,tableData}=buildData(modelConfig, data)
  //Table
  const resultTable = buildTable(columnConfig,tableData)
  //Title
  const resultTitle = buildTitle()

  //
  if (!resultTitle) {
    //
    return resultTable
  } else {
    // resultTable.style={'flex-shrink':1,height:'300px'}
    const result = {
      '~': 'div',
      style: { display: 'flex', 'flex-direction': 'column', height: '100%' },
      '#': [resultTitle, resultTable]
    }
    //
    return result
    //
  }

  function buildTable(columnConfig,tableData) {
    const result = {
      '~component': import('@/components//TowLevelTable.vue'),
      data: tableData,
      config:columnConfig,
      style: { height: '100%' },
      border: config.border != undefined ? !!config.border : true,
      stripe: config.stripe != undefined ? !!config.stripe : false
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

function buildData(modelConfig, data) {
  //
  data = unref(data).data
  //Get all the values of dimension[0](row) and dimension[1](col)
  const rowValuesSet = new Set(),
    colValuesSet = new Set()
  for (const d of data) {
    //row
    rowValuesSet.add(d[modelConfig.dimension[0].id])
    //col
    colValuesSet.add(d[modelConfig.dimension[1].id])
  }
  //
  const rowValues=Array.from(rowValuesSet)
  const colValues=Array.from(colValuesSet)
  //
  return {rowValues, colValues,columnConfig:buildColumnConfig(modelConfig,colValues),tableData:buildDataInternal(modelConfig,rowValues, colValues,data)}
}

function buildColumnConfig(modelConfig,colValues) {
  const cols = []
  //The first column is the dimensoin[0] label
  cols.push({ prop: modelConfig.dimension[0].id, label: modelConfig.dimension[0].label })
  //Repeat to build column for each col values
  for(let i=0;i<colValues.length;i++){
    const colValue=colValues[i]
    const colConfig={label: colValue,_children:[] }
    cols.push(colConfig)
    for(const mc of modelConfig.metric){
      colConfig._children.push({ prop: mc.id+'_'+i, label: mc.label ,align:'right'})
    }
  }

  //
  return cols
}
//
function buildDataInternal(modelConfig,rowValues, colValues,data){
  const result=[]
  for(const rowValue of rowValues){
    const r={}
    result.push(r)
    //Dimension 0 label
    r[modelConfig.dimension[0].id]=rowValue
    //
    for(let i=0;i<colValues.length;i++){
      const colValue=colValues[i]
      const itemValues=findItemValues(modelConfig,data,rowValue,colValue)
      for(const mc of modelConfig.metric){
        r[ mc.id+'_'+i]=formatTableItem(itemValues,mc)
      }
    }
  }
  //
  return result;
}
//Find the table item value ,the found data item is returned
function findItemValues(modelConfig,data,rowValue,colValue){
  for(const d of data){
    //The row value and col value should be matched
    if(d[modelConfig.dimension[0].id]==rowValue && d[modelConfig.dimension[1].id]==colValue){
      return d
    }

  }
  //Not found
  return undefined
}
//format the table item
function formatTableItem(itemValues,mc){
  if(!itemValues){
    //No value
    return '-'
  }
  //
  return formatData(itemValues[mc.id],mc) 
}
//
export const biCrossTableTransform = buildTransform(buildResult, validateRules, undefined)
