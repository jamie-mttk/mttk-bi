// import {unref,ref,computed} from 'vue'

import Filter from './render/Filter.vue'
import { wrapResult } from '../../utils/biTool'
import {buildInitValue} from './filterInitUtil'

export function biFilterTransform({ config, data, context, key, contextWrap, fullConfig }) {
  const dataKey = fullConfig.config.data.dataKey
  //Build init value

  //Set init value
  const dataFilter = context.d.getWithDefault(dataKey, buildInitValue(fullConfig.config.model))
  //
  const result = {
    '~': Filter,
    '~modelValue': dataFilter,
    config: fullConfig.config.model,
    fullConfig
  }
  // const result=build(dataFilter,fullConfig.config.model)
  //
  return wrapResult(context, result)
}

