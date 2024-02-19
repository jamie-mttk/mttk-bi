import * as transformUtil from '@/context/globalContext/componentRepository/util/transformUtil'
export const elementFormTransform= transformUtil.buildWidgetFunc('el-form',{}, (result, {config,data}) => {
  //build default
  result['#'] = buildItems(config, data)
  //
  return result
})

function buildItems(config: any, data: any) {
  const items = [] as object[]
  //
  for (const c of config._container || []) {
    items.push(buildItem(c, data))
  }
  //
  return items
}
function buildItem(c: any, data: any) {
  //
  const item = transformUtil.buildWidget('el-form-item', {config:c})
  item['#'] = buildController(c, data)
  //
  return item
}
function buildController(c: any, data: any) {
  const controllerType = c['~controllerType'] || 'input'
  //
  if (controllerType == 'container') {
    // return buildContainer(c)
    return transformUtil.buildPanel(c)
  }
  //
  const slot = {
    '~modelValue': data,
    '~modelValuePath': c.prop
  }
  //
  if (controllerType == 'input') {
    buildInput(c, slot)
  } else if (controllerType == 'input-number') {
    buildInputNumber(c, slot)
  } else if (controllerType == 'switch') {
    buildSwitch(c, slot)
  } else if (controllerType == 'select') {
    buildSelect(c, slot)
  } else {
    throw new Error('Unsuported type:' + controllerType)
  }
  //

  //
  return slot
}
function buildInput(c: any, slot: any) {
  //
  slot['~component'] = 'el-input'
  transformUtil.copyPropWithUL(c, slot)
  //
}

function buildInputNumber(c: any, slot: any) {
  //
  slot['~component'] = 'el-input-number'
  transformUtil.copyPropWithUL(c, slot)
  //
}
function buildSwitch(c: any, slot: any) {
  slot['~component'] = 'el-switch'
  transformUtil.copyPropWithUL(c, slot)
}
function buildSelect(c: any, slot: any) {
  slot['~component'] = 'el-select'
  transformUtil.copyPropWithUL(c, slot)
  //Select options
  buildSelectOptions(c, slot)
}
function buildSelectOptions(c: any, slot: any) {
  const options = [] as object[]
  //
  const raw = c['~options'] || ''

  //Assume ~options is seperated by , and may have : to sperate value and label
  const items = raw.split(',')
  //
  for (const item of items) {
    const split = item.split(':')
    options.push({
      '~component': 'el-option',
      label: split.length > 1 ? split[1] : split[0],
      value: split[0]
    })
  }

  // console.log(JSON.stringify(options,null,2))
  //

  slot['#'] =options
}

// function buildContainer(c: any) {
//   //
//   return {
//     '~component': Panel,
//     '~modelValue': computed({
//       get() {
//         return c['_children'] || []
//       },
//       set(value) {
//         c['_children'] = value
//       }
//     })
//   }
// }
