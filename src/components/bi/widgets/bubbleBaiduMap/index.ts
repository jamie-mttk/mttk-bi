import { biBubbleBaiduMapTransform } from './transform'
import {buildModelFull,buildEchartsBaseUI,buildOtherProp} from '../utils/indexUtil'
import  {widgetUtil} from 'mttk-lowcode-engine'




//
const biBubbleBaiduMapConfig = {
  key: '_bi_bubbleBaiduMap',
  name: 'BI地图气泡图',
  description: '',
  icon: 'mdiMapMarkerRadiusOutline',
  sequence: 42,
  transform: biBubbleBaiduMapTransform,  
  editor: {
    model: buildModelFull({
        type: 'bubbleBaiduMap'
      },[

        { _type: 'dimension', description:'维度第一个参数为地名,第二个为经度,第三个为纬度.如果存在第4个则是显示值(也可以设置在度量里)', option: { maxRow: 4,minRow:3 } },
        { _type: 'metric', description:'显示值,也可以设置在维度里', option: { maxRow: 1,minRow:0 } },
        'filter','rowLimit',
        'refresh','showSQL','showData',
      ]),
    basic: {
      init: {'center-longitude':104.114129,'center-latitude':37.550339,'zoom':5,'highlight-top':0,'symbol-size':40,'symbol-size-base':0},
      ui: [
        ...buildEchartsBaseUI(),
        widgetUtil.createInput('baidu-map-ak','百度地图AK'),
        widgetUtil.createInputNumber('center-longitude','中心经度'),
        widgetUtil.createInputNumber('center-latitude','中心维度'),
        widgetUtil.createInputNumber('zoom','缩放比例'),
        widgetUtil.createInputNumber('highlight-top','高亮前多少个',{min:0}),
        widgetUtil.createInputNumber('symbol-size','符号最大大小'),
        widgetUtil.createInputNumber('symbol-size-base','符号基本大小'),
      ]
    },
    //Position should be set to relative,otherwise baidu map may display outside div
    ... buildOtherProp({initStyle:{position:'relative'}})
  }
}

//
export default  biBubbleBaiduMapConfig