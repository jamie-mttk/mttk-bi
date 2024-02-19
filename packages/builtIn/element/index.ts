import folderElement from './folder'
import * as functions from './functions/index'
// 

const installElement = {
  install: function (globalContext) {
    //
    const componentConfigs = [
      import('./widgets/button/index'),
      import('./widgets/table/index'),
      import('./widgets/layout/index'),
      import('./widgets/tabs/index'),
      import('./widgets/form/index'),
      import('./widgets/divider/index'),
      import('./widgets/input/index'),
      import('./widgets/progress/index'),
      import('./widgets/card/index'),
      import('./widgets/collapse/index'),
      import('./widgets/pagination/index'),
      import('./widgets/dialog/index'),
      import('./widgets/drawer/index'),
    ]
    globalContext.componentRepository.registerComponents(folderElement, componentConfigs)
        //
        globalContext.functionRepository.registBatch(functions)

  }
}
//
export default installElement
