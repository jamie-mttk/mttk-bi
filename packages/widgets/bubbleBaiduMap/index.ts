import { biBubbleBaiduMapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp,commonMoldelConfig} from '../utils/indexUtil'
import  {widgetUtil,locale} from 'mttk-lowcode-engine'




//
const biBubbleBaiduMapConfig = {
  key: '_bi_bubbleBaiduMap',
  name: locale.t('bi.widgets.bubbleBaiduMap.name'),
  description: '',
  icon: 'mdiMapMarkerRadiusOutline',
  sequence: 42,
  transform: biBubbleBaiduMapTransform,  
  editor: {
    model: buildModelFull({
        type: 'bubbleBaiduMap'
      },[

        { _type: 'dimension', description:locale.t('bi.widgets.bubbleBaiduMap.dimension_description'), option: { maxRow: 4,minRow:3 } },
        { _type: 'metric', description:locale.t('bi.widgets.bubbleBaiduMap.metric_description'), option: { maxRow: 1,minRow:0 } },
        ...commonMoldelConfig
      ]),
    basic: {
      init: {'center-longitude':104.114129,'center-latitude':37.550339,'zoom':5,'highlight-top':0,'symbol-size':40,'symbol-size-base':0},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInput('baidu-map-ak',locale.t('bi.widgets.bubbleBaiduMap.baidu-map-ak')),
        widgetUtil.createInputNumber('center-longitude',locale.t('bi.widgets.bubbleBaiduMap.center-longitude')),
        widgetUtil.createInputNumber('center-latitude',locale.t('bi.widgets.bubbleBaiduMap.center-latitude')),
        widgetUtil.createInputNumber('zoom',locale.t('bi.widgets.bubbleBaiduMap.zoom')),
        widgetUtil.createInputNumber('highlight-top',locale.t('bi.widgets.bubbleBaiduMap.highlight-top'),{min:0}),
        widgetUtil.createInputNumber('symbol-size',locale.t('bi.widgets.bubbleBaiduMap.symbol-size')),
        widgetUtil.createInputNumber('symbol-size-base',locale.t('bi.widgets.bubbleBaiduMap.symbol-size-base')),
      ]
    },
    //Position should be set to relative,otherwise baidu map may display outside div
    ... buildOtherProp({initStyle:{position:'relative'}})
  }
}

//
export default  biBubbleBaiduMapConfig