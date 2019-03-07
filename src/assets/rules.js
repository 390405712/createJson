const isNumber = (rule, value, callback) => {
  if (/\s/.test(value)) {
    callback(new Error('不能输入空格'));
  }else{
    if (value != '') {
      if (isNaN(value)) {
        callback(new Error('必须为数字值'));
      } else if (+value > 9999999999) {
        callback(new Error('数字不能超过10位'));
      } else if (+value < 0) {
        callback(new Error('数字不能小于0'));
      } else {
        callback();
      }
    }else if (value == '') {
      callback();
    }
  }
};
const isDay = (rule, value, callback) => {
  if (/\s/.test(value)) {
    callback(new Error('不能写入空格'));
  }else{
    if (value != '') {
      if (isNaN(value)) {
        callback(new Error('必须为数字值'));
      } else if (+value > 99999) {
        callback(new Error('天数不能超过5位'));
      } else if (+value < 0) {
        callback(new Error('数字不能小于0'));
      } else {
        callback();
      }
    } else if (value == '') {
      callback();
    }
  }
};
const isFloat = (rule, value, callback) => {
  if (value != '') {
    if (!/^-?\d+(\.\d{1,2})?$/.test(+value)) {
      callback(new Error('小数位数不能超过二位'));
    } else {
      callback();
    }
  } else if (value == '') {
    callback();
  }
};
const isInt = (rule, value, callback) => {
  if (value != '') {
    // if(!/^([0-9]*[.0-9])$/.test(+value)){
    if (value.indexOf('.') > 0) {
      callback(new Error('输入数字为整数'));
    } else {
      callback();
    }
  } else if (value == '') {
    callback();
  }
};
const isAge = (rule, value, callback) => {
  if (value != '') {
    if (value > 150 || value < 0) {
      callback(new Error('年龄在0到150之间'));
    } else {
      callback();
    }
  }
};
const isPerson = (rule, value, callback) => {
  if (value != '') {
    if (value == 0) {
      callback(new Error('人数要大于0'));
    } else {
      callback();
    }
  }
};

export default {
  require: [
    {required: true, message: '不能为空', trigger: 'change'},
  ],
  requireAge: [
    {required: true, message: '不能为空', trigger: 'change'},
    {validator: isNumber, trigger: 'change'},
    {validator: isInt, trigger: 'change'},
    {validator: isAge, trigger: 'change'},
  ],
  requirePerson: [
    {required: true, message: '不能为空', trigger: 'change'},
    {validator: isNumber, trigger: 'change'},
    {validator: isInt, trigger: 'change'},
    {validator: isPerson, trigger: 'change'},
  ],
  money: [
    {validator: isNumber, trigger: 'change'},
    {validator: isFloat, trigger: 'change'},
  ],
  day: [
    {validator: isDay, trigger: 'change'},
    {validator: isInt, trigger: 'change'},
  ],
  requireMoney: [
    {required: true, message: '不能为空', trigger: 'change'},
    {validator: isNumber, trigger: 'change'},
    {validator: isFloat, trigger: 'change'},
  ],
  requireDay: [
    {required: true, message: '不能为空', trigger: 'change'},
    {validator: isNumber, trigger: 'change'},
    {validator: isInt, trigger: 'change'},
  ],
}
