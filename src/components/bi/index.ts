import folderBI from './folder'
//devextreme theme
import 'devextreme/dist/css/dx.light.css'

//
export default function installBI(globalContext) {
  //components

  installComponents(globalContext.componentRepository)
  //Plugins register
  installPulgin(globalContext)
}
function installComponents(componentRepository) {
  //
  const componentConfigs = [
    import('./widgets/filter/index'),
    import('./widgets/pie/index'),
    import('./widgets/line/index'),
    import('./widgets/bar/index'),
    import('./widgets/table/index')
  ]
  componentRepository.registerComponents(folderBI, componentConfigs)
}

function installPulgin(globalContext) {
  //jdbc connection editor
  globalContext.pluginManager.register({
    key: '_jdbcConnectionEditor',
    name: '数据库连接管理',
    description: '关系型数据库JDBC连接配置',
    icon: 'mdiDatabasePlus',
    entry: 'app',
    sequence: 10,
    ui: {
      '~': import('./plugin/connectionEditor/index.vue')
    }
  })
  //jdbc connection editor
  globalContext.pluginManager.register({
    key: '_biModelEditor',
    name: 'BI模型管理',
    description: '适用于BI组件的模型管理',
    icon: 'mdiTableMultiple',
    entry: 'app',
    sequence: 20,
    ui: {
      '~': import('./plugin/modelEditor/index.vue')
    }
  })
}
