
//Get first metric or last dimension
//return undefined if not found
export function getMetricOrDimension(modelConfig){
    if((modelConfig.metric?.length || 0)>0){
        return modelConfig.metric[0]
    }else if((modelConfig.dimension?.length || 0)>0){
        return modelConfig.dimension[modelConfig.dimension.length-1]
    }else{
        return undefined
    }
   
}
//safe get the array item,index started from 0
//for exxample key='dimension',index='2'
//return undefined if no such item
export function safeGetArrayItem(modelConfig,key,index){
    const arr=modelConfig[key]
    if(!arr||!Array.isArray(arr)||arr.length<=index){
        return undefined
    }
    //
    return arr[index]
}

//0 - no title-text/title-subtext
//1  has one
//2  has two
//others, no meaning
export function countTitle(config){
    let count=0;
    if(config['title-text']){
        count++;
    }
    if(config['title-subtext']){
        count++;
    }
    return count;
}