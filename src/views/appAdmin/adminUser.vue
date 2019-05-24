<template>
  <div>
    <div>
      <el-form ref="form" :model="form" label-width="80px" style="display: flex" size="medium">
<!--        <el-form-item label="客户姓名">-->
<!--          <el-input @change="getTablePageData('click')" placeholder="请输入客户姓名"  v-model="form.name" ></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="手机号">
          <el-input @change="getTablePageData('click')" placeholder="请输入手机号"  v-model="form.phone"></el-input>
        </el-form-item>
        <!--      <div style="margin-left: 10px">-->
        <!--        <el-button  type="primary" icon="el-icon-search" size="medium" @click="getTablePageData('click')">搜索</el-button>-->
        <!--      </div>-->
      </el-form>
      <el-table :data="tablePageData"  style="width: 100%"  v-loading="loading" element-loading-text="加载中" element-loading-background="rgba(241, 245, 248, 0.5)">
        <el-table-column label="ID" prop="id" width="80"/>
        <el-table-column label="手机号" prop="phone"/>
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
  export default {
    data(){
      return{
        loading:false,
        fileList: [],
        form:{
          name:'',
          phone:'',
        },
        tableData: [],
        tablePageData:[],
        currentPage: 1,
        total:0,
        // users:[
        //   {id:1,phone:'1760000000'},
        //   {id:2,phone:'1761111111'},
        //   {id:3,phone:'1762222222'},
        //   {id:4,phone:'1763333333'},
        // ]
      }
    },
    methods:{
      handleCurrentChange(val) {
        let _self = this;
        _self.currentPage = val;
        _self.getTablePageData();
      },
      getTablePageData(action){
        let _self = this;
        _self.loading = true;
        _self.tableData = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):[];
        let arr = [];
        if(_self.form.name ==''&&_self.form.phone==''){
          for(let i in _self.tableData){
            arr.push(_self.tableData[i]);
          }
        }
        else if(_self.form.name !=''&&_self.form.phone==''){
          for(let i in _self.tableData){
            if(_self.tableData[i].name.indexOf(_self.form.name)>-1){
              arr.push(_self.tableData[i]);
            }
          }
        }
        else if(_self.form.name ==''&&_self.form.phone!=''){
          for(let i in _self.tableData){
            if(_self.form.phone == _self.tableData[i].phone){
              arr.push(_self.tableData[i]);
            }
          }
        }
        else if(_self.form.name !=''&&_self.form.phone!=''){
          for(let i in _self.tableData){
            if(_self.tableData[i].name.indexOf(_self.form.name)>-1&&_self.form.phone == _self.tableData[i].phone){
              arr.push(_self.tableData[i]);
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

    },
    mounted(){
      let _self = this;
      _self.getTablePageData();
      // localStorage.setItem('usersData',JSON.stringify(_self.users))
    }
  }
</script>

<style scoped>

</style>
