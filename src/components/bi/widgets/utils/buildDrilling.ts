export default function buildDrilling({ context, fullConfig }) {
  //
  const dataKey = genDataKey()
  let drilling = context.d.g(dataKey)
  if (!drilling) {
    drilling = buildDrillingInternal({ context, fullConfig })
    context.d.s(dataKey, drilling)
  }
  //
  return drilling

  //Generate the data key to store
  function genDataKey() {
    return 'bi_drilling_' + fullConfig.key
  }

  //Input the model config and init drilling
  function buildDrillingInternal() {
    //
    // console.log('drilling is rebuild@', fullConfig)
    //A simple stack used to store drilling history
    let stack = []

    //Drilling to next level
    //The para is an objec with below attributes
    // value: the value clicked
    //return true if drilling is allowed;falses means drilling is not allowed, for example, it is last level already
    function down(para) {
      const nextLevel = getNextLevel()
      if (!nextLevel) {
        // console.log('drilling down exit', drilling.getStack())
        return undefined
      }
      //
      console.log(para)
      //
      const info = { value: para.value, define: nextLevel }
      stack.push(info)
      //
      if (stack.length >= fullConfig.config.model.drilling.length) {
        //
        // console.log('No need to trigger event', nextLevel, drilling.getStack())
        return
    }
    //   console.log('drilling down OK', nextLevel, drilling.getStack())
      //Trigger event to reload data
      context.mitt.emit('bi-chart-reload-' + fullConfig.key, { fullConfig })
    }
    function up(level){
      
      const stackNew=[]
      for(let i=0;i<level;i++){
        stackNew[i]=stack[i]
      }
      stack=stackNew;
       //Trigger event to reload data
       context.mitt.emit('bi-chart-reload-' + fullConfig.key, { fullConfig })
    }
    //get the current stack
    function getStack() {
      return stack
    }
    //
    function reset() {
      // console.log('drilling is reset!!!')
      stack = []
    }
    //
    function handle(modelConfig, filters) {
      if (stack.length == 0) {
        //No drilling ,do nothing
        return
      }
      //
      let nextLevel = getNextLevel()
      if (!nextLevel) {
        //
        // nextLevel=stack[stack.length-1].define
        return
      }
      
      //Replace the dimension in model config NEXT Level
      modelConfig.dimension[0] = nextLevel
      //Add filters
      for (const s of stack) {
        // console.log(s)
        filters.push({ key: s.define.key, operation: '=', value: s.value })
      }
      // console.log("handle",arguments)

      //
      // console.log('AFTER config',JSON.stringify(modelConfig,null,2))
      // console.log('AFTER filter',JSON.stringify(filters,null,2))
    }
    function buildFooter(){
      if(stack.length==0){
        return undefined;
      }
      //

      const result= {
        '~':'el-breadcrumb',
        separator:">",
        'style':{
          position: 'relative',
         
          top: '-32px',
          left: '32px'
        },
        '#':[]
      }
      //
      for(let i=0;i<stack.length;i++){
        const s=stack[i]
        //<el-breadcrumb-item @click="console.log('1111')"><el-link>homepage</el-link></el-breadcrumb-item>
        result['#'].push({
          '~':'el-breadcrumb-item',
          '#':{
            '~':'el-link',
            style:{ 'font-size':'0.8em',cursor:'pointer'},
            '#':s.define.label+' : '+s.value,
            '@click':()=>up(i)
          }
        })
      }
      //
     // console.log('footer',result)
      //
      return result;
    }

    //
    return { down, getStack, reset, handle,buildFooter }
    //Private functions
    //Get next level in drilling definition, return undefined if no level left
    //
    function getNextLevel() {
      const drilling = fullConfig.config.model.drilling
      if (stack.length >=drilling.length) {
        //
        return undefined
      }
      //
      return drilling[stack.length]
    }

    
  }
}
