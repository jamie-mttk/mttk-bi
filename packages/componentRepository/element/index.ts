import folderElement from './folder'
// //
import { buttonConfig } from './button/index'
import { tableConfig } from './table/index'
import { layoutConfig } from './layout/index'
import { tabsConfig } from './tabs/index'
import { formConfig } from './form/index'
import { containerConfig } from './container/index'
import { dividerConfig } from './divider/index'
import { inputConfig } from './input/index'
import { progressConfig } from './progress/index'
import { cardConfig } from './card/index'
import { collapseConfig } from './collapse/index'
import { paginationConfig } from './pagination/index'
import { sampleConfig } from './sample/index'
const installElement = {
  install: function (componentRepository) {
    //
    const componentConfigs = [
      buttonConfig,
      tableConfig,
      layoutConfig,
      tabsConfig,
      formConfig,
      containerConfig,
      dividerConfig,
      inputConfig,
      progressConfig,
      cardConfig,
      collapseConfig,
      paginationConfig,
      sampleConfig,
    ]
    componentRepository.registerComponents(folderElement, componentConfigs)
  }
}
//
export default installElement
