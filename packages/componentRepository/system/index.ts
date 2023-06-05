import folderSystem from './folder'
// 
import {htmlConfig} from './html/index'
import {imgConfig} from './img/index'

const installBasic={
    install:function(componentRepository){
         //
        const componentConfigs=[htmlConfig,imgConfig,]
        componentRepository.registerComponents(folderSystem,componentConfigs)
    }
}


//
export default installBasic