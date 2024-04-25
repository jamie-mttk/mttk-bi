import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'


export function installMessages(globalContext) {
  //Add new messages
  const { mergeLocaleMessage, } =globalContext.i18n.global
  // console.log(i18n,globalContext.i18n)
  mergeLocaleMessage('zhCN', zhCN)
  mergeLocaleMessage('enUS', enUS)

}
