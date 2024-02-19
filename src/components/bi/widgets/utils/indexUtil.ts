import DataModelHolder from '../../components/DataModelHolder.vue'
import DataModelFieldDrop from '../../components/DataModelFieldDrop.vue'
import { displayInit } from '../../utils/biTool'
import {computed} from 'vue'
export function buildModel(rawConfigs) {
  return function ({ config, context, key, fullConfig }) {
    const result = {
      '~': DataModelHolder,
      '~modelValue': config,
      app: context.appContext.getKey(),
      request: context.appContext.globalContext.request,
      '#': []
    }
    //
    parse(result)

    //
    return result

    function parse(result) {
      for (const raw of rawConfigs || []) {
        if (typeof raw == 'string') {
          //String means it it a sort/filter/dimension/metric/drilling/refresh,otherwise raise exception
          result['#'].push(parseString(raw))
        } else if (typeof raw == 'object') {
          //
          result['#'].push(parseObject(raw))
        } else if (typeof raw == 'function') {
          result['#'].push(raw({ config, context, key, fullConfig }))
        } else {
          result['#'].push(raw)
        }
      }
    }
    function parseString(raw: string = '') {
      //
      if (raw.startsWith('sort')) {
        //TBD,not implement yet
      } else if (raw.startsWith('filter')) {
        //TBD,not implement yet
      } else if (raw.startsWith('dimension')) {
        //
        return {
          '~': 'el-form-item',
          label: '维度',
          prop: raw,
          '#': {
            '~': DataModelFieldDrop,
            '~modelValue': config,
            prop: raw,
            option: { maxRow: 1 }
          }
        }
      } else if (raw.startsWith('metric')) {
        //
        return {
          '~': 'el-form-item',
          label: '度量',
          prop: raw,
          '#': {
            '~': DataModelFieldDrop,
            '~modelValue': config,
            prop: raw,
            option: {}
            // checkDrop: checkAllowDropMetric
          }
        }
      } else if (raw.startsWith('drilling')) {
        //
        return {
          '~': 'el-form-item',
          label: '钻取',
          prop: raw,
          '#': {
            '~': DataModelFieldDrop,
            '~modelValue': config,
            prop: raw,
            option: { maxRow: 10 }
          }
        }
      } else if (raw.startsWith('refresh')) {
        //
        return {
          '~': 'el-form-item',
          '#': {
            '~': 'el-button',
            type: 'primary',
            '#': '刷新图表',
            style: { width: '100%' },
            '@click': function () {
              context.mitt.emit('bi-chart-reload-' + key, { reset: true, showError: true })
            }
          }
        }
      } else {
        throw 'Unspoported config:' + raw
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
        //
        return {
          '~': 'el-form-item',
          label: raw.label || '维度',
          prop: raw.prop || 'dimension',
          '#': {
            '~': DataModelFieldDrop,
            '~modelValue': config,
            prop: raw.prop || 'dimension',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || { maxRow: 1 }
          }
        }
      } else if (type == 'metric') {
        //
        return {
          '~': 'el-form-item',
          label: raw.label || '度量',
          prop: raw.prop || 'metric',
          '#': {
            '~': DataModelFieldDrop,
            '~modelValue': config,
            prop: raw.prop || 'metric',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || {}
          }
        }
      } else if (type == 'drilling') {
        //
        return {
          '~': 'el-form-item',
          label: raw.label || '钻取',
          prop: raw.prop || 'drilling',
          checkDrop: raw.checkDrop || undefined,
          '#': {
            '~': DataModelFieldDrop,
            '~modelValue': config,
            prop: raw.prop || 'drilling',
            option: raw.option || { maxRow: 10 }
          }
        }
      } else if (type == 'normal') {
        //  normal item
        return {
          '~': 'el-form-item',
          label: raw.label||'',
          prop: raw.prop,
          '#': {
            ...raw.item||{'~': 'el-input'},
            '~modelValue': computed({
              get: () => config[raw.prop],
              set: (val) => {
                config[raw.prop] = val
              }
            })
          }
        }
      }
    }
  }
}

export function buildOtherProp() {
  return {
    data: {
      type: 'Array',
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
      hide: true,
      init: displayInit
    }
  }
}
