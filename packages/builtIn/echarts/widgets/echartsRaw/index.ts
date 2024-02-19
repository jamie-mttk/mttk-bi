import { echartsRawTransform } from './transform'

//
const sampleOption={
  title: {
    text: 'Funnel'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
    }
  ]
}
//
const sampleData=   [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' }
]
//


  const echartsRawConfig = {
  key: '_echartsRaw',
  name: 'Echarts raw',
  description: '',
  icon: 'mdiChartWaterfall',
  sequence: 2,
  transform: echartsRawTransform,
  editor: {
    basic: {
      init: { wdith: '640px', height: '480px', 'option': JSON.stringify(sampleOption,null,2) },
      ui: function (data) {
        return [
          {
            '~component': 'el-input',
            '~label': 'Option',
            '~prop': 'option',
            type: 'textarea',
            rows: 20
          }
        ]
      }
    },
    data: {
      //readonly:true,
      type: 'Array',
      init: {
        mode: 'fixed',
        dataContent:JSON.stringify(sampleData,null,2)
      }
    },
    display: {
      init: { style: { width: '100%', height: '480px' } }
    }
  }
}


export  default echartsRawConfig