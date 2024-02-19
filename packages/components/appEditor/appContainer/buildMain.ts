import { ref,computed} from 'vue'
import {findPluginsByEntry} from '@/context/appContext/appContextUtil'
import MenuAndPageEditor from './MenuAndPageEditor.vue'
//build main tabs config
export default function buildMain(appContext){
    //activetab
    const activeTab=ref('menuAndPage') 
    //
    const config={
        '~':'el-tabs',
        '~modelValue':activeTab,
        type:'border-card',
        '#':[
            {
                '~':'el-tab-pane',
                '#label': [{ '~': 'lc-icon', icon:'mdiFileDocumentMultipleOutline' ,style:{'margin-right':'4px'}}, 'Menu and page'],
                'name':'menuAndPage',
                '#':{
                    '~':MenuAndPageEditor,
                    '@pageDesign':'pageDesign',//throw pageDesign event
                }
            }
        ]
    }
    //
    handlePlugins(config,appContext)
    //
    return config;
}

function handlePlugins(config,appContext){
    // console.log('handleDone')
    // const test=appContext.code
  const plugins=findPluginsByEntry(appContext,'app')

  for(const p of plugins){
    const c={'~':'el-tab-pane',
    // label:p.name,
    name:p.key,
    '#label': [{ '~': 'lc-icon', icon: p.icon ,style:{'margin-right':'4px'}}, p.name],
    '#':p.ui
    }
    //
    config['#'].push(c)
  }
}