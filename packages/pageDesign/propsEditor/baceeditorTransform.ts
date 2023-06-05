export function baceeditorTransform(config: any) {

  replaceIfNotExist(config,'lang','javascript')
  replaceIfNotExist(config,'width','100%')
  replaceIfNotExist(config,'height','20vh')
  replaceIfNotExist(config,'readonly',false)
  replaceIfNotExist(config,'font-size',14)
}
function replaceIfNotExist(config,key,value){
  if (config['#'][key]==undefined){
    config['#'][key]=value
  }
}