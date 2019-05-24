<template>
  <div  style="width: 800px;margin: 0 auto">
    <div v-show="!dialogVisible">
      <el-form ref="form" :model="form" label-width="100px" style="display: flex;flex-direction: column;" size="mini">
        <el-card style="display: flex;flex-direction: column;padding: 0!important;">
          <div style="height: 30px;border-bottom: 2px solid #0054A5;display: flex;align-items:center;justify-content: space-between;margin-bottom: 10px">
            <div style="width:110px;background-color: #0054A5;color: white;font-size: 16px;height: 100%;display: flex;align-items: center;justify-content: center">租房条件</div>
            <div style="color: #0054A5;font-size: 14px;font-weight: bold;margin-right: 10px">真实房源，假一不赔！</div>
          </div>
          <div>
            <el-form-item class="user-search-item" label="城市：">
              <el-cascader @change="getTablePageData('search')" clearable=true expand-trigger="hover" :options="formArea" v-model="form.chinaArea">
              </el-cascader>
            </el-form-item>
            <el-form-item class="user-search-item" label="租金：">
              <el-radio-group v-model="form.price" @change="getTablePageData('search')">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="1000">1000元以下</el-radio-button>
                <el-radio-button label="2000">2000元以下</el-radio-button>
                <el-radio-button label="3000">3000元以下</el-radio-button>
                <el-radio-button label="4000">4000元以下</el-radio-button>
                <el-radio-button label="5000">5000元以下</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="user-search-item" label="面积：">
              <el-radio-group v-model="form.area" @change="getTablePageData('search')">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="30">30平以下</el-radio-button>
                <el-radio-button label="50">50平以下</el-radio-button>
                <el-radio-button label="100">100平以下</el-radio-button>
                <el-radio-button label="200">200平以下</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="user-search-item" label="房型：">
              <el-radio-group v-model="form.bedRoom" @change="getTablePageData('search')">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="1">1室</el-radio-button>
                <el-radio-button label="2">2室</el-radio-button>
                <el-radio-button label="3">3室</el-radio-button>
                <el-radio-button label="4">4室</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="user-search-item" label="朝向：">
              <el-radio-group v-model="form.orientation" @change="getTablePageData('search')">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="朝东">朝东</el-radio-button>
                <el-radio-button label="朝南">朝南</el-radio-button>
                <el-radio-button label="朝西">朝西</el-radio-button>
                <el-radio-button label="朝北">朝北</el-radio-button>
                <el-radio-button label="南北">南北</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="user-search-item" label="租赁方式：" style="margin-bottom: 0!important;">
              <el-radio-group v-model="form.lease" @change="getTablePageData('search')">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="整租">整租</el-radio-button>
                <el-radio-button label="合租">合租</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
          <!--        <div class="user-sortArea">-->
          <!--          <div>排序：</div>-->
          <!--          <div>默认</div>-->
          <!--          <div>最新</div>-->
          <!--          <div>租金</div>-->
          <!--          <div>面积</div>-->
          <!--        </div>-->
        </el-card>
      </el-form>
      <el-card style="display: flex;flex-direction: column;background-color: white" v-loading="loading" element-loading-background="rgba(241, 245, 248, 0.5)">
        <div v-if="tablePageData.length > 0" style="height: 30px;display: flex;justify-content: flex-end;align-items:center;border-bottom: 1px solid #E9E9E9">
          {{chinaAreaStr}} &nbsp;&nbsp;总共有 {{total}} 套在租房源
        </div>
        <div style="padding: 10px">
          <div  v-if="tablePageData.length > 0" class="user-result-item" v-for="item in tablePageData" @click="openDialog(item)" style="cursor:pointer;display: flex;justify-content: space-between;margin-bottom:10px;padding-bottom:10px;border-bottom: 1px solid #E9E9E9">
            <div style="width: 135px;height: 100px;display: flex;align-items: center;justify-content: center">
              <img v-if="item.imgUrl.length>0" :src="item.imgUrl[0].url" style="width: 140px;height: 100px;">
              <span v-else style="color: #b3b3b3">暂无图片</span>
            </div>
            <div style="width:calc(100% - 260px);display: flex;flex-direction: column;justify-content: space-around;">
              <div style="font-size: 20px;color: #159EE8">{{item.address}}</div>
              <div style="font-size: 14px;font-weight: bold">&nbsp;&nbsp;{{item.bedRoom}}室1厅&nbsp;&nbsp;/&nbsp;&nbsp;{{item.area}}平米&nbsp;&nbsp;/&nbsp;&nbsp;{{item.orientation}}&nbsp;&nbsp;/&nbsp;&nbsp;{{item.lease}} </div>
              <div style="font-size: 12px;color:#b3b3b3">{{item.height}}楼（共{{item.maxHeight}}层）&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{{item.createdTime.split('-')[0]}} 年建</div>
              <div>
                <el-tag style="margin-right: 3px" v-for="items in item.tags" type="warning" size="mini ">{{items}}</el-tag>
              </div>
            </div>
            <div style="width:100px;display: flex;align-items:flex-end;flex-direction: column;justify-content:center">
              <div style="display: flex;align-items: baseline;margin-bottom: 10px">
                <div style="font-size: 25px;color: red;font-weight: bold">{{item.price}}</div>
                <div style="font-size: 14px;color: red">元/月</div>
              </div>
              <div style="font-size: 12px;color:#b3b3b3">{{item.editTime.split(' ')[0]}}更新</div>
            </div>
          </div>
          <div class="result-noData" v-if="tablePageData.length === 0">
            <div class="noData"></div>
            <div class="noData-title">抱歉，没有检测到结果</div>
          </div>
        </div>
      </el-card>
      <el-pagination
        v-if="tablePageData.length > 0"
        background
        style="margin: 10px 0"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="5"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <transition name="el-zoom-in-top">
      <detail v-show="dialogVisible" :dialogData="dialogData" :dialogVisible="dialogVisible" @closeDialog="closeDialog"/>
    </transition>
  </div>
</template>

<script>
  import { regionData,CodeToText} from 'element-china-area-data'
  import detail from './detail'
  export default {
    data(){
      return{
        dialogVisible:false,
        loading:false,
        formArea:[],
        form:{
          chinaArea:[],
          price:'0',
          area:'0',
          bedRoom:'0',
          orientation:'0',
          lease:'0',
        },
        chinaAreaStr:'',
        total:0,
        currentPage:1,
        tableData:[],
        tablePageData:[],
        dialogData:{},
      }
    },
    components:{
      detail
    },
    methods:{
      closeDialog(){
        let _self = this;
        _self.dialogVisible = false;

      },
      openDialog(data){
        let _self = this;
        _self.dialogData = data;
        let str = '';
        for(let j = 0;j<_self.dialogData.chinaArea.length;j++){
          str += CodeToText[_self.dialogData.chinaArea[j]]+(j == _self.dialogData.chinaArea.length -1?'':' / ')
        }
        _self.dialogData.chinaAreaStr = str;
        _self.dialogVisible = true;
      },
      handleCurrentChange(val) {
        let _self = this;
        _self.currentPage = val;
        _self.getTablePageData();
      },
      getTablePageData(action){
        let _self = this;
        _self.loading = true;
        _self.tableData = localStorage.getItem('tableData')?JSON.parse(localStorage.getItem('tableData')):[];
        let arr = [];
        let str = '';
        for(let j = 0;j<_self.form.chinaArea.length;j++){
          str += CodeToText[_self.form.chinaArea[j]]+(j == _self.form.chinaArea.length -1?'':' / ')
        }
        _self.chinaAreaStr = str;
        for(let i in _self.tableData){
          let isPush = true;
          if(_self.form.chinaArea.length>0){
            if(!_self.equar(_self.form.chinaArea,_self.tableData[i].chinaArea)){
              isPush = false;
            }
          }
          if(_self.form.price !='0'){
            if(_self.tableData[i].price > parseInt(_self.form.price)){
              isPush = false;
            }
          }
          if(_self.form.area !='0'){
            if(_self.tableData[i].area > parseInt(_self.form.area)){
              isPush = false;
            }
          }
          if(_self.form.bedRoom !='0'){
            if(_self.tableData[i].bedRoom != parseInt(_self.form.bedRoom)){
              isPush = false;
            }
          }
          if(_self.form.orientation !='0'){
            if(_self.tableData[i].orientation != _self.form.orientation){
              isPush = false;
            }
          }
          if(_self.form.lease !='0'){
            if(_self.tableData[i].lease != _self.form.lease){
              isPush = false;
            }
          }
          if(_self.tableData[i].status){
            if(isPush){
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
      equar(a, b) {
        if (a.length !== b.length) {
          return false
        } else {
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              return false
            }
          }
          return true;
        }
      },
    },
    created(){
      let _self = this;
      _self.formArea = regionData;
    },
    mounted() {
      let _self = this;
      _self.getTablePageData();
    }
  }
</script>

<style scoped>
  .user-sortArea{
    display: flex;height: 40px;background-color: #F7F7F7;align-items: center
  }
  .user-search-item {
    margin-bottom: 5px!important;
  }
  .user-result-item:last-child{
    border-style: none!important;
    margin: 0!important;
    padding: 0!important;
  }
</style>
