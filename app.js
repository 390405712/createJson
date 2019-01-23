new Vue({
  el: '#app',
  data() {
    return {
      info: [
        {valueName: '', value: '', type: 'string', checked: '不加变量'},
      ],
      xunhuan: 1,
      stringArr: 1,
      result: '[]',
      option1: [{
        value: 'number',
      }, {
        value: 'string',
      }, {
        value: 'array[单个]',
      }, {
        value: 'array[多个]',
      }],
      option2: [{
        value: '不加变量',
      }, {
        value: '后面加',
      }, {
        value: '累加(值为数字)',
      }],
      value: '',
      dialogVisible: false,
      loading: false,
      resultJson:[],
      filterText: '',
      activeName: '0',
    }
  },
  watch:{
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClick(tab, event) {
      if(tab.index=='1'){
        let _self = this;
        // 树的数据处理
        let arr =  JSON.parse(_self.result)
        let newArr = [];
        // let idNum = 0;
        let arrLength = _self.xunhuan;
        if(arrLength>1000){
          arrLength = 1000
        }
        for(let i = 0;i<arrLength;i++){
          // idNum++
          newArr.push({
            // id:idNum,
            label:i+'{'+Object.keys(arr[i]).length+'}',
            children:objToArray(arr[i])
          })
        }
        function objToArray(array) {
          let objToArray = []
          for (let i in array) {
            // idNum++
            objToArray.push({
              // id:idNum,
              label:JSON.stringify(i)+':'+JSON.stringify(array[i])
            });
          }
          return objToArray;
        }
        _self.resultJson = [{
          label:'array['+arrLength+']',
          children:newArr
        }]
      }
    },
    // getCheckedNodes() {
    //   console.log(this.$refs.tree.getCheckedNodes());
    //   let nodes = this.$refs.tree.getCheckedNodes();
    //   let arr = [];
    //   for(let i = 0;i<nodes.length;i++){
    //     for(let j = 0;j<nodes[i].children.length;j++){
    //       let obj='';
    //       for(let k = 0;k<nodes[i].children[j].children.length;k++){
    //         obj+=nodes[i].children[j].children[k].label
    //       }
    //       console.log(obj);
    //       // arr.push({obj})
    //     }
    //   }
    //   // JSON.stringify(arr);
    //   // console.log(arr);
    // },
    resultFun() {
      console.time('timer')
      let _self = this;
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
      str = "[\r\n" + str + "]";
      _self.result = str;
      _self.loading = false;
      _self.dialogVisible = true
      _self.activeName='0',
        console.timeEnd('timer')
    },
    isTrue(value) {
      let _self = this;
      for (let i = 0; i < _self.info.length; i++) {
        if (_self.info[i].valueName == '' || _self.info[i].value == '') {
          if (value == 'add') {
            this.$message({
              message: '填写完整再添加',
              type: 'warning'
            });
            return
          } else {
            this.$message({
              message: '填写完整再生成',
              type: 'warning'
            });
            return
          }
        }
      }
      if (value == 'add') {
        _self.info.push(
          {valueName: '', value: '', type: 'string', checked: '不加变量'},
        )
      } else {
        _self.loading = true;
        window.localStorage.setItem('info', JSON.stringify(_self.info))
        setTimeout(function () {
          _self.resultFun();
        }, 500)
      }
    },
    del(index) {
      let _self = this;
      _self.info.splice(index, 1);
    },
    CopyUrl() {
      let url = document.querySelector('#copyObj');
      url.select();
      document.execCommand("Copy");
      url.blur()
    },
    clearAll() {
      let _self = this;
      _self.info = [
        {valueName: '', value: '', type: 'string', checked: '不加变量'},
      ],
        window.localStorage.clear();
    },
    selectChange1(value) {
      let _self = this;
      if (value == 'array[多个]') {
        this.$message('array[多个]的数组长度为' + _self.stringArr);
      }
    },
    selectChange2(value, index) {
      let _self = this;
      if (_self.info[index].type == 'array[多个]') {
        if (value != '不加变量') {
          this.$message('array[多个]：出现的变量是在自身数组中');
        }
      }
    },
    YuLan() {
      let _self = this;
      let num = 0;
      let str = '';
      let yulanNum = 3;
      for (let n = 0; n < 2; n++) {
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
      str = "[\r\n" + str + "]";
      _self.result = str;
    },
  },
  mounted() {
    let _self = this;
    if (window.localStorage.getItem('info')) {
      _self.info = JSON.parse(window.localStorage.getItem('info'));
    }
  }
})
