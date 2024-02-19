import folderECharts from './folder'

import * as functions from './functions/index'


const installEChart = {
  install: function (globalContext) {
    //
    const componentConfigs = [
      import('./widgets/echartsTypical/index'),
      import('./widgets/echartsSimple/index'),
      import('./widgets/echartsRaw/index')
    ]
    //
    globalContext.componentRepository.registerComponents(folderECharts, componentConfigs)
    //
    globalContext.functionRepository.registBatch(functions)
  }
}

//
export default installEChart
