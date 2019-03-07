import {MessageBox} from 'element-ui'
let $ = require('jquery');
let xhr = function (ref) {
  let method = ref.method === undefined ? 'get' : ref.method;
  let url = ref.url;
  let body = ref.body === undefined ? null : ref.body;
  let traditional = ref.traditional === undefined ? true : ref.traditional;
  let contentStr = ref.contentStr === undefined ? 'application/x-www-form-urlencoded;charset=UTF-8' : ref.contentStr;
  let isSetHeaders = ref.setHeaders === undefined ? {} : ref.setHeaders;
  let defer = $.Deferred();
  let startTime;
  let endTime;
  $.ajax({
    type: method,
    traditional: traditional,
    url: url,
    headers: isSetHeaders,
    data: body,
    contentType: contentStr,
    dataType: 'json',
    // xhrFields:{
    //   withCredentials: true
    // },
    success:function (res) {
      endTime = new Date().getTime()
      defer.resolve(res,endTime - startTime );
    },
    error:function (err) {
      if(err.status == 300){
        MessageBox.alert(err.responseJSON.msg, '警告', {
          confirmButtonText: '确定',
          type:'error',
          showClose:false,
        }).then(() => {
          location.replace('/');
        });
      }
    },
    beforeSend:function () {
      startTime = new Date().getTime()
    }
  });
  return defer.promise();
};
export default xhr;
