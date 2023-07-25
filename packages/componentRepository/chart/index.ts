import folderChart from './folder'
// 
import {echartsConfig} from './echarts/index'
import {echartsSimpleConfig} from './echartsSimple/index'

const installChart={
    install:function(componentRepository){
         //
        const componentConfigs=[echartsConfig,echartsSimpleConfig,]
        componentRepository.registerComponents(folderChart,componentConfigs)
    }
}


//
export default installChart