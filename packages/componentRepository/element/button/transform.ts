import { reactive } from 'vue'

export function buttonTransform(config: any) {
  const result = {
    sys: {
      component: 'el-button'
    },
    props: {},
    slots: { default: config.label || 'Button' }
  }
  //Copy properties
  for (const k of Object.keys(config)) {
    if (k == 'label') {
      continue
    }
    result.props[k] = config[k]
  }
  //
  return result
}
