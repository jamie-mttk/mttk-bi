import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'

import { formatData } from '../utils/tooltipUtil'
import 'echarts/extension/bmap/bmap'
import { loadBMapWithCheck } from '../utils/baiduMapUtil'
import { baseConfigList } from './index'
const validateRules = [{ key: 'dimension',  min: 3 },
{ key: '_dimensionAndMetric', eq: 4}]

async function buildOption({ config, data, context, key, contextWrap, fullConfig }) {

  //Load baidu map ak(application key)
  const o = await loadBMapWithCheck(config['baidu-map-ak'])

  if (o) {
    //This mean no AK i set
    return o
  }
  //
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //
  const dataFinal = buildData(sourceData)
  const maxVal = calMaxValue(sourceData)
  //
  const option = {
    ...buildBaseOption({config,...baseConfigList}),
    tooltip: {
      trigger: 'item',
      valueFormatter(value) {
        //Get value config from metric or dimension depends on where it is set
        const config =
          (modelConfig.metric?.length || 0) == 1
            ? modelConfig.metric[0]
            : modelConfig.dimension[modelConfig.dimension.length - 1]
        return formatData(value, config)
      }
    },
    bmap: {
      center: [config['center-longitude'] || 104.114129, config['center-latitude'] || 37.550339],
      zoom: config['zoom'] || 5,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#f3f3f3'
            }
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highway',
            elementType: 'all',
            stylers: {
              color: '#fdfdfd'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'green',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subway',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'local',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'boundary',
            elementType: 'all',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'building',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'label',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#999999'
            }
          }
        ]
      }
    },
    series: [
      {
        name:
          (modelConfig.metric?.length || 0) > 0
            ? modelConfig.metric[0].label
            : modelConfig.dimension[modelConfig.dimension.length - 1].label,
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: dataFinal,
        symbolSize: calSymbolSize,
        encode: {
          value: 2
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        }
      }
    ]
  }
  //Check high ligh top n,if set add a new series
  const highlighTop = config['highlight-top'] || 0
  if (highlighTop > 0) {
    option.series.push({
      name:
        ((modelConfig.metric?.length || 0) > 0
          ? modelConfig.metric[0].label
          : modelConfig.dimension[modelConfig.dimension.length - 1].label) +
        ' -- top ' +
        highlighTop,
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: topData(dataFinal, highlighTop),
      symbolSize: calSymbolSize,
      encode: {
        value: 2
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: true
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: '#333'
      },
      emphasis: {
        scale: true
      },
      zlevel: 1
    })
  }
  //
  console.log(JSON.stringify(option,null,2))
  //
  return option

  //
  function calSymbolSize(val) {
    const symboSize = config['symbol-size'] || 40
    let symboSizeBase = config['symbol-size-base'] || 5
    if (symboSizeBase >= symboSize) {
      symboSizeBase = symboSize / 2
    }
    return (Math.abs(val[2]) / maxVal) * (symboSize - symboSizeBase) + symboSizeBase
  }
}



//
export const biBubbleBaiduMapTransform = buildTransformEcharts(
  buildOption,
  validateRules,
  undefined,
  {
    skipDataset: true
  }
)

function buildData(sourceData) {
  const result = []
  //
  let isFirstRow = true
  for (const d of sourceData) {
    if (isFirstRow) {
      isFirstRow = false
      continue
    }
    result.push({ name: d[0], value: [d[1], d[2], d[3]] })
  }
  //
  return result
}

function calMaxValue(sourceData) {
  //Calculate the max of abs value column(col 2),this is used to calcuate symbol/Funnel size
  let maxVal = 0
  let isFirstRow = true
  for (const item of sourceData) {
    if (isFirstRow) {
      isFirstRow = false
      continue
    }
    maxVal = Math.max(maxVal, Math.abs(item[3]))
  }
  return maxVal
}

function topData(dataFinal, highlighTop) {
  return dataFinal
    .sort(function (a, b) {
      return b.value[2] - a.value[2]
    })
    .slice(0, highlighTop)
}
