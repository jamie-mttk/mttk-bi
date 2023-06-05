import { reactive } from 'vue'

export function inputTransform(config: any) {
  const result = {
    sys: {
      component: 'el-input'
    },
    props: {},
   
  }
  //Copy properties
  for (const k of Object.keys(config)) {

    result.props[k] = config[k]
  }
  //
  return result
}
