<template>
  <div>
    <div id="myChart1" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
  import vEcharts from 'echarts'
  import './../assets/dark'
  export default {
    name: "echarts",
    components:{
      vEcharts
    },
    props:{
      chartsName:[],
      chartsData:[],
      name:'',
      width:{
        default:'100%'
      },
      height:{
        default:'400px'
      },
    },
    watch: {
      name () {
        this.getData(this.chartsName,this.chartsData,this.name);
      }
    },
    methods:{
      getData(chartsName,chartsData,name) {
        console.log(chartsName);
        console.log(chartsData);
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'),'dark')
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
            text: name,
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
              smooth:false,
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
        window.onresize=function(){
          console.log(document.body.clientWidth);
          if(document.body.clientWidth<1000){
            myChart1 = this.$echarts.init(document.getElementById('myChart1'),'shine')
          }
          myChart1.resize();
        }
      },
    },
    mounted() {
      let _self = this;
      _self.getData(_self.chartsName,_self.chartsData,_self.name);
    }
  }
</script>

<style scoped>

</style>
