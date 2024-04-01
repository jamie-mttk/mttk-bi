//wrap result inside a div to have margin and background
export function wrapResult(context, result, footer?) {
  // const renderMode=context.renderMode.value

  //
  //wrap inside a div
  return {
    '~': 'div',
    style: {
      //Use border to replace margin  and set box-sizing to border-box to avoid complex width/height calculation
      border: '8px solid ' + (context.appContext.getCode().colorBackground || 'transparent'),
      'box-sizing': 'border-box',
      //  'margin': renderMode=='flex'?'8px':'8px 4px',
      // padding: '12px',
      'background-color': '#fff',
      height: '100%',
      width: '100%'
    },
    '#': [result, footer]
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
export function displayInit({ initStyle = {} }) {
  return function ({ context }) {
    return {
      style: {
        width: context.renderMode.value == 'flex' ? '100%' : '480px',
        height: '320px',
        padding: '12px',
        'box-sizing': 'border-box',
        ...initStyle
      }
    }
  }
}
