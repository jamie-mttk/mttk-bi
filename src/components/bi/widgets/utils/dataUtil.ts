//Utils to handle data

//Get the distinct list from data of the given array index
//And the first line is skipped
export function getDistinctColumns(data, index) {
    const result = []
    let isFirst = true
    for (const d of data) {
      if (isFirst) {
        isFirst = false
        continue
      }
      if (!result.includes(d[index])) {
        result.push(d[index])
      }
    }
    return result
  }

  //Convert array to map, so the item sequence can be found quickly
  //input:['a','b','c']
  //output: {'a':0,'b':1,'c':2}
  export function arrayToIndexMap(arr){
    const result={}
    //
    for(let i=0;i<arr.length;i++){
        result[arr[i]]=i
    }
    //
    return result;
  }