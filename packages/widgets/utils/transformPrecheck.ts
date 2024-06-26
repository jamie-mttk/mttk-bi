import { ElMessage } from 'element-plus'
import VChart from 'vue-echarts'
import { locale } from 'mttk-lowcode-engine'
//precheck ,return reasonable component if check failed
export function precheck(
  { config, data, context, key, contextWrap, fullConfig },
  validateRules,
  validate
) {

  //
  if (
    preValidate(
      { config, data, context, key, contextWrap, fullConfig },
      validateRules,
      validate,
      false
    )
  ) {
    if (!data.value || Object.keys(data.value).length == 0) {
      //This means data is not loaded,so show loading
      //Validate passed, consider the chart will be loaded later,so show a loading screen
      //this will cause chart not auto reloaded
      //  return loadingComponent(config)
      return undefined

    } else {
      //
      return undefined
    }
  } else {
    //Otherwise show prompt that the necessary information is not input so echart can not be shown
    return emptyComponent(fullConfig, context)
  }
}
//
//false,validate faled
//true,validate passed
export function preValidate(
  { config, data, context, key, contextWrap, fullConfig },
  validateRules = [],
  validate,
  showError
) {

  //General
  //
  if (!fullConfig?.config?.model?.dataModel) {
    if (showError) {
      ElMessage.error(locale.t('bi.widgets.utils.transformPrecheck.chooseModel'))
    }
    return false
  }
  if (fullConfig?.config?.model?.drilling?.length > 0) {
    //If drilling exist, it the first column should be same as the first dimension
    if (fullConfig.config.model.drilling[0].key != fullConfig.config.model.dimension[0].key) {
      if (showError) {
        ElMessage.error(locale.t('bi.widgets.utils.transformPrecheck.drillingError1'))
      }
      return false
    }
    //Check _format_datetime equal
    if (
      (fullConfig.config.model.drilling[0]._format_datetime || '') !=
      (fullConfig.config.model.dimension[0]._format_datetime || '')
    ) {
      if (showError) {
        ElMessage.error(locale.t('bi.widgets.utils.transformPrecheck.drillingError2'))
      }
      return false
    }
  }
  //validate rules

  for (const rule of validateRules) {
    if (rule.key == '_dimensionAndMetric') {
      if (rule.eq != undefined) {
        if (
          (fullConfig.config.model.dimension?.length || 0) +
            (fullConfig.config.model.metric?.length || 0) !=
          rule.eq
        ) {
          if (showError) {
            ElMessage.error(
              locale.t('bi.widgets.utils.transformPrecheck.metricAndDimensionError1', [rule.eq])
            )
          }
          return false
        }
      } else if (rule.min != undefined) {
        if (
          (fullConfig.config.model.dimension?.length || 0) +
            (fullConfig.config.model.metric?.length || 0) <
          rule.min
        ) {
          if (showError) {
            ElMessage.error(
              locale.t('bi.widgets.utils.transformPrecheck.metricAndDimensionError2', [rule.eq])
            )
          }
          return false
        }
      } else if (rule.max != undefined) {
        if (
          (fullConfig.config.model.dimension?.length || 0) +
            (fullConfig.config.model.metric?.length || 0) >
          rule.max
        ) {
          if (showError) {
            ElMessage.error(
              locale.t('bi.widgets.utils.transformPrecheck.metricAndDimensionError3', [rule.eq])
            )
          }
          return false
        }
      }
      //rule passed
      continue
    }
    //
    if (!fullConfig?.config?.model[rule.key]) {
      if (rule.min > 0) {
        if (showError) {
          ElMessage.error(
            locale.t('bi.widgets.utils.transformPrecheck.ruleMinError1', [
              rulKeyToLabel(rule.key),
              rule.min
            ])
          )
        }
        return false
      } else {
        continue
      }
    }
    if (fullConfig?.config?.model[rule.key].length < rule.min) {
      if (showError) {
        ElMessage.error(
          locale.t('bi.widgets.utils.transformPrecheck.ruleMinError2', [
            rulKeyToLabel(rule.key),
            rule.min
          ])
        )
      }
      return false
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
      return false
    }
  }
  //
  return true
}
//
function rulKeyToLabel(key) {
  if (key.startsWith('dimension')) {
    return locale.t('bi.widgets.utils.transformPrecheck.dimension')
  } else if (key.startsWith('metric')) {
    return locale.t('bi.widgets.utils.transformPrecheck.metric')
  } else {
    return key
  }
}
//show a loading echart
function loadingComponent(config) {
  return {
    '~component': VChart,
    style: { 'min-height': '64px', 'min-width': '64px' },
    autoresize: true,
    option: {},
    theme: config['echarts-theme'] || 'default',
    'init-options': { renderer: 'canvas' },
    'manual-update': true,
    loading: true
  }
}
//
function emptyComponent(fullConfig, context) {
  //Find icon
  // console.log(fullConfig.type,context.appContext.globalContext.componentRepository.componentByKey(fullConfig.type))
  //
  const componentConfig = findComponentConfig(fullConfig, context)
  //
  return {
    '~': 'el-empty',
    description:
      (componentConfig ? '[ ' + componentConfig.name + ' ] ' : '') +
      locale.t('bi.widgets.utils.transformPrecheck.empty'),
    '#image': {
      '~': 'lc-icon',
      icon: componentConfig?.icon || 'mdiChartBoxOutline',
      size: '12em'
    }
  }
}

function findComponentConfig(fullConfig, context) {
  if (!fullConfig.type) {
    return
  }
  //
  return context.appContext.globalContext.componentRepository.componentByKey(fullConfig.type)
}
