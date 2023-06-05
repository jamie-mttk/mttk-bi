
const functions = {}
export default function useTestRepository(){
//Later repository will be built automatically from some defined folder


//
function regist(key:String,func:Function){
  functions[key]=func
}
function get(key:String){
  return functions[key]
}
//
return {regist,get}
}