<template>
  <div class="cloudMusic">
    <el-container>
      <el-header>
        <div class="header-left" style="display: flex">
          <div style="width: 185px;font-size: 18px;color:white;line-height: 28px;cursor: pointer"><i class="el-icon-service"></i> 網易云音樂</div>
          <div style="display: flex;align-items: center;margin-right: 10px">
            <i class="breadBtn el-icon-arrow-left"></i>
            <i class="breadBtn el-icon-arrow-right"></i>
          </div>
          <div>
            <el-input class="searchArea" v-model="input" placeholder="搜索音乐、视频、歌词、电台" size="mini">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="hearder-right" style="">
          <div><i class="el-icon-service"></i> Lee  <i class="el-icon-caret-bottom"></i></div>
          <div><i class="el-icon-menu"></i></div>
          <div>
            <el-badge :value="12" class="item">
              <i class="el-icon-message"></i>
            </el-badge>
          </div>
          <div><i class="el-icon-setting"></i></div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="209px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#191B1F"
            text-color="#ADAFB2"
            active-text-color="#ffffff">
            <el-submenu index="0">
              <template slot="title">推荐</template>
              <el-menu-item index="0-1"><i class="el-icon-service"/><span>发现音乐</span></el-menu-item>
              <el-menu-item index="0-2"><i class="el-icon-location"/><span>私人FM</span></el-menu-item>
              <el-menu-item index="0-3"><i class="el-icon-view"/><span>视频</span></el-menu-item>
              <el-menu-item index="0-4"><i class="el-icon-mobile-phone"/><span>朋友</span></el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">我的音乐</template>
              <el-menu-item index="1-1"><i class="el-icon-service"/><span>本地音乐</span></el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-download"/><span>下载管理</span></el-menu-item>
              <el-menu-item index="1-3"><i class="el-icon-upload"/><span>我的音乐云盘</span></el-menu-item>
              <el-menu-item index="1-4"><i class="el-icon-location"/><span>我的电台</span></el-menu-item>
              <el-menu-item index="1-4"><i class="el-icon-star-on"/><span>我的收藏</span></el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">创建我的歌单</template>
              <el-menu-item index="2-1"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
              <el-menu-item index="2-2"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">收藏的歌单</template>
              <el-menu-item index="3-1"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
              <el-menu-item index="3-3"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
              <el-menu-item index="3-4"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
              <el-menu-item index="3-5"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
              <el-menu-item index="3-6"><i class="el-icon-document"/><span>xxxxxx</span></el-menu-item>
            </el-submenu>
          </el-menu>
          <div style="font-size:14px;color: #ADAFB2;border:1px solid #23262C;width: 100%;height: 74px;justify-content: space-between;display: flex;align-items: center;box-sizing: border-box;padding: 0 7px;">
            <div class="music-img"></div>
            <div style="width: 110px;">
              <div>XXXXXXXXXX...</div>
              <div>XXXXXXXXXX...</div>
            </div>
            <div style="display: flex;flex-direction: column;">
              <div style="height: 18px;cursor: pointer" class="el-icon-star-off"/>
              <div style="height: 18px;cursor: pointer" class="el-icon-delete"/>
            </div>
          </div>
        </el-aside>
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个性推荐" name="first">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item,index) in 7" :key="item">
                  <div :class="'el-carousel-item-image'+index"></div>
                </el-carousel-item>
              </el-carousel>
              <div style="display: flex;justify-content:space-between;color:#ADAFB2;padding-bottom:6px;border-bottom: 1px solid #23262C">
                <div>推荐歌单</div>
                <div style="font-size: 14px;cursor:pointer;">更多></div>
              </div>
              <div class="musicList">
                <div v-for="(item,index) in 10" class="musicList-item">
                  <div class="musicList-top"><i class="el-icon-service"/>1688</div>
                  <div class="musicList-image"></div>
                  <div class="musicList-title">每日歌曲推荐</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
            <el-tab-pane label="主播电台" name="third">主播电台</el-tab-pane>
            <el-tab-pane label="排行榜" name="fourth">排行榜</el-tab-pane>
            <el-tab-pane label="歌手" name="five">歌手"</el-tab-pane>
            <el-tab-pane label="最新音乐" name="six">最新音乐</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
      <el-footer>
        <div style="display: flex;justify-content:space-between;height:50px;">
          <div style="display: flex;align-items: center;justify-content:center;flex-grow: 1;">
            <div style="cursor:pointer;height: 30px;width: 30px;border-radius: 50%;border: 1px solid rgb(86, 86, 89);font-size: 16px;text-align: center;color: white;line-height: 30px;box-sizing: border-box;"><i class="el-icon-d-arrow-left"/></div>
            <div style="margin: 0 20px;cursor:pointer;height: 34px;width: 34px;border-radius: 50%;border: 1px solid rgb(86, 86, 89);font-size: 24px;text-align: center;color: white;line-height: 34px;box-sizing: border-box;"><i class="el-icon-caret-right"/></div>
            <div style="cursor:pointer;height: 30px;width: 30px;border-radius: 50%;border: 1px solid rgb(86, 86, 89);font-size: 16px;text-align: center;color: white;line-height: 30px;box-sizing: border-box;"><i class="el-icon-d-arrow-right"/></div>
          </div>
          <div style="justify-content: space-around;display: flex;align-items: center;flex-grow: 10;color: white;font-size: 14px">
            <div>02:04</div>
            <div style="height: 5px;border-radius:2px;width:calc( 100% - 100px);background-color:#454546;position: relative;">
              <div style="height: 5px;border-radius: 2px;width: calc(33%);background-color:#B82525;position: absolute;left: 0">
                <div style="width: 14px;height: 14px;border-radius: 50%;background-color: white;box-sizing: border-box;position: absolute;right: 0;top: -4px;cursor: pointer;">
                  <div style="width: 4px;height: 4px;border-radius: 50%;background-color: #B82525;box-sizing: border-box;position: absolute;right: 5px;top: 5px;cursor: pointer;z-index: 1;"/>
                </div>
              </div>
            </div>
            <div >06:34</div>
          </div>
          <div style="flex-grow: 1;justify-content: space-around;display: flex;align-items: center;color: #ADAFB2;font-size: 16px">
            <div style="display: flex;align-items: center">
              <div class="el-icon-bell">  </div>
              <div style="margin-left:10px;height: 5px;width: 100px;border-radius:2px;background-color:#B82525"></div>
            </div>
            <div class="el-icon-refresh"></div>
            <div style="border: 1px solid #656668;padding: 0 1px;font-size: 14px">词</div>
            <div class="el-icon-tickets"><span style="font-size: 12px;color: white">19</span></div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "cloudMusic",
    data(){
      return{
        activeName: 'first'
      }
    },
  }
</script>

<style >
.cloudMusic{
  width: calc(100% - 40px);
  margin: 0 auto;
  height: calc(100vh - 80px);
  min-width: 1350px;
}


.cloudMusic ::-webkit-scrollbar-thumb {
  background-color: #2F3134!important;
  outline: 2px solid #191B1F!important;
}
.cloudMusic   ::-webkit-scrollbar-track-piece {
  background-color: #191B1F!important;
}
/*---鼠标点击滚动条显示样式--*/
.cloudMusic ::-webkit-scrollbar-thumb:hover {
  background-color: #3B3C40!important;
}
/*头部*/
.cloudMusic .breadBtn{
  border: 1px solid #17171A;
  color: #ADAFB2;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  padding: 1px 4px;
}
.cloudMusic .breadBtn:hover{
  color: white;
}
.cloudMusic .el-input__inner{
  border-radius:14px 0 0 14px!important;
  background-color: #161618!important;
  border: 1px solid #161618!important;
  color: white!important;
  width: 200px;
}
.cloudMusic .el-input-group__append{
  border-radius: 0 14px 14px 0 !important;
  background-color: #161618!important;
  border: 1px solid #161618!important;
  color: white!important;
  padding:0 10px!important;
}
.cloudMusic .el-header {
  height: 50px !important;
  display: flex;
  justify-content: space-between;
  align-items:center;
  background-color: #232326;
  border-bottom: 1px solid #B82525;
}
.cloudMusic .hearder-left{

}
.cloudMusic .hearder-right{
  width: 250px;
  display: flex;
  justify-content: space-around;
  color: #ADAFB2;
}
.cloudMusic .hearder-right div{
  cursor: pointer;
}
.cloudMusic .hearder-right div:hover{
  color: white;
}
.cloudMusic .el-badge__content{
  border-radius: 10px;
  color: #FFF;
  display: inline-block;
  font-size: 12px;
  height: 15px;
  line-height: 15px;
  padding: 0 5px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #B82525;
  background-color: #B82525!important;
}
.cloudMusic .el-container{
  height: 100%;
}
.cloudMusic .el-aside, .cloudMusic .el-main{
  height: 100%;
  padding:0 20px!important; ;
}
/*左侧  */
.cloudMusic .el-aside{
  padding: 0!important;
  background-color: #191B1F;
  border-right:1px solid #202226;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cloudMusic .el-submenu__title,.cloudMusic .el-submenu .el-menu-item {
  height: 36px!important;
  line-height: 36px!important;
}
.cloudMusic .el-menu{
  border-style: none;
  overflow-y: auto;
}
.cloudMusic .music-img{
  width:46px;
  height: 46px;
  background-image: url(../image/halo.jpg);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
/*主页*/
.cloudMusic .el-main{
  width: 100%;
  background-color: #16181C;
}
.cloudMusic .el-tabs__content{
  max-width: 1050px;
  margin: 0 auto;
}
.cloudMusic .el-tabs__item.is-active,.cloudMusic .el-tabs__item:hover{
  color:white;
}
.cloudMusic .el-tabs__active-bar{
  background-color: #5C5E61;
}
.cloudMusic .el-tabs__item{
  color: #ADAFB2;
}
.cloudMusic .el-tabs__nav-wrap::after {
  background-color: #202226;
}
.cloudMusic .musicList{
  display: flex;
  flex-wrap: wrap;
}
.cloudMusic .musicList-item{
  display: flex;
  flex-direction: column;
  position: relative;
}
.cloudMusic .musicList-top{
  position: absolute;
  right: 7px;
  top: 6px;
  padding: 3px 8px;
  width: 100px;
  text-align: right;
  font-size: 14px;
  color:white;
  background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 10%, #999A99  100%);
}
.cloudMusic .musicList-image{
  width:196px;
  height: 188px;
  margin:7px 7px 0 7px;
  /*background-image: url(../image/halo.jpg);*/
  background-image: url(../image/main.png);
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image0{
  width:525px;
  height: 200px;
  background-image: url(../image/top0.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image1{
  width:525px;
  height: 200px;
  background-image: url(../image/top1.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image2{
  width:525px;
  height: 200px;
  background-image: url(../image/top2.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image3{
  width:525px;
  height: 200px;
  background-image: url(../image/top3.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image4{
  width:525px;
  height: 200px;
  background-image: url(../image/top4.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image5{
  width:525px;
  height: 200px;
  background-image: url(../image/top5.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image6{
  width:525px;
  height: 200px;
  background-image: url(../image/top6.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .el-carousel-item-image7{
  width:525px;
  height: 200px;
  background-image: url(../image/top7.png);
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  cursor: pointer;
}
.cloudMusic .musicList-title{
  margin:2px 7px 20px;
  color: white;
  font-size: 14px;
}
.cloudMusic .el-tabs__content{
  height: auto;
}
/*首页  */
.el-carousel__item h3 {
  color: #475669;
  font-size: 20px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.cloudMusic .el-tabs__nav-scroll{
  display: flex;
  justify-content: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*底部  */
.cloudMusic .el-footer{
  height: 50px!important;
  background-color: #232326;
  padding: 0!important;
}
</style>
