import { computed } from 'vue'
import Panel from  '@/components/panel/index.vue'

export function layoutTransform(config: any) {


  //
  let result = {
    sys: {
      component: 'el-row',
    },
    props: {},
    slots: { default: { type: 'wrap', value: [] } }
  }
  //copy all props except tabs
  for (const k of config.props || []) {
    if (k != '_container') {
      result.props[k] = config.props[k]
    }
  }

  //build default
  result.slots.default.value = buildCols(config)
  //

  //
  return  result
}

function buildCols(config: any) {
  const tabs = []
  //index used to set tab name
  let index = 1
  //
  for (const c of config['_container'] || []) {
    tabs.push(buildCol(c, index++))
  }
  //
  return tabs
}
function buildCol(c: any, index:number) {
  const tab = {
    sys: {
      component: 'el-col'
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
  //
  return tab
}
