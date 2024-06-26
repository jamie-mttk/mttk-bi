import { biTableTransform } from './transform'
import { buildModelFull, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
const biTableConfig = {
  key: '_bi_table',
  name: locale.t('bi.widgets.table.name'),
  description: '',
  icon: 'mdiTableLarge',
  sequence: 2,
  transform: biTableTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'table',
        dumpMode: 'JSON'
      },
      [
        { _type: 'dimension', dimension: 'metric', label: locale.t('bi.widgets.table.dimension'), option: { minRow: 0 } },
        { _type: 'metric', prop: 'metric', label: locale.t('bi.widgets.table.metric'), option: { minRow: 0 } },
        'pagination',
        ...commonMoldelConfig
      ]
    ),
    basic: {
      init: { border: true, stripe: false },
      ui: [
        widgetUtil.createInput('_title', locale.t('bi.widgets.table.title')),
        widgetUtil.createSwitch('border', locale.t('bi.widgets.table.border')),
        widgetUtil.createSwitch('stripe', locale.t('bi.widgets.table.stripe')),
        widgetUtil.createSwitch('_showIndex', locale.t('bi.widgets.table.showIndex')),
        widgetUtil.createSwitch('_showSummary', locale.t('bi.widgets.table.showSummary')),
        widgetUtil.createSwitch('_mergeSameColumn', locale.t('bi.widgets.table.mergeSameColumn')),
        widgetUtil.createSwitch('_sortable', locale.t('bi.widgets.table.sortable')),
      ]
    },
    ... buildOtherProp({initStyle:{height:'auto'}})
  }
}

//
export default biTableConfig
