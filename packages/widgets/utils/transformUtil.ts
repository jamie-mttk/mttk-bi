import VChart from 'vue-echarts'
import { useIntervalFn } from '@vueuse/core'
import { wrapResult } from '../../utils/biTool'

import { buildFilters, buildFilterSingle } from '../filter/buildFilters'
import buildDrilling from './buildDrilling'
import { tools } from 'mttk-lowcode-engine'
import { unref, ref } from 'vue'
import { countTitle } from './transformTools'
import {preValidate,precheck} from './transformPrecheck'
//

import { showSQL, showData, showLoadDataError } from './chartActionUtil'

//
export function buildTransform(
  buildResult: Function,
  validateRules = [] as any[],
  validate?: Function
) {
  return function ({ config, data, context, key, contextWrap, fullConfig }) {
    //
    const drilling = buildDrilling({ context, fullConfig })

    //load data from remove
    //reset pagination page to 1
    function reload({ reset = false, showError = true, resetPagination = true } = {}) {
      //check

      //
      if (
        !preValidate(
          { config, data, context, key, contextWrap, fullConfig },
          validateRules,
          validate,
          showError
        )
      ) {

        return
      }

      //
      if (reset) {
        drilling.reset()
      }

      //
      const modelConfig = tools.deepCopy(fullConfig?.config?.model || {})
      //set the pagination if required
      const page = context.d.g('data_bi_charts_pagination_' + key)
      if (page && 'SERVER' == modelConfig?.pagination?.mode) {
        modelConfig.pagination.page = page
      }

      const filters = buildFilters(context, fullConfig?.config?.model.dataModel)
      //Add
      drilling.handle(modelConfig, filters)
      //add filters configured in modelConfig
      addFilterInModelConfig(filters, modelConfig)
      //
      const requestBody = { config: modelConfig, filters }
      //Here to build filter

      //
      const request = context.appContext.globalContext.request
      request.post('/bi/build', requestBody).then(function (response) {
        if (response.error) {
          showLoadDataError(context.appContext.globalContext, response, fullConfig)
        } else {
          //
          context.d.s(fullConfig.config.data.dataKey, response)
        }
        // console.log(config.dataName, response.data)
      })
    }

    //
    const result = buildResult({ config, data, context, key, contextWrap, fullConfig })

    result['^onMounted'] = function () {
      //
      reload({ reset: true, showError: false })
      //
      context.mitt.on('bi-chart-reload-' + key, function ({ reset }) {
        //reload({ data: fullConfig, reset }, true)
        reload({ reset, showError: true })
      })
      //
      context.mitt.on('bi-chart-action-' + key, function ({ action }) {
        if ('showSQL' == action) {
          showSQL(context, data)
        } else if ('showData' == action) {
          showData(context, data, fullConfig)
        }
      })
      //Filter reload
      context.mitt.on('bi_filter_reload', function (dataModel) {
        if (fullConfig?.config?.model?.dataModel == dataModel) {
          reload({ reset: false, showError: true })
        }
      })
      //Interval,auto load
      initInterval()
    }
    result['^onUnmounted'] = function () {
      context.mitt.off('bi-chart-reload-' + key)
      context.mitt.off('bi-chart-action-' + key)
      context.mitt.off('bi_filter_reload')
      //
      resetInterval()
    }
    //Used to clean the interval created during onMounted
    //Please note reload will not trigger onMounted again, so a funciton level variable is OK
    let pauseSaved = undefined
    //
    function initInterval() {
      // console.log('=================>^onMounted',key)
      resetInterval()
      //
      if ('simple' != fullConfig?.config?.model?.interval?.mode) {
        return
      }
      //
      let intervalValue = fullConfig?.config?.model?.interval?.value || 10
      //convert to second
      if ('MINUTE' == fullConfig?.config?.model?.interval?.unit) {
        intervalValue *= 60
      }
      //convert to millsecond
      intervalValue *= 1000
      // console.log('interval time is set to '+intervalValue)
      //
      const { pause } = useIntervalFn(() => {
        reload({ reset: true, showError: false })
      }, intervalValue)
      //
      pauseSaved = pause
    }
    function resetInterval() {
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~^onUnmounted',key)

      if (pauseSaved && typeof pauseSaved == 'function') {
        pauseSaved()
      }
    }
    //

    //
    //wrap inside a div
    return wrapResult(context, result, drilling.buildFooter())
  }
}

export function buildTransformEcharts(
  buildOption: Function,
  validateRules = [] as any[],
  validate?: Function,
  other = {}
) {
  return buildTransform(
    function ({ config, data, context, key, contextWrap, fullConfig }) {
      const chechResult=precheck({ config, data, context, key, contextWrap, fullConfig },validateRules,validate)
      if(chechResult){
        return chechResult
      }
      //
      const option = ref({})

      const result = buildOption({ config, data, context, key, contextWrap, fullConfig })
      //
      // console.log('####',unref(data),JSON.stringify(result))
      //

      // console.log('REBUILD!',result)
      if (tools.isPromise(result)) {
        //
        result.then((resp) => {
          //
          if (!other.skipDataset) {
            resp.dataset = {}
            resp.dataset.sourceHeader = true
            resp.dataset.source = unref(data).data || []
          }
          //
          option.value = resp
        })
      } else {
        //
        if (!other.skipDataset) {
          result.dataset = {}
          result.dataset.sourceHeader = true
          result.dataset.source = unref(data).data || []
        }
        //
        option.value = result
      }
      //Locale
      //enUS,zhCN
      let locale=context.appContext.globalContext.i18n.global.locale.value
      //change to ZH or EN
      locale=locale && locale=='zhCN'?'ZH':'EN'
    
      //
      return {
        '~component': VChart,
        autoresize: true,
        option: option,
        theme: config['echarts-theme'] || 'default',
        'init-options': { renderer: 'canvas',locale },
        // 'manual-update': false, //do not set to true otherwise baidu map does not work
        '@click': function (ctx, para) {
          const drilling = buildDrilling({ context, fullConfig })
          //Push to next level
          drilling.down({ value: para.data[0] })
          //
        }
      }
    },
    validateRules,
    validate
  )
}


export function buildBaseOption({
  config = {},
  skipLegend = false,
  skipToolbox = false,
  skipGrid = false
} = {}) {
  const result = {} as any
  result.title = {
    text: config['title-text'] || '',
    subtext: config['title-subtext'] || '',
    left: '2%',
    top: '2%'
  }
  if (!skipGrid) {
    result.grid = {
      left: '32',
      right: '64',
      top: (countTitle(config) == 2 ? 96 : 72) + 'px', //Set top height dependson whether title and sutitle  setting
      bottom: '32',
      containLabel: true
    }
  }
  if (!skipLegend) {
    result.legend = {
      // orient: 'horizontal',
      orient: 'vertical',
      right: '48px',
      top: '4px'
    }
  }
  if (!skipToolbox) {
    result.toolbox = {
      show: true,
      showTitle: false, //Hide default text to avoid overlap
      feature: {
        saveAsImage: {
          show: true
        },
        dataView: {
          show: true
        }
      }
    }
  }
  //
  return result
}

function addFilterInModelConfig(filters, modelConfig) {
  //

  for (const f of modelConfig.filter || []) {
    const data = {}
    if (f['_ui_' + f._ui_mode + '_match_init'] != undefined) {
      data[f.id + '-match'] = f['_ui_' + f._ui_mode + '_match_init']
    }
    if (f['_ui_' + f._ui_mode + '_init'] != undefined) {
      data[f.id] = f['_ui_' + f._ui_mode + '_init']
    }
    if (f['_ui_' + f._ui_mode + '_init-to'] != undefined) {
      data[f.id + '-to'] = f['_ui_' + f._ui_mode + '_init-to']
    }

    //
    buildFilterSingle(filters, data, f)
  }
}
