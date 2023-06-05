import { ref, reactive, computed } from 'vue'
import Panel from  '@/components/panel/index.vue'

export function collapseTransform(config: any, value: any) {
  //const tabIndex = ref(0)

  //
  let result = {
    sys: {
      component: 'el-collapse',
      modelValue: value
    },
    props: {},
    slots: { default: { type: 'wrap', value: [] } }
  }
  //copy all props except collapse
  for (const k of Object.keys(config)) {
    if (k != '_container') {
      result.props[k] = config[k]
    }
  }

  //build default
  result.slots.default.value = buildItems(config)
  //
  //console.log(JSON.stringify(result.props,null,2))
  //console.log(JSON.stringify(result,null,2))
  //
  return  result
}

function buildItems(config: any) {
  const collapse = []
  //index used to set tab name
  let index = 0
  //
  for (const c of config['_container'] || []) {
    collapse.push(buildItem(c, index++))
  }
  //
  return collapse
}
function buildItem(c: any, index:number) {
  const item = {
    sys: {
      component: 'el-collapse-item'
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

    item.props[k] = c[k]
  }
  //set name,it should be string
  item.props['name'] = ''+index
  //
  return item
}
