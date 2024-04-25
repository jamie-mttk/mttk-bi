import { computed } from 'vue'
import DataModelHolder from '../../components/DataModelHolder.vue'
import DataModelFieldDrop from '../../components/DataModelFieldDrop.vue'

import { displayInit } from '../../utils/biTool'
import { filterIndexOptions } from '../filter/index'
import { lcFormItem, widgetUtil,locale } from 'mttk-lowcode-engine'
import ThemeSelect from '../../components/themeSelect/index.vue'
//common used model config
export const commonMoldelConfig=['filter','rowLimit','interval','refresh','showSQL','showData']

export function buildModelFull(initConfig = {}, rawConfig = [] as any[]) {
  
  return {
    name: locale.t('bi.widgets.utils.indexUtil.title') ,
    // name: locale.t('_._.ok') ,
    sequence: 1,
    init: initConfig,
    ui: buildModel(rawConfig)
  }
}

export function buildModel(rawConfig) {
  return function ({ config, context, key, fullConfig }) {
    const result = {
      '~': DataModelHolder,
      '~modelValue': fullConfig,

      '#': []
    }
    //
    parse()

    //
    return result

    function parse() {
      for (const raw of rawConfig || []) {
        if (typeof raw == 'string') {
          //String means it it a sort/filter/dimension/metric/drilling/refresh,otherwise raise exception
          const r = parseString(raw)
          if (Array.isArray(r)) {
            for (const item of r) {
              result['#'].push(item)
            }
          } else {
            result['#'].push(r)
          }
        } else if (typeof raw == 'object') {
          //
          const r = parseObject(raw)
          if (Array.isArray(r)) {
            for (const item of r) {
              result['#'].push(item)
            }
          } else {
            result['#'].push(r)
          }
        } else if (typeof raw == 'function') {
          result['#'].push(raw({ config, context, key, fullConfig }))
        } else {
          result['#'].push(raw)
        }
      }
    }
    function parseString(raw: string = '') {
      //
      if (raw == 'filter') {
        const result = {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': locale.t('bi.widgets.utils.indexUtil.filter'),
            '~description': locale.t('bi.widgets.utils.indexUtil.filter_description'),
            '~hideSwitchButton': true,
            prop: raw,
            ...filterIndexOptions(true)
          }
        }
        //Set mode to true so the edit dialog UI will be a little different between filter in model and it is a pure filter
        result.config.option.mode=true
        //
        return result
      } else if (raw.startsWith('dimension')) {
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': locale.t('bi.widgets.utils.indexUtil.dimension') + raw.substring(raw.length),
            '~description': locale.t('bi.widgets.utils.indexUtil.dimension_description'),
            '~hideSwitchButton': true,
            prop: raw,
            option: { maxRow: 1 }
          }
        }
      } else if (raw.startsWith('metric')) {
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': locale.t('bi.widgets.utils.indexUtil.metric') + raw.substring(raw.length),
            '~description': locale.t('bi.widgets.utils.indexUtil.metric_description'),
            '~hideSwitchButton': true,
            prop: raw,
            option: {}
          }
        }
      } else if (raw.startsWith('drilling')) {
  
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label':locale.t('bi.widgets.utils.indexUtil.drilling') + raw.substring(raw.length),
            '~description': locale.t('bi.widgets.utils.indexUtil.drilling_description'),
            '~hideSwitchButton': true,
            prop: raw,
            option: { maxRow: 10 }
          }
        }
      } else if (raw.startsWith('rowLimit')) {

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': 'el-input-number',
            '~prop': raw,
            '~label':locale.t('bi.widgets.utils.indexUtil.rowLimit'),
            '~description':locale.t('bi.widgets.utils.indexUtil.rowLimit_description'),
            '~hideSwitchButton': true,
            min:0,
            // controls: false
          }
        }
      } else if ('pagination' == raw) {
        //
        return [
          {
            '~': 'el-form-item',
            label: locale.t('bi.widgets.utils.indexUtil.pagination'),
            prop: 'pagination_mode',
            '#': {
              '~': 'el-select',
              '~modelValue': computed({
                get: () => config.pagination?.mode || 'NONE',
                set: (val) => {
                  if (!config.pagination) {
                    config.pagination = {}
                  }
                  config.pagination.mode = val
                }
              }),
              '#': [
                { '~': 'el-option', value: 'NONE', label: locale.t('bi.widgets.utils.indexUtil.pagination_none') },
                { '~': 'el-option', value: 'CLIENT', label: locale.t('bi.widgets.utils.indexUtil.pagination_client') },
                { '~': 'el-option', value: 'SERVER', label: locale.t('bi.widgets.utils.indexUtil.pagination_server') }
              ]
            }
          },
          {
            '~': 'el-form-item',
            label: locale.t('bi.widgets.utils.indexUtil.pagination_size'),
            prop: 'pagination_size',
            controls: false,
            '#': {
              '~': 'el-input-number',
              '~modelValue': computed({
                get: () => config.pagination?.size || 10,
                set: (val) => {
                  if (!config.pagination) {
                    config.pagination = {}
                  }
                  config.pagination.size = val
                }
              })
            }
          }
        ]
      } else if (raw.startsWith('interval')) {
        return [
          {
            '~': 'el-form-item',
            label: locale.t('bi.widgets.utils.indexUtil.interval'),
            prop: 'interval',
            '#': [
              {
                '~': 'div',
                style: { display: 'flex', 'justify-content': 'space-between' },
                '#': [
                  {
                    '~': 'el-switch',

                    //Use string as value because it is easy to change this controller to select to support CRON later
                    'active-value': 'simple',
                    'inactive-value': 'none',
                    size: 'small',
                    min: 1,
                    '~modelValue': computed({
                      get: () => config.interval?.mode || 'none',
                      set: (val) => {
                        if (!config.interval) {
                          config.interval = {}
                        }
                        config.interval.mode = val
                      }
                    })
                  },
                  {
                    '~': 'el-input-number',
                    '~show': computed(() => config.interval?.mode == 'simple'),
                    controls: false,
                    style: { padding: ' 0px 4px' },
                    size: 'small',
                    '~modelValue': computed({
                      get: () => config.interval?.value || 10,
                      set: (val) => {
                        if (!config.interval) {
                          config.interval = {}
                        }
                        config.interval.value = val
                      }
                    })
                  },
                  {
                    '~': 'el-select',
                    '~show': computed(() => config.interval?.mode == 'simple'),
                    size: 'small',
                    '~modelValue': computed({
                      get: () => config.interval?.unit || 'SECOND',
                      set: (val) => {
                        if (!config.interval) {
                          config.interval = {}
                        }
                        config.interval.unit = val
                      }
                    }),
                    '#': [
                      { '~': 'el-option', value: 'SECOND', label:locale.t('bi.widgets.utils.indexUtil.interval_second') },
                      { '~': 'el-option', value: 'MINUTE', label: locale.t('bi.widgets.utils.indexUtil.interval_minute') }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      } else if (raw.startsWith('refresh')) {
        //
        return {
          '~': 'el-button',
          type: 'primary',
          '#': locale.t('bi.widgets.utils.indexUtil.refresh'),
          // Set margin-eft is beacause element will auto add 12px if there is a button before
          style: { width: '100%', 'margin-left': '0px', 'margin-top': '10px' },
          '@click': function () {
            context.mitt.emit('bi-chart-reload-' + key, { reset: true, showError: true })
          }
        }
      } else if (raw.startsWith('showSQL')) {
        //
        return {
          '~': 'el-button',
          type: '',
          '#': locale.t('bi.widgets.utils.indexUtil.showSQL'),
          style: { width: '100%', 'margin-left': '0px', 'margin-top': '4px' },
          '@click': function () {
            context.mitt.emit('bi-chart-action-' + key, { action: 'showSQL' })
          }
        }
      } else if (raw.startsWith('showData')) {
        //
        return {
          '~': 'el-button',
          type: '',
          '#':locale.t('bi.widgets.utils.indexUtil.showData'),
          style: { width: '100%', 'margin-left': '0px', 'margin-top': '4px' },
          '@click': function () {
            context.mitt.emit('bi-chart-action-' + key, { action: 'showData' })
          }
        }
      } else {
        //DO nOT THROW ERROR
        console.log('Unspoported config:' + raw)
      }
    }
    //
    function parseObject(raw: any = {}) {
      //
      const type = raw['_type']
      if (!type) {
        //no _type attribute, assume it is an normal configuration,return directly
        return raw
      }
      //
      if (type == 'sort') {
        //TBD,not implement yet
      } else if (type == 'filter') {
        //TBD,not implement yet
      } else if (type == 'dimension') {

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~label': raw.label || locale.t('bi.widgets.utils.indexUtil.dimension'),
            '~description': raw.description || locale.t('bi.widgets.utils.indexUtil.dimension_description'),
            '~hideSwitchButton': true,
            prop: raw.prop || 'dimension',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || { maxRow: 1 }
          }
        }
      } else if (type == 'metric') {

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,

            '~label': raw.label || locale.t('bi.widgets.utils.indexUtil.metric'),
            '~description': raw.description || locale.t('bi.widgets.utils.indexUtil.metric_description'),
            '~hideSwitchButton': true,
            prop: raw.prop || 'metric',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || {}
          }
        }
      } else if (type == 'drilling') {

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,

            '~label': raw.label || locale.t('bi.widgets.utils.indexUtil.drilling'),
            '~description':
              raw.description || locale.t('bi.widgets.utils.indexUtil.drilling_description'),
            '~hideSwitchButton': true,
            prop: raw.prop || 'drilling',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || { maxRow: 10 }
          }
        }
      } else if (type == 'normal') {
        //  normal item

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~label': raw.label || '',
            '~prop': raw.prop,
            ...(raw.item || { '~': 'el-input' })
          }
        }
      }
    }
  }
}

export function buildOtherProp({ initDisplay = true, initStyle = {} } = {}) {
  return {
    data: {
      type: 'Object',
      hide: true,
      skip: true,
      init: function ({ key }) {
        return {
          mode: 'data',
          dataKey: 'data_bi_charts_' + key
        }
      }
    },
    event: false,
    display: {
      hide: false,
      init: initDisplay ? displayInit({ initStyle }) : {}
    }
  }
}

export function buildEchartsBaseUI() {
  return [
    widgetUtil.createBase(ThemeSelect, 'echarts-theme', locale.t('bi.widgets.utils.indexUtil.echarts-theme')),
    widgetUtil.createInput('title-text',locale.t('bi.widgets.utils.indexUtil.title-text')),
    widgetUtil.createInput('title-subtext', locale.t('bi.widgets.utils.indexUtil.title-subtext'))
  ]
}
