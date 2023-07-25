import { ref, reactive, computed } from 'vue'
import Panel from '@/components/panel/index.vue'




export function containerTransform(config: any) {
  //
  const result = {
    sys: {      
      'component': Panel,
      'modelValue': computed({
        get() {
          return config['_children'] || []
        },
        set(value) {

          config['_children'] = value
        }
      })
    },
  }

  //
  return  result
}