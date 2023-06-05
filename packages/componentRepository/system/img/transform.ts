export function imgTransform(config: any) {
  const result = {
    sys: { component:  'img' },
    props: {}
  }
  //
  for (const k of Object.keys(config) || []) {
      result.props[k] = config[k]
  }
  //
  return result
}
