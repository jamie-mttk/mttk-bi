import { ref,inject } from 'vue'
export function test1(){
      //
  const globalContext=inject('globalContext')
  console.log('$$$$$$$$$$$$'+globalContext)
  alert('###')
}