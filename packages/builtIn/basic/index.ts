import folderBasic from './folder'
//

const installBasic = {
  install: function (globalContext) {
    //
    const componentConfigs = [
      import('./widgets/html/index'),
      import('./widgets/img/index'),
      import('./widgets/container/index')
    ]
    //
    globalContext.componentRepository.registerComponents(folderBasic, componentConfigs)
  }
}

//
export default installBasic
