import ExtendTableColumn from '@/components/ExtendTableColumn/index.vue'
const SEPERATOR = '~'

export function build(data, dimensionX, dimensionY, metric) {
  //
  const { dimensionXMap, dimensionYMap } = parseDimension()
    //table config
    const tableConfig=buildConfig()
    //
    return {tableConfig}
  //Parse all the values of dimensionX and dimensionY
  function parseDimension() {
    //
    const dimensionXMap = new Map()
    const dimensionYMap = new Map()
    for (const d of data) {
      //
      const { key: keyX, value: valueX } = parseDimensionSingle(d, dimensionX)
      dimensionXMap.set(keyX, valueX)
      //
      const { key: keyY, value: valueY } = parseDimensionSingle(d, dimensionY)
      dimensionYMap.set(keyY, valueY)
    }

    //
    console.log(dimensionXMap, dimensionYMap)
    return { dimensionXMap, dimensionYMap }
  }
  function buildConfig(){
    //
    const config={
      '~':'el-table',
      style: { height: '100%' },
      border: true,
      '#':[]
    }
    for(let i=0;i<dimensionX.length;i++){
      //Column to display dimensionY
      for(let j=0;i<dimensionY.length;j++){
        if(i==0 && j==0){
          //the left corn will span all dimensionX and dimensionY
          config['#'].push(buildColumn({'span-method': buildSpanMethod({rowspan=dimensionY.length,colspan=dimensionX.length})}))
        }else{
          config['#'].push(buildColumn({'span-method': buildSpanMethod({rowspan=0,colspan=0})}))
        }
     
    }
    }
    //
    return config
  }
}
//
function buildColumn(props={}){
  return {
    '~':ExtendTableColumn,
    ...props
  }
}
function buildSpanMethod({rowspan=1,colspan=1}){
  return ()=>{
    return {rowspan,colspan}
  }
}
//
function parseDimensionSingle(d, dimension) {
  let key = ''
  const value = {} as any
  for (const dx of dimension) {
    if (key) {
      key += SEPERATOR
    }
    key += d[dx.key]
    value[dx.key] = d[dx.key]
  }
  return { key, value }
}
