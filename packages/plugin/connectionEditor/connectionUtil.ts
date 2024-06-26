import { ElMessageBox,  } from 'element-plus'
import { locale,  } from 'mttk-lowcode-engine'
export function tryTrial(globalContext,data) {
    globalContext
      .request({
        method: 'POST',
        url: '/bi/jdbcConnection/trial',
        data:data
      })
      .then(function (response) {
        if (response.result) {
          ElMessageBox.alert(locale.t('bi.plugin.connectionEditor.trialSuccess'))
        } else {
          // ElMessageBox.alert('<b>Connection check failed.</b><br><b>Message:</b>'+response.message+"<br><b>Detail:</b>"+response.detail, 'Error', {
          //   dangerouslyUseHTMLString: true
          // })
  
          // ElMessageBox.prompt('Connection check failed', 'Error', {
          //   dangerouslyUseHTMLString: true,
          //   'inputType':'textarea',
          //   inputValue:response.detail,
          //   'custom-style':{height:'480px','background-color':'red'},
          // })
          ElMessageBox({
            type: 'error',
            title:locale.t('bi.plugin.connectionEditor.trialFail'),
            dangerouslyUseHTMLString: true,
            message: response.detail.replace(/\n/g, '<br>'),
            customStyle: {
              'max-width': '45%',
    
            }
          })
        }
      })
  }