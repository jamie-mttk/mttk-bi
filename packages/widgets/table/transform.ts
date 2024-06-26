//echarts should be imported even if it is not used because Vchart need it
import { ref, unref, computed } from 'vue'
import { ExtendTableColumn, mergeRowSpanMethod } from 'element-pivot'
import { buildTransform } from '../utils/transformUtil'
import { precheck } from '../utils/transformPrecheck'
import { formatData } from '../utils/tooltipUtil'
import { locale } from 'mttk-lowcode-engine'
const validateRules = [{ key: '_dimensionAndMetric', min: 1 }]

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
  //  console.log('build result is called',data.value)
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
    return resultTable
  } else {
    // resultTable.style={'flex-shrink':1,height:'300px'}
    const result = {
      '~': 'div',
      style: { display: 'flex', 'flex-direction': 'column', height: '100%' },
      '#': [resultTitle, resultTable, resultPagination]
    }
    //
    return result
    //
  }
  function getSummaries({ columns, data }) {
    const sums = []
    //
    if (columns.length == 0 || data.length == 0) {
      return sums
    }
    //
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i]
      if (!col.property) {
        continue
      }
      //Check whether it is inside dimension or metric
      const c = findDimensionOrMetric(col.property)

      if (!c) {
        continue
      }
      //
      const values = data.map((item) => Number(item[col.property]))
      if (!values.every((value) => Number.isNaN(value))) {
        const sum = ` ${values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)}`
        //
        sums[i] = formatData(Number(sum), c)
      } else {
        console.log(i,config._showIndex)
        if (i == 0||(i==1 && config._showIndex)) {
          sums[i] = locale.t('bi.widgets.table.summary')
        } else {
          sums[i] = ''
        }
      }
    }

    //
    return sums
  }
  function findById(configList, id) {
    for (const c of configList) {
      if (c.id == id) {
        return c
      }
    }
    return undefined
  }
  function findDimensionOrMetric(id) {
    const ret = findById(modelConfig.dimension, id)
    if (ret) {
      return ret
    }
    return findById(modelConfig.metric, id)
  }

  function buildTable() {
    const result = {
      '~component': 'el-table',

      style: { height: '100%' },
      border: config.border != undefined ? !!config.border : true,
      stripe: config.stripe != undefined ? !!config.stripe : false,
      'show-summary': !!config._showSummary,
      'span-method': config._mergeSameColumn ? mergeRowSpanMethod() : undefined,
      'summary-method': getSummaries,
      'table-layout': 'auto'
    }
    //data
    if ('CLIENT' == modelConfig.pagination?.mode) {
      //
      result.data = computed(() => {
        //
        let pageSize = modelConfig.pagination?.size || 10
        if (pageSize <= 0) {
          pageSize = 10
        }
        //
        return (unref(data).data || []).slice((page.value - 1) * pageSize, page.value * pageSize)
      })
    } else {
      result.data = unref(data).data
    }
    //Columns
    const columns = []
    result['#'] = columns
    //
    if (config._showIndex) {
      columns.push({
        '~': 'el-table-column',
        type: 'index',
        label: '#',
        width: '50'
      })
    }
    for (const c of modelConfig.dimension || []) {
      addColumn(columns, c, 'dimension', config)
    }
    for (const c of modelConfig.metric || []) {
      addColumn(columns, c, 'metric', config)
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
      layout: 'total,  prev, pager, next, jumper',
      'page-size': modelConfig.pagination?.size || 10,
      total: (unref(data).data || []).length
    }
    //

    //
    return result
  }
  function buildPaginationServer() {
    //
    const currentPage = computed({
      get: () => {
        const dd = context.d.getWithDefault('data_bi_charts_pagination_' + key, 1)
        // console.log('get page returns ',dd)
        return dd
      },
      set: (val) => {
        console.log('set page to ', val)
        context.d.s('data_bi_charts_pagination_' + key, val)
      }
    })
    // const currentPage=ref(unref(data)?.pagination?.page||1)
    const result = {
      '~': 'el-pagination',
      '~modelValue': currentPage,
      '~modelValueName': 'current-page',
      'hide-on-single-page': false,
      layout: 'total,  prev, pager, next, jumper',
      'page-size': unref(data)?.pagination?.size || 10,
      total: unref(data)?.pagination?.total || 0,
      '@change': function () {
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

function addColumn(columns, c, type = 'metric', config) {
  columns.push({
    '~': ExtendTableColumn,
    prop: c.id,
    label: c.label || c.key,
    align: type == 'metric' ? 'right' : 'left',
    sortable: !!config._sortable,
    '#': function ({ row, $index }) {
      if ($index < 0) {
        return undefined
      }

      return formatData(row[c.id], c)
    }
  })
}

//
export const biTableTransform = buildTransform(buildResult, validateRules, undefined)
