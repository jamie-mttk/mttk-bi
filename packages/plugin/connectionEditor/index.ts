
import {locale} from 'mttk-lowcode-engine'
export default function installJdbcConnectionEditor(globalContext){
      //jdbc connection editor
  globalContext.pluginManager.register({
    key: '_jdbcConnectionEditor',
    name: locale.t('bi.plugin.connectionEditor.name'),
    description: locale.t('bi.plugin.connectionEditor.description'),
    icon: 'mdiDatabasePlus',
    entry: 'app',
    auth: 'jdbcConnection', //the authorization check name
    sequence: 10,
    ui: {
      '~': import('./index.vue')
    }
  })
}