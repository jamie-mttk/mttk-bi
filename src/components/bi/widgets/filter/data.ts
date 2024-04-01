//Input options with optionGroup
export const inputOptions = [
  {
    key: '1',
    options: [
      { label: '精确匹配', value: '=' },
      { label: '不匹配', value: '!=' }
    ]
  },
  {
    key: '2',
    options: [
      { label: '包含', value: 'LIKE' },
      { label: '不包含', value: 'NOT_LIKE' }
    ]
  },
  {
    key: '3',
    options: [
      { label: '开头是', value: 'START_WITH' },
      { label: '结尾是', value: 'END_WITH' }
    ]
  },
  {
    key: '4',
    options: [
      { label: '为空', value: 'IS_NULL' },
      { label: '不为空', value: 'NOT_NULL' }
    ]
  },
  {
    key: '5',
    options: [
      { label: '空文本', value: 'EMPTY' },
      { label: '非空文本', value: 'NOT_EMPTY' }
    ]
  }
]
//Input options which have value to input once choosed
export const inputHasValueOptions=['=','!=','LIKE','NOT_LIKE','START_WITH','END_WITH']

//Input number match options
export const inputNumberOptions = [
  { label: '等于', value: '=' },
  { label: '不等于', value: '!=' },
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '小于', value: '<' },
  { label: '小于等于', value: '<=' },
  { label: '范围区间', value: '_RANGE' },
]


//Input number match options
export const datetimeOptions = [
  { label: '等于', value: '=' },
  { label: '不等于', value: '!=' },
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '小于', value: '<' },
  { label: '小于等于', value: '<=' },
  { label: '范围区间', value: '_RANGE' },
]
//Datetime init value options
export const datetimeInitOptions=[
  { label: '当前', value: 'now' },
  { label: '今日', value: 't' },
  { label: '昨日', value: 't-1' },
  { label: '前日', value: 't-2' },
  { label: '后天', value: 't+1' },
  { label: '大后天', value: 't+2' },
  { label: '本月初', value: 'm' },
  { label: '下月初', value: 'm2' },
  { label: '本年初', value: 'y' },
  { label: '下年初', value: 'y2' },
]



//Input number match options
export const timeOptions = [
  { label: '等于', value: '=' },
  { label: '不等于', value: '!=' },
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '小于', value: '<' },
  { label: '小于等于', value: '<=' },
  { label: '范围区间', value: '_RANGE' },
]
//Datetime init value options
export const timeInitOptions=[
  { label: '当前', value: 'now' },
  { label: '零点', value: '00:00:00' },
  { label: '中午', value: '12:00:00' },
  { label: '凌晨', value: '23:59:59' },
]