

export function dividerTransform(config: any) {
  const result = {
    sys: {
      component: 'el-divider'
    },
    props: {},
    slots: { default: config.content || '' }
  }
  //Copy properties
  for (const k of Object.keys(config)) {
    if (k == 'content') {
      continue
    }
    result.props[k] = config[k]
  }
  //
  return result
}
