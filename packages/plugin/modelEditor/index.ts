
import {locale} from 'mttk-lowcode-engine'

export default function installBiModelEditor(globalContext){
  //jdbc connection editor
  globalContext.pluginManager.register({
    key: '_biModelEditor',
    name: locale.t('bi.plugin.modelEditor.name'),
    description: locale.t('bi.plugin.modelEditor.description'),
    icon: 'mdiTableMultiple',
    entry: 'app',
    sequence: 20,
    auth: 'dataModel',
    ui: {
      '~': import('./index.vue')
    }
  })
}