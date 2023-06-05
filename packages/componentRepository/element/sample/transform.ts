import { ref, isRef, isReactive, unref } from 'vue'
import { formTransform } from '../form/transform'
import { buttonTransform } from '../button/transform'
import { paginationTransform } from '../pagination/transform'
import { tableTransform } from '../table/transform'

export function sampleTransform(config: any, data: any, context) {
  //This is a tricky to save different copy of data for different pages
  const formData = ref(context.d.g('formData') || {})
  const queryResult = ref(context.d.g('queryResult') || {})
  context.d.s('formData', formData)
  context.d.s('queryResult', queryResult)

  const result = {
    sys: {
      component: 'el-row'
    },
    props: {},
    slots: {
      default: [
        {
          sys: { component: 'el-col' },
          props: { span: 24 },
          slots: { default: buildForm() },
          styles: { margin: '10px 0' }
        },
        {
          sys: { component: 'el-col' },
          props: { span: 4 },
          slots: { default: buildButton() }
        },
        {
          sys: { component: 'el-col' },
          props: { span: 20 },
          slots: { default: buildPagination() }
        },
        {
          sys: { component: 'el-col' },
          props: { span: 24 },
          slots: { default: buildTable() },
          styles: { margin: '10px 0' }
        }
      ]
    },
    lifecycle: {
      onMounted: function (wrapperContext) {
        context.emitter.on('table-row-dbclick', (e) => {
          console.log(unref(wrapperContext).emit)
          unref(wrapperContext).emit('table-row-dbclick2', e)
          //
          console.log('table-row-dbclick2 triggered')
        })
      }
    }
  }

  //
  return result

  function buildForm() {
    //default config
    const configDefault = {
      inline: true,
      'label-position': 'left',
      'label-width': '120px',
      items: []
    }
    //User config
    const configUser = filterConfigWithPrefix(config, '_form_')
    //
    const configRaw = Object.assign(configDefault, configUser)
    const translated = formTransform(configRaw, formData)
    //Assign instanceKey so later we could use this key to get form ref
    translated.sys.instanceKey = '_form_1'

    return translated
  }

  function buildButton() {
    //default config
    const configDefault = { type: 'primary', label: 'Search' }
    //User config
    const translated = buttonTransform(configDefault)
    //Add event
    translated.events = {}
    translated.events.click = queryData
    //
    return translated
  }

  function buildPagination() {
    //default config
    const configDefault = {
      layout: '->,sizes,prev, pager, next, jumper, total',
      'pager-count': 7,
      small: false,
      background: false,
      'page-sizes': '[10, 20, 30, 40, 50, 100]',
      disabled: false,
      'hide-on-single-page': false,
      _sync_to_data: true,
      '_key-current-page': 'page',
      '_key-total': 'total',
      '_key-page-size': 'size'
    }
    //User config
    const translated = paginationTransform(configDefault, queryResult)
    //Add event
    translated.events = {}
    translated.events['update:current-page'] = function (wapperContext, pageNew) {
      queryResult.value.page = pageNew
    }
    translated.events['update:page-size'] = function (wapperContext, sizeNew) {
      queryResult.value.size = sizeNew
    }
    translated.events['size-change'] = queryData
    translated.events['current-change'] = queryData
    //
    return translated
  }

  function buildTable() {
    //default config
    const configDefault = {
      border: true,
      'empty-text': 'No data is found!',
      columns: []
    }
    //User config
    const configUser = filterConfigWithPrefix(config, '_table_')
    //
    const configRaw = Object.assign(configDefault, configUser)
    const translated = tableTransform(configRaw, queryResult.value['rows'] || [])
    //Add event
    translated.events = {}
    translated.events['row-dblclick'] = function () {
      // console.log('context emit... from '+context.test )
      context.emitter.emit('table-row-dbclick', arguments)
    }
    //
    return translated
  }
  function filterConfigWithPrefix(config: any, prefix: string) {
    const result = {}
    for (const k of Object.keys(config) || []) {
      if (k.startsWith(prefix)) {
        result[k.substring(prefix.length)] = config[k]
      }
    }
    //
    return result
  }

  function queryData(wrapContext) {
    const getRef = wrapContext.getRef
    const formInstance = getRef('_form_1')
    formInstance.validate((valid, fields) => {
      if (valid) {
        //Prepare request parameters
        const requestParas = Object.assign({}, formData.value)
        requestParas.page = queryResult.value.page
        requestParas.size = queryResult.value.size
        //console.log(JSON.stringify(requestParas))

        //Get request
        const request = context.getAppContext().getGlobalContext().request
        //remote call
        //
        request({
          url: config['_api_url'],
          method: 'GET',
          params: requestParas || {}
        }).then((res) => {
          //handle response

          //
          queryResult.value = res

          // //
          // console.log('queryResult:' + JSON.stringify(queryResult.value))
          // console.log('formData:' + JSON.stringify(formData.value))
        })
      } else {
        alert('validate failed')
        //console.log(fields)
      }
    })
  }
}
