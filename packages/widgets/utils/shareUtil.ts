//Check the given item
//It should in includeList or includeList is not given
//And it should NOT in excludeList or excludeList is not given
export function checkPassed(
    item: string,
    includeList: undefined | Array<string>,
    excludeList: undefined | Array<string>
  ) {
    return (
      (includeList == undefined || includeList.includes(item)) &&
      (excludeList == undefined || !excludeList.includes(item))
    )
  }


  //wrap result inside a div to have margin and background
export function wrapResult({ context, result, footer = undefined, fullConfig }) {
  // const renderMode=context.renderMode.value
  //

  //
  //wrap inside a div
  return {
    '~': 'div',
    style: {
      'box-sizing': 'border-box',
      padding: '6px',
      // width: '100%'
    },
    '^onMounted': () => {
      context.mitt.emit('bi-chart-reload-' + fullConfig.key, { reset: true, showError: false })
    },
    '#': {
      '~': 'div',
      style: { width: '100%', height: '100%','box-sizing': 'border-box',padding:'6px',
       'background-color': 'white' },
      '#': [result, footer]
    }
  }
}


//default display init
export function displayInit({ initStyle = {} }) {
  return function ({ context }) {
    return {
      style: {
        width: context.renderMode.value == 'flex' ? '100%' : '480px',
        height: '320px',
        // padding: '12px',
        'box-sizing': 'border-box',
        ...initStyle
      }
    }
  }
}

//If input is JSON, return the parsed JSON/JSON array;otherwise return raw string
export function safeParseJon(val:string){
      //Ignore error if seriesRadius is a pure string
      try {
        return JSON.parse(val)
      } catch (error) {
        //Do nothing
        return val
      }
}