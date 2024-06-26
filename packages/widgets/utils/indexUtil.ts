import { computed } from 'vue'
import DataModelHolder from '../../components/DataModelHolder.vue'
import DataModelFieldDrop from '../../components/DataModelFieldDrop.vue'

import { filterIndexOptions } from '../filter/index'
import { lcFormItem, widgetUtil, locale } from 'mttk-lowcode-engine'
import ThemeSelect from '../../components/themeSelect/index.vue'
import { checkPassed, displayInit } from './shareUtil'
//common used model config
export const commonMoldelConfig = [
  'filter',
  'rowLimit',
  'interval',
  'refresh',
  'showSQL',
  'showData'
]

export function buildModelFull(initConfig = {}, rawConfig = [] as any[]) {
  return {
    name: locale.t('bi.widgets.utils.indexUtil.title'),
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
        result.config.option.mode = true
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
            '~label': locale.t('bi.widgets.utils.indexUtil.drilling') + raw.substring(raw.length),
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
            '~label': locale.t('bi.widgets.utils.indexUtil.rowLimit'),
            '~description': locale.t('bi.widgets.utils.indexUtil.rowLimit_description'),
            '~hideSwitchButton': true,
            min: 0
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
                {
                  '~': 'el-option',
                  value: 'NONE',
                  label: locale.t('bi.widgets.utils.indexUtil.pagination_none')
                },
                {
                  '~': 'el-option',
                  value: 'CLIENT',
                  label: locale.t('bi.widgets.utils.indexUtil.pagination_client')
                },
                {
                  '~': 'el-option',
                  value: 'SERVER',
                  label: locale.t('bi.widgets.utils.indexUtil.pagination_server')
                }
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
                      {
                        '~': 'el-option',
                        value: 'SECOND',
                        label: locale.t('bi.widgets.utils.indexUtil.interval_second')
                      },
                      {
                        '~': 'el-option',
                        value: 'MINUTE',
                        label: locale.t('bi.widgets.utils.indexUtil.interval_minute')
                      }
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
            // console.log('Click refresh',key)
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
          '#': locale.t('bi.widgets.utils.indexUtil.showData'),
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
            '~description':
              raw.description || locale.t('bi.widgets.utils.indexUtil.dimension_description'),
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
            '~description':
              raw.description || locale.t('bi.widgets.utils.indexUtil.metric_description'),
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

//create left/top
function createLeftTop(prefix: string, defaultVal = {}) {
  return [
    widgetUtil.createSelect(
      prefix + '-left',
      [
        { label: locale.t('bi.widgets.utils.indexUtil.title-left_1'), value: 'left' },
        { label: locale.t('bi.widgets.utils.indexUtil.title-left_2'), value: 'center' },
        { label: locale.t('bi.widgets.utils.indexUtil.title-left_3'), value: 'right' },
        '4%',
        '8%',
        '12%',
        '8',
        '16',
        '32',
        '64'
      ],
      locale.t('bi.widgets.utils.indexUtil.title-left'),
      {
        '~default': defaultVal.left,
        'allow-create': true,
        '~description':
        locale.t('bi.widgets.utils.indexUtil.title-left_description')
      }
    ),
    widgetUtil.createSelect(
      prefix + '-top',
      [
        { label: locale.t('bi.widgets.utils.indexUtil.title-top_1'), value: 'top' },
        { label: locale.t('bi.widgets.utils.indexUtil.title-top_2'), value: 'middle' },
        { label: locale.t('bi.widgets.utils.indexUtil.title-top_3'), value: 'bottom' },
        '4%',
        '8%',
        '12%',
        '8',
        '16',
        '32',
        '64'
      ],
      locale.t('bi.widgets.utils.indexUtil.title-top'),
      {
        '~default': defaultVal.top,
        'allow-create': true,
        '~description':
        locale.t('bi.widgets.utils.indexUtil.title-top_description')
      }
    )
  ]
}

export function buildEchartsBaseUI({ includeList = undefined, excludeList = undefined } = {}) {
  const result = []
  //echarts related
  if (checkPassed('echarts', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': 'Echarts',

      _children: [
        widgetUtil.createBase(
          ThemeSelect,
          'echarts-theme',
          locale.t('bi.widgets.utils.indexUtil.echarts-theme'),
          { '~default': 'default' }
        ),
        widgetUtil.createSwitch('echarts-animation', locale.t('bi.widgets.utils.indexUtil.echarts-animation'), { '~default': true })
      ]
    })
  }
  //title
  if (checkPassed('title', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.title_label'),

      _children: [
        widgetUtil.createInput('title-text', locale.t('bi.widgets.utils.indexUtil.title-text')),
        widgetUtil.createInput(
          'title-subtext',
          locale.t('bi.widgets.utils.indexUtil.title-subtext')
        ),
        ...createLeftTop('title', { left: 'left', top: 'top' })
      ]
    })
  }

  //legend
  if (checkPassed('legend', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.legend_label'),

      _children: [
        widgetUtil.createSwitch('legend-show', locale.t('bi.widgets.utils.indexUtil._show'), { '~default': true }),
        ...createLeftTop('legend', { left: 'center' }),
        widgetUtil.createSelect(
          'legend-type',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.legend-type_1'), value: 'plain' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-type_2'), value: 'scroll' }
          ],
          locale.t('bi.widgets.utils.indexUtil.legend-type'),
          { '~default': 'scroll' }
        ),
        widgetUtil.createSelect(
          'legend-orient',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.legend-orient_1'), value: 'horizontal' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-orient_2'), value: 'vertical' }
          ],
          locale.t('bi.widgets.utils.indexUtil.legend-orient'),
          { '~default': 'horizontal' }
        ),
        widgetUtil.createSelect(
          'legend-icon',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_1'), value: 'circle' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_2'), value: 'rect' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_3'), value: 'roundRect' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_4'), value: 'triangle' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_5'), value: 'diamond' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_6'), value: 'pin' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_7'), value: 'arrow' },
            { label: locale.t('bi.widgets.utils.indexUtil.legend-icon_8'), value: 'none' }
          ],
          locale.t('bi.widgets.utils.indexUtil.legend-icon'),
          { '~default': 'roundRect' }
        )
      ]
    })
  }
  //grid
  if (checkPassed('grid', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.grid_label'),

      _children: [
        widgetUtil.createSwitch('grid-show',locale.t('bi.widgets.utils.indexUtil._show'), { '~default': false }),
        ...createLeftTop('grid', { left: '8%' }),
        widgetUtil.createInput('grid-right', locale.t('bi.widgets.utils.indexUtil.grid-right'), {
          '~default': '12%',
          '~description': locale.t('bi.widgets.utils.indexUtil._valueDescription')
        }),
        widgetUtil.createInput('grid-bottom', locale.t('bi.widgets.utils.indexUtil.grid-bottom'), {
          '~description': locale.t('bi.widgets.utils.indexUtil._valueDescription')
        }),
        widgetUtil.createSwitch('grid-containLabel', locale.t('bi.widgets.utils.indexUtil.grid-containLabel'), { '~default': true })
      ]
    })
  }
  //toolbox
  if (checkPassed('toolbox', includeList, excludeList)) {
    const featureList = [
      { label:locale.t('bi.widgets.utils.indexUtil.toolbox-feature_saveAsImage'), value: 'saveAsImage' },
      { label: locale.t('bi.widgets.utils.indexUtil.toolbox-feature_dataView'), value: 'dataView' }
    ]
    //dataZoom and restore only be added if dataZoom is possible
    if (checkPassed('dataZoom', includeList, excludeList)) {
      featureList.push({ label:locale.t('bi.widgets.utils.indexUtil.toolbox-feature_dataZoom'), value: 'dataZoom' })
      featureList.push({ label: locale.t('bi.widgets.utils.indexUtil.toolbox-feature_restore'), value: 'restore' })
    }

    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.toolbox_label'),

      _children: [
        // widgetUtil.createSwitch('toolbox-show','Show'),
        ...createLeftTop('toolbox', { left: 'right', top: 'top' }),
        widgetUtil.createSelect(
          'toolbox-orient',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.toolbox-orient_1'), value: 'horizontal' },
            { label: locale.t('bi.widgets.utils.indexUtil.toolbox-orient_2'), value: 'vertical' }
          ],
          locale.t('bi.widgets.utils.indexUtil.toolbox-orient'),
          { '~default': 'horizontal' }
        ),
        widgetUtil.createSelect('toolbox-feature', featureList, locale.t('bi.widgets.utils.indexUtil.toolbox-feature'), { multiple: true }),
        widgetUtil.createColorPicker(
          'toolbox-saveAsImage-backgroundColor',
          locale.t('bi.widgets.utils.indexUtil.toolbox-saveAsImage-backgroundColor'),
          {
            predefine: ['#000000', '#ffffff'],
            '~default': '#ffffff'
          }
        )
      ]
    })
    //
  }
  //dataZoom
  if (checkPassed('dataZoom', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.dataZoom_label'),

      _children: [
        widgetUtil.createSelect(
          'dataZoom-type',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.dataZoom-type_1'), value: 'inside' },
            { label: locale.t('bi.widgets.utils.indexUtil.dataZoom-type_2'), value: 'slider' }
          ],
          locale.t('bi.widgets.utils.indexUtil.dataZoom-type'),
          { multiple: true }
        )
      ]
    })
  }
  //xAxis
  if (checkPassed('xAxis', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.xAxis_label'),

      _children: [
        widgetUtil.createSwitch('xAxis-show', locale.t('bi.widgets.utils.indexUtil._show'), { '~default': true }),
        widgetUtil.createSelect(
          'xAxis-position',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.axis-position_bottom'), value: 'bottom' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-position_top'), value: 'top' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-position'),
          { '~default': 'bottom' }
        ),
        widgetUtil.createSelect(
          'xAxis-type',
          [
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_value'), value: 'value' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_category'), value: 'category' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_time'), value: 'time' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_log'), value: 'log' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-type'),
          { '~default': 'category' }
        ),
        widgetUtil.createSelect(
          'xAxis-nameLocation',
          [
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-nameLocation_start'), value: 'start' },
            { label: locale.t('bi.widgets.utils.indexUtil.axis-nameLocation_middle'), value: 'middle' },
            { label:locale.t('bi.widgets.utils.indexUtil.axis-nameLocation_end'), value: 'end' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-nameLocation'),
          { '~default': 'end' }
        ),
        widgetUtil.createSwitch('xAxis-axisLabel-show', locale.t('bi.widgets.utils.indexUtil.axis-axisLabel-show'), { '~default': true }),
        widgetUtil.createSwitch('xAxis-axisLine-show', locale.t('bi.widgets.utils.indexUtil.axis-axisLine-show'), { '~default': true }),
        widgetUtil.createSwitch('xAxis-axisTick-show', locale.t('bi.widgets.utils.indexUtil.axis-axisTick-show'), { '~default': true }),
        widgetUtil.createSwitch('xAxis-splitLine-show',locale.t('bi.widgets.utils.indexUtil.axis-splitLine-show'), { '~default': false }),
        widgetUtil.createSwitch('xAxis-splitArea-show', locale.t('bi.widgets.utils.indexUtil.axis-splitArea-show'), { '~default': false }),
        widgetUtil.createSwitch('xAxis-axisPointer-show', locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-show'), {
          '~default': false
        }),
        widgetUtil.createSelect(
          'xAxis-axisPointer-type',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type_line'), value: 'line' },
            { label: locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type_shadow'), value: 'shadow' },
            { label:locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type_none'), value: 'none' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type'),
          { '~default': 'line' }
        )
      ]
    })
  }
  //yAxis
  if (checkPassed('yAxis', includeList, excludeList)) {
    result.push({
      '~component': 'el-collapse',
      '~label': locale.t('bi.widgets.utils.indexUtil.yAxis_label'),

      _children: [
        widgetUtil.createSwitch('yAxis-show', locale.t('bi.widgets.utils.indexUtil._show'), { '~default': true }),
        widgetUtil.createSelect(
          'yAxis-position',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.axis-position_left'), value: 'left' },
            { label: locale.t('bi.widgets.utils.indexUtil.axis-position_right'), value: 'right' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-position'),
          { '~default': 'left' }
        ),
        widgetUtil.createSelect(
          'yAxis-type',
          [
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_value'), value: 'value' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_category'), value: 'category' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_time'), value: 'time' },
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-type_log'), value: 'log' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-type'),
          { '~default': 'value' }
        ),
        widgetUtil.createSelect(
          'yAxis-nameLocation',
          [
            { label:  locale.t('bi.widgets.utils.indexUtil.axis-nameLocation_start'), value: 'start' },
            { label: locale.t('bi.widgets.utils.indexUtil.axis-nameLocation_middle'), value: 'middle' },
            { label:locale.t('bi.widgets.utils.indexUtil.axis-nameLocation_end'), value: 'end' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-nameLocation'),
          { '~default': 'end' }
        ),
        widgetUtil.createSwitch('xAxis-axisLabel-show', locale.t('bi.widgets.utils.indexUtil.axis-axisLabel-show'), { '~default': true }),
        widgetUtil.createSwitch('xAxis-axisLine-show', locale.t('bi.widgets.utils.indexUtil.axis-axisLine-show'), { '~default': true }),
        widgetUtil.createSwitch('xAxis-axisTick-show', locale.t('bi.widgets.utils.indexUtil.axis-axisTick-show'), { '~default': true }),
        widgetUtil.createSwitch('xAxis-splitLine-show',locale.t('bi.widgets.utils.indexUtil.axis-splitLine-show'), { '~default': false }),
        widgetUtil.createSwitch('xAxis-splitArea-show', locale.t('bi.widgets.utils.indexUtil.axis-splitArea-show'), { '~default': false }),
        widgetUtil.createSwitch('xAxis-axisPointer-show', locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-show'), {
          '~default': false
        }),
        widgetUtil.createSelect(
          'xAxis-axisPointer-type',
          [
            { label: locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type_line'), value: 'line' },
            { label: locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type_shadow'), value: 'shadow' },
            { label:locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type_none'), value: 'none' }
          ],
          locale.t('bi.widgets.utils.indexUtil.axis-axisPointer-type'),
          { '~default': 'line' }
        )
      ]
    })
  }
  //
  return result
}
