<template>
  <div class="excel">
    <input type="file" @change="importFile(this)" id="imFile" style="display: none"
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    <a id="downlink"></a>
    <el-button class="button" @click="uploadFile()">导入</el-button>
    <el-button class="button" @click="downloadFile(excelData)">导出</el-button>
    <el-popover placement="top" width="350" v-model="visible">
      <div>
        <div v-for="(item , indexs ) in inputArr"  stle="display: flex">
          <el-input size="small" style="margin-right: 10px" v-model="item.value" placeholder="请输入关键字">
            <template slot="prepend">第{{indexs+1}}个关键字</template>
            <template slot="append">
              <el-button size="small" type="danger" v-if="inputArr.length>1" class="button" @click="delInputArr(indexs)">删除</el-button>
            </template>
          </el-input>
        </div>
        <el-button style="width: 100%" size="small" class="button" @click="addInputArr()">添加</el-button>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button size="small" type="text" @click="visible = false">关闭</el-button>
        <el-button type="primary" size="small" @click="startChangeData()">开始换行</el-button>
      </div>
      <el-button class="button" slot="reference" style="margin-left: 10px">配置</el-button>
    </el-popover>
    <!--错误信息提示-->
    <el-dialog title="提示" v-model="errorDialog" size="tiny">
      <span>{{errorMsg}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="errorDialog=false">确认</el-button>
        </span>
    </el-dialog>
    <!--展示导入信息-->
    <el-table :data="excelData" tooltip-effect="dark">
      <template v-for="(col ,index) in tableProp">
        <el-table-column  :prop="col" :label="col" show-overflow-tooltip></el-table-column>
      </template>
    </el-table>
    <el-dialog title="选择表名" :visible.sync="dialogVisible" width="30%">
      <div style="display:flex;justify-content: center">
        <el-button v-for="(value, key, index) in tableObj" class="button" @click="selectTable(index)">
          {{ index+1 }}. {{ key }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  let XLSX = require('xlsx')
  export default {
    name: 'Index',
    data () {
      return {
        inputArr:[
          {value:''},
        ],
        visible:false,
        fullscreenLoading: false, // 加载中
        imFile: '', // 导入文件el
        outFile: '',  // 导出文件el
        errorDialog: false, // 错误信息弹窗
        errorMsg: '', // 错误信息内容
        excelData: [],
        tableObj:{},
        dialogVisible:false,
        wb:'',
        tableProp:[],
      }
    },
    mounted () {
      this.imFile = document.getElementById('imFile')
      this.outFile = document.getElementById('downlink')
    },
    methods: {
      startChangeData:function(){
        for(let i in this.inputArr){
          if(this.inputArr[i].value == ''){
            return  this.$message({
              message: '关键字不能为空',
              type: 'warning'
            });
          }
        }
        for(let j in this.tableProp){
          for (let i in this.excelData){
            let value = this.excelData[i];
            let changeValue = value[this.tableProp[j]];
            for(let k in this.inputArr){
              if(changeValue !==undefined){
                if(changeValue.indexOf(this.inputArr[k].value)>-1){
                  let arr = changeValue.split(this.inputArr[k].value);
                  changeValue = arr.join('<br/>'+this.inputArr[k].value);
                  this.excelData[i][this.tableProp[j]] = changeValue
                }
              }
            }
          }
        };
        this.$message({
          message: '换行完成',
          type: 'success'
        });
      },
      delInputArr:function(index){
        this.inputArr.splice(index,1);
      },
      addInputArr:function(){
        for(let i in this.inputArr){
          if(this.inputArr[i].value == ''){
            return  this.$message({
              message: '关键字不能为空',
              type: 'warning'
            });
          }
        }
       this.inputArr.push({value:''})
      },
      uploadFile: function () { // 点击导入按钮
        this.imFile.click()
      },
      downloadFile: function (rs) { // 点击导出按钮
        let data = [{}]
        for (let k in this.tableProp) {
          data[0][this.tableProp[k]] = this.tableProp[k]
        }
        data = data.concat(rs)
        this.downloadExl(data, '导出数据')
      },
      importFile: function () { // 导入excel
        this.fullscreenLoading = true
        let obj = this.imFile
        if (!obj.files) {
          this.fullscreenLoading = false
          return
        }
        let f = obj.files[0]
        let reader = new FileReader()
        let $t = this
        reader.onload = function (e) {
          let data = e.target.result
          if ($t.rABS) {
            $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
              type: 'base64'
            })
          } else {
            $t.wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          $t.tableObj = $t.wb.Sheets;
          $t.dialogVisible = true;
          // let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
          // console.log(typeof json)
          // $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
        }
        if (this.rABS) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
      },
      selectTable(index){
        let $t = this;
        $t.tableProp = [];
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[index]]);
        // console.log($t.wb.Sheets[$t.wb.SheetNames[index]]);
        // console.log(json);
        let obj = $t.wb.Sheets[$t.wb.SheetNames[index]];
        let character = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];
        for(let key in obj){
          for(let i = 0;i<character.length;i++){
            if(key == character[i]+'1'){
              $t.tableProp.push(obj[key].h);
            }
          }
        }
        $t.dialogVisible = false;
        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      },
      downloadExl: function (json, downName, type) {  // 导出到excel
        console.log(json);

        // for(let j in this.tableProp){
        //   for (let i in json){
        //     let value = json[i];
        //     let changeValue = value[this.tableProp[j]];
        //     if(changeValue !==undefined){
        //       changeValue =  changeValue.replace(/\n/g,"<br style='mso-data-placement:same-cell;'/>");
        //     }
        //     console.log(changeValue);
        //     // value[this.tableProp[j]].replace(/\n/g,"<br/>")
        //     // console.log(value[this.tableProp[j]]);
        //   }
        // }
        let keyMap = this.tableProp // 获取键
        // let keyMap = [] // 获取键
        // for (let k in json[0]) {
        // for (let k in this.tableProp) {
        //   keyMap.push(k)
        // }
        // console.log(keyMap);
        // console.info('keyMap', keyMap, json)
        let tmpdata = [] // 用来保存转换好的json
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
          v: v[k],
          position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
          if(v.v!==undefined){
            v.v = v.v.replace(new RegExp("<br/>","g"), "\r\n")
          }
          tmpdata[v.position] = {
            v: v.v
          }
        })
        let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
        let tmpWB = {
          SheetNames: ['mySheet'], // 保存的表标题
          Sheets: {
            'mySheet': Object.assign({},
              tmpdata, // 内容
              {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
              })
          }
        }
        let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
          {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
        ))], {
          type: ''
        })  // 创建二进制对象写入转换好的字节流
        let href = URL.createObjectURL(tmpDown)  // 创建对象超链接
        this.outFile.download = downName + '.xlsx'  // 下载名称
        this.outFile.href = href  // 绑定a标签
        this.outFile.click()  // 模拟点击实现下载
        setTimeout(function () {  // 延时释放
          URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
        }, 100)
      },
      analyzeData: function (data) {  // 此处可以解析导入数据
        return data
      },
      dealFile: function (data) {   // 处理导入的数据
        // console.log(data)
        this.imFile.value = ''
        this.fullscreenLoading = false
        if (data.length <= 0) {
          this.errorDialog = true
          this.errorMsg = '请导入正确信息'
        } else {
          // for(let j in this.tableProp){
          //   for (let i in data){
          //     let value = data[i];
          //     let changeValue = value[this.tableProp[j]];
              // if(changeValue !==undefined){
              //   let arr = changeValue.split('清');
              //   changeValue = arr.join('<br/>');
              //   data[i][this.tableProp[j]] = changeValue
              // }
              // console.log(changeValue);
              // value[this.tableProp[j]].replace(/\n/g,"<br/>")
              // console.log(value[this.tableProp[j]]);
            // }
          // }
          this.excelData = data
        }
      },
      s2ab: function (s) { // 字符串转字符流
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF
        }
        return buf
      },
      getCharCol: function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        let s = ''
        let m = 0
        while (n > 0) {
          m = n % 26 + 1
          s = String.fromCharCode(m + 64) + s
          n = (n - m) / 26
        }
        return s
      },
      fixdata: function (data) {  // 文件流转BinaryString
        console.log(data);
        let o = ''
        let l = 0
        let w = 10240
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .excel{
    width: calc(100% - 40px);
    margin: 0 auto;
  }
  .el-table th>.cell {
    text-align: center;
  }
  .button {
    margin-bottom: 10px;
  }
</style>
