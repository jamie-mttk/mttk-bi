//wrap result inside a div to have margin and background
export function wrapResult(context,result,footer?) {
  const renderMode=context.renderMode.value
  //
  //wrap inside a div
  return {
    '~': 'div',
    style: {
      'border-radius': '4px',
       'margin': renderMode=='flex'?'8px':'8px 4px',
      //   padding: '20px',
      'background-color': '#fff',
      height: 'calc(100% - 8px)',
      width: renderMode=='flex'?'calc(100% - 16px)':'calc(100% - 8px)',
    },
    '#': [result,footer,]
  }
}

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

//default display init
export function displayInit({ context }) {
  if (context.renderMode.value == 'flex') {
    return {
      style: {
        // If width is set to 100% , the width will growth if there are two charts in one panel
        // width: '99%',
        height: '320px'
      }
    }
  } else {
    return {
      position: {
        w: 480,
        h: 320,
        z: 100
      }
    }
  }
}
