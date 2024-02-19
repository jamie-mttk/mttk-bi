import {findPluginsByEntry} from '@/context/appContext/appContextUtil'
export function buildTop(context) {
  //
  const config = {
    '~': 'div',
    class: ['lc-common-toolbar', 'height-full'],
    '#': [
      { '~': 'div', class: 'left', '#': buildArea('top_left') },
      { '~': 'div', class: 'middle', '#': buildArea('top_middle') },
      { '~': 'div', class: 'right', '#':  buildArea('top_right')  }
    ]
  }
  //
  // console.log(config)
  //
  return config

  //
  function buildArea(area:string){
    const result=[]

    //
    const plugins=findPluginsByEntry(context.appContext,area)
    for(const p of plugins){
      //
      result.push(p.ui)
    } 

    //
    return result;
  }
}
