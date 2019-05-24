<template>
  <div>
    <el-container>
      <el-header class="app-top">
        <div>后台管理系统</div>
        <div style="cursor: pointer;font-size: 16px" @click="exit">退出</div>
      </el-header>
      <el-container>
        <el-aside class="app-left" style=" width: 201px;">
          <el-menu
              :default-active="$route.path" router
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>基本信息管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="adminHouse">房源信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="adminUser">客户信息</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-phone"></i>
                  <span>租赁过程管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="adminAppointment">预约信息</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统管理</span>
                </template>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="app-main">
          <div class="app-bottom">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    methods:{
      exit(){
        localStorage.removeItem('adminObj');
        this.$router.push({
          name: 'appUser'
        });
      }
    },
    created() {
      if(!localStorage.getItem('adminObj')){
        this.$router.push({
          name: 'appUser'
        });
      }
    }
  }
</script>

<style>
  .app-top{
    font-size: 16pt;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: #2F3134;
  }
  .app-left{
    padding: 0!important;
    height: calc(100vh - 60px);
    background-color: #545c64;
  }
  .app-center{
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .app-bottom{
    height: calc(100vh - 110px);
    width: 100%;
  }
</style>
