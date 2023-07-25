import { echartsSimpleTransform } from './transform'
import { computed, unref } from 'vue'
//button config
export const echartsSimpleConfig = {
  key: '_echartsSimple',
  name: 'Echarts simple',
  description: '',
  icon: 'mdiChartBar',
  transform: echartsSimpleTransform,
  editor: function (data) {
    return [
      {
        '~component': 'el-input',
        '~label': 'Width',
        '~prop': 'wdith',
        '~default': '640px',
        clearable: true
      },
      {
        '~component': 'el-input',
        '~label': 'Height',
        '~prop': 'height',
        '~default': '480px',
        clearable: true
      },
      {
        '~component': 'el-select',
        '~label': 'Series type',
        '~prop': 'series-type',
        '~default': 'pie',
        clearable: true,
        '~options': ['line', 'bar', 'pie']
      },
      {
        '~component': 'el-input',
        '~label': 'Title text',
        '~prop': 'title-text'
      },
      {
        '~component': 'el-input',
        '~label': 'Title subtext',
        '~prop': 'title-subtext'
      },
      //line
      {
        '~component': 'el-switch',
        '~label': 'Series smooth',
        '~prop': 'series-smooth',
        '~show': computed(() => unref(data)['series-type'] == 'line')
      },
      //pie
      {
        '~component': 'el-select',
        '~label': 'Pie rose type',
        '~prop': 'series-roseType',
        clearable: true,
        '~options': ['radius', 'area'],
        '~show': computed(
          () => unref(data)['series-type'] == 'pie'
        )
      },
      {
        '~component': 'el-input',
        '~label': 'Pie radius',
        '~prop': 'series-radius',
        clearable: true,
        '~show': computed(
          () => unref(data)['series-type'] == 'pie'
        )
      },
      {
        '~component': 'el-input',
        '~label': 'Dimensions',
        '~prop': 'dimensions',
      },
      {
        '~component': 'el-input',
        '~label': 'Other option',
        '~prop': 'optionOther',
        type: 'textarea',
        rows: 4
      }
    ]
  },
  dataConfig: {
    //readonly:true,
    type: 'Array'
  },
  initConfig: {
    props: {}
  },
  initStyles: {}
}
