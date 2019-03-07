<template>
  <div style="width: calc(100% - 40px);margin: 0 auto;">
    <el-row :gutter="20">
      <el-col :span="12" style="margin-bottom: 10px">
        <el-button @click="getTest">测试get</el-button>
        <el-button @click="postTest">测试post</el-button>
      </el-col>
      <el-col :span="12" style="margin-bottom: 10px">
        <el-button @click="get(page,size)">获取表格数据</el-button>
        <el-popover placement="bottom" width="250" trigger="click" v-model="adddialogVisible">
          <el-form ref="addForm" :model="addform" size="small">
            <el-form-item prop="date" :rules="$rules.require">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="addform.date"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item prop="name" :rules="$rules.require">
              <el-input prefix-icon="el-icon-document" v-model="addform.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item prop="address" :rules="$rules.require">
              <el-input prefix-icon="el-icon-document" v-model="addform.address" placeholder="地址"></el-input>
            </el-form-item>
            <el-button style="width: 100%" size="small" type="primary" @click="submitForm('addForm')">保存</el-button>
          </el-form>
          <el-button slot="reference" @click="resetForm('addForm')">添加数据</el-button>
        </el-popover>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>接口返回数据</span>
            <el-button @click="msg = []" style="float: right; padding: 3px 0" type="text">清空</el-button>
          </div>
          <div style="height:297px;overflow-y: auto">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in msg" :key="index" :timestamp="item.time">
                {{item.content}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div>
            <el-table :data="tableData" style="width: 100%;height: 313px;overflow-y: auto;margin-bottom: 10px">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-popover :ref="'edit'+scope.$index" placement="left" width="250" trigger="click">
                    <el-form :ref="'editForm'+scope.$index" :model="form" size="small">
                      <el-form-item prop="date" :rules="$rules.require">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.date"
                                        style="width: 100%;"></el-date-picker>
                      </el-form-item>
                      <el-form-item prop="name" :rules="$rules.require">
                        <el-input prefix-icon="el-icon-document" v-model="form.name" placeholder="名称"></el-input>
                      </el-form-item>
                      <el-form-item prop="address" :rules="$rules.require">
                        <el-input prefix-icon="el-icon-document" v-model="form.address" placeholder="地址"></el-input>
                      </el-form-item>
                      <el-button size="small" style="width: 100%" type="primary" @click="submitForm('editForm'+scope.$index)">保存</el-button>
                    </el-form>
                  </el-popover>
                  <el-button v-popover="'edit'+scope.$index" icon="el-icon-edit" type="primary"
                             size="mini" @click="edit(scope.$index, scope.row)"></el-button>
                  <el-popover :ref="'del'+scope.$index" width="50" trigger="click">
                    <p>确定删除这条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">确定</el-button>
                    </div>
                  </el-popover>
                  <el-button v-popover="'del'+scope.$index" type="danger" icon="el-icon-delete"
                             size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[5,10, 20, 30, 40]"
                           :current-page="page" :page-size="size" layout="total,sizes,prev,pager,next,jumper"
                           :total="total">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-card">
          <echartsLine2 :chartsName = "chartsName" :chartsData="chartsData" :height="'370px'" :width="'100%'"></echartsLine2>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import service from './../services/service';
  import echartsLine2 from './echarts-line';

  let $ = require('jquery');
  export default {
    name: "Nodejs",
    components: {
      echartsLine2
    },
    data() {
      return {
        msg: [],
        tableData: [],
        adddialogVisible: false,
        dialogVisible: false,
        visible2: false,
        addform: {
          date: '',
          name: '',
          address: ''
        },
        form: {
          id: '',
          date: '',
          name: '',
          address: ''
        },
        chartsName: [],
        chartsData: [],
        page: 1,
        size: 5,
        total: 0,
        num: 0,
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSizeChange(val) {
        let _self = this;
        _self.size = val;
        _self.get(_self.page, val)
      },
      handleCurrentChange(val) {
        let _self = this;
        _self.get(val, _self.size)
      },
      timeline(value, bool = true, data) {
        let _self = this;
        _self.msg.push({
          time: _self.getTime(),
          content: JSON.stringify(value)
        })
        _self.chartsName.push(_self.num++);
        _self.chartsData.push(data);
        _self.chartFn(_self.chartsName, _self.chartsData)
        if (bool) {
          _self.$message({
            message: value.data,
            type: 'success'
          });
        }

      },
      getTime() {
        let myDate = new Date();
        return myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString();
      },
      postTest() {
        let _self = this;
        service.postTest('123123').then(function (res, time) {
          _self.timeline(res, true, time)
        })
      },
      getTest() {
        let _self = this;
        service.getTest().then(function (res, time) {
          _self.timeline(res, true, time)
        })
      },
      get(pageNum, sizeNum) {
        let _self = this;
        let params = {
          page: pageNum,
          size: sizeNum
        }
        // for(let i = 0;i<2000;i++) {
        service.getTableData(params).then(function (res, time) {
          _self.tableData = res.data
          _self.total = res.total
          _self.timeline(res, false, time)
        })
        // }
      },
      chartFn(chartsName, chartsData) {
        let _self = this;
        let myChart1 = _self.$echarts.init(document.getElementById('myChart1'), 'shine', true);
        myChart1.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          title: {
            left: 'center',
            text: '请求花费时间',
          },
          toolbox: {
            feature: {
              dataZoom: {
                // yAxisIndex: 'none'
              },
              saveAsImage: {}
            }
          },
          xAxis: {
            // type: 'category',
            boundaryGap: false,
            data: chartsName
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [{
            type: 'slider',
            filterMode: 'filter',
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '毫秒',
              type: 'line',
              smooth: false,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              data: chartsData
            }
          ]
        });
        window.onresize = function () {
          myChart1.resize();
        }
      },
      edit(index, row) {
        let _self = this;
        _self.dialogVisible = true;
        _self.form = row;
      },
      submitForm(formName) {
        let _self = this;
        _self.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName == 'addForm') {
              service.addTableData(_self.addform).then(function (res, time) {
                _self.adddialogVisible = false;
                _self.timeline(res, true, time)
                _self.get(_self.page, _self.size);
              })
            } else {
              service.updateTableData(_self.form).then(function (res, time) {
                _self.dialogVisible = false;
                _self.timeline(res, true, time)
                _self.get(_self.page, _self.size);
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      del(index, row) {
        let _self = this;
        service.delTableData(row._id).then(function (res, time) {
          _self.timeline(res, true, time)
          _self.get(_self.page, _self.size);
        })
      },
    },
    mounted() {
      this.get(this.page, this.size);
    }
  }
</script>

<style scoped>

</style>
