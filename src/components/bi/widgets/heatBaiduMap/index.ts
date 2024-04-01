import { biHeatBaiduMapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'




//
const biHeatBaiduMapConfig = {
  key: '_bi_heatBaiduMap',
  name: 'BI地图热力图',
  description: '',
  icon: 'mdiMapMarkerAccountOutline',
  sequence: 44,
  transform: biHeatBaiduMapTransform,  
  editor: {
    model: buildModelFull({
        type: 'heatBaiduMap'
      },[

        { _type: 'dimension', description:'第一个为经度,第二个为维度.如果存在第三个则是显示值(也可以设置在度量里)', option: { maxRow: 3,minRow:2 } },
        { _type: 'metric', description:'显示值,也可以设置在维度里', option: { maxRow: 1,minRow:0 } },
        'filter','rowLimit',
        'refresh','showSQL','showData',
      ]),
    basic: {
      init: {'center-longitude':104.114129,'center-latitude':37.550339,'zoom':5,'point-size':5,'blur-size':6},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInput('baidu-map-ak','百度地图AK'),
        widgetUtil.createInputNumber('center-longitude','中心经度'),
        widgetUtil.createInputNumber('center-latitude','中心维度'),
        widgetUtil.createInputNumber('zoom','缩放比例'),

        widgetUtil.createInputNumber('point-size','点大小'),
        widgetUtil.createInputNumber('blur-size','点阴影大小'),
      ]
    },
    //Position should be set to relative,otherwise baidu map may display outside div
    ... buildOtherProp({initStyle:{position:'relative'}})
  }
}



//
export default  biHeatBaiduMapConfig