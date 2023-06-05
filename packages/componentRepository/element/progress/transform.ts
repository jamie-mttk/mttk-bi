import { reactive } from 'vue'

export function progressTransform(config: any, value: any) {
  const result = {
    sys: {
      component: 'el-progress',
    },
    props: {
       //
       percentage: value
    },
   
  }
  //Copy properties
  for (const k of Object.keys(config)) {
    if(k=='color' &&  config[k]==null){
      //If color is null, it will cause progress to load fail if type=line
      //So we do not generate this property
      //color=null if caused by clearing the color picker
      continue;
    }
    result.props[k] = config[k]
  }
  //
  return result
}
