import { selectTransform } from './selectTransform'
import { radioTransform } from './radioTransform'
import { baceeditorTransform } from './baceeditorTransform'
import { mergeJson } from '../formTransform'
import lcMyInput from './MyInput.vue'

export function buildConfig(modelValue: Object, itemConfig: Object, pageContext) {
  //
 // console.log('buildConfig',itemConfig)
  //
  const c = {
    '~component': mapComponent(itemConfig['~component']),
    '~modelValue': modelValue,
    '~modelValuePath': itemConfig['~prop']
    //
  }
  //copy all propties to slot #
  mergeJson(c, itemConfig, true)
  //
  const compName = stdComponent(itemConfig['~component'])
  if ('elselect' == compName) {
    //select
    selectTransform(c, itemConfig, pageContext)
    //console.log(JSON.stringify(c,null,2))
  } else if ('elradiogroup' == compName) {
    //radio
    radioTransform(c, itemConfig['~options'])
  } else if ('baceeditor' == compName) {
    //
    baceeditorTransform(c)
  } else if ('elinput' == compName) {
    //add resize to both so user can resize at both directions
    // c['resize'] = 'both'
  }

  //
  return c
}
//convert ~component to low case to compare
//If it is not string,return undefined
export function stdComponent(component) {
  if (typeof component != 'string') {
    return component
  }
  //
  return component.replaceAll('-', '').toLowerCase()
}

function mapComponent(componentName) {
  if (typeof componentName != 'string') {
    return
  }
  //
  const stdName = stdComponent(componentName)
  if (stdName == 'elinput') {
    //Change input to debounce version to reduce the error during editing
    return lcMyInput
  }
  //
  return componentName
}
