export default function pluginManager(contextGlobal) {
  //
  const plugins = [] as Object[]
  //Register
  function register(plugin: Object) {
    //
    const index = findIndexByKey(plugin.key)
    if (index < 0) {
      plugins.push(plugin)
    } else {
      //replace it
      plugins[index] = plugin
    }
  }
  //Unregister
  function unregister(key: string) {
    //
    const index = findIndexByKey(plugin.key)
    if (index < 0) {
      return undefined
    }
    //
    return plugins.splice(index,1)[0]
  }
  //Find plugins by entry,the return is a array sorted by sequence,return empty array if not found
  function findByEntry(entry:string){
    return  plugins.filter(p=>p.entry==entry).sort((p1,p2)=>(p1.sequence||0) - (p2.sequence||0))||[]

  }
  //
  //Find plugin index by key,return -1 if not found
  function findIndexByKey(key: string) {
    return plugins.findIndex(p => p.key == key)
  }
  function findAllPlugins(){
    return plugins;
  }
  //
  return { register, unregister,findByEntry,findAllPlugins }
}
