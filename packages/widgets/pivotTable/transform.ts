//echarts should be imported even if it is not used because Vchart need it
import { ref, unref, computed } from 'vue'

import { buildTransform } from '../utils/transformUtil'
import { precheck } from '../utils/transformPrecheck'
import { formatData } from '../utils/tooltipUtil'
import {Pivot} from 'element-pivot'

const validateRules=[
  {key:'dimensionRow',min:1},
  {key:'dimensionCol',min:1},
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

  //Table
  const resultTable = buildTable()
  // //Title
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

  function buildTable() {

     const result = {
      '~component': Pivot,
      data: unref(data).data||[],
      dimensionCol:convert(modelConfig.dimensionCol),
      dimensionRow:convert(modelConfig.dimensionRow),
      metric:convert(modelConfig.metric,true),
    }

    //
    return result
  }
  function convert(cc,isMetric=false){
    if(!cc){
      return []
    }
    //
    const result=[]
    for(const c of cc){
      const r : any={key:c.id,label:c.label}
      if(isMetric){
        r.formatter=(row: any, column: any, cellValue: any) => {
          if (cellValue != undefined) {
            //
            return formatData(cellValue,c) 
          } else {
            return config.emptyValue||''
          }
        }
      }
      result.push(r)
    }
    //
    return result;
  }

  function buildTitle() {
    const title = config['title-text']
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



//
export const bipivotTableTransform = buildTransform(buildResult, validateRules, undefined)
