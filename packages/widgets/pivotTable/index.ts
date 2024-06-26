import { bipivotTableTransform } from './transform'
import { buildModelFull, buildOtherProp,commonMoldelConfig } from '../utils/indexUtil'
import { widgetUtil,locale } from 'mttk-lowcode-engine'
//
const biTableConfig = {
  key: '_bi_pivotTable',
  name: locale.t('bi.widgets.pivotTable.name'),
  description: '',
  icon: 'mdiTableHeadersEye',
  sequence: 3,
  transform: bipivotTableTransform,
  editor: {
    model: buildModelFull(
      {
        type: 'table',
        dumpMode: 'JSON'
      },
      [
        { _type: 'dimension',prop:'dimensionCol',label:locale.t('bi.widgets.pivotTable.dimensionCol'), description:locale.t('bi.widgets.pivotTable.dimension_description'),  option: { minRow: 1, } },
        { _type: 'dimension',prop:'dimensionRow',label:locale.t('bi.widgets.pivotTable.dimensionRow'), description:locale.t('bi.widgets.pivotTable.dimension_description'), option: { minRow: 1, } },
        { _type: 'metric',  option: { minRow: 1} },
        ...commonMoldelConfig
      ]
    ),
    basic: {
      init: {},
      ui: [
        widgetUtil.createInput('title-text', locale.t('bi.widgets.table.title')),
        widgetUtil.createInput('emptyValue', locale.t('bi.widgets.pivotTable.emptyValue')),
        
      ]
    },
    ... buildOtherProp({initStyle:{height:'auto'}})
  }
}

//
export default biTableConfig
