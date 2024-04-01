import { isNumber } from '../../../utils/tools'
import {computed} from 'vue'

export const gridWidth = computed(()=>(context:any)=>{ 
    return (context.codeManager.getCode().gridWidth || 64)
})


//Floor value to grid width if needed
export function alignToGrid(styleText,context){
  if(!context.codeManager.getCode().alignToGrid){
      return styleText;
  }
  //
  const gw=gridWidth.value(context)
  //
  const value=typeof styleText=='number'?styleText:parseStyleValue(styleText)
//   console.log(styleText,value,(Math.floor((value+0.5*gw)/gw)*gw)+'px')
  if(!value){
    //parse failed,return raw style text directly
    return styleText;
  }
  //0.5 is the align threashold,this can avoid a small movement to trigger a gridwidth change
 return (Math.floor((value+0.5*gw)/gw)*gw)+'px';
      
}

//if input is 200px,return 200;otherwise return undefined
export function parseStyleValue(styleText) {
    if (
      !styleText ||
      typeof styleText != 'string' ||
      !styleText.endsWith('px') ||
      styleText.length <= 2
    ) {
      return undefined
    }
    //
    const value = styleText.substring(0, styleText.length - 2)
    // console.log(value,isNUmber(value),parseInt(value))
    if (!isNumber(value)) {
      //please note: parseFloat(20abc4 ) will return 20,so we should check whther it is a number first
      return undefined
    }
    //
    return parseFloat(value)
  }