export default {
  bi: {
    sys: {
      jdbcConnection: 'JDBC connection',
      dataModel: 'Data model'
    },
    data: {
      dataTypeList: {
        string: 'String',
        integer: 'Integer',
        number: 'Number',
        datetime: 'Datetime',
        time: 'Time'
      }
    },
    plugin: {
      login: {
        title: 'MTTK Open BI Login',
        placeholder: {
          user: 'Please input username',
          password: 'Please input password'
        },
        login: 'Login',
        loginFail: 'Login failed, username or password incorrect'
      },
      connectionEditor: {
        name: 'JDBC Connection',
        description: '',
        trial:'Trial',
        trialSuccess:'Trial successed',
        trialFail:'Trial failed',
        data: {
          basic:'Basic',
          driverClass: 'Driver class',
          user: 'User name',
          password: 'Pasword',
          readonly: 'Read only',
          pool:'Pool',
          minimumIdle:'Minimum idle',
          maximumPoolSize:'Maximum pool size',
          connectionTimeout:'Connection timeout',
          idleTimeout:'Idle timeout',
          maxLifetime:'Max life time',
        },
        deleteConfirm: 'Confirm to delete data connection?'
      },
      modelEditor: {
        name: 'Data model',
        description: '',
        data: {
          connection: 'JDBC Connection'
        },
        deleteConfirm:
          'Confirm to delete data model: {0} ?The operation will cause pages used this data model error!',
        single: {
          field: 'Field config',
          preview: 'Data preview',
          saveConfirm: 'Data model is changed, do you want to save before return?',
          entityList: {
            tableOrView: 'Table or View',
            insertSQL: 'Drag to insert SQL'
          },
          dataPreview: {
            lineCount: 'Data line',
            linePreview: 'Preview line',
            refresh: 'Refresh data',
            emptyText: 'No data,press refresh data button'
          },
          entityTree: {
            deleteConfirm:
              'Do you confirm to delete this node?This operation will delete entity, fields and relations',
              emptyDescription:'Please drag and drop entities or SQL into this panel',
            menu: {
              basic: 'Basic info',
              fields: 'Field choose'
            },
            columnChoose: {
              title: 'Field choose',
              key: 'Field',
              label: 'Remark',
              useRemark: 'Use data remark as field name '
            },
            edit: {
              title: 'Edit data model entity ',
              useRemark: 'Use data remark as field name ',
              basic: {
                header: 'Basic info',
                type: 'Type',
                alias: 'Alias',
                tableOrView: 'Table/View',
                filter: 'Filter',
                sort: 'Sort',
                sql: 'SQL',
                aliasRuleError:
                  'Illegal database alias format, starting with a letter or underline, followed by a letter/number/underline'
              },
              join: {
                title: 'Relation',
                loadFields: 'Refresh field list',
                handleAdd: 'Add relation field',
                empty: 'This entity has no parent entity, no need to set relation',
                source: 'Parent',
                joinType: 'Join type',
                innerJoin: 'Inner join',
                leftJoin: 'Left join',
                rightJoin: 'Right join',
                rulesFields: 'Relation field',
                sourceKey: 'Parent field',
                targetKey: 'Field',
                validError1: 'Line {0} has not set parent field',
                validError2: 'Line {0} has not set field of current table'
              }
            }
          },
          fieldEditor: {
            prompt: 'Drag below table to sort or drop onto hierarchy',
            addExpression: 'Add expression',
            addHierarchy: 'Add hierarchy',
            drag: 'Drag',
            field: 'Field',
            entity: 'Entity',
            type: 'Type',
            expression: 'expression',
            hierarchy: 'hierarchy',
            dataType: 'Data type',
            deleteConfirm: 'Confirm to delete field:{0}?'
          }
        }
      }
    },
    components: {
      dataModelFieldDrop: {
        empty: 'Drop data columns',
        tip: 'Current:{0} Min allowed:{1} Max allowed:{2}',
        infinit: 'Infinit',
        validateError: 'Exceed max allowed {0} .'
      },
      dataModelFieldEditNormal: {
        label: 'label',
        sort: 'Sort',
        sort_none: 'None',
        sort_asc: 'Ascending',
        sort_desc: 'Descending',
        aggregation: 'Aggregation',
        aggregation_none: 'None',
        aggregation_sum: 'Sum',
        aggregation_avg: 'Average',
        aggregation_count: 'Count',
        aggregation_count_distinct: 'Count distinct',
        aggregation_max: 'Max',
        aggregation_min: 'Min',
        aggregation_customize: 'Customize',
        format_datetime: 'Datetime format',
        format_datetime_none: 'Raw(2021-12-21 13:14:15)',
        format_datetime_y: 'Year(2021)',
        format_datetime_yq: 'Year quarter(2021Q4)',
        format_datetime_ym: 'Year month(2021-12)',
        format_datetime_ymd: 'Year month day(2021-12-21)',
        format_datetime_h: 'Hour(13)',
        format_datetime_hm: 'Hour minute(13:14)',
        format_number_converter: 'Number format',
        format_number_converter_none: 'None',
        format_number_converter_ch_auto: 'Chinese auto(ten thousand/million/billion)',
        format_number_converter_en_auto: 'English auto(K/M)',
        format_number_converter_percentage: 'Percentage',
        format_number_converter_ch_qian: 'Chinese - thousand',
        format_number_converter_ch_wan: 'Chinese - ten thousand',
        format_number_converter_ch_baiwan: 'Chinese - million',
        format_number_converter_ch_qianwan: 'Chinese - ten million',
        format_number_converter_ch_yi: 'Chinese - billion',
        format_number_converter_en_k: 'English - K',
        format_number_converter_en_m: 'English - M',
        format_number_point: 'Precision',
        format_number_thousandth_mark: 'Thousandth mark',
        format_number_negative: 'Negative',
        format_number_prefix: 'Prefix',
        format_number_suffix: 'Suffix'
      },
      dataModelHolder: {
        name: 'Data model'
      },
      dataModelTree: {
        placeholder:'Input to filter columns',
        empty: 'Please choose data model'
      }
    },
    widgets: {
      folderName:'BI component',
      utils: {
        baiduMapUtil: {
          notify: 'Please set Baidu AK(Application Key)'
        },
        chartActionUtil: {
          second: 'Second',
          millsecond: 'Millisecond',
          noSQL: 'No SQL',
          timecost: 'Server running time',
          showSQL: 'Show SQL',
          noData: 'No data',
          showData: 'Show data',
          errorMessage: 'Error message',
          errorDetail: 'Error detail',
          errorLoadData: 'Load data from server failed:{0}',
          copyTip: 'Click to copu',
          copyDone: 'Copy done'
        },
        indexUtil: {
          _valueDescription: 'Value can be percentage like 50% or value like 32.',
         _selectAddDescription:'Select options can be added by input and then choose directly.',
         _show:'Show',
          title: 'Data model',
          filter: 'Filter',
          filter_description: 'Set filter for this chart',
          dimension: 'Dimension',
          dimension_description:
            'Normally  show at X axis,they are grouped automatically if metric is present',
          metric: 'Metric',
          metric_description: 'Normally show at Y axis and aggregation need to be set',
          drilling: 'Drilling',
          drilling_description:
            'Drilling from top to down,the first item should be same as the dimension to drilling',
          rowLimit: 'Row limit',
          rowLimit_description: 'Empty/0 means infinit',
          pagination: 'Pagination',
          pagination_none: 'None',
          pagination_client: 'Client',
          pagination_server: 'Server',
          pagination_size: 'Pagination size',
          interval: 'Auto refresh',
          interval_second: 'Second',
          interval_minute: 'Minute',
          refresh: 'Refresh',
          showSQL: 'Show SQL',
          showData: 'Show data',
          'title-left':'Left',
          'title-left_description':'@:bi.widgets.utils.indexUtil._selectAddDescription <br> @:bi.widgets.utils.indexUtil._valueDescription',
          'title-left_1':'Left',
          'title-left_2':'Center',
          'title-left_3':'Right',
          'title-top':'Top',
          'title-top_description':'@:bi.widgets.utils.indexUtil._selectAddDescription <br> @:bi.widgets.utils.indexUtil._valueDescription',
          'title-top_1':'Top',
          'title-top_2':'Middle',
          'title-top_3':'Bottom',
          'echarts-animation':'Animation',
          'echarts-theme': 'Echarts theme',
          'title_label':'Title',
          'title-text': 'Title',
          'title-subtext': 'Sub-title',
          'legend_label':'Legend',
          'legend-type':'Type',
          'legend-type_1':'Plain',
          'legend-type_2':'Scroll',
          'legend-orient':'Orient',
          'legend-orient_1':'Horizontal',
          'legend-orient_2':'Vertical',
          'legend-icon':'Icon',
          'legend-icon_1':'Circle',
          'legend-icon_2':'Rectangle',
          'legend-icon_3':'Round rectangle',
          'legend-icon_4':'Triangle',
          'legend-icon_5':'Diamond',
          'legend-icon_6':'Pin',
          'legend-icon_7':'Arrow',
          'legend-icon_8':'None',
          'grid_label':'Drawing area',
          'grid-right':'Rright',
          'grid-bottom':'Bottom',
          'grid-containLabel':'Contain lable',
          'toolbox_label':'Toolbox',
          'toolbox-orient':'Orient',
          'toolbox-orient_1':'Horizontal',
          'toolbox-orient_2':'Vertical',
          'toolbox-feature':'Feature',
          'toolbox-feature_saveAsImage':'Save as image',
          'toolbox-feature_dataView':'Data view',
          'toolbox-feature_dataZoom':'Data zoom',
          'toolbox-feature_restore':'Restore',
          'toolbox-saveAsImage-backgroundColor':'Save as image background color',
          'dataZoom_label':'Data zoom',
          'dataZoom-type':'Type',
          'dataZoom-type_1':'Inside',
          'dataZoom-type_2':'Slider',
          'xAxis_label':'X axis',
          'yAxis_label':'Y axis',
          'axis-position':'Position',
          'axis-position_bottom':'Bottom',
          'axis-position_top':'Top',
          'axis-position_left':'Left',
          'axis-position_right':'Right',
          'axis-type':'Type',
          'axis-type_value':'Value',
          'axis-type_category':'Category',
          'axis-type_time':'Time',
          'axis-type_log':'Logarithm',
          'axis-nameLocation':'Name location',
          'axis-nameLocation_start':'Start',
          'axis-nameLocation_middle':'Middle',
          'axis-nameLocation_end':'End',
          'axis-axisLabel-show':'Show label',
          'axis-axisLine-show': 'Show axis line',
          'axis-axisTick-show': 'Show axis tick',
          'axis-splitLine-show': 'Show split line',
          'axis-splitArea-show': 'Show split area',
          'axis-axisPointer-show': 'Show axis pointer',
          'axis-axisPointer-type':'Axis pointer type',
          'axis-axisPointer-type_line':'Line',
          'axis-axisPointer-type_shadow':'Shadow',
          'axis-axisPointer-type_none':'None',
        },
        transformPrecheck: {
          chooseModel: 'Please choose data model',
          drillingError1:
            'The first item of drilling should be same as the first item of dimension',
          drillingError2:
            'The date time format of first item of drilling should be same as the first item of dimension',
          metricAndDimensionError1: 'The total number of dimension and metric should be {0}',
          metricAndDimensionError2:
            'The total number of dimension and metric should greater than {0}',
          metricAndDimensionError3: 'The total number of dimension and metric should less than{0}',
          ruleMinError1: '{0} is not existed,but required:{1}',
          ruleMinError2: 'The number of {0} is less than :{1}',
          dimension: 'Dimension',
          metric: 'Metric',
          empty: 'Please choose data model and proper parameters and then click refresh'
        }
      },
      filter: {
        name: 'BI filter',
        filter_label: 'Filter',
        filter_description: 'Drag field into here',
        showButtonReset: 'Show reset button',
        qtyPerRow: 'Qty per row',
        labelWidth: 'Label width',
        labelPosition: 'Label position',
        labelPosition_left: 'Left',
        labelPosition_right: 'Right',
        labelPosition_top: 'Top',
        criteriaSelect: {
          placeholder1: 'Input filter and then load list remotely',
          placeholder2: 'Choose'
        },
        data: {
          inputOptions1: 'Equal',
          inputOptions2: 'Not equal',
          inputOptions3: 'Like',
          inputOptions4: 'Not like',
          inputOptions5: 'Start with',
          inputOptions6: 'End with',
          inputOptions7: 'Null',
          inputOptions8: 'Not Null',
          inputOptions9: 'Empty string',
          inputOptions10: 'Not empty string',
          inputNumberOptions1: 'Equal',
          inputNumberOptions2: 'Not equal',
          inputNumberOptions3: '>',
          inputNumberOptions4: '>=',
          inputNumberOptions5: '<',
          inputNumberOptions6: '<=',
          inputNumberOptions7: 'Range',
          datetimeOptions1: 'Equal',
          datetimeOptions2: 'Not equal',
          datetimeOptions3: '>',
          datetimeOptions4: '>=',
          datetimeOptions5: '<',
          datetimeOptions6: '<=',
          datetimeOptions7: 'Range',
          timeOptions1: 'Equal',
          timeOptions2: 'Not equal',
          timeOptions3: '>',
          timeOptions4: '>=',
          timeOptions5: '<',
          timeOptions6: '<=',
          timeOptions7: 'Range',
          datetimeInitOptions1: 'Current',
          datetimeInitOptions2: 'Today',
          datetimeInitOptions3: 'Yesterday',
          datetimeInitOptions4: 'The day before yesterday',
          datetimeInitOptions5: 'Tomorrow',
          datetimeInitOptions6: 'The day after tomorrow',
          datetimeInitOptions7: 'Beginning of this month',
          datetimeInitOptions8: 'Beginning of next month',
          datetimeInitOptions9: 'Beginning of this year',
          datetimeInitOptions10: 'Beginning of next year',
          timeInitOptions1: 'Current',
          timeInitOptions2: 'Zero point',
          timeInitOptions3: 'Noon',
          timeInitOptions4: 'Early morning'
        },
        edit: {
          title: 'Label',
          uiMode: 'UI mode',
          uiModeInput: 'Input',
          uiModeSelect: 'Select',
          uiModeInputNumber: 'Input number',
          uiModeDatetime: 'Date time',
          uiModeTime: 'Time',
          colSpan: 'Col span',
          uiHideMatch: 'Hide UI mode',
          matchMode: 'Match mode',
          selectMultiple: 'Multiple select',
          selectSource: 'Options source',
          selectSourceAuto: 'Auto',
          selectSourceDatamodel: 'Other data model',
          selectSourceManual: 'Manual input',
          sourceDatamodel: 'From data model',
          datamodelValue: 'Value field',
          datamodelLabel: 'Label field',
          manual: 'Manual input',
          manual_description:
            'Each line represents an option. Use the separator tilde (~) to separate the content and value of the options. The front is the value, and the back is the label; If there is no~, it is considered that the label and value are the same.',
          to: 'to',
          value: 'value',
          initValue: 'init value'
        },
        render: {
          empty: 'No filter is choosed, please edit in right panel',
          query: 'Query',
          reset: 'Reset'
        }
      },
      bar: {
        name: 'BI Bar',
        stack: 'Stack',
        barWidth: 'Bar width'
      },
      boxplot: {
        name: 'BI boxplot',
        dimension_description: 'Item name and value(Value can also be provided by metric).',
        metric_description: 'Value(Can also provided by dimension).'
      },
      bubble: {
        name: 'BI bubble',
        dimension_description: 'The value of x axis and y axis.',
        metric_description: 'The value of the cross of X axis and Y axis.',
        'symbol-size': 'Symbol size',
        'symbol-size-base': 'Symbol size base',
        'split-line-mode': 'Axis mode',
        'split-line-mode_none': 'None',
        'split-line-mode_x': 'X',
        'split-line-mode_y': 'Y',
        'split-line-mode_both': 'Both'
      },
      bubbleBaiduMap: {
        name: 'BI bubble Baidu map',
        dimension_description:
          'The first is location name,second is longitude,third is latitude.The fourth is the value to show(Can also set in metric).',
        metric_description: 'Value to show,can also set in dimension.',
        'baidu-map-ak': 'Baidu map AK',
        'center-longitude': 'Center longitude',
        'center-latitude': 'Center latitude',
        zoom: 'Zoom rate',
        'highlight-top': 'Highlight top n',
        'symbol-size': 'Symbol size max',
        'symbol-size-base': 'Symbol size base'
      },
      funnel: {
        name: 'BI funnel',
        dimension_description: 'Funnel data item.',
        metric_description: 'Funnel data value.'
      },
      gauge: {
        name: 'BI gauge',
        metric_description: 'The value shown in guage.',
        radius: 'Radius',
        startAngle: 'Start angle',
        endAngle: 'End angle',
        clockwise: 'Clockwise'
      },
      heatBaiduMap: {
        name: 'BI heat baidu map',
        dimension_description:
          'The first is longitude, the seocnd is latitude.The third is the value to show(Can also set in metric)..',
        metric_description: 'Value to show,can also set in dimension.',
        'baidu-map-ak': 'Baidu map AK',
        'center-longitude': 'Center longitude',
        'center-latitude': 'Center latitude',
        zoom: 'Zoom rate',
        'point-size': 'Point size',
        'blur-size': 'Blur size'
      },
      heatmap: {
        name: 'BI heat map',
        dimension_description: 'The value of x axis and y axis.',
        metric_description: 'The value of the cross of X axis and Y axis.',
        'split-area-mode': 'Split area mode',
        'split-area-mode_none': 'None',
        'split-area-mode_x': 'X axis',
        'split-area-mode_y': 'Y axis',
        'split-area-mode_both': 'Both',
        'show-label': 'Show value on box'
      },
      indicatorKanban: {
        name: 'BI indicator kanban',
        metric: 'Metric',
        'title-text': 'Title',
        'title-subtext': 'Sub-title',
        qtyPerRow: 'Qty per row'
      },
      line: {
        name: 'BI line',
        smooth: 'Smooth',
        step:'Step chart',
        step_start:'Start',
        step_middle:'Middle',
        step_end:'End',
        areaMode: 'Area fill',
        stack: 'Stack',
        reverse: 'X/Y axis reverse'
      },
      pie: {
        name: 'BI pie',
        metric: 'metric',
        'series-roseType': 'Rose type',
        'series-roseType_radius': 'Radius present value',
        'series-roseType_area': 'Area present value',
        'border-radius': 'Border radius',
        'series-radius': 'Radius shape',
        'series-radius_1': 'Big circle',
        'series-radius_2': 'Middle circle',
        'series-radius_3': 'Small circle',
        'series-radius_4': 'Thin ring',
        'series-radius_5': 'Middle ring',
        'series-radius_6': 'Thick ring'
      },
      radar: {
        name: 'BI radar',
        dimension_description: 'Item to compare',
        metric_description: 'The value of the items.',
        radius: 'Radius',
        shape: 'Shape',
        shape_1: 'Polygon',
        shape_2: 'Circle'
      },
      sankey: {
        name: 'BI sankey',
        dimension_description:
          'The first two are the source and ttarget, the third is the value(Can also provide in metric).',
        metric_description: 'Value,can also provide in dimension.',
        orient: 'Orient',
        orient_horizontal: 'Horizontal',
        orient_vertical: 'Vertical',
        'node-align': 'Node align',
        'node-align_justify': 'Justify',
        'node-align_left': 'Left',
        'node-align_right': 'Right'
      },
      scatter: {
        name: 'BI scatter',
        dimension_description:
          'The first two are value of X and Y axis. The third is optional to group the first two value.',
        'regression-curve': 'Regression curve',
        'regression-curve_none': 'None',
        'regression-curve_linear': 'Linear',
        'regression-curve_exponential': 'Exponential',
        'regression-curve_logarithmic': 'Logarithmic',
        'regression-curve_polynomial': 'Polynomial',
        'symbol-size': 'Symbol size',
        'show-range-area': 'Show range area',
        'show-average-line': 'Show average line',
        'highlight-min-max': 'Highlight min/max'
      },
      table: {
        name: 'BI table',
        dimension: 'Dimension',
        metric: 'Metric',
        title: 'Title',
        border: 'Show border',
        stripe: 'Show stripe',
        showIndex: 'Show index',
        showSummary: 'Show summary',
        mergeSameColumn: 'Merge same column',
        sortable: 'Column show sortable tag',
        summary:'Summary',
      },
      pivotTable: {
        name: 'BI pivot',
        dimensionCol:'X dimension',
        dimensionRow:'Y dimension',
        dimension_description:'Set from high to low levels when multiple dimensions are present',
        emptyValue:'Empty value show as',
      },
      themeRiver: {
        name: 'BI theme river',
        dimension_description:
          'The first is time and second one is subject,the thrid is the value(Can also provide in metric).',
        metric_description: 'The value of the cross of X axis and Y axis.'
      },
      treemap: {
        name: 'BI tree map',
        dimension_description:
          'Provide the hierachies,the last one is the value(Can also provide in metric).And hierachy columns should be sorted!',
        metric_description: 'Value,can also provide in dimension.',
        'leaf-depth': 'Depth of leaf',
        'upper-label': 'Show upper label'
      },
      waterfall: {
        name: 'BI waterfall',
        metric_description: 'Value,can be positive or negative.'
      },
      wordCloud: {
        name: 'BI word cloud',
        dimension_description:
          'The first is the word,the second is the value(Can also provide in metric).',
        metric_description: 'Value,can also provide in dimension.',
        shape: 'Shape',
        shape_circle: 'Circle',
        shape_cardioid: 'Cardioid',
        shape_diamond: 'Diamond',
        'shape_triangle-forward': 'Triangle forward',
        shape_triangle: 'Triangle',
        shape_pentagon: 'Pentagon',
        shape_star: 'Strat',
        rotate: 'Rotate'
      }
    }
  }
}
