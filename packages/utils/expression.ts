import { ElMessage } from 'element-plus'
//Try to evaluate the expression or return directly if it is not a expression
export  function tryEval(expression,context){

    if (!isExp(expression)) {
        return expression
      }

      if (expression.startsWith('___data:')) {
        return tryEvalData(expression.substring('___data:'.length),context)
      }else  if (expression.startsWith('___computed:')) {
        return tryEvalComputed(expression.substring('___computed:'.length),context)
    }else  if (expression.startsWith('___script:')) {
        return tryEvalScript(expression.substring('___script:'.length),context)  
      } else {
        return expression;
      }
}
export function isExp(expression){
	return typeof expression == 'string' && expression.startsWith('___')
}
function tryEvalData(dataExpression,context){       
    try {
        let dataKey;
        let datapath;
        //try to check whether there are subpath seperated by .
        const position=dataExpression.indexOf('.')
        if(position>0){
            dataKey=dataExpression.substring(0,position)
            datapath=dataExpression.substring(position+1)
           
        }else{
            dataKey=dataExpression
        }

  

      return context.dataManager.get(dataKey,datapath)
    
    } catch (e) {
      ElMessage({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: 'Executing data ' + dataExpression + ' failed<br>' + e,
      })
      console.log(e)
      return undefined
    }
}
function tryEvalComputed(computedExpression,context){       
    try {
      //TBD: It has very interesting effeact which cause computed does not changed!!
      //  context.computedManager.get(computedExpression).value
      // return 'COMP'
      return  context.computedManager.get(computedExpression)
    } catch (e) {
      ElMessage({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: 'Executing computed ' + computedExpression + ' failed<br>' + e,
      })
      console.log(e)
      return undefined
    }
}

function tryEvalScript(scriptExpression,context){       
    try {
      return new Function('c', scriptExpression)(context)
    } catch (e) {
      ElMessage({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: 'Executing script ' + scriptExpression + ' failed<br>' + e,
      })
      console.log(e)
      return undefined
    }
}