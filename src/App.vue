<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
/*!*---滚动条默认显示样式--*!*/
/*::-webkit-scrollbar-thumb {*/
  /*background-color: #E4E3E4;*/
  /*height: 50px;*/
  /*outline-offset: -2px;*/
  /*outline: 2px solid #fff;*/
  /*-webkit-border-radius: 8px;*/
  /*!*border: 2px solid #fff;*!*/
/*}*/

/*!*---鼠标点击滚动条显示样式--*!*/
/*::-webkit-scrollbar-thumb:hover {*/
  /*background-color: #409EFF;*/
  /*height: 50px;*/
  /*-webkit-border-radius: 8px;*/
/*}*/

/*!*---滚动条大小--*!*/
/*::-webkit-scrollbar {*/
  /*width: 8px;*/
  /*height: 8px;*/
/*}*/

/*!*---滚动框背景样式--*!*/
/*::-webkit-scrollbar-track-piece {*/
  /*background-color: #fff;*/
  /*-webkit-border-radius: 0;*/
/*}*/

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
  width: 16px;  /*滚动条宽度*/
  height: 16px;  /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;  /*滚动条的背景区域的圆角*/
  background-color: red;/*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius: 10px;  /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: green;  /*滚动条的背景颜色*/
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

#biaoti {
  font-size: 16pt;
  text-align: center;
  font-weight: bold;
  font-family: serif;
  color: #606266;
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
</style>
