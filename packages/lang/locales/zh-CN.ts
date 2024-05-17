export default {
  bi: {
    sys:{
      jdbcConnection:'数据库连接',
      dataModel:'数据模型',
    },
    data: {
      dataTypeList: {
        string: '文本',
        integer: '整数',
        number: '数字',
        datetime: '日期时间',
        time: '时间'
      }
    },
    plugin: {
      login: {
        title: 'MTTK Open BI登录',
        placeholder: {
          user: '请输入用户名',
          password: '请输入密码'
        },
        login: '登录',
        loginFail: '登录失败,用户名或密码错误'
      },
      connectionEditor: {
        name: '数据库连接',
        description: '',
        data: {
          driverClass: '驱动类',
          user: '用户名',
          password: '密码',
          readonly: '只读'
        },
        deleteConfirm: '确定要删除数据库连接?'
      },
      modelEditor: {
        name: '数据模型',
        description: '',
        data: {
          connection: '数据库连接'
        },
        deleteConfirm: '确定删除数据模型: {0} ?删除后引用的页面会异常!',
        single: {
          field: '字段配置',
          preview: '数据预览',
          saveConfirm: '数据模型已经变更,返回前是否保存?',
          entityList: {
            tableOrView: '表格和视图',
            insertSQL: '拖拽插入SQL语句'
          },
          dataPreview: {
            lineCount: '数据行数',
            linePreview: '预览行数',
            refresh: '刷新数据',
            emptyText: '没数据,请点击刷新按钮查看数据'
          },
          entityTree: {
            deleteConfirm: '请问确定删除此节点吗?删除会删除实体、字段和关联',
            menu: {
              basic: '基本信息',
              fields: '字段选择'
            },
            columnChoose: {
              title: '模型字段选择',
              key: '字段',
              label: '备注',
              useRemark: '导入时字段名使用数据库中字段备注'
            },
            edit: {
              title: '模型实体编辑',
              useRemark: '导入时字段名使用数据库中字段备注',
              basic: {
                header: '基本信息',
                type: '类型',
                alias: '别名',
                tableOrView: '表格/视图',
                filter: '过滤',
                sort: '排序',
                sql: 'SQL语句',
                aliasRuleError: '非法的数据库别名格式,字母或下划线开头,后续是字母/数字/下划线'
              },
              join: {
                title: '关联关系',
                loadFields: '刷新字段列表',
                handleAdd: '增加关联字段',
                empty: '此实体没有上级实体,无需设置关联',
                source: '上级表',
                joinType: '连接类型',
                innerJoin: '内连接',
                leftJoin: '左连接',
                rightJoin: '右连接',
                rulesFields: '关联字段',
                sourceKey: '上级表字段',
                targetKey: '当前表字段',
                validError1: '第{0}行上级表字段为空',
                validError2: '第{0}行当前表字段为空'
              }
            }
          },
          fieldEditor: {
            prompt: '下面表格可拖动排序或放到层级结构上',
            addExpression: '增加计算字段',
            addHierarchy: '增加层级',
            drag: '拖拽',
            field: '字段',
            entity: '实体',
            type: '类型',
            expression: '计算字段',
            hierarchy: '层级结构',
            dataType: '数据类型',
            deleteConfirm: '确定删除字段:{0}?'
          }
        }
      }
    },
    components: {
      dataModelFieldDrop: {
        empty: '请拖入数据列',
        tip: '当前数量:{0} 最少允许数量:{1} 最多允许数量:{2}',
        infinit: '不限',
        validateError: '超过最多只允许 {0} 行数.'
      },
      dataModelFieldEditNormal: {
        label: '标题',
        sort: '排序',
        sort_none: '不排序',
        sort_asc: '升序',
        sort_desc: '降序',
        aggregation: '聚合',
        aggregation_none: '无',
        aggregation_sum: '求和',
        aggregation_avg: '平均值',
        aggregation_count: '计数',
        aggregation_count_distinct: '去重计数',
        aggregation_max: '最大值',
        aggregation_min: '最小值',
        aggregation_customize: '自定义聚合',
        format_datetime: '日期时间转换',
        format_datetime_none: '原始格式(2021-12-21 13:14:15)',
        format_datetime_y: '年份(2021)',
        format_datetime_yq: '年季度(2021Q4)',
        format_datetime_ym: '年月(2021-12)',
        format_datetime_ymd: '年月日(2021-12-21)',
        format_datetime_h: '小时(13)',
        format_datetime_hm: '时分(13:14)',
        format_number_converter: '数据转换',
        format_number_converter_none: '无',
        format_number_converter_ch_auto: '中文自动(万/百万/亿)',
        format_number_converter_en_auto: '英文自动(K/M)',
        format_number_converter_percentage: '百分比',
        format_number_converter_ch_qian: '中文 - 千',
        format_number_converter_ch_wan: '中文 - 万',
        format_number_converter_ch_baiwan: '中文 - 百万',
        format_number_converter_ch_qianwan: '中文 - 千万',
        format_number_converter_ch_yi: '中文 - 亿',
        format_number_converter_en_k: '英文 - K',
        format_number_converter_en_m: '英文 - M',
        format_number_point: '小数位数',
        format_number_thousandth_mark: '显示千分符',
        format_number_negative: '负数显示',
        format_number_prefix: '前缀',
        format_number_suffix: '后缀'
      },
      dataModelHolder: {
        name: '数据模型'
      },
      dataModelTree: {
        empty: '请先选择数据模型或修改过滤条件'
      }
    },
    widgets: {
      utils: {
        baiduMapUtil: {
          notify: '请先设置百度AK(Application Key)'
        },
        chartActionUtil: {
          second: '秒',
          millsecond: '毫秒',
          noSQL: '没有SQL',
          timecost: '服务器端运行耗时',
          showSQL: '查看SQL',
          noData: '没有数据',
          showData: '查看数据',
          errorMessage: '错误信息',
          errorDetail: '详细信息',
          errorLoadData: '报表获取数据报错:{0}',
          copyTip: '点击拷贝',
          copyDone: '拷贝完成'
        },
        indexUtil: {
          title: '数据模型',
          filter: '过滤',
          filter_description: '针对本图表设置过滤条件',
          dimension: '维度',
          dimension_description: '维度一般显示在x轴,当存在度量后台计算时会自动分组',
          metric: '度量',
          metric_description: '度量一般显示在y轴,往往需要在界面上设置聚合方式',
          drilling: '钻取',
          drilling_description: '钻取顺序需要从上到下设置,而且第一项与钻取的维度完全相同',
          rowLimit: '返回行数',
          rowLimit_description: '空/0代表不限',
          pagination: '分页方式',
          pagination_none: '不分页',
          pagination_client: '客户端分页',
          pagination_server: '服务器端分页',
          pagination_size: '每页行数',
          interval: '自动刷新(再次进入生效)',
          interval_second: '秒',
          interval_minute: '分',
          refresh: '刷新图表',
          showSQL: '查看SQL',
          showData: '查看数据',
          'echarts-theme': 'Echarts主题',
          'title-text': '标题',
          'title-subtext': '副标题'
        },
        transformPrecheck: {
          chooseModel: '请选择数据模型',
          drillingError1: '钻取的第一个参数必须和维度的第一个参数相同',
          drillingError2: '钻取的第一个参数时间日期时间转换必须和维度的第一个参数相同',
          metricAndDimensionError1: '维度和度量数量和必须是{0}',
          metricAndDimensionError2: '维度和度量数量和至少需要{0}',
          metricAndDimensionError3: '维度和度量数量和最多需要{0}',
          ruleMinError1: '{0}不存在,但是需要数量:{1}',
          ruleMinError2: '{0}数量小于设置值:{1}',
          dimension: '度量',
          metric: '维度',
          empty: '请先选择数据模型相关参数后点击刷新图表'
        }
      },
      filter: {
        name:'BI过滤器',
        filter_label:'过滤条件',
        filter_description:'拖入字段设置过滤方式',
        showButtonReset:'显示重置按钮',
        qtyPerRow:'每行控件数',
        labelWidth:'标题宽度',
        labelPosition:'标题位置',
        labelPosition_left:'靠左',
        labelPosition_right:'靠右',
        labelPosition_top:'上部',
        criteriaSelect: {
          placeholder1: '请输入过滤条件后获取下拉框内容',
          placeholder2: '请选择'
        },
        data: {
          inputOptions1: '精确匹配',
          inputOptions2: '不匹配',
          inputOptions3: '包含',
          inputOptions4: '不包含',
          inputOptions5: '开头是',
          inputOptions6: '结尾是',
          inputOptions7: '为空',
          inputOptions8: '不为空',
          inputOptions9: '空文本',
          inputOptions10: '非空文本',
          inputNumberOptions1: '等于',
          inputNumberOptions2: '不等于',
          inputNumberOptions3: '大于',
          inputNumberOptions4: '大于等于',
          inputNumberOptions5: '小于',
          inputNumberOptions6: '小于等于',
          inputNumberOptions7: '范围区间',
          datetimeOptions1: '等于',
          datetimeOptions2: '不等于',
          datetimeOptions3: '大于',
          datetimeOptions4: '大于等于',
          datetimeOptions5: '小于',
          datetimeOptions6: '小于等于',
          datetimeOptions7: '范围区间',
          timeOptions1: '等于',
          timeOptions2: '不等于',
          timeOptions3: '大于',
          timeOptions4: '大于等于',
          timeOptions5: '小于',
          timeOptions6: '小于等于',
          timeOptions7: '范围区间',
          datetimeInitOptions1: '当前',
          datetimeInitOptions2: '今天',
          datetimeInitOptions3: '昨天',
          datetimeInitOptions4: '前天',
          datetimeInitOptions5: '明天',
          datetimeInitOptions6: '后天',
          datetimeInitOptions7: '本月初',
          datetimeInitOptions8: '下月初',
          datetimeInitOptions9: '本年初',
          datetimeInitOptions10: '下年初',
          timeInitOptions1: '当前',
          timeInitOptions2: '零点',
          timeInitOptions3: '中午',
          timeInitOptions4: '凌晨'
        },
        edit: {
          title: '标题',
          uiMode: '展示类型',
          uiModeInput: '输入',
          uiModeSelect: '选择框',
          uiModeInputNumber: '数字输入',
          uiModeDatetime: '日期',
          uiModeTime: '时间',
          colSpan: '占用网格数',
          uiHideMatch: '隐藏匹配方式选择',
          matchMode: '匹配方式',
          selectMultiple: '支持多选',
          selectSource: '选项值来源',
          selectSourceAuto: '自动解析',
          selectSourceDatamodel: '其他数据模型',
          selectSourceManual: '手工输入',
          sourceDatamodel: '来自数据模型',
          datamodelValue: '值字段',
          datamodelLabel: '显示字段',
          manual: '手工录入',
          manual_description:
            '每行代表一个选项.通过分隔符波浪号(~)分开选项显示内容和值.~前是值,后面是显示内容;如果没有~则认为显示内容和值相同',
          to: '到',
          value: '值',
          initValue: '初始值'
        },
        render: {
          empty: '没有选择任何筛选条件,请在右侧面板中编辑',
          query: '查询',
          reset: '重置'
        }
      },
      bar: {
        name: 'BI 柱状图',
        stack: '堆叠',
        reverse: 'X/Y坐标切换'
      },
      boxplot: {
        name: 'BI盒须图',
        dimension_description: '给出项目名称和值(也可以再度量给出).',
        metric_description: '值(也可以在维度给出).'
      },
      bubble: {
        name: 'BI气泡图',
        dimension_description: '维度分别给出x和y轴的值.',
        metric_description: '度量给出x轴和y轴交点的值.',
        'symbol-size': '符号最大大小',
        'symbol-size-base': '符号基本大小',
        'split-line-mode': '轴分割线显示',
        'split-line-mode_none': '都不',
        'split-line-mode_x': '横轴(x)',
        'split-line-mode_y': '纵轴(y)',
        'split-line-mode_both': '横纵轴'
      },
      bubbleBaiduMap: {
        name: 'BI地图气泡图',
        dimension_description:
          '维度第一个参数为地名,第二个为经度,第三个为纬度.如果存在第4个则是显示值(也可以设置在度量里).',
        metric_description: '显示值,也可以设置在维度里.',
        'baidu-map-ak': '百度地图AK',
        'center-longitude': '中心经度',
        'center-latitude': '中心维度',
        zoom: '缩放比例',
        'highlight-top': '高亮前多少个',
        'symbol-size': '符号最大大小',
        'symbol-size-base': '符号基本大小'
      },
      funnel: {
        name: 'BI漏斗图',
        dimension_description: '给出漏斗的数据项目.',
        metric_description: '给出漏斗的数据值.'
      },
      gauge: {
        name: 'BI仪表盘',
        metric_description: '给出仪表盘显示的数据值.'
      },
      heatBaiduMap: {
        name: 'BI地图热力图',
        dimension_description:
          '第一个为经度,第二个为维度.如果存在第三个则是显示值(也可以设置在度量里).',
        metric_description: '显示值,也可以设置在维度里.',
        'baidu-map-ak': '百度地图AK',
        'center-longitude': '中心经度',
        'center-latitude': '中心维度',
        zoom: '缩放比例',
        'point-size': '点大小',
        'blur-size': '点阴影大小'
      },
      heatmap: {
        name: 'BI热力图',
        dimension_description: '维度分别给出x和y轴的值',
        metric_description: '度量给出x轴和y轴交点的值.',
        'split-area-mode': '轴分区线显示',
        'split-area-mode_none': '都不',
        'split-area-mode_x': '横轴(x)',
        'split-area-mode_y': '纵轴(y)',
        'split-area-mode_both': '横纵轴',
        'show-label': '方块上显示数值'
      },
      indicatorKanban: {
        name: 'BI指标看板',
        metric: '度量',
        'title-text': '标题',
        'title-subtext': '副标题',
        qtyPerRow: '每行个数'
      },
      line: {
        name: 'BI折线图',
        smooth: '平滑曲线',
        areaMode: '面积填充',
        stack: '堆叠',
        reverse: '坐标切换'
      },
      pie: {
        name: 'BI饼图',
        metric: '度量',
        'series-roseType': '玫瑰形状',
        'series-roseType_radius': '角度表示大小',
        'series-roseType_area': '面积表示大小',
        'border-radius': '边缘显示圆弧',
        'series-radius': '半径形状',
        'series-radius_1': '大圆',
        'series-radius_2': '中圆',
        'series-radius_3': '小圆',
        'series-radius_4': '细环',
        'series-radius_5': '中等环',
        'series-radius_6': '粗环'
      },
      radar: {
        name: 'BI雷达图',
        dimension_description: '给出比较项目',
        metric_description: '给出比较数值.'
      },
      sankey: {
        name: 'BI桑基图',
        dimension_description: '前两个参数给出源和目标,第三个(也可以在度量里给出)是值.',
        metric_description: '值,也可以再度量给出.',
        orient: '方向',
        orient_horizontal: '水平',
        orient_vertical: '垂直',
        'node-align': '节点对齐方式',
        'node-align_justify': '双端对齐',
        'node-align_left': '左对齐',
        'node-align_right': '右对齐'
      },
      scatter: {
        name: 'BI散点图',
        dimension_description:
          '维度前两个为x轴和y轴的数字,第三个可选.如果存在则按照第三个字段分组显示前两个字段.',
        'regression-curve': '拟合回归曲线',
        'regression-curve_none': '无',
        'regression-curve_linear': '线性回归',
        'regression-curve_exponential': '指数回归',
        'regression-curve_logarithmic': '对数回归',
        'regression-curve_polynomial': '多项式回归',
        'symbol-size': '符号大小',
        'show-range-area': '显示范围框',
        'show-average-line': '显示平均线',
        'highlight-min-max': '高亮最值'
      },
      table: {
        name: 'BI表格',
        dimension:'维度',
        metric:'度量',
        title:'标题',
        border:'显示边框',
        stripe:'显示斑马条纹',
        showIndex:'显示序号',
      },
      crossTable: {
        name: 'BI交叉表',
        dimension_description:'第一个参数是竖向显示的值,第二个参数是横向显示值',
        metric_description:'横线显示值下的具体指标参数',
        border:'显示边框',
        stripe:'显示斑马条纹',
      },
      themeRiver: {
        name: 'BI河流图',
        dimension_description: '第一个参数是时间，第二个参数是主题,第三个(也可以在度量里给出)是值.',
        metric_description: '度量给出x轴和y轴交点的值.',
      },
      treemap: {
        name: 'BI矩形树图',
        dimension_description: '前面参数给出层级,最后一个(也可以在度量里给出)是值.层级参数需要设置排序!',
        metric_description: '度量给出值,也可以在维度你给出.',
        'leaf-depth': '初始显示层级',
        'upper-label': '显示上级标题',
      },
      waterfall: {
        name: 'BI瀑布图',
        metric_description: '给出数据,可正可负.',
      },
      wordCloud: {
        name: 'BI词云',
        dimension_description: '第一个参数给出词,第二个(也可以在度量里给出)是值.',
        metric_description: '数值,可以在维度给出.',
        shape:'显示形状',
        shape_circle:'圆形',
        shape_cardioid:'心形',
        shape_diamond:'钻石形',
        'shape_triangle-forward':'向前三角形',
        shape_triangle:'向上三角形',
        shape_pentagon:'五边形',
        shape_star:'星形',
        'rotate': '倾斜显示',
      },
    }
  }
}
