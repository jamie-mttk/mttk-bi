import moment from 'moment'
export function a1(){
    console.log(arguments)
    return moment().format('MMMM Do YYYY, h:mm:ss a')
}
export function a2(){
    console.log(arguments)
    return moment().format(); 
}