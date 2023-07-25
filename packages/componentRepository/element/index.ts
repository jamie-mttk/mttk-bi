import folderElement from './folder'
// //

const installElement = {
  install: function (componentRepository) {
    //
    const componentConfigs = [
      import('./button/index'),
      import('./table/index'),
      import('./layout/index'),
      import('./tabs/index'),
      import('./form/index'),
      import('./divider/index'),
      import('./input/index'),
      import('./progress/index'),
      ()=>import('./card/index'),
      import('./collapse/index'),
      import('./pagination/index'),

    ]
    componentRepository.registerComponents(folderElement, componentConfigs)
  }
}
//
export default installElement
