export async function loadBMapWithCheck(ak){
    if (!ak) {
        //do nothing to avoid error
        return {
          title: {
            text: '请先设置百度AK(Application Key)'
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
            // console.log('callback',BMap)
            resolve(BMap)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            'http://api.map.baidu.com/api?v=2.0&ak='+ ak +'&__ec_v__=20190126&callback=onBMapCallback'
        script.onerror = reject
        document.head.appendChild(script)
    })
}