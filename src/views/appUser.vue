<template>
  <div>
    <el-container>
      <el-header class="user-header">
        <div class="user-title">寻 屋</div>
        <div>
          <el-menu
            :default-active="$route.path" router
            mode="horizontal"
            background-color="#0054A5"
            text-color="#fff"
            active-text-color="#fff">
            <el-menu-item index="userHouse">首页</el-menu-item>
            <el-menu-item index="userHome">个人中心</el-menu-item>
            <el-menu-item v-if="!islogin" index="appLogin">登录</el-menu-item>
            <el-menu-item v-if="islogin" @click="exit">{{phone}}  退出</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main class="user-main">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
      <el-footer class="user-footer">
        <div class="user-footer-left">
          <div>了解寻屋</div>
          <div>关于寻屋</div>
          <div>联系客户</div>
        </div>
        <div class="user-footer-right">官方客服 8888-8888-8888</div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        islogin:false,
        phone:'',
      }
    },
    methods:{
      exit(){
        let _self = this;
        _self.islogin = false;
        _self.phone = '';
        localStorage.removeItem('loginObj');
        this.$router.push({
          name: 'appUser'
        });
      }
    },
    created() {
      let _self = this;
      if(localStorage.getItem('loginObj')){
        let obj = JSON.parse(localStorage.getItem('loginObj'));
        _self.phone = obj.phone;
        _self.islogin = true;
      }
    }
  }
</script>

<style>
  .user-header{
    display: flex;
    justify-content: space-around;
    background-color: #0054A5;
  }
  .user-title{
    display: flex;
    align-items: center;
    font-size: 20pt;
    font-weight: bold;
    color: white;
    font-family: simsun;
  }
  .user-main{
    margin-bottom: 10px;
    min-height: calc(100vh - 155px)!important;
    /*overflow: auto;*/
  }
  .user-footer{
    height: 75px!important;
    display: flex;
    justify-content: space-around;
    background-color: #222222;
    align-items: center;
  }
  .user-footer-left{
    color: white;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    width: 350px;
  }
  .user-footer-right{
    font-size: 16px;
    color: #6FC492;
  }
  .result-noData {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: calc(100vh - 540px);
  }
  .noData {
    width: 232px;
    height: 150px;
    background: url(./../image/noData.png) center center no-repeat;
  }
  .noData-title {
    color: #8592a6;
  }
</style>
