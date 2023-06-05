import installSystem from './system/index'
import installElement from './element/index'
//It is defined outside function,so it will be shared among different import
const folders=[]
const components = []
export default function useComponentRepository(){
//Later repository will be built automatically from some defined folder


//return all the compont folders
function componentFolders() {
  return folders
}

//list component by folder
 function componentsByFolder(folder: string) {
  return components.filter(component=> folder==component.folder)
}
//Find component by key;return undefined if not found by key
 function componentByKey(key: string) {
  return components.find((item) => {
    return key == item.key
  })
}
//
function registFolder(folder:object){
  folders.push(folder)
}
//
function registComponent(component:object){
  components.push(component)
}
//Regist folder and components array(set the folder to the given folder)
function registerComponents(folder:Object,componentConfigs:Array<Object>){
  registFolder(folder)
  //
   const folderKey=folder.key
   //
   for(const componentConfig of componentConfigs){
      //Set folder key
      componentConfig.folder=folderKey
      //
      registComponent(componentConfig)
}
}
//Install all the buitin components
function useBuitin(){
  use(installSystem)
  use(installElement)

}
//Call the install funciton of target,the target may 
function use(target){
  if(target.install && typeof target.install=='function'){
    target.install(useComponentRepository())

  }
}
//
return {componentFolders,componentsByFolder,componentByKey,registFolder,registComponent,registerComponents,use,useBuitin}
}