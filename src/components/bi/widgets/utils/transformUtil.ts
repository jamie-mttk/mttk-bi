import VChart from 'vue-echarts'
import { ElMessage } from 'element-plus'
import { useIntervalFn } from '@vueuse/core'
import { wrapResult } from '../../utils/biTool'

import buildFilters from './buildFilters'
import buildDrilling from './buildDrilling'
import { deepCopy } from '@/utils/tools'
import { unref, ref } from 'vue'
//

import {showSQL,showData} from './chartActionUtil'

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
      if (!fullConfig?.config?.model?.dataModel) {
        if (showError) {
          ElMessage.error('请选择数据模型')
        }
        return
      }
      if (fullConfig?.config?.model?.drilling?.length > 0) {
        //If drilling exist, it the first column should be same as the first dimension
        if (fullConfig.config.model.drilling[0].key != fullConfig.config.model.dimension[0].key) {
          if (showError) {
            ElMessage.error('钻取的第一个参数必须和维度的第一个参数相同')
          }
          return
        }
        //Check _format_datetime equal
        if ((fullConfig.config.model.drilling[0]._format_datetime||'') != (fullConfig.config.model.dimension[0]._format_datetime||'')) {
          if (showError) {
            ElMessage.error('钻取的第一个参数时间日期时间转换必须相同')
          }
          return
        }
      }
      //validate rules
      for (const rule of validateRules) {
        if (
          !fullConfig?.config?.model[rule.key] ||
          fullConfig?.config?.model[rule.key].length < rule.min
        ) {
          if (showError) {
            ElMessage.error((rule.label || rule.key) + '数量小于设置值:' + rule.min)
          }
          return
        }
      }
      //
      if (validate) {
        const validateResult = validate({ config, data, context, key, contextWrap, fullConfig })
        if (validateResult) {
          if (showError) {
            ElMessage.error(validateResult)
          }
          //
          return
        }
      }

      //
      if (reset) {
        drilling.reset()
      }

      //
      const modelConfig = deepCopy(fullConfig?.config?.model || {})
      //set the pagination if required
      const page = context.d.g('data_bi_charts_pagination_' + key)
      if (page && 'SERVER' == modelConfig?.pagination?.mode) {
        modelConfig.pagination.page = page
      }

      const filters = buildFilters(context, fullConfig?.config?.model.dataModel)
      //Add
      drilling.handle(modelConfig, filters)
      //
      const requestBody = { config: modelConfig, filters }
      //Here to build filter

      //
      const request = context.appContext.globalContext.request
      request.post('/bi/build', requestBody).then(function (response) {
        //
        context.d.s(fullConfig.config.data.dataKey, response)
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
          showSQL(context,data)
        } else if ('showData' == action) {
          showData(context,data,fullConfig)
        }
      })
      //Filter reload
      context.mitt.on('bi_filter_reload', function (dataModel) {
        if (fullConfig?.config?.model?.dataModel == dataModel) {
          reload({ reset: false, showError: true })
        }
      })
      //Interval,auto load
      initInterval();
    }
    result['^onUnmounted'] = function () {
    
      context.mitt.off('bi-chart-reload-' + key)
      context.mitt.off('bi-chart-action-' + key)
      context.mitt.off('bi_filter_reload')
      //
      resetInterval();
    }
    //Used to clean the interval created during onMounted
    //Please note reload will not trigger onMounted again, so a funciton level variable is OK 
    let pauseSaved=undefined
    //
    function initInterval(){
      // console.log('=================>^onMounted',key)
      resetInterval();
      //
      if('simple'!=fullConfig?.config?.model?.interval?.mode){
        return
      }
      //
      let intervalValue=fullConfig?.config?.model?.interval?.value||10
      //convert to second
      if('MINUTE'==fullConfig?.config?.model?.interval?.unit){
        intervalValue*=60
      }
      //convert to millsecond
      intervalValue*=1000
      // console.log('interval time is set to '+intervalValue)
      //
      const {pause}= useIntervalFn(() => {
        reload({ reset: true, showError: false })

    }, intervalValue)
      //
      pauseSaved=pause

    }
    function resetInterval(){
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~^onUnmounted',key)

      if(pauseSaved && typeof pauseSaved=='function'){
        pauseSaved()
      }
    }
    //
    //wrap inside a div
    return wrapResult(context, result, drilling.buildFooter())

  

  }
}

export function buildTransformEcharts(
  buildOption: Function,
  validateRules = [] as any[],
  validate?: Function
) {
  return buildTransform(
    function ({ config, data, context, key, contextWrap, fullConfig }) {
      //
      const option = buildOption({ config, data, context, key, contextWrap, fullConfig })

      //
      option.dataset = {}
      option.dataset.source = unref(data).data || []
      //
      return {
        '~component': VChart,
        autoresize: true,
        option: option,
        theme:'default',
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
