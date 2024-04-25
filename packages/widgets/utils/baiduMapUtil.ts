import {locale} from 'mttk-lowcode-engine'
export async function loadBMapWithCheck(ak){
    if (!ak) {
        //do nothing to avoid error
        return {
          title: {
            text: locale.t('bi.widgets.utils.baiduMapUtil.notify')
          }
        }
      }
      await loadBMap(ak)
      //OK
      return undefined
}
 
 
 export function loadBMap(ak) {
    return new Promise(function(resolve, reject) {
        if (typeof BMap !== 'undefined') {
            resolve(BMap)
            return true
        }
        window.onBMapCallback = function() {
            //  console.log('callback',BMap)
            resolve(BMap)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            'https://api.map.baidu.com/api?v=3.0&ak='+ ak +'&callback=onBMapCallback'
        script.onerror = reject
        document.head.appendChild(script)
    })
}