const router = require('koa-router')()

router.post('/count', async (ctx, next) => {
  let _self ={
    xunhuan:ctx.request.body.xunhuan,
    info:JSON.parse(ctx.request.body.info),
    stringArr:ctx.request.body.stringArr,
  }
  let data = await count(_self);
  function count(_self){
    let num = 0;
    let str = '';
    let xunhuan = _self.xunhuan;
    let info = _self.info.length;
    let stringArr = _self.stringArr;
    for (let n = 0; n < xunhuan; n++) {
      for (let i = 0; i < info; i++) {
        let data = _self.info;
        let key = data[i].valueName;
        let val = data[i].value;
        let type = data[i].type;
        let checked = data[i].checked;
        if (checked == '不加变量') {
          if (type == 'number') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == info - 1 ? '' : ',\n')
          } else if (type == 'string') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == info - 1 ? '"' : '",\n')
          } else if (type == 'array[单个]') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == info - 1 ? ']' : '],\n')
          } else if (type == 'array[多个]') {
            let strArr = '';
            for (let m = 0; m < stringArr; m++) {
              strArr += val + (m == stringArr - 1 ? '' : ',')
            }
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == info - 1 ? ']' : '],\n')
          }
        } else if (checked == '后面加') {
          if (type == 'number') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + num + (i == info - 1 ? '' : ',\n')
          } else if (type == 'string') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + num + (i == info - 1 ? '"' : '",\n')
          } else if (type == 'array[单个]') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + num + (i == info - 1 ? ']' : '],\n')
          } else if (type == 'array[多个]') {
            let strArr = '';
            for (let m = 0; m < stringArr; m++) {
              strArr += '"' + val + m.toString() + (m == stringArr - 1 ? '"' : '",')
            }
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == info - 1 ? ']' : '],\n')
          }
        } else {
          if (type == 'number') {
            val = parseInt(val) + num;
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == info - 1 ? '' : ',\n')
          } else if (type == 'string') {
            val = parseInt(val) + num;
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == info - 1 ? '"' : '",\n')
          } else if (type == 'array[单个]') {
            val = parseInt(val) + num;
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == info - 1 ? ']' : '],\n')
          } else if (type == 'array[多个]') {
            let strArr = '';
            val = parseInt(val);
            for (let m = 0; m < stringArr; m++) {
              strArr += '"' + (val + m) + (m == stringArr - 1 ? '"' : '",')
            }
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == info - 1 ? ']' : '],\n')
          }
        }
      }
      str = str + (n == xunhuan - 1 ? '\r\n  }\n' : '\r\n  },\r\n');
      num++;
    }
    return str = "[\r\n" + str + "]";
  }
  ctx.body = {
    status:200,
    msg:'success',
    data: data
  }
})
router.post('/yulan', async (ctx, next) => {
  let _self ={
    info:JSON.parse(ctx.request.body.info)
  }
  let data = await yulan(_self);
  function yulan(_self){
    let num = 0;
    let str = '';
    let yulanNum = 3;
    for (let n = 0; n <2; n++) {
      for (let i = 0; i < _self.info.length; i++) {
        let data = _self.info;
        let key = data[i].valueName;
        let val = data[i].value;
        if (data[i].checked == '不加变量') {
          if (data[i].type == 'number') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == _self.info.length - 1 ? '' : ',\n')
          } else if (data[i].type == 'string') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == _self.info.length - 1 ? '"' : '",\n')
          } else if (data[i].type == 'array[单个]') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == _self.info.length - 1 ? ']' : '],\n')
          } else if (data[i].type == 'array[多个]') {
            let strArr = '';
            for (let m = 0; m < yulanNum; m++) {
              strArr += val + (m == yulanNum - 1 ? '' : ',')
            }
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == _self.info.length - 1 ? ']' : '],\n')
          }
        } else if (data[i].checked == '后面加') {
          if (data[i].type == 'number') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + num + (i == _self.info.length - 1 ? '' : ',\n')
          } else if (data[i].type == 'string') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + num + (i == _self.info.length - 1 ? '"' : '",\n')
          } else if (data[i].type == 'array[单个]') {
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + num + (i == _self.info.length - 1 ? ']' : '],\n')
          } else if (data[i].type == 'array[多个]') {
            let strArr = '';
            for (let m = 0; m < yulanNum; m++) {
              strArr += '"' + val + m.toString() + (m == yulanNum - 1 ? '"' : '",')
            }
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == _self.info.length - 1 ? ']' : '],\n')
          }
        } else {
          if (data[i].type == 'number') {
            val = parseInt(val) + num;
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == _self.info.length - 1 ? '' : ',\n')
          } else if (data[i].type == 'string') {
            val = parseInt(val) + num;
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == _self.info.length - 1 ? '"' : '",\n')
          } else if (data[i].type == 'array[单个]') {
            val = parseInt(val) + num;
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == _self.info.length - 1 ? ']' : '],\n')
          } else if (data[i].type == 'array[多个]') {
            let strArr = '';
            val = parseInt(val);
            for (let m = 0; m < yulanNum; m++) {
              strArr += '"' + (val + m) + (m == yulanNum - 1 ? '"' : '",')
            }
            str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == _self.info.length - 1 ? ']' : '],\n')
          }
        }
      }
      str = str + (n == 2 - 1 ? '\r\n  }\n' : '\r\n  },\r\n');
      num++;
    }
    return str = "[\r\n" + str + "]";
  }
  ctx.body = {
    status:200,
    msg:'success',
    data: data
  }
})
module.exports = router
