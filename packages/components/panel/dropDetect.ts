import { ref,computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { createUniqueString } from '@/utils/tools'
//
export default function useDropDetect(context) {
  const dropping = ref('')
  function detecting() {
     //Thi is to call clearDropPanelDropping if the drap and drop is canceled
     debouncedFn()

    //  console.log('detecting:'+dropping.value)
    if (dropping.value) {
      //This means this panel is already has dropping fous
      return
    }
    //
    dropping.value = createUniqueString()
    //
    context.mitt.emit('clearDropPanelDropping', dropping.value)
   
  }
  const debouncedFn = useDebounceFn(() => {
    clearDetect();
  }, 6000)
  context.mitt.on('clearDropPanelDropping', function (val) {
    if (dropping.value == val) {
      //It is emit from this panel,ignore
      return
    }
    //
    //
    dropping.value = ''
  })
  //
  function clearDetect(){
    // console.log('call clear detecting')
    context.mitt.emit('clearDropPanelDropping', undefined)
  }
  //Once it is trying to drop into this panel, add a border
  const droppingClass= computed(() => {

    return  dropping.value ? 'dropping-panel':''
  })
  //
  return {detecting,clearDetect,droppingClass}
}
