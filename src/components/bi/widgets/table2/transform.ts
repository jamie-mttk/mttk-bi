//echarts should be imported even if it is not used because Vchart need it


import { buildTransform } from '../utils/transformUtil'

import {
  DxDataGrid,
} from 'devextreme-vue/data-grid'


function buildResult({ config, data, context, key, contextWrap, fullConfig }) {
  const result = {
    '~component': DxDataGrid,
    'data-source': data,
    height: 'inherit'
  }
  //Columns
  const columns = []
  result.columns = columns
  //
  const modelConfig = fullConfig.config.model
  for (const c of modelConfig.dimension || []) {
    columns.push({ caption: c.label || c.key, dataField: c.id })
  }
  for (const c of modelConfig.metric || []) {
    columns.push({ caption: c.label || c.key, dataField: c.id })
  }
  //

  if (context.mode.value == 'edit') {
    result['@cellClick'] = function () {
      console.log('cellClick', arguments)
      //raise a new event
      contextWrap.context.emit('componentChoosed')
    }
  }
  //
  result.filterRow = { visible: !!config['_DxFilterRow'] }
  result.headerFilter = { visible: !!config['_DxHeaderFilter'] }
  result.filterPanel = { visible: !!config['_DxFilterPanel'] }
  result.columnChooser = { enabled: !!config['_DxColumnChooser'] }
  result.columnFixing = { enabled: !!config['_DxColumnFixing'] }
  //toolbar
  if (config['_title-text']) {
    result.toolbar = {
      diabled: false,
      items: [
        {
          location: 'center',
          html:
            '<span style="font-size:0.9em;font-weight:700;">' + config['_title-text'] + '</span>'
        }
      ]
    }
    //
    if (config['_DxColumnChooser']) {
      result.toolbar.items.push({ name: 'columnChooserButton' })
    }
  }
  //

  //
  return result
}

//return error info is valdiate failed,otherwise return undefined
function validate({ config, data, context, key, contextWrap, fullConfig }) {
  if ((fullConfig?.config?.model?.dimension?.length||0) <=0 && (fullConfig?.config?.model?.metric?.length||0) <=0) {
     return '度量和维度字少必须选择一个'   
  }
  //
  return undefined
}


//
export const biTableTransform = buildTransform(buildResult, [],validate)