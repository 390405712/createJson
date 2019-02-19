<template>
  <div id="app">
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="Main">CreateJson</el-menu-item>
      <el-menu-item index="Time">时间转换</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-menu-demo{
  width: calc(100% - 40px)!important;
  margin: 0 auto 10px!important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
/*---滚动条默认显示样式--*/
::-webkit-scrollbar-thumb {
  background-color: #E4E3E4;
  height: 50px;
  outline-offset: -2px;
  outline: 2px solid #fff;
  -webkit-border-radius: 8px;
  /*border: 2px solid #fff;*/
}

/*---鼠标点击滚动条显示样式--*/
::-webkit-scrollbar-thumb:hover {
  background-color: #409EFF;
  height: 50px;
  -webkit-border-radius: 8px;
}

/*---滚动条大小--*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/*---滚动框背景样式--*/
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}

body {
  background-color: #F1F5F8;
}

.el-select {
  width: 100% !important;
}

#re {
  border: 1px solid #e2e2e2;
  padding: 10px;
  margin-top: 10px;
}

.el-card {
  margin-bottom: 15px;
}

.el-aside {
  padding: 20px 0 0 20px;
}
.el-header{
  height: 180px!important;
}
#biaoti {
  font-size: 16pt;
  text-align: center;
  font-weight: bold;
  font-family: serif;
  color: #606266;
  position: relative;
}
#biaoti .el-card__body{
  padding: 0!important;
}
.el-main {
  padding: 20px 20px 0px 15px !important;
}

.el-button-group .el-button--warning:first-child {
  border-right-color: #f5dab1;
}

.el-button-group {
  margin-bottom: 10px;
}

.cell {
  text-align: center;
}

.el-select {
  width: 150px !important;
}

.el-input__prefix, .el-input__suffix {
  line-height: 38px;
  font-size: 16pt;
}

i {
  font-style: inherit;
}

.el-table_1_column_2 {
  width: 20% !important;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

tr td:last-child {
  background-color: #fff;
}

.el-aside .el-card__body {
  height: calc(100% - 40px);
}

#content .is-always-shadow {
  margin-bottom: 0 !important;
  height: calc(100% - 10px) !important;
}
.div-tree{
  border: 1px solid #dcdfe6!important;
  height: 440px;
  border-radius: 4px;
  padding: 10px;
}
.el-tree{
  height: 380px;
  overflow: auto;
  margin-top: 10px;
}
.el-tabs{
  /*border: 1px solid #dcdfe6!important;*/
  height: 462px;
}
.el-tabs__content{
  height: 462px;
}
.pro{
  height: calc(100% - 10px);
  margin: 0;
}
.top-img1{
  /*width: 1920px;*/
  height: 180px;
  background: url(assets/top.png)center center no-repeat;
}
.top-img2{
  z-index: 1;
  width: 220px;
  height: 105px;
  position: absolute;
  top: 40px;
  left: 5%;
  background: url(assets/top-title.png)left top no-repeat;
}
.top-name{
  position: absolute;
  color: #F45A8D;
  font-size: 18pt;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: hsla(0,0%,100%,.4);
  font-family: sans-serif;
}
.top-ma{
  position: absolute;
  width: 259px;
  height: 174px;
  right: 10px;
  top: 4px;
  background: url(assets/orcode-frame.png)left top no-repeat;
}
.bilibili-loading{
  width: 24px;
  height: 24px;
  display: inline-block;
  background: url(assets/loading.gif)left top no-repeat;
}
#canvas{
  width: 104px!important;
  height: 104px!important;
  margin-top: 28px;
}
.el-loading-text{
  color:#FFAFC9!important;
}
.re-pro{
  display: none;
}
@media screen and (max-width: 900px) {
  .el-aside{
    display: none!important;
  }
  .re-pro{
    display: block;
  }
  .top-ma{
    display: none!important;
  }
  .top-img2{
    display: none!important;
  }
  .el-main{
    padding: 15px 0 0!important;
  }
  .el-header{
    padding: 0!important;
  }
  /*.top-div {*/
    /*background: url(../img/banner.png) -86px -3px no-repeat;*/
    /*-webkit-background-size: 170% 105%;*/
    /*background-size: 170% 105%;*/
  /*}*/
}
</style>
