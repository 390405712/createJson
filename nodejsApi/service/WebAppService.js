const fs = require('fs');
exports.get_search_data = function(key,start,end){
  return function(cb){

    var http = require('http');
    var qs = require('querystring');
    var data = {
      key:key,
      start:start,
      end:end
    };

    /*请求MobAPI里的火车票查询接口*/
    var content = qs.stringify(data);
    var http_request = {
      hostname:'apicloud.mob.com',
      port:80,
      path:'/train/tickets/queryByStationToStation?' + content,
      method: 'GET'
    };

    var req = http.request(http_request,function(response){
      var body = '';
      response.setEncoding('utf-8');
      response.on('data',function(chunk){
        body += chunk;
      });
      response.on('end',function(){
        cb(null,body);
      });
    });

    req.end();
  }
}
