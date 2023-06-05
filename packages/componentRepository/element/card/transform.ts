import {computed} from 'vue'
import Panel from '@/components/panel/index.vue'
export function cardTransform(config: any) {
  const result = {
    sys: {
      component: 'el-card'
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
                return config['_children'] || []
              },
              set(value) {
                config['_children'] = value
              }
            })
          }
        ]
      }
    }
  }
  //Copy properties
  for (const k of Object.keys(config)) {
    result.props[k] = config[k]
  }
  //
  return result
}
