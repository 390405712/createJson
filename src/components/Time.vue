<template>
  <div style="width: calc(100% - 40px);margin: 0 auto;">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>输入时间戳</span>
            <el-button style="float: right; padding: 3px 0;font-size: 16px" type="text" @click="start">转换<i class="el-icon-arrow-right"></i></el-button>
          </div>
          <el-input
            type="textarea"
            resize="none"
            :autosize="{ minRows: 14,maxRows: 14}"
            v-model="content">
          </el-input>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>输出结果</span>
          </div>
          <el-table :data="resultTime" style="width: 100%">
            <el-table-column prop="id" label="id">
            </el-table-column>
            <el-table-column prop="start" label="开始时间">
            </el-table-column>
            <el-table-column prop="end" label="结束时间">
            </el-table-column>
            <el-table-column prop="time" label="相差">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <echartsLine :chartsName = "chartsName" :chartsData="chartsData" :name="cloName.time"></echartsLine>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <echartsBar :chartsName = "chartsName" :chartsData="chartsData" :name="cloName.time"></echartsBar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echartsLine from './echarts-line';
  import echartsBar from './echarts-bar';
  import staticJson from './../assets/static'
  export default {
    components:{
      echartsLine,
      echartsBar
    },
    data(){
      return{
       content:staticJson.content,
       cloName:{
         id:'',
         start:'',
         end:'',
         time:''
       },
       chartsName:[],
       chartsName:[],
       resultTime:[],
       echartsOptions1: {},
       echartsOptions2: {},
       dialogVisible:false,
      }
    },
    methods:{
      start(){
        let content = this.content.replace(/\n/g,"").replace(/\s+/g,"").split('|')
        let endName = content[content.length-1].split('+')
        this.cloName = {
          id:content[1],
          start:content[2],
          end:content[3],
          time:endName[endName.length-1]
        };
        let contentArr = [];
        let contentNum = 1;
        let obj = {
          id:'',
          start:'',
          end:'',
          time:''
        }
        for(let i = 0;i<content.length;i++){
          content[i] = +content[i]
          if(!isNaN(content[i])&&content[i]!=0){
            if(contentNum == 1){
              obj.id = content[i];
              contentNum++;
            }else if(contentNum == 2){
              obj.start = content[i];
              contentNum++;
            }else if(contentNum == 3){
              obj.end = content[i];
              contentArr.push(obj);
              obj = {
                id:'',
                start:'',
                end:'',
                time:''
              }
              contentNum = 1;
            }
          }
        }
        this.resultTime = [];
        this.resultTime.push(this.cloName);
        this.chartsName = [];
        this.chartsData = [];
        for(let j = 0;j<contentArr.length;j++){
          if(j !=0){
            this.resultTime.push({
              id:contentArr[j].id,
              time:contentArr[j].start - contentArr[j - 1].end,
              start:this.sec_to_time(contentArr[j].start),
              end:this.sec_to_time(contentArr[j].end)})
            this.chartsName.push(contentArr[j].id);
            this.chartsData.push(contentArr[j].start - contentArr[j - 1].end);
          }else{
            this.resultTime.push({
              id:contentArr[j].id,
              time:'',
              start:this.sec_to_time(contentArr[j].start),
              end:this.sec_to_time(contentArr[j].end)})
          }
        }
        // this.getData(this.chartsName,this.chartsData,this.cloName.time)
        // let reg = new RegExp( '},' , "g" );
        // this.resultTime = JSON.stringify(arr).replace(reg,'},\n').replace('[','[\n').replace(']','\n]');
      },
      sec_to_time(inputTime){
        let date = new Date(inputTime*1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' '+ h + ':' + minute + ':' + second;
      },
      time_to_sec(time){
        let s = '';
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        let sec = time.split(':')[2];
        s = Number(hour*3600) + Number(min*60) + Number(sec);
        return s;
      },
    },
    mounted() {
    }
  }
</script>

<style >
  .el-table__body-wrapper {
    overflow-y: auto!important;
    height: 258px!important;
  }
</style>
