import xhr from './../services/xhr';
const env = process.env.NODE_ENV || 'development'
let url;
if(env == 'production'){
   url = 'http://127.0.0.1:5000';//开发
}else{
   url = 'http://127.0.0.1:3000';//线上
}

let service = {
  count: function (xunhuan,info,stringArr) {
    return xhr({
      method: 'post',
      url:url+ '/count',
      setHeaders: {},
      body: {
        xunhuan:xunhuan,
        info:JSON.stringify(info),
        stringArr:stringArr,
      }
    });
  },
 yulan: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/yulan',
      setHeaders: {},
      body: {
        info:data
      }
    });
  },
  postTest: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/postTest',
      setHeaders: {},
      body: {
        phone: data,
      }
    });
  },
  getTest: function () {
    return xhr({
      method: 'get',
      url:url+ '/getTest',
      setHeaders: {},
    });
  },
  getTableData: function (body) {
    return xhr({
      method: 'post',
      url:url+ '/getTableData',
      setHeaders: {},
      body: body
    });
  },
  addTableData: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/addTableData',
      setHeaders: {},
      body: data
    });
  },
  updateTableData: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/updateTableData',
      setHeaders: {},
      body: data
    });
  },
  delTableData: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/delTableData',
      setHeaders: {},
      body: {
        _id:data
      }
    });
  },
};

export default service;
