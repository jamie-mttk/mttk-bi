import axios from "axios";


// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout 15000

});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    return config;
  },
  error => {
    // do something with request error
    console.info(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {

    
     const res = response.data;
     //
     return res;
    // //console.log('$$$$\n'+JSON.stringify(res))
    // return res;
    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   ElMessage({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'+res.code))
    // } else {
    //   return res
    // }
  },
  error => {

    if (error.response && error.response.status == '500') {
      // console.log('@@@@@@@@:'+JSON.stringify(typeof error.response.data))
      // console.log(error.response.data)
      // let content = 'Unexpected 500 error';
      if (error.response.data && typeof error.response.data == 'object') {
        // content = 'type:' + error.response.data.type + '<br>';
        // content += 'error:' + error.response.data.error + '<br>';
        //content+='detail:'+error.response.data.detail+'\n';
        //console.log(content);
        // ElMessageBox.alert(content, '500错误', {
        //   confirmButtonText: '关闭',dangerouslyUseHTMLString:true})
        //构建错误对象
        let errorInfo = error.response.data;
        if (errorInfo instanceof Blob) {
          var reader = new FileReader();
            reader.readAsText(errorInfo, 'utf-8');
            reader.onload = function () {
              showErrorInfo(JSON.parse(reader.result));
            }
        }else{
          showErrorInfo(errorInfo)
        }
      }
    } else if(error.response && error.response.status == '401') {
      showErrorInfo("您的登录信息已过期，请重新登录")
    }else {
      // console.log(error.messag)
      console.info(error.message)
      showErrorInfo("数据加载失败")
    }
    return Promise.reject(error);
  }
);

//显示错误信息
function showErrorInfo(errorInfo){
 alert(errorInfo)
}
export default service;
