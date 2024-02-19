
  //Find plugins by entry, here the result is filtered if needed 
export function findPluginsByEntry(appContext,entry:string){
    let plugins=appContext.globalContext.pluginManager.findByEntry(entry)
    // console.log('0000',appContext.code.value,appContext.code)
    if(!appContext.getCode().customizePlugin){
      //not customized ,return all found
      return plugins;
    }
    //Plugin keys allowed
    const pluginKeys=appContext.getCode().plugins||[]
    //
    return plugins.filter(p=>!!pluginKeys.find(k=>k==p.key))
  }