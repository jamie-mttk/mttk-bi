export function htmlTransform(config: any) {
  const result = {
    sys: { component: config.wrapBy || 'div' },
    slots: { default: { type: 'html', value: config.html || '' } }
  }

  //
  return result
}
