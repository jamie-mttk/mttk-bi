//
import dataManager from '@/builtIn/plugin/dataEditor/dataManager'
import computedManager from '@/builtIn/plugin/computedEditor/computedManager'
import methodManager from '@/builtIn/plugin/methodEditor/methodManager'
import apiManager from '@/builtIn/plugin/apiEditor/apiManager'
import componentManager from '@/builtIn/plugin/componentTree/componentManager'

// import Title from '@/builtIn/plugin/top/title.vue'
//Install system default plugins
//if plugins is set,only the key in plugins will be installed
//if pluginsExclude is set,the key in pluginsExclude will not installed
export function installPlugin(globalContext, plugins?,pluginsExclude?) {
  function allow(key) {
    return (!plugins || plugins.includes(key)) && (!pluginsExclude ||!pluginsExclude.includes(key))
  }
  //login
  if (allow('_login')) {
    globalContext.pluginManager.register({
      key: '_login',
      name: 'Login',
      description: '',
      icon: '',
      entry: 'login',
      sequence: 20,
      ui: {
        '~': import('@/builtIn/plugin/login/index.vue')
      }
    })
  }
  //LEFT
  //pallet
  if (allow('_pallet')) {
    globalContext.pluginManager.register({
      key: '_pallet',
      name: 'Pallet',
      description: 'Show all the registered components',
      icon: 'mdiApps',
      entry: 'left',
      sequence: 10,
      ui: {
        '~': import('@/builtIn/plugin/pallet/index.vue')
      }
    })
  }
  //component tree
  if (allow('_componentTree')) {
    globalContext.pluginManager.register({
      key: '_componentTree',
      name: 'Outline Tree',
      description: 'Display components tree',
      icon: 'mdiFileTree',
      entry: 'left',
      sequence: 20,
      ui: {
        '~': import('@/builtIn/plugin/componentTree/index.vue')
      }
    })
  }
  //MAIN
  //data editor
  if (allow('_dataEditor')) {
    globalContext.pluginManager.register({
      key: '_dataEditor',
      name: 'Data Editor',
      description: '',
      icon: 'mdiDatabaseEditOutline',
      entry: 'main',
      sequence: 20,
      ui: {
        '~': import('@/builtIn/plugin/dataEditor/index.vue')
      }
    })
  }
  //computed editor
  if (allow('_computedEditor')) {
    globalContext.pluginManager.register({
      key: '_computedEditor',
      name: 'Computed Editor',
      description: '',
      icon: 'mdiDatabaseSyncOutline',
      entry: 'main',
      sequence: 30,
      ui: {
        '~': import('@/builtIn/plugin/computedEditor/index.vue')
      }
    })
  }
  //MethodEditor
  if (allow('_methodEditor')) {
    globalContext.pluginManager.register({
      key: '_methodEditor',
      name: 'Method Editor',
      description: '',
      icon: 'mdiFunction',
      entry: 'main',
      sequence: 40,
      ui: {
        '~': import('@/builtIn/plugin/methodEditor/index.vue')
      }
    })
  }
  //ApiEditor
  if (allow('_apiEditor')) {
    globalContext.pluginManager.register({
      key: '_apiEditor',
      name: 'API Editor',
      description: '',
      icon: 'mdiApi',
      entry: 'main',
      sequence: 50,
      ui: {
        '~': import('@/builtIn/plugin/apiEditor/index.vue')
      }
    })
  }
  //Lifecycle Editor
  if (allow('_lifecycleEditor')) {
    globalContext.pluginManager.register({
      key: '_lifecycleEditor',
      name: 'Lifecycle Editor',
      description: '',
      icon: 'mdiPagePreviousOutline',
      entry: 'main',
      sequence: 60,
      ui: {
        '~': import('@/builtIn/plugin/lifecycleEditor/index.vue')
      }
    })
  }
  //SourceCode
  if (allow('_sourceCode')) {
    globalContext.pluginManager.register({
      key: '_sourceCode',
      name: 'Source Code',
      description: '',
      icon: 'mdiFileCodeOutline',
      entry: 'main',
      sequence: 100,
      ui: {
        '~': import('@/builtIn/plugin/sourceCode/index.vue')
      }
    })
  }
  //Top -left - title
  if (allow('_title')) {
    globalContext.pluginManager.register({
      key: '_title',
      name: 'Title',
      description: '',
      icon: '',
      entry: 'top_left',
      sequence: 100,
      ui: {
        '~': import('@/builtIn/plugin/top/title.vue')
        // '~':Title
      }
    })
  }
  //Top -right - system buttons
  if (allow('_button_sys')) {
    globalContext.pluginManager.register({
      key: '_button_sys',
      name: 'Button sys',
      description: '',
      icon: '',
      entry: 'top_right',
      sequence: 100,
      ui: {
        '~': import('@/builtIn/plugin/top/buttonSys.vue')
      }
    })
  }
  //
  if (allow('d')) {
    globalContext.pluginManager.register({
      key: 'd',
      alias: 'dataManager',
      name: 'Data Manager',
      description: '',
      entry: 'context',
      // sequence: 100,
      handler: dataManager
    })
  }
  if (allow('c')) {
    globalContext.pluginManager.register({
      key: 'c',
      alias: 'computedManager',
      name: 'Computed Manager',
      description: '',
      entry: 'context',
      // sequence: 100,
      handler: computedManager
    })
  }
  if (allow('m')) {
    globalContext.pluginManager.register({
      key: 'm',
      alias: 'methodManager',
      name: 'Method Manager',
      description: '',
      entry: 'context',
      // sequence: 100,
      handler: methodManager
    })
  }
  if (allow('a')) {
    globalContext.pluginManager.register({
      key: 'a',
      alias: 'apiManager',
      name: 'API Manager',
      description: '',
      entry: 'context',
      // sequence: 100,
      handler: apiManager
    })
  }
  if (allow('componentManager')) {
    globalContext.pluginManager.register({
      key: 'componentManager',
      // alias:'componentManager',
      name: 'Component Manager',
      description: '',
      entry: 'context',
      // sequence: 100,
      handler: componentManager
    })
  }
}
