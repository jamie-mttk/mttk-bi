import { ref } from 'vue'
export default function choosedManager(context) {
  const choosed = ref({})
  //Last unqieValue transfered from set
  let uniqueValueLast = undefined
  //
  function get() {

    return choosed.value
  }
  //uniqueValue is used to avoid event bubble
  //Stop the event bubble may cause unexpected issue ,for example the component can not catch mouse down event
  //
  function set(choosedNew, uniqueValue?: string) {
    //  console.log(uniqueValue,uniqueValueLast,choosedNew)
    if (uniqueValue && uniqueValueLast && uniqueValueLast == uniqueValue) {
      //If the save event cause multiple chooseevent, only the first event is triggered
      return
    }

    //Save it!
    uniqueValueLast = uniqueValue

    //
    // console.log('2222',uniqueValue,uniqueValueLast,choosedNew)
    //    try{
    //     throw Error('AAA')
    //    }catch(err){
    //     console.log('&&&&&&&&&',err)
    //    }
    // if(!choosedNew){
    //     const code=context.codeManager.getCode()
    //     if(code && code.ui && Array.isArray(code.ui) && code.ui.length>0){
    //         choosedNew=code.ui[0]
    //     }
    // }
    choosed.value = choosedNew
  }
  //
  return { get, set }
}
