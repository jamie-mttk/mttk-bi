import {locale} from 'mttk-lowcode-engine'
//Input options with optionGroup
export const inputOptions = [
  {
    key: '1',
    options: [
      { label: locale.t('bi.widgets.filter.data.inputOptions1'), value: '=' },
      { label: locale.t('bi.widgets.filter.data.inputOptions2'), value: '!=' }
    ]
  },
  {
    key: '2',
    options: [
      { label:locale.t('bi.widgets.filter.data.inputOptions3'), value: 'LIKE' },
      { label: locale.t('bi.widgets.filter.data.inputOptions4'), value: 'NOT_LIKE' }
    ]
  },
  {
    key: '3',
    options: [
      { label: locale.t('bi.widgets.filter.data.inputOptions5'), value: 'START_WITH' },
      { label: locale.t('bi.widgets.filter.data.inputOptions6'), value: 'END_WITH' }
    ]
  },
  {
    key: '4',
    options: [
      { label:locale.t('bi.widgets.filter.data.inputOptions7'), value: 'IS_NULL' },
      { label: locale.t('bi.widgets.filter.data.inputOptions8'), value: 'NOT_NULL' }
    ]
  },
  {
    key: '5',
    options: [
      { label: locale.t('bi.widgets.filter.data.inputOptions9'), value: 'EMPTY' },
      { label:locale.t('bi.widgets.filter.data.inputOptions10'), value: 'NOT_EMPTY' }
    ]
  }
]
// console.log('#######!!',JSON.stringify(inputOptions,null,2))
//Input options which have value to input once choosed
export const inputHasValueOptions=['=','!=','LIKE','NOT_LIKE','START_WITH','END_WITH']

//Input number match options
export const inputNumberOptions = [
  { label: locale.t('bi.widgets.filter.data.inputNumberOptions1'), value: '=' },
  { label: locale.t('bi.widgets.filter.data.inputNumberOptions2'), value: '!=' },
  { label:locale.t('bi.widgets.filter.data.inputNumberOptions3'), value: '>' },
  { label:locale.t('bi.widgets.filter.data.inputNumberOptions4'), value: '>=' },
  { label:locale.t('bi.widgets.filter.data.inputNumberOptions5'), value: '<' },
  { label: locale.t('bi.widgets.filter.data.inputNumberOptions6'), value: '<=' },
  { label: locale.t('bi.widgets.filter.data.inputNumberOptions7'), value: '_RANGE' },
]


//Input number match options
export const datetimeOptions = [
  { label: locale.t('bi.widgets.filter.data.datetimeOptions1'), value: '=' },
  { label: locale.t('bi.widgets.filter.data.datetimeOptions2'), value: '!=' },
  { label:locale.t('bi.widgets.filter.data.datetimeOptions3'), value: '>' },
  { label:locale.t('bi.widgets.filter.data.datetimeOptions4'), value: '>=' },
  { label:locale.t('bi.widgets.filter.data.datetimeOptions5'), value: '<' },
  { label: locale.t('bi.widgets.filter.data.datetimeOptions6'), value: '<=' },
  { label: locale.t('bi.widgets.filter.data.datetimeOptions7'), value: '_RANGE' },
]
//Datetime init value options
export const datetimeInitOptions=[
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions1'), value: 'now' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions2'), value: 't' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions3'), value: 't-1' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions4'), value: 't-2' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions5'), value: 't+1' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions6'), value: 't+2' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions7'), value: 'm' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions8'), value: 'm2' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions9'), value: 'y' },
  { label: locale.t('bi.widgets.filter.data.datetimeInitOptions10'), value: 'y2' },
]



//Input number match options
export const timeOptions = [
  { label: locale.t('bi.widgets.filter.data.timeOptions1'), value: '=' },
  { label: locale.t('bi.widgets.filter.data.timeOptions2'), value: '!=' },
  { label:locale.t('bi.widgets.filter.data.timeOptions3'), value: '>' },
  { label:locale.t('bi.widgets.filter.data.timeOptions4'), value: '>=' },
  { label:locale.t('bi.widgets.filter.data.timeOptions5'), value: '<' },
  { label: locale.t('bi.widgets.filter.data.timeOptions6'), value: '<=' },
  { label: locale.t('bi.widgets.filter.data.timeOptions7'), value: '_RANGE' },
]
//Datetime init value options
export const timeInitOptions=[
  { label:locale.t('bi.widgets.filter.data.timeInitOptions1'), value: 'now' },
  { label:locale.t('bi.widgets.filter.data.timeInitOptions2'), value: '00:00:00' },
  { label:locale.t('bi.widgets.filter.data.timeInitOptions3'), value: '12:00:00' },
  { label: locale.t('bi.widgets.filter.data.timeInitOptions4'), value: '23:59:59' },
]