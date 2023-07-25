import folderSystem from './folder'
// 
import {htmlConfig} from './html/index'
import {imgConfig} from './img/index'
import { containerConfig } from './container/index'
const installBasic={
    install:function(componentRepository){
         //
        const componentConfigs=[htmlConfig,imgConfig,containerConfig,]
        componentRepository.registerComponents(folderSystem,componentConfigs)
    }
}


//
export default installBasic