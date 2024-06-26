import { biLineTransform } from './transform'
import { buildModelFull, buildEchartsBaseUI, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
const biLineConfig = {
  key: '_bi_line',
  name: locale.t('bi.widgets.line.name'),
  description: '',
  icon: 'mdiChartBellCurveCumulative',
  sequence: 12,
  transform: biLineTransform,
  editor: {
    model: buildModelFull({ type: 'line' }, [
      'dimension',
      'metric',
      'drilling',
    ...commonMoldelConfig
    ]),
    basic: {
      init: {smooth:true,},
      ui: [
                {
          '~component': 'el-collapse',
          '~label': locale.t('bi.widgets.line.name'),
          '~default':true,
          _children: [
            widgetUtil.createSwitch('smooth', locale.t('bi.widgets.line.smooth')),
            widgetUtil.createSelect(
              'step',
              [
                { label: locale.t('bi.widgets.line.step_start'), value: 'start' },
                { label: locale.t('bi.widgets.line.step_middle'), value: 'middle' },
                { label: locale.t('bi.widgets.line.step_end'), value: 'end' },
              ],
              locale.t('bi.widgets.line.step')
            ),
            widgetUtil.createSwitch('areaMode',locale.t('bi.widgets.line.areaMode')),
            widgetUtil.createSwitch('stack', locale.t('bi.widgets.line.stack')),
          ]
        },
        ...buildEchartsBaseUI(),

      ]
    },
    ...buildOtherProp()
  }
}

//
export default biLineConfig
