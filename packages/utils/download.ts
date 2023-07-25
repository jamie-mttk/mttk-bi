/**
 * 从HTTP反馈中处理下载
 * @param {*} response          HTTP反馈
 * @param {*} defaultFileName   缺省文件名
 */
export function download(response, defaultFileName) {
  let contentType = response.headers["content-type"]
    ? response.headers["content-type"]
    : "application/octet-stream";

  let filename = defaultFileName;
  if (response.headers["content-disposition"]) {
    let temp = response.headers["content-disposition"];
    let index = temp.indexOf("filename=");
    if (index >= 0) {
      temp = temp.substr(index + 9); //+9是去掉filename=的长度
      filename = temp;
      //处理可能的中文
      filename = decodeURI(filename)
    }
  }
  //
  downloadData(response.data, contentType, filename);

}
/**
 * 下载数据
 * @param {*} data        要下载的数据 
 * @param {*} contentType  
 * @param {*} filename    文件名
 */
export function downloadData(data, contentType, filename) {
  let blob = new Blob([data], {
    type: contentType
  });
  var downloadElement = document.createElement("a");
  var href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = filename; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
}

export default download