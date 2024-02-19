import { ref, watch, nextTick } from 'vue'

export default function codeManager(context) {
  const code = ref({})
  //
  const dirty = ref(false)
  //
  watch(
    code,
    (codeNew, codeOld) => {
      if (codeOld['_id']) {
        //Chagne to dirty only the previous code is not empty
        // console.log('=============')
        // console.log(JSON.stringify(codeOld))
        // console.log(JSON.stringify(codeNew))
        //
        dirty.value = true
      }
    },
    { deep: true }
  )
  //
  function getCode() {
    return code.value
  }
  //
  function setCode(codeNew: object) {
    //
    // console.log('set code is called:',codeNew, code.value)
    // throw new Error('TEST')
    code.value = codeNew
    //
    //This is a tricy to init computed manager,otherwise ___computed:xxx does not work well
    //The possible reason is computed cache is not correctly init
    if (context.c) {
      context.c.init()
    }
    //wait watch to to called
    nextTick(() => {
      dirty.value = false
    })
  }
   //
  return {
    setCode,
    getCode,
    dirty
  }
}
