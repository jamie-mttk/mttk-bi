import { isRef} from 'vue'


//Obtain value from data by path,return undefined if no value is found
export function getByPath(data:any,path:string){
    if (!path){
      return data
    }
    //
    let temp=isRef(data)?data.value:data;
    if(!temp){
      return undefined
    }
    //Split path by .
    let pathItems=path.split(".") ;
    for(let i=0;i<pathItems.length;i++){
      //
     // console.log(i+'==>'+pathItems[i]+'~~~'+JSON.stringify(temp))
      temp=temp[pathItems[i]]
      //console.log(JSON.stringify(temp))
      if(!temp){
        return undefined
      }
    }

    //
    return temp;
  }


  //Set value to data by path
  //Force:Create the proper object if path is not reachable
export function setByPath(data: any, path: string, value: any,force=false) {
    if (!path) {
      //
      return data;
    }
    //
    //

    // console.log('####'+isRef(data)+'~~~'+isReactive(data))

    let temp =isRef(data)?data.value:data;
  //  console.log('@@@'+isRef(temp)+'~~~'+isReactive(temp))
 //   console.log(data)
    let pathItems = path.split(".");
    for (let i = 0; i < pathItems.length; i++) {
      if (i == pathItems.length - 1) {
        //This is final node,set value directly
        // console.log('~~~~~~~~')
        // console.log(temp)
        // console.log(i)
        // console.log(pathItems[i])
        // console.log(value)
        temp[pathItems[i]] = value
        break;
      }
      if (!temp[pathItems[i]]) {
        //Path item does not existed,create
        temp[pathItems[i]] = {}
      }else{
        if (force && (typeof temp[pathItems[i]])!='object'){
          //If force create,try to create or modify to object
          temp[pathItems[i]] = {}
        }
      }  
      //
      temp = temp[pathItems[i]];
    }  
    //
    return data;
  
  }
