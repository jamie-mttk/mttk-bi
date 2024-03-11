//Build left side plugins, normally it is Pallet and Component tree
import { ref } from 'vue'
import {findPluginsByEntry} from '@/context/appContext/appContextUtil'
export function buildLeft(context) {
  const leftTabActive = ref('')

  const config = {
    '~': 'el-tabs',
    '~modelValue': leftTabActive,
    // type: 'border-card',
    stretch: true,
    '#': []
  }
  //
  const plugins =findPluginsByEntry(context.appContext,'left')
  //
  for (const p of plugins) {
    const c = {
      '~': 'el-tab-pane',
      name: p.key,
      '#label': [{ '~': 'lc-icon', icon: p.icon,style:{'margin-right':'4px'} }, p.name],
      '#': p.ui
    }
    //
    config['#'].push(c)
    //set leftTabActive to choose the first tab
    if (!leftTabActive.value) {
      leftTabActive.value = p.key
    }
  }
  //

  return config
}
