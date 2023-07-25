import { computed, unref } from 'vue'
import * as uiUtil from '../../util/uiUtil'
import { buildWidgetFunc } from '../../util/transformUtil'

//progress config
const progressConfig = {
  key: '_progress',
  name: 'Progress',
  description: 'Basic progress',
  icon: 'mdiBeakerOutline',
  sequence: 6,
  transform: buildWidgetFunc('el-progress', (result, config, value) => {
    //value is set to percentage
    result.props.percentage = value
    //If color is null, it will cause progress to load fail if type=line
    //So we do not generate this property
    //color=null if caused by clearing the color picker
    if (result.props.color == null) {
      delete result.props.color
    }
  }),
  editor: function (data: any) {
    return [
      uiUtil.createSelect('type', ['line', 'circle', 'dashboard']),
      uiUtil.createInputNumber('stroke-width'),
      uiUtil.createSwitch('text-inside', undefined, {
        '~show': computed(() => unref(data).type == 'line')
      }),
      uiUtil.createSelect('status', ['success', 'exception', 'warning']),
      uiUtil.createSwitch('indeterminate'),
      uiUtil.createInputNumber('duration'),
      uiUtil.createColorPicker('color'),
      uiUtil.createInputNumber('width', undefined, {
        '~show': computed(() => unref(data).type == 'circle' || unref(data).type == 'dashboard')
      }),
      uiUtil.createSwitch('show-text'),
      uiUtil.createSelect('stroke-linecap', ['butt', 'round', 'square'], undefined, {
        '~show': computed(() => unref(data).type == 'circle' || unref(data).type == 'dashboard')
      }),
      uiUtil.createSwitch('striped'),
      uiUtil.createSwitch('striped-flow')
    ]
  },
  dataConfig: {
    //readonly:true,
    type: 'Number'
  },
  initConfig: {
    props: {
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
  initStyles: {
    margin: '6px 0'
  }
}
//
export default progressConfig
