<template>
  <div>
    <el-container>
      <el-header>
        <el-card shadow="always" id="biaoti">
          <div class="top-name">json生成工具</div>
          <div :class="'top-img'+imgNum"></div>
          <div class="top-title-img1">
            <el-row>
              <el-button size="mini" :disabled="!disabledBtn" @click="setTimerFn">开始</el-button>
              <el-button size="mini" :disabled="disabledBtn" @click="clearTimerFn">停止</el-button>
            </el-row>
          </div>
          <div class="top-ma">
            <canvas id="canvas"></canvas>
          </div>
        </el-card>
      </el-header>
      <el-container id="content">
        <el-aside style="width:180px;">
          <transition name="el-zoom-in-top">
            <el-card shadow="always" class="pro">
              <div style="height: 100%;">
                <el-steps direction="vertical" :active="3">
                  <el-step title="步骤 1" description="填写循环次数"></el-step>
                  <el-step title="步骤 2" description="添加对象"></el-step>
                  <el-step title="步骤 3" description="点击生成"></el-step>
                </el-steps>
              </div>
            </el-card>
          </transition>
        </el-aside>
        <el-main>
          <el-card shadow="hover" class="re-pro">
            <el-steps :active="3">
              <el-step title="步骤 1" description="填写循环次数"></el-step>
              <el-step title="步骤 2" description="添加对象"></el-step>
              <el-step title="步骤 3" description="点击生成"></el-step>
            </el-steps>
          </el-card>
          <el-card shadow="hover">
            <template>
              <div>循环次数：{{xunhuan}}次</div>
              <div class="silder-width">
                <el-slider :max=200000 :min=1 :disabled="loading" v-model="xunhuan" show-input></el-slider>
              </div>
            </template>
            <template>
              <div>值类型为array[多个]数组长度：{{stringArr}}</div>
              <div class="silder-width">
                <el-slider :max=200000 :min=1 v-model="stringArr" :disabled="loading" show-input>
                </el-slider>
              </div>
            </template>
          </el-card>
          <el-card class="box-card" shadow="hover">
            <el-button-group>
              <el-button id="addd" size="medium" type="primary" plain :disabled="loading" @click="isTrue('add')">添加属性</el-button>
              <el-button size="medium" type="danger" :disabled="loading" plain @click="clearAll()">清除全部</el-button>
              <el-popover placement="right-end" width="450" trigger="click">
                <div>
                  <p style="font-size: 16px;margin:0;">预览效果只循环2次,array[多个]长度为3</p>
                  <el-input type="textarea" :autosize="{ minRows: 2,maxRows: 15}" style="font-size: 20px;font-family: -webkit-body;" v-model="result">
                  </el-input>
                </div>
                <el-button size="medium" type="warning" plain slot="reference" :disabled="loading" @click="YuLan()">预览效果</el-button>
              </el-popover>
            </el-button-group>
            <el-table v-loading="loading" element-loading-text="生成中" element-loading-spinner="bilibili-loading" element-loading-background="rgba(241, 245, 248, 0.8)" stripe border :data="info" style="width: 100%">
              <el-table-column label="ID" type="index"  width="50">
              </el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="对象属性名：">
                      <span>{{ props.row.valueName }}</span>
                    </el-form-item>
                    <el-form-item label="对象值类型：">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="对象属性值：">
                      <span>{{ props.row.value }}</span>
                    </el-form-item>
                    <el-form-item label="变量：">
                      <span>{{ props.row.checked }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="对象">
                <el-table-column label="对象属性名"min-width="160":resizable="true">
                  <template slot-scope="scope">
                    <el-input :maxlength=20 type="text" v-model="scope.row.valueName">
                      <i slot="suffix">:&nbsp;</i>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  min-width="480"
                  label="值类型 / 对象属性值 / 变量方式"
                  :resizable="true">
                  <template slot-scope="scope">
                    <el-input :maxlength=20 type="text" v-model="scope.row.value" class="input-with-select">
                      <el-select v-model="scope.row.type" slot="prepend" @change="selectChange1" placeholder="请选择">
                        <el-option v-for="item in option1" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                      </el-select>
                      <el-select v-model="scope.row.checked" slot="append" @change="selectChange2(scope.row.checked,scope.$index)" placeholder="请选择">
                        <el-option v-for="item in option2" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="100" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button v-show="info.length>1" size="medium" plain type="danger" :disabled="loading" @click="del(scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card shadow="hover" style="margin-bottom:8px">
            <el-button id="btn" style="width: 100%" type="primary" plain @click="isTrue('result')" :disabled="loading">生成</el-button>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="生成结果"
      :visible.sync="dialogVisible">
      <div>
        <el-tabs tab-position="left" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="字符串形式" name="0">
            <el-button style="position: absolute;right: 0;" size="mini" type="success" @click="CopyUrl()">复 制</el-button>
            <el-input resize="none" id="copyObj" type="textarea" :autosize="{ minRows: 2,maxRows: 15}" style="font-size: 20px;font-family: -webkit-body;" v-model="result">
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="树形式" name="1">
            <div class="div-tree">
              <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
              <el-tree :data="resultJson" ref="tree" :filter-node-method="filterNode">
              </el-tree>
              <!--show-checkbox-->
              <!--node-key="id"-->
              <!--highlight-current-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="vue-json-viewer控件" name="2" >
            <json-viewer style="height:480px" :value="resultView" :expand-depth=5 copyable boxed sort></json-viewer>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  import service from '../services/service';
  let timer;
  export default {
  data() {
    return {

      disabledBtn:true,
      info: [
        {valueName: '', value: '', type: 'string', checked: '不加变量'},
      ],
      imgNum:0,
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
      resultView:[],
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
      }else if(tab.index=='2'){
        let _self = this;
        _self.resultView = JSON.parse(_self.result);
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
      service.count(_self.xunhuan,_self.info,_self.stringArr).then(function (res) {
        _self.result = res.data;
        _self.loading = false;
        _self.dialogVisible = true
        _self.activeName='0';
        console.timeEnd('timer');
      });
      // 不请求
      // let num = 0;
      // let str = '';
      // let xunhuan = _self.xunhuan;
      // let info = _self.info.length;
      // let stringArr = _self.stringArr;
      // for (let n = 0; n < xunhuan; n++) {
      //   for (let i = 0; i < info; i++) {
      //     let data = _self.info;
      //     let key = data[i].valueName;
      //     let val = data[i].value;
      //     let type = data[i].type;
      //     let checked = data[i].checked;
      //     if (checked == '不加变量') {
      //       if (type == 'number') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == info - 1 ? '' : ',\n')
      //       } else if (type == 'string') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == info - 1 ? '"' : '",\n')
      //       } else if (type == 'array[单个]') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == info - 1 ? ']' : '],\n')
      //       } else if (type == 'array[多个]') {
      //         let strArr = '';
      //         for (let m = 0; m < stringArr; m++) {
      //           strArr += val + (m == stringArr - 1 ? '' : ',')
      //         }
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == info - 1 ? ']' : '],\n')
      //       }
      //     } else if (checked == '后面加') {
      //       if (type == 'number') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + num + (i == info - 1 ? '' : ',\n')
      //       } else if (type == 'string') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + num + (i == info - 1 ? '"' : '",\n')
      //       } else if (type == 'array[单个]') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + num + (i == info - 1 ? ']' : '],\n')
      //       } else if (type == 'array[多个]') {
      //         let strArr = '';
      //         for (let m = 0; m < stringArr; m++) {
      //           strArr += '"' + val + m.toString() + (m == stringArr - 1 ? '"' : '",')
      //         }
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == info - 1 ? ']' : '],\n')
      //       }
      //     } else {
      //       if (type == 'number') {
      //         val = parseInt(val) + num;
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == info - 1 ? '' : ',\n')
      //       } else if (type == 'string') {
      //         val = parseInt(val) + num;
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == info - 1 ? '"' : '",\n')
      //       } else if (type == 'array[单个]') {
      //         val = parseInt(val) + num;
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == info - 1 ? ']' : '],\n')
      //       } else if (type == 'array[多个]') {
      //         let strArr = '';
      //         val = parseInt(val);
      //         for (let m = 0; m < stringArr; m++) {
      //           strArr += '"' + (val + m) + (m == stringArr - 1 ? '"' : '",')
      //         }
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == info - 1 ? ']' : '],\n')
      //       }
      //     }
      //   }
      //   str = str + (n == xunhuan - 1 ? '\r\n  }\n' : '\r\n  },\r\n');
      //   num++;
      // }
      // str = "[\r\n" + str + "]";
      // _self.result = str;
      // _self.loading = false;
      // _self.dialogVisible = true
      // _self.activeName='0',
      //   console.timeEnd('timer')
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
      console.log(_self.info);
      service.yulan(JSON.stringify(_self.info)).then(function (res) {
        console.log(2);
        _self.result = res.data;
      });
      // 不请求
      // let num = 0;
      // let str = '';
      // let yulanNum = 3;
      // for (let n = 0; n < 2; n++) {
      //   for (let i = 0; i < _self.info.length; i++) {
      //     let data = _self.info;
      //     let key = data[i].valueName;
      //     let val = data[i].value;
      //     if (data[i].checked == '不加变量') {
      //       if (data[i].type == 'number') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == _self.info.length - 1 ? '' : ',\n')
      //       } else if (data[i].type == 'string') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == _self.info.length - 1 ? '"' : '",\n')
      //       } else if (data[i].type == 'array[单个]') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == _self.info.length - 1 ? ']' : '],\n')
      //       } else if (data[i].type == 'array[多个]') {
      //         let strArr = '';
      //         for (let m = 0; m < yulanNum; m++) {
      //           strArr += val + (m == yulanNum - 1 ? '' : ',')
      //         }
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == _self.info.length - 1 ? ']' : '],\n')
      //       }
      //     } else if (data[i].checked == '后面加') {
      //       if (data[i].type == 'number') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + num + (i == _self.info.length - 1 ? '' : ',\n')
      //       } else if (data[i].type == 'string') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + num + (i == _self.info.length - 1 ? '"' : '",\n')
      //       } else if (data[i].type == 'array[单个]') {
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + num + (i == _self.info.length - 1 ? ']' : '],\n')
      //       } else if (data[i].type == 'array[多个]') {
      //         let strArr = '';
      //         for (let m = 0; m < yulanNum; m++) {
      //           strArr += '"' + val + m.toString() + (m == yulanNum - 1 ? '"' : '",')
      //         }
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == _self.info.length - 1 ? ']' : '],\n')
      //       }
      //     } else {
      //       if (data[i].type == 'number') {
      //         val = parseInt(val) + num;
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":' + val + (i == _self.info.length - 1 ? '' : ',\n')
      //       } else if (data[i].type == 'string') {
      //         val = parseInt(val) + num;
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":"' + val + (i == _self.info.length - 1 ? '"' : '",\n')
      //       } else if (data[i].type == 'array[单个]') {
      //         val = parseInt(val) + num;
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + val + (i == _self.info.length - 1 ? ']' : '],\n')
      //       } else if (data[i].type == 'array[多个]') {
      //         let strArr = '';
      //         val = parseInt(val);
      //         for (let m = 0; m < yulanNum; m++) {
      //           strArr += '"' + (val + m) + (m == yulanNum - 1 ? '"' : '",')
      //         }
      //         str += (i == 0 ? '  {\n    "' : '    "') + key + '":[' + strArr + (i == _self.info.length - 1 ? ']' : '],\n')
      //       }
      //     }
      //   }
      //   str = str + (n == 2 - 1 ? '\r\n  }\n' : '\r\n  },\r\n');
      //   num++;
      // }
      // str = "[\r\n" + str + "]";
      // _self.result = str;
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    setTimerFn(){
      let _self = this;
      _self.disabledBtn = !_self.disabledBtn;
      timer = setInterval(function () {
        _self.imgNum = _self.randomNum(0, 8)
        // console.log(_self.imgNum);
      },100)
    },
    clearTimerFn(){
      let _self = this;
      _self.disabledBtn = !_self.disabledBtn;
      clearInterval(timer)
    }
  },
  mounted() {
    let _self = this;
    // _self.setTimerFn();
    if (window.localStorage.getItem('info')) {
      _self.info = JSON.parse(window.localStorage.getItem('info'));
    };
    let canvas = document.getElementById('canvas');
    QRCode.toCanvas(canvas,window.location.href, function (error) {
      if (error) console.error(error);
      console.log('QRCode success!');
    });
    _self.imgNum = _self.randomNum(0, 8)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
