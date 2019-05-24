<template>
<div>
  <div>
    <el-table :data="tablePageData"  style="width: 100%"  v-loading="loading" element-loading-text="加载中" element-loading-background="rgba(241, 245, 248, 0.5)">
      <el-table-column label="ID" prop="id" width="80"/>
      <el-table-column label="房源信息">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom" width="250">
            <el-row>
              <el-col :span="12">
                <p>面积: {{ scope.row.area }}平米</p>
                <p>价格: {{ scope.row.price }}元/月</p>
                <p>楼层: {{ scope.row.height }}层</p>
                <p>总楼层: {{ scope.row.maxHeight }}层</p>
              </el-col>
              <el-col :span="12">
                <p>卧室数量: {{ scope.row.bedRoom }}室</p>
                <p>建筑时间: {{ scope.row.createdTime.split('-')[0] }}年</p>
                <p>房间朝向: {{ scope.row.orientation }}</p>
                <p>租赁方式: {{ scope.row.lease }}</p>
              </el-col>
            </el-row>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.chinaArea }} {{ scope.row.address }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom">
            <p>手机号: {{ scope.row.phone }}</p>
            <p>预约时间: {{ scope.row.time }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.phone }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.apppintment?'success':'danger'">{{scope.row.apppintment?'已确认':'待确认'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.apppintment" size="small" icon="el-icon-check" @click="handleConfirm(scope.$index, scope.row)">确认预约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import { CodeToText} from 'element-china-area-data'
  export default {
    data(){
      return{
        loading:false,
        form:{
          chinaArea: [],
          createdTime:[],
        },
        tableData: [],
        tablePageData:[],
        currentPage: 1,
        total:0,
      }
    },
    methods:{
      handleCurrentChange(val) {
        let _self = this;
        _self.currentPage = val;
        _self.getTablePageData();
      },
      handleConfirm(index,row){
        let _self = this;
        let appointData = localStorage.getItem('appointData')?JSON.parse(localStorage.getItem('appointData')):[];

        for(let i in appointData){
          if(row.phone == appointData[i].phone && row.id == appointData[i].id){
            appointData[i].apppintment = true;
          }
        }
        localStorage.setItem('appointData',JSON.stringify(appointData));
        _self.getTablePageData();
      },
      codetotext(arr){
        let str = '';
        for(let j = 0;j<arr.length;j++){
          str += CodeToText[arr[j]]+(j == arr.length -1?'':' / ')
        }
        return  str;
      },
      getTablePageData(action){
        let _self = this;
        _self.loading = true;
        let tableData = localStorage.getItem('tableData')?JSON.parse(localStorage.getItem('tableData')):[];
        let appointData = localStorage.getItem('appointData')?JSON.parse(localStorage.getItem('appointData')):[];
        let arr = [];
        for(let i in appointData){
          for(let j in tableData){
            if(appointData[i].id == tableData[j].id){
              let obj = tableData[j];
              obj.time = appointData[i].time;
              obj.apppintment = appointData[i].apppintment;
              obj.phone = appointData[i].phone;
              obj.chinaArea = _self.codetotext(obj.chinaArea);
              arr.push(obj);
            }
          }
        }
        setTimeout(function () {
          _self.loading = false;
          _self.total = arr.length;
          _self.currentPage = action?1:_self.currentPage;
          _self.tablePageData = arr.splice((_self.currentPage-1)*5,5);
        },500)
      },
    },
    created(){
      let _self = this;
      _self.getTablePageData();
    },
    mounted(){
     }
  }
</script>

<style scoped>

</style>
