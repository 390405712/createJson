import xhr from './../services/xhr';
const env = process.env.NODE_ENV || 'development'
let url;
if(env == 'production'){
  url = 'http://123.207.121.59:8888';
}else{
  url = 'http://localhost:3000';
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

  query: function () {
    return xhr({
      method: 'get',
      url:url+ '/users/query',
      setHeaders: {},
    });
  },

  find: function (id) {
    return xhr({
      method: 'get',
      url:url+ '/users/find?id='+id,
      setHeaders: {},
    });
  },

  add: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/users/add',
      setHeaders: {},
      body: data
    });
  },

  update: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/users/update',
      setHeaders: {},
      body: data
    });
  },

  del: function (data) {
    return xhr({
      method: 'post',
      url:url+ '/users/del',
      setHeaders: {},
      body: data
    });
  },

};

export default service;
