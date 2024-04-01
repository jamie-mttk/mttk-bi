import { loginState } from '@/utils/authentication'

export const vShowOldKey = Symbol('_vod')

export const vAuth = {
  beforeMount(el) {
    el[vShowOldKey] = el.style.display === 'none' ? '' : el.style.display
  },
  mounted: (el, binding) => {
    //
    const authed = hasAuth(binding.arg)
    // console.log(binding.arg,authed)
    //
    setDisplay(el, authed)
    //
    if (!authed && binding.value && binding.value.showUnAuth) {
      const nd = document.createElement('div')
      nd.appendChild(document.createTextNode('Unauthorized:'+binding.arg))
      nd.style.color = '#ff0000'
      // el.parentNode.appendChild(nd)
      el.parentNode.insertBefore(nd, el)
    }
  }
}

export const vDataAuth = {
  beforeMount(el) {
    el[vShowOldKey] = el.style.display === 'none' ? '' : el.style.display
  },
  mounted: (el, binding) => {
    //
    //
    const dataAuthed = hasDataAuth(binding.arg,binding.value)

    //
    setDisplay(el, dataAuthed)

  }
}

//Check current user has the auth
//value can be page,app or page.add,app.edit
export function hasAuth(value) {
  const authorities = loginState.value.authorities
  if (!authorities) {
    //user is not login
    return false
  }
  if (!value) {
    //auth value is not defined,always return true
    return true
  }
  //
  const vv = value.split('_')
  //Find auth of the given module
  const auth = authorities[vv[0]]

  if (!auth||auth.length==0) {
    //There is no authorities of the given module,return false
    return false
  }
  // console.log(value, vv.length, vv, auth)
  //If there is no operation check, return true directly
  if (vv.length == 1) {
    return true
  }
  //opeartion check
  return auth.includes(vv[1])
}
//Check the given resouce has the operation data auth
export function hasDataAuth(operation,resource) {
  if(!operation||!resource||!resource._operationsAll){
    return false
  }
  //
  return resource._operationsAll.findIndex(item=>item==operation)>=0
}




function setDisplay(el, value) {
  el.style.display = value ? el[vShowOldKey] : 'none'
}
