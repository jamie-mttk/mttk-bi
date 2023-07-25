import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
export default function createRequest(baseUrl: string = '') {
  //
  NProgress.configure({ showSpinner: false })
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
        console.log(response)
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
