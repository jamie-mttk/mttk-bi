//
export const keyRules = [{ pattern: /^[a-zA-Z]+$/, message: '字段必须是字母' }]

//
export const dataTypeList = [
  { label: '文本', value: 'string' },
  { label: '整数', value: 'integer' },
  { label: '数字', value: 'number' },
  { label: '日期时间', value: 'datetime' },
  { label: '时间', value: 'time' }
]
//
// export const modelTypeList=[
//   { label: '表/视图', value: 'entity' },
//   { label: 'SQL', value: 'sql' },
// ]

// //Find modelType by value
// export function modelTypeByValue(value:string){
//   for(const m of modelTypeList){
//     if(m.value==value){
//       return m
//     }
//   }
//   //
//   return undefined
// }