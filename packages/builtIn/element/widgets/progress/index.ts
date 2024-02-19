import { computed, unref } from 'vue'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'

//progress config
const progressConfig = {
  key: '_progress',
  name: 'Progress',
  description: 'Basic progress',
  icon: 'mdiBeakerOutline',
  sequence: 43,
  transform: buildWidgetFunc('el-progress', {},(result, {data}) => {
    //value is set to percentage
    result.percentage = data
    //If color is null, it will cause progress to load fail if type=line
    //So we do not generate this property
    //color=null if caused by clearing the color picker
    if (result.color == null) {
      delete result.color
    }
  }),
  editor: {
    basic: {
      ui: function ({config}) {
        return [
          uiUtil.createSelect('type', ['line', 'circle', 'dashboard']),
          uiUtil.createInputNumber('stroke-width'),
          uiUtil.createSwitch('text-inside', undefined, {
            '~show': computed(() => unref(config).type == 'line')
          }),
          uiUtil.createSelect('status', ['success', 'exception', 'warning']),
          uiUtil.createSwitch('indeterminate'),
          uiUtil.createInputNumber('duration'),
          uiUtil.createColorPicker('color'),
          uiUtil.createInputNumber('width', undefined, {
            '~show': computed(() => unref(config).type == 'circle' || unref(config).type == 'dashboard')
          }),
          uiUtil.createSwitch('show-text'),
          uiUtil.createSelect('stroke-linecap', ['butt', 'round', 'square'], undefined, {
            '~show': computed(() => unref(config).type == 'circle' || unref(config).type == 'dashboard')
          }),
          uiUtil.createSwitch('striped'),
          uiUtil.createSwitch('striped-flow')
        ]
      },
      init: {

          type: 'line',
          'stroke-width': 6,
          'text-inside': false,
          indeterminate: false,
          duration: 3,
          width: 126,
          'show-text': true,
          'stroke-linecap': 'round',
          striped: false,
          'striped-flow': false

      }
    },
    data: {
      //readonly:true,
      type: 'Number',
      init: {
        mode: 'fixed',
        dataContent: '65'
      }
    },
    display: {
      init: {
        style: {
          margin: '6px 0'
        }
      }
    }
  }
}
//
export default progressConfig
