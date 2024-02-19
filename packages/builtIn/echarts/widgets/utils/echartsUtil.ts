
import {unref} from 'vue'
import {smartJsonParse} from '@/utils/tools'
//
export function buildDefaultEvents(contextWrap){
    // return {
    //     //this is to stop event propogation so the chart can be choosed
    //     '@mouseDown':function(){
    //       // console.log('@@@@@@@@@@@@@@1',arguments)
    //      try{
    //       arguments[1].event.stop()
    //     }catch(e){
    //       //ignore
    //     }
    //     },
    //     //if the mouse is clicked anywhere of the charts
    //     '@zr:mousedown': function () {
    //       // console.log('@@@@@@@@@@@@@@2',arguments)
    //       try {
    //         arguments[1].stop()
    //       } catch (e) {
    //         //ignore
    //       }
    //       //raise a new event
    //       contextWrap.context.emit('componentChoosed', arguments[1])
    //     }
    //   }
}

//
//Parse the pie radius
//if it is a number,return as number
//if it is a JSON array,return as json array;otherwise consider as string
export function parsePieRadius(raw: string) {
    if (!raw) {
      return ''
    }
    //
    raw = raw.trim()
    //
    const regPos = /^\d+(\.\d+)?$/
    if (regPos.test(raw)) {
      return parseFloat(raw)
    } else {
      try {
        return JSON.parse(raw)
      } catch (e) {
        return raw
      }
    }
  }
  
//
export function putIfHaveBatch(targetOption, config, prefix, optionKeyArray) {
    for (const k of optionKeyArray) {
      putIfHave(targetOption, config, prefix + '-' + k, k)
    }
  }
  //Common ui option handling
  export function putIfHave(targetOption, config, uiKey, optionKey) {
    const value = config[uiKey]
    if (!value && value !== false) {
      return
    }
    targetOption[optionKey] = value
  }
  

  //
export function buildOptionOther(option, config) {
    const optionOtherStr = config.optionOther
    if (!optionOtherStr) {
      return
    }
    const optionOther = JSON.parse(optionOtherStr)
    for (const k of Object.keys(optionOther)) {
      option[k] = optionOther[k]
    }
  }

  //data handling
export function buildOptionDataset(option,config,data){

    //
    data=unref(data)
    //
    if (!data||!Array.isArray(data)||data.length<=0){
      //if no data is provided, skip
      return
    }

    //Dataset set by option other
    const datasetNow=option.dataset
    //dataset to be modified
    let dataset=undefined;
  

    if(datasetNow==undefined){
      //option other does not set dataset,so build with data
      dataset={}
      option.dataset=dataset
      
    }else if(Array.isArray(datasetNow)&&datasetNow.length>0){
      dataset=datasetNow[0]
    }else if (typeof datasetNow=='object'){
      dataset=datasetNow
    }

    if(!dataset){
      //this means we can not find a proper dataset to modify
      return
    }
    //
    dataset.source=data
    //dimension check

    if(config.dimensions){
      //user has set dimension
      dataset.dimensions=smartJsonParse(config.dimensions)
    }
  }