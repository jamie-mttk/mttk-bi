import folderBI from './folder'
//devextreme theme
//import 'devextreme/dist/css/dx.light.css'
import * as echarts from 'echarts'
import ecStat from 'echarts-stat'
//plugins
import installJdbcConnectionEditor from './plugin/connectionEditor/index'
import installBiModelEditor from './plugin/modelEditor/index'
import installLogin from './plugin/login/index'
//
import { useTitle } from '@vueuse/core'
//
import { installMessages} from './lang/index'
//
export   async function installBI(globalContext) {
  //install i18n
  installMessages(globalContext)
   
  //
  echarts.registerTransform(ecStat.transform.regression)
  //components
  await installComponents(globalContext.componentRepository)

  //Plugins register
  installJdbcConnectionEditor(globalContext)
  installBiModelEditor(globalContext)
  installLogin(globalContext)
  //
  registerThemes(globalContext);
  //Change title
  useTitle().value='MTTK OPEN BI'

}
async function installComponents(componentRepository) {
  //Here to load async so the i18n will be installed before 
  const componentConfigs = [
    import('./widgets/filter/index'),
    import('./widgets/table/index'),
    import('./widgets/crossTable/index'),
    import('./widgets/pie/index'),
    import('./widgets/line/index'),
    import('./widgets/bar/index'),
    import('./widgets/scatter/index'),
    import('./widgets/bubble/index'),
    import('./widgets/funnel/index'),
    import('./widgets/gauge/index'),
    import('./widgets/sankey/index'),
    import('./widgets/themeRiver/index'),
    import('./widgets/wordCloud/index'),
    import('./widgets/treemap/index'),
    import('./widgets/bubbleBaiduMap/index'),
    // import('./widgets/boxplot/index'),
    import('./widgets/radar/index'),
    import('./widgets/heatmap/index'),
    import('./widgets/indicatorKanban/index'),
    import('./widgets/heatBaiduMap/index'),
    import('./widgets/waterfall/index'),
  ]
  await componentRepository.registerComponents(folderBI, componentConfigs)
  //
}

function registerThemes(globalContext){
  
  //Regiester all echarts themes
  globalContext
    .request({
      method: 'GET',
      url: 'echartsTheme/query'
    })
    .then(function (response) {
      for (const theme of response.list) {
        echarts.registerTheme(theme.name, theme.value)
      }
    })
}
