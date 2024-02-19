import { ref,inject } from 'vue'
import PageRender from '@/components/pageRender/index.vue'

//Create a dialog configuration
export default function (content: object,options:object={},closeCallback:Function) {
  //
//  const globalContext=inject('globalContext')
//console.log('$$$$$$$$$$$$'+globalContext)
  const dialogVisible = ref(true)
  const dialogConfig = {
    sys: {
      component: 'el-dialog',
      modelValue: dialogVisible
    },
    props: {
      title:content.name,
     // 'append-to-body': true,
      'destroy-on-close':true,
      'useless':'aaa',
      ...options
    },
    slots: {
      default: {
        type: 'wrap',
        value: [
          {
            '~component': PageRender,
            '~modelValue': content
          }
        ]
      },

    },
    events:{
      closed:()=>{
        if(closeCallback){
          closeCallback()
        }
      },
   
    }
  }
  //
  return { dialogVisible, dialogConfig }
}
