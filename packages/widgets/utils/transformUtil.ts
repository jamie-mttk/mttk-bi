import VChart from 'vue-echarts'
import { useIntervalFn } from '@vueuse/core'
import { wrapResult } from './shareUtil'

import { buildFilters, buildFilterSingle } from '../filter/buildFilters'
import buildDrilling from './buildDrilling'
import { tools } from 'mttk-lowcode-engine'
import { unref, ref, nextTick } from 'vue'
import { countTitle } from './transformTools'
import { preValidate, precheck } from './transformPrecheck'
//
import { showSQL, showData, showLoadDataError } from './chartActionUtil'
import { checkPassed } from './shareUtil'
//
export function buildTransform(
  buildResult: Function,
  validateRules = [] as any[],
  validate?: Function
) {
  return function ({ config, data, context, key, contextWrap, fullConfig }) {
    //  console.log('BUIDL TRANSFORM IS CALLED',key,context.mode.value,JSON.stringify(unref(data)))
    //
    const drilling = buildDrilling({ context, fullConfig })

    //load data from remove
    //reset pagination page to 1
    function reload({ reset = false, showError = true } = {}) {
      // console.log('RELOAD IS CALLED',key,context.mode.value,JSON.stringify(unref(data)))

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
          // console.log(key,fullConfig.config.data.dataKey, response)
          context.d.s(fullConfig.config.data.dataKey, response)
          //
          //Here we need to reset choosed to make it take affect... I did not find the reason so far
          // const choosed = context.choosedManager.get()
          // context.choosedManager.set(undefined)
          // nextTick(() => context.choosedManager.set(choosed))
        }
      })
    }

    //
    const result = buildResult({ config, data, context, key, contextWrap, fullConfig })

    result['^onMounted'] = function () {
      //check


      //
      context.mitt.on('bi-chart-reload-' + key, function ({ reset, showError = true }) {
        //reload({ data: fullConfig, reset }, true)
        reload({ reset, showError })
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
    //wrap inside a div

    return wrapResult({ context, result, footer: drilling.buildFooter(), fullConfig })
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
      //
    //  console.log('build',data,data.value,config,fullConfig.model,fullConfig)
      const chechResult = precheck(
        { config, data, context, key, contextWrap, fullConfig },
        validateRules,
        validate
      )
      //
      if(!unref(data).data){
          data.value={init:true,data:[]}
      }
      //
            // console.log('~~~~~~~~~~',unref(data),chechResult)
      //We SHOULD check and return checkResult here
      //Otherwise chart will be refreshed for the below situation
      //1. Create an empty chart without any configuration
      //2. Save and close page
      //3. Reenter page and config chart
      if (chechResult) {
        return chechResult
      }
      //
      if(unref(data)?.init){
        //data is empty
        context.mitt.emit('bi-chart-reload-' + fullConfig.key, { reset: true, showError: false })
       }
      //
      const option = ref({})

      const result = buildOption({ config, data, context, key, contextWrap, fullConfig })
      
      // console.log('Option build is called',result)
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
      let locale = context.appContext.globalContext.i18n.global.locale.value
      //change to ZH or EN
      locale = locale && locale == 'zhCN' ? 'ZH' : 'EN'

      //
      return {
        '~component': VChart,
        autoresize: true,
        option: option,

        theme: config['echarts-theme'] || 'default',
        'init-options': { renderer: 'canvas', locale },
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
function formatBool(config, key, defaultVal = false) {
  return config[key] == undefined ? defaultVal : !!config[key]
}

export function buildBaseOption({
  config = {},
  options = {}, //
  includeList = undefined,
  excludeList = undefined
} = {}) {
  const result = {} as any
  //
  let topDefault = 0
  let bottomDefault = 16
  //

  if (checkPassed('echarts', includeList, excludeList)) {
    result.animation = formatBool(config, 'echarts-animation', true)
  }
  //title
  if (
    checkPassed('title', includeList, excludeList) &&
    (config['title-text'] || config['title-subtext'])
  ) {
    result.title = {
      text: config['title-text'] || '',
      subtext: config['title-subtext'] || '',
      left: config['title-left'] || 'left',
      top: config['title-top'] || 'top'
    }
    //
    topDefault += countTitle(config) == 2 ? 48 : 32
  }

  if (checkPassed('legend', includeList, excludeList)) {
    result.legend = {
      //If not set ,default show
      show: config['legend-show'] == undefined ? true : !!config['legend-show'],
      left: config['legend-left'] || 'center',
      top: config['legend-top'] || '' + topDefault,
      type: config['legend-type'] || 'scroll',
      orient: config['legend-orient'] || 'horizontal',
      icon: config['legend-icon'] || ''
    }
    //
    topDefault += 32
  }
  if (checkPassed('toolbox', includeList, excludeList)) {
    result.toolbox = {
      show: true,
      left: config['toolbox-left'] || 'right',
      top: config['toolbox-top'] || 'top',
      orient: config['toolbox-orient'] || 'horizontal',
      feature: {
        saveAsImage: {
          show: config['toolbox-feature'] && config['toolbox-feature'].includes('saveAsImage'),
          backgroundColor: config['toolbox-saveAsImage-backgroundColor'] || 'transparent'
        },
        dataView: {
          show: config['toolbox-feature'] && config['toolbox-feature'].includes('dataView')
        },
        dataZoom: {
          show: config['toolbox-feature'] && config['toolbox-feature'].includes('dataZoom')
        },
        restore: {
          show: config['toolbox-feature'] && config['toolbox-feature'].includes('restore')
        }
      }
    }
  }
  if (checkPassed('dataZoom', includeList, excludeList)) {
    result.dataZoom = []
    const dataZoomConfig = config['dataZoom-type'] || []
    for (const c of dataZoomConfig) {
      if (c == 'slider') {
        bottomDefault += 32
      }
      result.dataZoom.push({ type: c })
    }
  }

  if (checkPassed('xAxis', includeList, excludeList)) {
    const nameLocation = config['xAxis-nameLocation'] || 'end'
    result.xAxis = {
      show: formatBool(config, 'xAxis-show', true),
      name: options['xAxis-name'] || '',
      position: config['xAxis-position'] || 'bottom',
      type: config['xAxis-type'] || 'category',
      nameLocation: nameLocation,
      nameGap: nameLocation == 'middle' ? 24 : 16,
      axisLabel: { show: formatBool(config, 'xAxis-axisLabel-show', true) },
      axisLine: { show: formatBool(config, 'xAxis-axisLine-show', true) },
      axisTick: { show: formatBool(config, 'xAxis-axisTick-show', true) },
      splitLine: { show: formatBool(config, 'xAxis-splitLine-show', false) },
      splitArea: { show: formatBool(config, 'xAxis-splitArea-show', false) }
    }
    //axisPointer can NOT be created if it is not shown,otherwise the tooltip of  line chart will not display
    const axisPointerShow = formatBool(config, 'xAxis-axisPointer-show', false)
    if (axisPointerShow) {
      result.xAxis.axisPointer = {
        show: axisPointerShow,
        type: config['xAxis-axisPointer-type'] || 'line'
      }
    }
    if (nameLocation == 'middle') {
      bottomDefault += 16
    }
  }
  if (checkPassed('yAxis', includeList, excludeList)) {
    result.yAxis = {
      show: formatBool(config, 'yAxis-show', true),
      name: options['yAxis-name'] || '',
      position: config['yAxis-position'] || 'left',
      type: config['yAxis-type'] || 'value',
      nameLocation: config['yAxis-nameLocation'] || 'end',
      axisLabel: { show: formatBool(config, 'yAxis-axisLabel-show', true) },
      axisLine: { show: formatBool(config, 'yAxis-axisLine-show', false) },
      axisTick: { show: formatBool(config, 'yAxis-axisTick-show', false) },
      splitLine: { show: formatBool(config, 'yAxis-splitLine-show', false) },
      splitArea: { show: formatBool(config, 'yAxis-splitArea-show', false) },
      axisPointer: {
        show: formatBool(config, 'yAxis-axisPointer-show', false),
        type: config['yAxis-axisPointer-type'] || 'shadow'
      }
    }
  }
  if (checkPassed('grid', includeList, excludeList)) {
    result.grid = {
      show: !!config['grid-show'],
      left: config['grid-left'] || '8%',
      top: config['grid-top'] || '' + topDefault, //Set top height dependson whether title and sutitle  setting
      right: config['grid-right'] || '12%',
      bottom: config['grid-bottom'] || '' + bottomDefault,
      containLabel: config['grid-containLabel'] == undefined ? true : !!config['grid-containLabel']
    }
  }
  //

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
