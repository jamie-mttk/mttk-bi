import {computed} from 'vue'
import { locale } from 'mttk-lowcode-engine'

//  const keyRules = [{ pattern: /^[a-zA-Z]+$/, message: locale.t('bi.data.keyRules') }]

//Here we should use computed to avoid i18n to be evaluated during import which will cause the merged messages does not take affet
export const dataTypeList=computed(()=> {

    //
  return [
    { label: locale.t('bi.data.dataTypeList.string'), value: 'string' },
    { label: locale.t('bi.data.dataTypeList.integer'), value: 'integer' },
    { label: locale.t('bi.data.dataTypeList.number'), value: 'number' },
    { label: locale.t('bi.data.dataTypeList.datetime'), value: 'datetime' },
    { label: locale.t('bi.data.dataTypeList.time'), value: 'time' }
  ]

})

//
export function findDataType(value) {
  return dataTypeList.value.find((item) => item.value == value)
}
