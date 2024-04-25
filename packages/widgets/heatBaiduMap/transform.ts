import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'

import 'echarts/extension/bmap/bmap'
import { loadBMapWithCheck } from '../utils/baiduMapUtil'

const validateRules = [{ key: 'dimension',  min: 2 }]

async function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //Load baidu map ak(application key)
  const o = await loadBMapWithCheck(config['baidu-map-ak'])
  if (o) {
    //This mean no AK i set
    return o
  }
  //

  const sourceData = unref(data).data || []
  //
  const dataFinal = buildData(sourceData)

  //
  const option = {
    ...buildBaseOption({config}),
    animation: false,

    bmap: {
      center: [config['center-longitude'] || 104.114129, config['center-latitude'] || 37.550339],
      zoom: config['zoom'] || 5,
      roam: true
      // mapStyle: {
      //   styleJson: [
      //     {
      //       featureType: 'water',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#d1d1d1'
      //       }
      //     },
      //     {
      //       featureType: 'land',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#f3f3f3'
      //       }
      //     },
      //     {
      //       featureType: 'railway',
      //       elementType: 'all',
      //       stylers: {
      //         visibility: 'off'
      //       }
      //     },
      //     {
      //       featureType: 'highway',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#fdfdfd'
      //       }
      //     },
      //     {
      //       featureType: 'highway',
      //       elementType: 'labels',
      //       stylers: {
      //         visibility: 'off'
      //       }
      //     },
      //     {
      //       featureType: 'arterial',
      //       elementType: 'geometry',
      //       stylers: {
      //         color: '#fefefe'
      //       }
      //     },
      //     {
      //       featureType: 'arterial',
      //       elementType: 'geometry.fill',
      //       stylers: {
      //         color: '#fefefe'
      //       }
      //     },
      //     {
      //       featureType: 'poi',
      //       elementType: 'all',
      //       stylers: {
      //         visibility: 'off'
      //       }
      //     },
      //     {
      //       featureType: 'green',
      //       elementType: 'all',
      //       stylers: {
      //         visibility: 'off'
      //       }
      //     },
      //     {
      //       featureType: 'subway',
      //       elementType: 'all',
      //       stylers: {
      //         visibility: 'off'
      //       }
      //     },
      //     {
      //       featureType: 'manmade',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#d1d1d1'
      //       }
      //     },
      //     {
      //       featureType: 'local',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#d1d1d1'
      //       }
      //     },
      //     {
      //       featureType: 'arterial',
      //       elementType: 'labels',
      //       stylers: {
      //         visibility: 'off'
      //       }
      //     },
      //     {
      //       featureType: 'boundary',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#fefefe'
      //       }
      //     },
      //     {
      //       featureType: 'building',
      //       elementType: 'all',
      //       stylers: {
      //         color: '#d1d1d1'
      //       }
      //     },
      //     {
      //       featureType: 'label',
      //       elementType: 'labels.text.fill',
      //       stylers: {
      //         color: '#999999'
      //       }
      //     }
      //   ]
      // }
    },
    visualMap: {
      show: false,
      top: 'top',
      min: 0,
      max: 5,
      seriesIndex: 0,
      calculable: true,
      inRange: {
        color: ['blue', 'blue', 'green', 'yellow', 'red']
      }
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'bmap',
        data: dataFinal,

        pointSize: config['point-size'] || 5,
        blurSize: config['blur-size'] || 6
      }
    ]
  }

  //
  return option
}

//
export const biHeatBaiduMapTransform = buildTransformEcharts(
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
    result.push([d[0], d[1], d.length > 2 ? d[2] : 1])
  }
  //
  return result
}
