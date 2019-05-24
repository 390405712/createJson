<template>
  <div  style="width: 800px;margin: 0 auto">
    <el-card>
      <el-tabs tab-position="left" style="min-height: 200px;">
        <el-tab-pane label="我的预约">
          <el-table :data="list"  style="width: 100%"  v-loading="loading" element-loading-text="加载中" element-loading-background="rgba(241, 245, 248, 0.5)">
            <el-table-column label="详细地址" show-overflow-tooltip prop="address"/>
            <el-table-column label="封面">
              <template slot-scope="scope">
                <img v-if="scope.row.imgUrl.length>0" :src="scope.row.imgUrl[0].url" style="width: 120px;height: 60px;"/>
                <span v-else>暂无图片</span>
              </template>
            </el-table-column>
            <el-table-column
              label="价格">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="bottom">
                  <p>面积: {{ scope.row.area }}平米</p>
                  <p>楼层: {{ scope.row.height }}层（共{{scope.row.maxHeight}}层）</p>
                  <p>房屋户型: {{ scope.row.bedRoom }}室1厅 {{scope.row.lease}}</p>
                  <p>房屋朝向: {{ scope.row.orientation }}</p>
                  <p>发布时间: {{ scope.row.editTime.split(' ')[0] }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row.price }}元/月
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="预约时间" show-overflow-tooltip prop="time"/>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.apppintment?'success':'danger'">{{scope.row.apppintment?'已确认':'待确认'}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:false,
        list:[],
      }
    },
    methods:{
      getAppointmentData(){
        let _self = this;
        let tableData = localStorage.getItem('tableData')?JSON.parse(localStorage.getItem('tableData')):[];
        let loginObj = localStorage.getItem('loginObj')?JSON.parse(localStorage.getItem('loginObj')):{};
        let appointData = localStorage.getItem('appointData')?JSON.parse(localStorage.getItem('appointData')):[];
        let arr = [];
        for(let i in appointData){
          if(loginObj.phone == appointData[i].phone){
            for(let j in tableData){
              if(appointData[i].id == tableData[j].id){
                let obj = tableData[j];
                obj.time = appointData[i].time;
                obj.apppintment = appointData[i].apppintment;
                arr.push(obj);
              }
            }
          }
        }
        _self.list = arr;
      }
    },
    mounted() {
      let _self = this;
      if(!localStorage.getItem('loginObj')){
        _self.$confirm('未登录，请先登录', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          _self.$router.push({
            name: 'appLogin'
          });
        });
      }else{
        _self.getAppointmentData()
      }
    }
  }
</script>

<style scoped>

</style>
