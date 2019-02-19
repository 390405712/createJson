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
            placeholder='格式：
            +-------+--------------------+----------------------+
            | id    | incoming_timestamp | disconnect_timestamp |
            +-------+--------------------+----------------------+
            | 74456 | 1550377311         | 1550377345           |
            | 76163 | 1550378174         | 1550378217           |
            +-------+--------------------+----------------------+
            6 rows in set (0.01 sec)1000'
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
        <div id="myChart1" :style="{width: '100%', height: '450px'}"></div>
      </el-col>
      <el-col :span="12">
        <div id="myChart2" :style="{width: '100%', height: '450px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vEcharts from 'echarts'
  import './../assets/shine'
  import './../assets/dark'
  export default {
    components:{
      vEcharts
    },
    data(){
      return{
       content:"chenli文文  21:58:13\n" +
         "-------+--------------------+----------------------+\n" +
         "| id    | incoming_timestamp | disconnect_timestamp |\n" +
         "+-------+--------------------+----------------------+\n" +
         "| 64380 | 1550365265         | 1550365296           |\n" +
         "| 64402 | 1550365334         | 1550365358           |\n" +
         "| 64428 | 1550365397         | 1550365434           |\n" +
         "| 64477 | 1550365506         | 1550365559           |\n" +
         "| 64521 | 1550365613         | 1550365642           |\n" +
         "| 64549 | 1550365676         | 1550365709           |\n" +
         "| 64574 | 1550365735         | 1550365779           |\n" +
         "| 64616 | 1550365811         | 1550365844           |\n" +
         "| 64649 | 1550365869         | 1550365906           |\n" +
         "| 64683 | 1550365922         | 1550365974           |\n" +
         "| 64706 | 1550365980         | 1550366008           |\n" +
         "| 64739 | 1550366036         | 1550366060           |\n" +
         "| 64766 | 1550366084         | 1550366126           |\n" +
         "| 64799 | 1550366140         | 1550366179           |\n" +
         "| 64834 | 1550366194         | 1550366240           |\n" +
         "| 64864 | 1550366258         | 1550366288           |\n" +
         "| 64896 | 1550366312         | 1550366346           |\n" +
         "| 64927 | 1550366374         | 1550366408           |\n" +
         "| 64939 | 1550366405         | 1550366453           |\n" +
         "| 64984 | 1550366496         | 1550366543           |\n" +
         "| 65022 | 1550366580         | 1550366613           |\n" +
         "| 65068 | 1550366663         | 1550366706           |\n" +
         "| 65100 | 1550366739         | 1550366770           |\n" +
         "| 65126 | 1550366783         | 1550366822           |\n" +
         "| 65154 | 1550366845         | 1550366887           |\n" +
         "| 65184 | 1550366924         | 1550366964           |\n" +
         "| 65225 | 1550367002         | 1550367055           |\n" +
         "| 65265 | 1550367083         | 1550367129           |\n" +
         "| 65306 | 1550367150         | 1550367198           |\n" +
         "| 65337 | 1550367200         | 1550367237           |\n" +
         "| 65358 | 1550367243         | 1550367291           |\n" +
         "| 65490 | 1550367454         | 1550367481           |\n" +
         "| 65516 | 1550367508         | 1550367551           |\n" +
         "| 65548 | 1550367558         | 1550367607           |\n" +
         "| 65583 | 1550367629         | 1550367659           |\n" +
         "| 65619 | 1550367697         | 1550367733           |\n" +
         "| 65652 | 1550367759         | 1550367781           |\n" +
         "| 65676 | 1550367794         | 1550367835           |\n" +
         "| 65704 | 1550367850         | 1550367893           |\n" +
         "| 65809 | 1550368177         | 1550368195           |\n" +
         "| 65832 | 1550368212         | 1550368244           |\n" +
         "| 65854 | 1550368262         | 1550368298           |\n" +
         "| 65906 | 1550368340         | 1550368367           |\n" +
         "| 65941 | 1550368405         | 1550368444           |\n" +
         "| 65968 | 1550368462         | 1550368499           |\n" +
         "| 66007 | 1550368527         | 1550368575           |\n" +
         "| 66058 | 1550368612         | 1550368659           |\n" +
         "| 66085 | 1550368664         | 1550368707           |\n" +
         "| 66123 | 1550368733         | 1550368824           |\n" +
         "| 66158 | 1550368831         | 1550368867           |\n" +
         "| 66181 | 1550368874         | 1550368903           |\n" +
         "| 66203 | 1550368921         | 1550368948           |\n" +
         "| 66224 | 1550368966         | 1550368990           |\n" +
         "| 66242 | 1550369003         | 1550369031           |\n" +
         "| 66258 | 1550369036         | 1550369059           |\n" +
         "| 66269 | 1550369046         | 1550369086           |\n" +
         "| 66288 | 1550369095         | 1550369123           |\n" +
         "| 66311 | 1550369142         | 1550369179           |\n" +
         "| 66331 | 1550369179         | 1550369228           |\n" +
         "| 66357 | 1550369241         | 1550369268           |\n" +
         "+-------+--------------------+----------------------+\n" +
         "60 rows in set (0.01 sec)",
       cloName:[],
       resultTime:[],
       echartsOptions1: {},
       echartsOptions2: {},
       dialogVisible:false
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
        this.getData(this.chartsName,this.chartsData)
        // let reg = new RegExp( '},' , "g" );
        // this.resultTime = JSON.stringify(arr).replace(reg,'},\n').replace('[','[\n').replace(']','\n]');
      },
      getData(chartsName,chartsData) {
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'),'dark')
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'),'dark')
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
            text: this.cloName.time,
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
            // start: 0,
            // end: 10,
            // startValue: '2016/11/12',
            // endValue: '2016/11/19',
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
              name:'相差',
              type:'line',
              smooth:true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              // areaStyle: {
              //   color:echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //     offset: 0,
              //     color: 'rgb(255, 158, 68)'
              //   }, {
              //     offset: 1,
              //     color: 'rgb(255, 70, 131)'
              //   }])
              // },
              data: chartsData
            }
          ]
        });
        myChart2.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {
              type : 'shadow'
            }
          },
          title: {
            left: 'center',
            text: this.cloName.time,
          },
          dataZoom: [{
            type: 'slider',
            filterMode: 'filter',
            // start: 0,
            // end: 10,
            // startValue: '2016/11/12',
            // endValue: '2016/11/19',
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
          toolbox: {
            feature: {
              dataZoom: {
                // yAxisIndex: 'none'
              },
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data :chartsName,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'相差',
              type:'bar',
              barWidth: '60%',
              data:chartsData
            }
          ]});
        window.onresize=function(){
          // console.log(document.body.clientWidth);
          // if(document.body.clientWidth<1000){
          //   myChart1 = this.$echarts.init(document.getElementById('myChart1'),'shine')
          //   myChart2 = this.$echarts.init(document.getElementById('myChart2'),'shine')
          // }
          myChart1.resize();
          myChart2.resize();
        }
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
