import { echartsTransform } from './transform'
import { computed, unref } from 'vue'
//
 const echartsTypicalConfig = {
  key: '_echartsTypical',
  name: 'Echarts Typical',
  description: '',
  icon: 'mdiChartBarStacked',
  sequence: 1,
  transform: echartsTransform,
  editor: {
    basic: {
      init: {
        'xAxis-type': 'category',
        'yAxis-type': 'value'
      },
      ui: function ({config}) {
        return [
          //Basic
          {
            '~component': 'el-collapse',
            '~label': 'Basic config',
            _children: [
              // {
              //   '~component': 'el-input',
              //   '~label': 'Width',
              //   '~prop': 'wdith',
              //   '~default': '640px',
              //   clearable: true
              // },
              // {
              //   '~component': 'el-input',
              //   '~label': 'Height',
              //   '~prop': 'height',
              //   '~default': '480px',
              //   clearable: true
              // },
              {
                '~component': 'el-input',
                '~label': 'theme',
                '~prop': 'theme',
                '~default': 'light',
                clearable: true
              }
            ]
          },
          //Title
          {
            '~component': 'el-collapse',
            '~label': 'Title config',
            _children: [
              {
                '~component': 'el-select',
                '~label': 'Title config mode',
                '~prop': 'title-config',
                '~default': 'ui',
                clearable: true,
                '~options': ['none', 'ui', 'customize']
              },
              {
                '~component': 'el-input',
                '~label': 'Title customize option',
                '~prop': 'title-customize-option',
                type: 'textarea',
                rows: 4,
                '~show': computed(() => unref(config)['title-config'] == 'customize')
              },
              {
                '~component': 'el-input',
                '~label': 'Title text',
                '~prop': 'title-text',
                '~show': computed(() => unref(config)['title-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Title subtext',
                '~prop': 'title-subtext',
                '~show': computed(() => unref(config)['title-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Title left',
                '~prop': 'title-left',
                '~show': computed(() => unref(config)['title-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Title top',
                '~prop': 'title-top',
                '~show': computed(() => unref(config)['title-config'] == 'ui')
              }
            ]
          },

          //Legend
          {
            '~component': 'el-collapse',
            '~label': 'Legend config',
            '~default': 'ui',
            _children: [
              {
                '~component': 'el-select',
                '~label': 'Legend config mode',
                '~prop': 'legend-config',
                clearable: true,
                '~options': ['none', 'ui', 'customize']
              },
              {
                '~component': 'el-input',
                '~label': 'Legend customize option',
                '~prop': 'legend-customize-option',
                type: 'textarea',
                rows: 4,
                '~show': computed(() => unref(config)['legend-config'] == 'customize')
              },
              {
                '~component': 'el-select',
                '~label': 'Legend icon',
                '~prop': 'legend-icon',
                clearable: true,
                '~options': [
                  'circle',
                  'rect',
                  'roundRect',
                  'triangle',
                  'diamond',
                  'pin',
                  'arrow',
                  'none'
                ],
                '~show': computed(() => unref(config)['legend-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Legend formatter',
                '~prop': 'legend-formatter',
                '~show': computed(() => unref(config)['legend-config'] == 'ui')
              },
              {
                '~component': 'el-select',
                '~label': 'Legend orient',
                '~prop': 'legend-orient',
                '~options': ['horizontal', 'vertical'],
                '~show': computed(() => unref(config)['legend-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Legend left',
                '~prop': 'legend-left',
                '~show': computed(() => unref(config)['legend-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Legend top',
                '~prop': 'legend-top',
                '~show': computed(() => unref(config)['legend-config'] == 'ui')
              }
            ]
          },
          //Grid
          {
            '~component': 'el-collapse',
            '~label': 'Grid config',
            _children: [
              {
                '~component': 'el-select',
                '~label': 'Grid config mode',
                '~prop': 'grid-config',
                '~default': 'ui',
                clearable: true,
                '~options': ['none', 'ui', 'customize']
              },
              {
                '~component': 'el-input',
                '~label': 'Grid customize option',
                '~prop': 'grid-customize-option',
                type: 'textarea',
                rows: 4,
                '~show': computed(() => unref(config)['grid-config'] == 'customize')
              },
              {
                '~component': 'el-switch',
                '~label': 'Grid show',
                '~prop': 'grid-show',
                '~show': computed(() => unref(config)['grid-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Grid left',
                '~prop': 'grid-left',
                '~show': computed(() => unref(config)['grid-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Grid top',
                '~prop': 'grid-top',
                '~show': computed(() => unref(config)['grid-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Grid right',
                '~prop': 'grid-right',
                '~show': computed(() => unref(config)['grid-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Grid bottom',
                '~prop': 'grid-bottom',
                '~show': computed(() => unref(config)['grid-config'] == 'ui')
              }
            ]
          },
          //Tooltip
          {
            '~component': 'el-collapse',
            '~label': 'Tooltip config',
            _children: [
              {
                '~component': 'el-select',
                '~label': 'Tooltip config mode',
                '~prop': 'tooltip-config',
                '~default': 'ui',
                clearable: true,
                '~options': ['none', 'ui', 'customize']
              },
              {
                '~component': 'el-input',
                '~label': 'Tooltip customize option',
                '~prop': 'tooltip-customize-option',
                type: 'textarea',
                rows: 4,
                '~show': computed(() => unref(config)['tooltip-config'] == 'customize')
              },
              {
                '~component': 'el-select',
                '~label': 'Tooltip trigger',
                '~prop': 'tooltip-trigger',
                clearable: true,
                '~options': ['item', 'axis', 'none'],
                '~show': computed(() => unref(config)['tooltip-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'Tooltip formatter',
                '~prop': 'tooltip-formatter',
                '~show': computed(() => unref(config)['tooltip-config'] == 'ui')
              }
            ]
          },
          //XAxis
          {
            '~component': 'el-collapse',
            '~label': 'XAxis config',
            _children: [
              {
                '~component': 'el-select',
                '~label': 'XAxis config mode',
                '~prop': 'xAxis-config',
                '~default': 'ui',
                clearable: true,
                '~options': ['none', 'ui', 'customize']
              },
              {
                '~component': 'el-input',
                '~label': 'XAxis customize option',
                '~prop': 'xAxis-customize-option',
                type: 'textarea',
                rows: 4,
                '~show': computed(() => unref(config)['xAxis-config'] == 'customize')
              },
              {
                '~component': 'el-select',
                '~label': 'XAxis type',
                '~prop': 'xAxis-type',
                '~default': 'category',
                clearable: true,
                '~options': ['category', 'value', 'time', 'log'],
                '~show': computed(() => unref(config)['xAxis-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'XAxis name',
                '~prop': 'xAxis-name',
                clearable: true,
                '~show': computed(() => unref(config)['xAxis-config'] == 'ui')
              },
              {
                '~component': 'el-switch',
                '~label': 'XAxis inverse',
                '~prop': 'xAxis-inverse',
                '~show': computed(() => unref(config)['xAxis-config'] == 'ui')
              },
              {
                '~component': 'el-switch',
                '~label': 'XAxis label show',
                '~prop': 'xAxis-axisLabel-show',
                '~show': computed(() => unref(config)['xAxis-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'XAxis label formatter',
                '~prop': 'xAxis-axisLabel-formatter',
                '~show': computed(() => unref(config)['xAxis-config'] == 'ui')
              }
            ]
          },
          //YAxis
          {
            '~component': 'el-collapse',
            '~label': 'YAxis config',
            _children: [
              {
                '~component': 'el-select',
                '~label': 'YAxis config mode',
                '~prop': 'yAxis-config',
                '~default': 'ui',
                clearable: true,
                '~options': ['none', 'ui', 'customize']
              },
              {
                '~component': 'el-input',
                '~label': 'YAxis customize option',
                '~prop': 'yAxis-customize-option',
                type: 'textarea',
                rows: 4,
                '~show': computed(() => unref(config)['yAxis-config'] == 'customize')
              },
              {
                '~component': 'el-select',
                '~label': 'YAxis type',
                '~prop': 'yAxis-type',
                '~default': 'value',
                clearable: true,
                '~options': ['category', 'value', 'time', 'log'],
                '~show': computed(() => unref(config)['yAxis-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'YAxis name',
                '~prop': 'yAxis-name',
                clearable: true,
                '~show': computed(() => unref(config)['yAxis-config'] == 'ui')
              },
              {
                '~component': 'el-switch',
                '~label': 'YAxis inverse',
                '~prop': 'yAxis-inverse',
                '~show': computed(() => unref(config)['yAxis-config'] == 'ui')
              },
              {
                '~component': 'el-switch',
                '~label': 'YAxis label show',
                '~prop': 'yAxis-axisLabel-show',
                '~show': computed(() => unref(config)['yAxis-config'] == 'ui')
              },
              {
                '~component': 'el-input',
                '~label': 'YAxis label formatter',
                '~prop': 'yAxis-axisLabel-formatter',
                '~show': computed(() => unref(config)['yAxis-config'] == 'ui')
              }
            ]
          },
          //series
          {
            '~component': 'lc-editable-list',
            '~label': 'Series',
            '~prop': 'series',
            labelColumn: 'series-name',
            editConfig: function (d) {
              return [
                {
                  '~component': 'el-select',
                  '~label': 'Series config mode',
                  '~prop': 'series-config',
                  '~default': 'ui',
                  clearable: true,
                  '~options': ['ui', 'customize']
                },
                {
                  '~component': 'el-input',
                  '~label': 'Series customize option',
                  '~prop': 'series-customize-option',
                  type: 'textarea',
                  rows: 4,
                  '~show': computed(() => unref(d)['series-config'] == 'customize')
                },
                {
                  '~component': 'el-select',
                  '~label': 'Series type',
                  '~prop': 'series-type',
                  clearable: true,
                  '~options': ['line', 'bar', 'pie'],
                  '~show': computed(() => unref(d)['series-config'] == 'ui')
                },
                {
                  '~component': 'el-input',
                  '~label': 'Series name',
                  '~prop': 'series-name',
                  clearable: true,
                  '~show': computed(() => unref(d)['series-config'] == 'ui')
                },
                {
                  '~component': 'el-input',
                  '~label': 'Series stack',
                  '~prop': 'series-stack',
                  '~show': computed(() => unref(d)['series-config'] == 'ui')
                },
                {
                  '~component': 'el-switch',
                  '~label': 'Series label show',
                  '~prop': 'series-label-show',
                  '~show': computed(() => unref(d)['series-config'] == 'ui')
                },
                {
                  '~component': 'el-input',
                  '~label': 'Series label formatter',
                  '~prop': 'series-label-formatter',
                  '~show': computed(() => unref(d)['series-config'] == 'ui')
                },
                //line
                {
                  '~component': 'el-switch',
                  '~label': 'Series smooth',
                  '~prop': 'series-smooth',
                  '~show': computed(
                    () => unref(d)['series-config'] == 'ui' && unref(d)['series-type'] == 'line'
                  )
                },
                //bar
                {
                  '~component': 'el-input',
                  '~label': 'Bar width',
                  '~prop': 'series-barWidth',
                  '~show': computed(
                    () => unref(d)['series-config'] == 'ui' && unref(d)['series-type'] == 'bar'
                  )
                },
                {
                  '~component': 'el-input',
                  '~label': 'Bar gap',
                  '~prop': 'series-barGap',
                  '~show': computed(
                    () => unref(d)['series-config'] == 'ui' && unref(d)['series-type'] == 'bar'
                  )
                },
                //pie
                {
                  '~component': 'el-select',
                  '~label': 'Pie rose type',
                  '~prop': 'series-roseType',
                  clearable: true,
                  '~options': ['radius', 'area'],
                  '~show': computed(
                    () => unref(d)['series-config'] == 'ui' && unref(d)['series-type'] == 'pie'
                  )
                },
                {
                  '~component': 'el-input',
                  '~label': 'Pie radius',
                  '~prop': 'series-radius',
                  clearable: true,
                  '~show': computed(
                    () => unref(d)['series-config'] == 'ui' && unref(d)['series-type'] == 'pie'
                  )
                },
                {
                  '~component': 'el-input',
                  '~label': 'Pie border radius',
                  '~prop': 'series-itemStyle-borderRadius',
                  clearable: true,
                  '~show': computed(
                    () => unref(d)['series-config'] == 'ui' && unref(d)['series-type'] == 'pie'
                  )
                }
              ]
            }
          },
          //
          //Other options
          {
            '~component': 'el-collapse',
            '~label': 'Other option',
            _children: [
              {
                '~component': 'el-input',
                '~label': '', //Use the collapse label instead
                '~prop': 'optionOther',
                type: 'textarea',
                rows: 4
              }
            ]
          }
        ]
      }
    },
    data: {
      //readonly:true,
      type: 'Array',
      init: {
        mode: 'fixed',
        dataContent: `[
        ["product", "2015", "2016", "2017"],
        ["Milk", 43.3, 85.8, 93.7],
        ["Computer", 83.1, 73.4, 55.1],
        ["TV", 86.4, 65.2, 82.5],
        ["Mobie", 72.4, 53.9, 39.1]
      ]`
      }
    },
    display: {
      init: { style: { width: '100%', height: '480px' } }
    }
  }
}


//
export default echartsTypicalConfig