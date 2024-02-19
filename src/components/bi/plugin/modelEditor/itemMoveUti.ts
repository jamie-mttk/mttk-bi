import { unref} from 'vue'

export function smartMove(fromIndex,toIndex,tableData){
  if(fromIndex==toIndex){
    return
  }
  tableData=unref(tableData)
  //
    const fromItem=smartFind(fromIndex,tableData)
    const toItem=smartFind(toIndex,tableData)

    //
    smartDelete(fromItem,tableData)
    smartAppend(fromItem,toItem,tableData)
    //
    return true

  }
  //find the data from table data,since table data is a one level tree,so we need to calculate the index
  export function smartFind(index,tableData) {
    tableData=unref(tableData)
    //
    return smartFindInternal(tableData)
    //this functiion is INSIDE smartFind, so index can be access 
    function smartFindInternal(items) {
      //  console.log('@@@@@@@@@@@',items)
      for (const item of items) {
        if (index == 0) {
          return item
        }
        //
        index--
        //check children
        if (item.children && Array.isArray(item.children)) {
          // console.log('comehere', index, item)
          const result = smartFindInternal(item.children)
          if (result) {
            return result
          }
        }
      }
      //
      return undefined
    }
  }
  function itemMatch(item1, item2) {
    return item1 && item2 && item1.key == item2.key
  }
  //delete the given data
  export function smartDelete(toDel,tableData) {
    tableData=unref(tableData)
    //
    return smartDeleteInternal(tableData)
    function smartDeleteInternal(items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        // console.log('check', itemMatch(toDel, item), toDel, item)
        if (itemMatch(toDel, item)) {
          items.splice(i, 1)
          //
          return true
        }
        //
        //check children
        if (item.children && Array.isArray(item.children)) {
          // console.log('comehere', index, item)
          if (smartDeleteInternal(item.children)) {
            return true
          }
        }
      }
      //
      return false
    }
  }
  
  //Drop the fromItem to toItem
  function smartAppend(fromItem,toItem,tableData) {
    tableData=unref(tableData)
    //
    return smartAppendInternal(tableData)
    //this functiion is INSIDE smartFind, so index can be access 
    function smartAppendInternal(items) {
      // console.log('@@@@@@@@@@@',index)
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        // console.log('check', itemMatch(toDel, item), toDel, item)
        if (itemMatch(toItem, item)) {
          //
          if (item.children && Array.isArray(item.children)) {
            //item has children,that means it is a hierachy; so append to the last of the children
            item.children.push(fromItem)
          }else{
            //otherwise,append before the toItem
            items.splice(i, 0, fromItem)
          }
          //
          return true
        }
        //
        //check children
        if (item.children && Array.isArray(item.children)) {
          // console.log('comehere', index, item)
          if (smartAppendInternal(item.children)) {
            return true
          }
        }
      }
      //
      return false
    }
  }