//Deep copy
export function deepCopy(obj) {
  //防止为undefined
  if (obj == undefined) {
    return obj
  }
  if (!(typeof obj === 'object')) {
    return obj
  }
  //
  if (Array.isArray(obj)) {
    //console.log('2:'+JSON.stringify(obj))
    let result = []
    obj.map((item) => {
      result.push(deepCopy(item))
    })
    //
    return result
  } else {
    // 创建一个新对象
    let result = {}
    Object.keys(obj).map((key) => {
      result[key] = deepCopy(obj[key])
    })
    return result
  }
}

/**Create unique string
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

//Format mongodb returned date
export function formatMongoDate(raw) {
  if (raw && typeof raw == 'object') {
    const d: string = raw['$date']
    if (d) {
      //format 2023-05-10T13:42:09.617Z
      return d.substring(0, 10) + ' ' + d.substring(11, 19)
    }
  }
  //
  return raw
}

export function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + randomColor
}

//JSON.parse smart version
//Sicne JSON.parse paramters should be 100% restricted to JSON spec, the key should be wrapped with double quotation mark;
//This function support JS script like JSON parse
export function smartJsonParse(str: string) {
  return new Function('return ' + str)()
}
