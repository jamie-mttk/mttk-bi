// import {unref,ref,computed} from 'vue'
import Filter from './Filter.vue'
import {wrapResult} from '../../utils/biTool'

export   function biFilterTransform({ config, data, context, key, contextWrap, fullConfig }) {

    const dataKey=fullConfig.config.data.dataKey
    //Set init value
    const dataFilter=context.d.getWithDefault(dataKey,{})
    //
    const result= {
        '~':Filter,
        '~modelValue':dataFilter,
        config:fullConfig.config.model,
    }
    // const result=build(dataFilter,fullConfig.config.model)
    //
    return wrapResult(context,result)
}