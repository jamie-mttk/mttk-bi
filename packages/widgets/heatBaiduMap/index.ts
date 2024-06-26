import { biHeatBaiduMapTransform } from './transform'
import {
  buildModelFull,
  buildEchartsBaseUI,
  buildOtherProp,
  commonMoldelConfig
} from '../utils/indexUtil'
import { widgetUtil, locale } from 'mttk-lowcode-engine'
export const baseConfigList = { excludeList: ['xAxis', 'yAxis', 'dataZoom', 'grid', 'legend'] }

//
const biHeatBaiduMapConfig = {
  key: '_bi_heatBaiduMap',
  name: locale.t('bi.widgets.heatBaiduMap.name'),
  description: '',
  icon: 'mdiMapMarkerAccountOutline',
  sequence: 44,
  transform: biHeatBaiduMapTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'heatBaiduMap'
      },
      [
        {
          _type: 'dimension',
          description: locale.t('bi.widgets.heatBaiduMap.dimension_description'),
          option: { maxRow: 3, minRow: 2 }
        },
        {
          _type: 'metric',
          description: locale.t('bi.widgets.heatBaiduMap.metric_description'),
          option: { maxRow: 1, minRow: 0 }
        },
        ...commonMoldelConfig
      ]
    ),
    basic: {
      init: {
        'center-longitude': 104.114129,
        'center-latitude': 37.550339,
        zoom: 5,
        'point-size': 5,
        'blur-size': 6
      },
      ui: [
        {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.heatBaiduMap.name'),
          '~default': true,
          _children: [
            widgetUtil.createInput(
              'baidu-map-ak',
              locale.t('bi.widgets.heatBaiduMap.baidu-map-ak')
            ),
            widgetUtil.createInputNumber(
              'center-longitude',
              locale.t('bi.widgets.heatBaiduMap.center-longitude')
            ),
            widgetUtil.createInputNumber(
              'center-latitude',
              locale.t('bi.widgets.heatBaiduMap.center-latitude')
            ),
            widgetUtil.createInputNumber('zoom', locale.t('bi.widgets.heatBaiduMap.zoom')),
            widgetUtil.createInputNumber(
              'point-size',
              locale.t('bi.widgets.heatBaiduMap.point-size')
            ),
            widgetUtil.createInputNumber('blur-size', locale.t('bi.widgets.heatBaiduMap.blur-size'))
          ]
        },
        ...buildEchartsBaseUI(baseConfigList)
      ]
    },
    //Position should be set to relative,otherwise baidu map may display outside div
    ...buildOtherProp({ initStyle: { position: 'relative' } })
  }
}

//
export default biHeatBaiduMapConfig
