import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage,ElMessageBox  } from 'element-plus'
import { loginState,reset } from './authentication'

export default function createRequest(baseUrl: string = '') {

  //
  NProgress.configure({ showSpinner: true })
  // create an axios instance
  const request = axios.create({
    baseURL: baseUrl,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000
  })

  // request interceptor
  request.interceptors.request.use(
    (config) => {
      NProgress.start()
      //Add X-Token
      if (loginState.value.token) {
         config.headers['X-Token'] = loginState.value.token
      }
      //
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response interceptor
  request.interceptors.response.use(
    (response) => {
      //
      NProgress.done()
      //
      if (response.config.fullResponse) {
        // console.log(response)
        //fullResponse means return all reponse with headers and more
        return response
      } else {
        const res = response.data
        //
        return res
      }
    },
    (error) => {
      //
      NProgress.done()

      const response = error.response
      if (response.status === 401) {
        ElMessageBox.confirm(
          '未登录或登录已过期,可以取消继续留在当前页面，或者重新登录',
         '确认',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            closeOnClickModal:false,
            type: 'warning'
          }
        ).then(() => {
          //
         
          reset();
          //
          location.reload()
        })
      }else if (response.status === 403) {
        ElMessageBox.alert('你未授权访问此URL:'+'\n'+response.request.responseURL, '未授权访问')
      }else{
      //
      //console.log(error);
      //
      const msg =
        error.config.method +
        ' ' +
        error.config.url +
        ' return status code:' +
        (error.response?.status || 'none') +
        '<br>' +
        error.message

      //
      showErrorInfo(msg)
    }
      //
      //
      return Promise.reject(error)
    }
  )

  //显示错误信息
  function showErrorInfo(errorInfo) {
    ElMessage({
      type: 'error',
      dangerouslyUseHTMLString: true,
      message: errorInfo
    })
  }
  //
  return request
}
