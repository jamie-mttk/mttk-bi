import installBasic from './basic/index'
import installElement from './element/index'
import installEcharts from './echarts/index'

// import Title from '@/plugin/top/title.vue'
//Install system default plugins
export function installBuiltIn(globalContext) {
    installBasic.install(globalContext)
    installElement.install(globalContext)
    installEcharts.install(globalContext)
    //
    globalContext.componentRepository.resetPageWidget()
  
}
