import { unref, ref, computed } from 'vue'

import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { dynamicRender } from 'mttk-vue-wrap'
import ExtendTableColumn from '../../components/ExtendTableColumn.vue'
import {locale} from 'mttk-lowcode-engine'
//
const { copy, isSupported } = useClipboard()
//Functions insdide transform
export function showSQL(context, data) {
  //get data
  const sqls = unref(data).sqls || []
  //
  const timecost = computed(() => {
    const cost = unref(data).timecost
    if (cost >= 1000) {
      return cost / 1000 + ' '+locale.t('bi.widgets.utils.chartActionUtil.second')
    } else {
      return cost + ' '+locale.t('bi.widgets.utils.chartActionUtil.millsecond')
    }
  })

  let content = undefined
  if (!sqls || sqls.length == 0) {
    content = { '~': 'el-empty', description: locale.t('bi.widgets.utils.chartActionUtil.noSQL') }
  } else {
    content = { '~': 'el-form', 'label-position': 'top', '#': [] }

    //time cost
    content['#'].push({
      '~': 'el-form-item',
      label: locale.t('bi.widgets.utils.chartActionUtil.timecost'),
      '#': {
        '~': 'el-input',
        '~modelValue': timecost,
        readonly: true
      }
    })

    //
    for (const sql of sqls) {
      //
      content['#'].push(buildTextArea(sql.type,sql.sql,6))
    }
  }

  const visible = ref(false)
  const config = {
    '~': 'el-drawer',
    '~modelValue': visible,
    title: locale.t('bi.widgets.utils.chartActionUtil.showSQL'),
    direction: 'btt',
    size: '75%',
    '#': content
  }
  dynamicRender(config, context.appContext.globalContext.vueApp._context, {
    removeEvent: 'close'
  })
  visible.value = true
}

export function showData(context, data, fullConfig) {
  //get data
  const dt = unref(data).data || []
  const content =
    !dt || dt.length == 0
      ? { '~': 'el-empty', description: locale.t('bi.widgets.utils.chartActionUtil.noData') }
      : buildDataTable(dt, fullConfig)

  const visible = ref(false)
  const config = {
    '~': 'el-drawer',
    '~modelValue': visible,
    title: locale.t('bi.widgets.utils.chartActionUtil.showData'),
    direction: 'btt',
    size: '80%',
    '#': content
  }
  dynamicRender(config, context.appContext.globalContext.vueApp._context, {
    removeEvent: 'close'
  })
  visible.value = true
}

export function showLoadDataError(globalContext, error,fullConfig?) {
  //
  const content = {
    '~': 'el-form',
    'label-position': 'top',
    '#': [
      buildTextArea(locale.t('bi.widgets.utils.chartActionUtil.errorMessage'),error.message,2),
      buildTextArea('SQL',error.sql,4),
      buildTextArea(locale.t('bi.widgets.utils.chartActionUtil.errorDetail'),error.detail,6),      
    ]
  }

  //

  const visible = ref(false)
  const config = {
    '~': 'el-drawer',
    '~modelValue': visible,
    title: locale.t('bi.widgets.utils.chartActionUtil.errorLoadData',[(fullConfig?.key||'')]),
    direction: 'btt',
    size: '80%',
    '#': content
  }
  dynamicRender(config,globalContext.vueApp._context, {
    removeEvent: 'close'
  })
  visible.value = true
}

function buildDataTable(data, fullConfig) {
  //store table columns
  const columns = []
  //Used to store all dimensions and  metrics,used to convert data is needed
  //If dump mode==JSON, no need to convert so set it value to undefined
  //Otherwise set to empty array
  const dimenionAndMetric = fullConfig?.config?.model?.dumpMode == 'JSON' ? undefined : []
  //
  const result = {
    '~component': 'el-table',
    style: { height: '100%' },
    border: true,
    stripe: true,
    '#': columns
  }
  //Index column
  columns.push({
    '~': 'el-table-column',
    type: 'index',
    label: '#',
    width: '50',

  })
  //
  parseColumns()
  //
  result.data = buildData()
  //
  return result

  //parse columns from metric and dimension
  function parseColumns() {
    parseColumnsPrefix('dimension')
    parseColumnsPrefix('metric')
  }
  function parseColumnsPrefix(prefix) {
    for (const k of Object.keys(fullConfig.config.model || {})) {
      if (!k.startsWith(prefix)) {
        continue
      }
      const value = fullConfig.config.model[k]
      for (const c of value) {
        //add a new column
        columns.push({
          '~': ExtendTableColumn,
          prop: c.id,
          label: c.label || c.key,
          sortable:true
          // 'class-name':'show-data-'+prefix
        })
        //
        if (dimenionAndMetric != undefined) {
          dimenionAndMetric.push(c)
        }
      }
    }
  }
  function buildData() {
    if (dimenionAndMetric == undefined) {
      //no need to convert
      return data
    }
    //
    const dataConerted = []
    let ifFirstLine = true
    for (const dt of data) {
      if (ifFirstLine) {
        //Skip first line
        ifFirstLine = false
        continue
      }
      //
      const d = {}
      dataConerted.push(d)
      for (let i = 0; i < Math.min(dt.length, dimenionAndMetric.length); i++) {
        //
        d[dimenionAndMetric[i].id] = dt[i]
      }
    }
    //
    // console.log(JSON.stringify(dataConerted,null,2))
    //
    return dataConerted
  }
}


function buildTextArea(label,data,rows=6){
  return {
    '~': 'el-form-item',
    '#label': {
      '~': 'div',
      '#': [
        label,
        {
          '~': 'lc-icon',
          '~show': isSupported,
          icon: 'mdiContentCopy',
          tooltip: locale.t('bi.widgets.utils.chartActionUtil.copyTip'),
          style: { cursor: 'pointer', 'margin-left': '10px' },
          '@click': function () {
            copy(data)
            ElMessage({
              message: locale.t('bi.widgets.utils.chartActionUtil.copyDone'),
              type: 'success'
            })
          }
        }
      ]
    },
    '#': {
      '~': 'el-input',
      '~modelValue': data,
      type: 'textarea',
      rows: rows,
      readonly: true
    }
  }
}