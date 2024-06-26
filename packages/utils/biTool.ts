

//the datetime from mongodb is an object,here we format to readable string
export function formatDateTime(val) {
  if (!val) {
    return ''
  }
  if (val.$date) {
    val = val.$date
  }
  if (val && val.length >= 22) {
    val = val.substr(0, 10) + ' ' + val.substr(11, 8)
  }
  return val
}

