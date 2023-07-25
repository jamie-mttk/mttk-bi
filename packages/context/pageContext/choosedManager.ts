import {ref} from 'vue'
export default function choosedManager(context){
    const choosed = ref({})
    //
    function getChoosed() {
        return choosed.value;
    }
     //
     function setChoosed(choosedNew) {
        // if(!choosedNew){
        //     const code=context.codeManager.getCode()
        //     if(code && code.ui && Array.isArray(code.ui) && code.ui.length>0){
        //         choosedNew=code.ui[0]
        //     }
        // }
        choosed.value=choosedNew;
    }
    //
    return {getChoosed,setChoosed,choosed}
}