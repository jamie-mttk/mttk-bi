import { ref, reactive, computed } from 'vue'
import Panel from  '@/components/panel/index.vue'

export function tabsTransform(config: any, value: any) {
  //const tabIndex = ref(0)

  //
  let result = {
    sys: {
      component: 'el-tabs',
      modelValue: value
    },
    props: {},
    slots: { default: { type: 'wrap', value: [] } }
  }
  //copy all props except tabs
  for (const k of Object.keys(config)) {
    if (k != '_container') {
      result.props[k] = config[k]
    }
  }

  //build default
  result.slots.default.value = buildTabs(config)
  //
  //console.log(JSON.stringify(result.props,null,2))
  //console.log(JSON.stringify(result,null,2))
  //
  return  result
}

function buildTabs(config: any) {
  const tabs = []
  //index used to set tab name
  let index = 0
  //
  for (const c of config['_container'] || []) {
    tabs.push(buildTab(c, index++))
  }
  //
  return tabs
}
function buildTab(c: any, index:number) {
  const tab = {
    sys: {
      component: 'el-tab-pane'
    },
    props: {},
    slots: {
      default: {
        type: 'wrap',
        value: [
          {
            '~component': Panel,
            '~modelValue': computed({
              get() {
                return c['_children'] || []
              },
              set(value) {
                c['_children'] = value
              }
            })
           
           
          }
        ]
      }
    }
  }
  //props
  for (const k of Object.keys(c)) {
    if (k.startsWith('_')) {
      continue
    }

    tab.props[k] = c[k]
  }
  //set name
  tab.props['name'] = index
  //Lazy is needed,otherwise all the component will be shown once tab is displayed first time
  tab.props['lazy'] = true
  //
  return tab
}
