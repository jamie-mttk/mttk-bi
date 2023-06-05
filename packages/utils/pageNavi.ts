//Popup untill to the targetContext,the targetContext will NOT be popup
//if targetContext is empty,popup only one level
//return true if popup successfully
export function popup(targetContext=undefined,contextStack:[]){
    if(!targetContext){
      if(popupInternal(contextStack)){
        return true
      }else{
        return false
      }
    }
    //
    //check whether the context is matched
    if(contextStack[contextStack.length-1].codeManager.getCode()['_id']==targetContext.codeManager.getCode()['_id']){
      //Matched,return
      return true;
    }
    //
    const contextPopup=popupInternal(contextStack)
    if(!contextPopup){
      //no page to popup
      return false
    }
    //Try next one
    return popup(targetContext,contextStack)
  }
  function popupInternal(contextStack:[]){
    if(contextStack.length<=1){
      //The last page can not be popup
      return undefined
    }
    //
    return contextStack.pop()
  }