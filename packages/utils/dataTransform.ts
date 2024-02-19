import { ElMessage } from 'element-plus'
import {smartJsonParse} from './tools'
//Try to conver dataContent to the required dataType
export function tryConvertDataType(dataKey:string,dataType: string, dataContent: string) {
    if (dataType == 'Array') {
      const result =smartJsonParse(dataContent)
      if (Array.isArray(result)) {
        return result;
      }
      ElMessage.error('The data of ' + dataKey + ' requires ' + dataType + ',but the data content can not be translate into an array')
      return undefined
    } else if (dataType == 'Object') {
      const result = smartJsonParse(dataContent)
      if (typeof result == 'object' && !Array.isArray(result)) {
        return result;
      }
      //
      ElMessage.error( 'The data of ' + dataKey + ' requires ' + dataType + ',but the data content can not be translate into an object or it is array')
      return undefined
    } else if (dataType == 'String') {
      return dataContent
    } else if (dataType == 'Number') {
      return Number(dataContent)
    } else if (dataType == 'Boolean') {
      //
      // console.log(typeof dataContent,dataContent,Boolean(dataContent))
      return dataContent!=undefined  && dataContent!='false'
    } else {
      return undefined;
  
    }
  }