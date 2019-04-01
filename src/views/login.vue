<template>
  <div class="login">
    <!--<div class="login-top">-->
    <!--<div class="login-top-logo"/>-->
    <!--<div class="login-top-title">Lee</div>-->
    <!--</div>-->
    <div class="login-main">
      <div class="login-main-left"/>
      <div class="login-main-right">
        <div v-if="formIndex == 0" class="login-main-form" v-loading="loading" element-loading-text="登录中" element-loading-background="rgba(241, 245, 248, 0.5)">
          <div class="form-top">
            <div class="form-top-left">
              <div class="form-top-left-title1">快速登录</div>
              <div class="form-top-left-title2">QUICK LOGIN</div>
            </div>
            <div class="form-top-right">
              <el-tooltip content="扫码登录" placement="bottom">
                <div class="form-top-right-code" @click="formIndex = 1"></div>
              </el-tooltip>
              <div class="form-top-right-bgc1"></div>
            </div>
          </div>
          <div class="form-center">
            <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="demo-ruleForm" @submit.native.prevent>
              <el-form-item label="" prop="phone" :rules="rules.phone">
                <el-input :prefix-icon="{'phone-icon':phoneIcon == '','phone-icon-true':phoneIcon == '0','phone-icon-false':phoneIcon == '1' }" maxlength="11" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="" prop="imgIdentify" id="identifyCode" :rules="rules.imgIdentify">
                <el-input :prefix-icon="{'verification-icon':imgIdentifyIcon == '','verification-icon-true':imgIdentifyIcon == '0','verification-icon-false':imgIdentifyIcon == '1' }" maxlength="4"  v-model="ruleForm.imgIdentify" placeholder="请输入图形验证码">
                  <template slot="append">
                    <div class="code" @click="refreshCode">
                      <identify :identifyCode="identifyCode"></identify>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="phoneIdentify" :rules="rules.phoneIdentify">
                <el-input :prefix-icon="{'verification-icon':phoneIdentifyIcon == '','verification-icon-true':phoneIdentifyIcon == '0','verification-icon-false':phoneIdentifyIcon == '1' }" maxlength="4" v-model="ruleForm.phoneIdentify" placeholder="请输入短信验证码">
                  <template slot="append">
                    <el-popover
                      placement="top-end"
                      trigger="manual"
                      content="请先将手机号填写正确"
                      v-model="visible">
                      <el-button slot="reference" @click="getPhoneCode('ruleForm')" :class="{'code-btn-true':phoneIcon == '0'}" :disabled="phoneIdentify">{{phoneIdentifyText}}</el-button>
                    </el-popover>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <div style="display: flex;justify-content: center">
                  <puzzle  width="260"
                           height="120"
                           pl-size="30"
                           deviation="5"
                           :puzzle-img-list="imgList"/>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" :disabled="loading" type="primary"  native-type="submit" @click="submitForm('ruleForm')" >登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="form-bottom">————   技术支持：Lee   ————</div>
        </div>
        <div v-show="formIndex == 1" class="login-main-form">
          <div class="form-top">
            <div class="form-top-left">
              <div class="form-top-left-title3">手机扫码，安全登录</div>
            </div>
            <div class="form-top-right bacBlue">
              <el-tooltip content="快速登录" placement="bottom">
                <div class="form-top-right-form" @click="formIndex = 0"></div>
              </el-tooltip>
              <div class="form-top-right-bgc2"></div>
            </div>
          </div>
          <div class="form-center">
            <canvas  id="qrcode"></canvas>
            <div class="form-center-content">
              <div class="form-center-content-img"/>
              <div class="form-center-content-title">打开微信扫一扫登录</div>
            </div>
          </div>
          <div class="form-bottom">————   技术支持：Lee   ————</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '../services/service';
  import identify from '../components/identify'
  import puzzle from '../components/puzzle'
  import QRCode from 'qrcode';
  export default {
    components:{
      identify,
      puzzle
    },
    data() {
      const phone = (rule, value, callback) => {
        if (value == '') {
          this.phoneIcon = '1';
          callback(new Error('请输入手机号'));
        }else if(!(/^1[34578]\d{9}$/.test(value))){
          this.phoneIcon = '1';
          callback(new Error('手机号格式有误'));
        }else {
          this.phoneIcon = '0';
          callback();
        }
      };
      const imgIdentify = (rule, value, callback) => {
        if (value == '') {
          this.imgIdentifyIcon = '1';
          callback(new Error('请输入图形验证码'));
        } else if(value.toUpperCase()!=this.identifyCode){
          this.imgIdentifyIcon = '1';
          callback(new Error('图形验证码有误'));
        } else {
          this.imgIdentifyIcon = '0';
          callback();
        }
      };
      const phoneIdentify = (rule, value, callback) => {
        if (value == '') {
          this.phoneIdentifyIcon = '1';
          callback(new Error('请输入手机验证码'));
        } else if (isNaN(value)) {
          this.phoneIdentifyIcon = '1';
          callback(new Error('必须为数字值'));
        } else {
          this.phoneIdentifyIcon = '0';
          callback();
        }
      };
      return {
        imgList: [
          // require('./../image/ver.png'),
          // require('./../image/ver-1.png'),
          // require('./../image/ver-2.png'),
          // require('./../image/ver-3.png'),
          // require('./../image/top0.png'),
          // require('./../image/top1.png'),
          // require('./../image/top2.png'),
          require('./../image/top3.png'),
          require('./../image/top4.png'),
          require('./../image/top5.png'),
          require('./../image/top6.png'),
          require('./../image/top7.png'),
        ],
        phoneIcon:'',
        imgIdentifyIcon: '',
        phoneIdentifyIcon:'',
        loading:false,
        visible:false,
        formIndex:0,
        identifyCodes: "23456789ABDEFGHJKMNPRSTUVWXYZ",
        identifyCode: "",
        ruleForm: {
          phone:'',
          imgIdentify: '',
          phoneIdentify:'',
        },
        phoneIdentify:false,
        phoneIdentifyText:'获取短信验证码',
        rules: {
          phone: [
            // { required: true, message: '请输入手机号', trigger: 'change' },
            { validator: phone, trigger: 'change'},
          ],
          imgIdentify: [
            { validator: imgIdentify, trigger: 'change'},
          ],
          phoneIdentify: [
            { validator: phoneIdentify, trigger: 'change'},
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _self = this;
        _self.$refs[formName].validate((valid) => {
          if (valid) {
              _self.$message({
                message: '验证通过',
                type: 'success'
              });
              // _self.$router.push({
              //   name: 'home'
              // });
            // let data = {
            //   phone:_self.ruleForm.phone,
            //   code:_self.ruleForm.phoneIdentify,
            // }
            // service.loginByCode(data).then(function (res) {
            //   _self.loading = false;
            //   if(res.status == '200'){
            //     // _self.$message({
            //     //   message: '登录成功',
            //     //   type: 'success'
            //     // });
            //     // setTimeout(function () {
            //       _self.$router.push({
            //         name: 'selectType'
            //       });
            //     // },500)
            //   }
            // })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        this.ruleForm.imgIdentify = ''
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      },
      getPhoneCode(){
        let _self = this;
        if(!(/^1[34578]\d{9}$/.test(_self.ruleForm.phone))){
          if(_self.visible != true){
            _self.visible = true;
            setTimeout(function () {
              _self.visible = false;
            },2000)
          }
          // this.$alert('请先将手机号填写正确', '提示', {
          //   confirmButtonText: '确定'
          // });
        }else{
          _self.$message('没做，随便填');
          // _self.phoneIdentify = true;
          // _self.phoneIdentifyText = '发送中'
          // service.getLoginCode(_self.ruleForm.phone).then(function (res) {
          //   let timerSec = 59;
          //   let timer = setInterval(function () {
          //     _self.phoneIdentifyText = '已发送 '+timerSec+'s';
          //     if(timerSec == 0){
          //       clearInterval(timer);
          //       _self.phoneIdentify = false;
          //       _self.phoneIdentifyText = '获取短信验证码';
          //     }else{
          //       timerSec--;
          //     }
          //   },1000);
          // })
        }
      },
      getQRcode(){
        let qrcode = document.getElementById('qrcode');
        QRCode.toCanvas(qrcode,window.location.href, function (error) {
          if (error) console.error(error)
          console.log('QRCode success!');
        });
      }
    },
    mounted(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      this.getQRcode()
      // var users = [{name: "aaa", "email": "aaa@email.com"},{name: "bbb", "email": "bbb@email.com"}];
      // var emails = users.map(function (user,index) { return user; });
      // var emails = users.forEach(function (user,index) { return user.email; });
      // console.log(emails.join(","));
      // console.log(emails);
    }
  }
</script>

<style>
  html, body, #app {
    margin: 0;
    height: 100%;
    width: 100%;
  }
  .login{
    min-width: 1375px;
    min-height: 775px;
    height:calc(100vh - 81px);
    width: calc(100% - 40px);
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    /*background-size: 100% 100%;*/
    background-size:cover;
    background-image: url(../image/login0.png);
  }
  .login-top{
    display: flex;
    padding: 50px 0 50px 10%;
    align-items: center;
  }
  .login-top-logo{
    /*width: 54px;*/
    /*height: 44px;*/
    /*background: url(../image/logo.png)left top no-repeat;*/
  }
  .login-top-title{
    font-family: PingFangSC-Regular;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    margin-left: 20px;
    color: #ffffff;
  }
  .login-main{
    display: flex;
    align-items: center;
    justify-content: center;

    /*background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0 / 5em 5em;*/
    /*background:repeating-linear-gradient(-45deg, #4092f1 0, #85d2f1 12.5%, transparent 0, transparent 25%, #00a5c3 0, #51c7da 37.5%, transparent 0, transparent 50%) 0 / 5em 5em;*/
    border: 10px solid transparent;
    background: repeating-linear-gradient(-45deg, #4092f1 0%, #85d2f1 25.5%, transparent 0, transparent 25.5%, #00a5c3 0, #51c7da 50.5%, transparent 0, transparent 50.5%) 0 / 15em 15em;
  }
  .login-main-left{
    width: 803px;
    height: 650px;
    background-image: url(../image/main.png);
  }
  .login-main-right{
    position: relative;
    width: 477px;
    height: 650px;
    background-color:#f9f9f9;
    padding:18px 27px 18px 0 ;
    box-sizing: border-box;
    flex-shrink:0;
  }
  .login-main-form{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0px  0px 62px 0px
    rgba(36, 51, 74, 0.2);
    display: flex;
    flex-direction: column;
  }
  .form-top{
    display: flex;
    justify-content: space-between;
  }
  .form-top-left{
    padding:15px 0 0 25px;
  }
  .form-top-left-title1{
    font-family: MicrosoftYaHei;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #1678f5;
  }
  .form-top-left-title2{
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #1678f5;
    opacity: 0.5;
    font-weight: bold;
  }
   .form-top-left-title3{
     font-family: MicrosoftYaHei;
     font-size: 24px;
     font-weight: normal;
     font-stretch: normal;
     letter-spacing: 0px;
     color: #000000;
  }
  .form-top-right{
    display: flex;
    justify-content: flex-end;
  }
  .form-top-right-bgc1{
    width: 138px;
    height: 65px;
    background-color: white;
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
    position: absolute;
    right: 33px;
    top: 53px;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
   .form-top-right-bgc2{
    width: 122px;
    height: 60px;
    background-color:white;
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
    position: absolute;
    right: 33px;
    top: 48px;
    -webkit-transition: all .3s ease-out;
    transition: all .3s ease-out;
  }
  .form-top-right-code:hover + .form-top-right-bgc1{
    /*transform-origin:  right top;*/
    /*transform: rotate(90deg);*/
    position: absolute;
    right: 80px;
    top: 95px;
  }
  .form-top-right-form:hover + .form-top-right-bgc2{
    position: absolute;
    right: 75px;
    top: 90px;
  }
  .bacBlue{
    background-color: #4381e6;
  }
  .form-top-right-code{
    cursor: pointer;
    width: 116px;
    height: 78px;
    background: url(../image/QRcode.png)right top no-repeat;
  }
  .form-top-right-form{
    cursor: pointer;
    width: 100px;
    height: 70px;
    background: url(../image/form.png)60% 50% no-repeat;
  }
  .form-center{
    width: calc(100% - 80px);
    margin: 20px auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .form-bottom{
    width: 100%;
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 17px;
    letter-spacing: 0px;
    color: #cfcece;
  }
  .login-btn{
    width: 100%;
    /*height: 46px;*/
    /*border-radius: 6px;font-family: MicrosoftYaHei;*/
    /*font-size: 18px;*/
    /*font-weight: normal;*/
    /*font-stretch: normal;*/
    /*letter-spacing: 0px;*/
    /*color: #ffffff;*/
    margin-top: 8px;
  }
  .phone-icon{
    margin: 8px 0 0 8px!important;
    display: inline-block!important;
    width: 16px!important;
    height: 22px!important;
    background: url(../image/phone.png)right top no-repeat!important;
  }
  .phone-icon-true{
    margin: 8px 0 0 8px!important;
    display: inline-block!important;
    width: 16px!important;
    height: 22px!important;
    background: url(../image/phone-true.png)right top no-repeat!important;
  }
  .phone-icon-false{
    margin: 8px 0 0 8px!important;
    display: inline-block!important;
    width: 16px!important;
    height: 22px!important;
    background: url(../image/phone-false.png)right top no-repeat!important;
  }
  .verification-icon{
    margin: 6px 0 0 4px;
    display: inline-block;
    width: 22px;
    height: 26px;
    background: url(../image/verification.png)right top no-repeat;
  }
  .verification-icon-true{
    margin: 6px 0 0 4px;
    display: inline-block;
    width: 22px;
    height: 26px;
    background: url(../image/verification-true.png)right top no-repeat;
  }
  .verification-icon-false{
    margin: 6px 0 0 4px;
    display: inline-block;
    width: 22px;
    height: 26px;
    background: url(../image/verification-false.png)right top no-repeat;
  }
  /*.el-input--medium .el-input__inner, .el-input-group--append .el-input__inner, .el-form-item.is-error .el-input__inner{*/
    /*border-style: none;*/
    /*border-bottom: 1px solid #cccccc;*/
    /*border-radius: 0;*/
    /*padding: 0 0 10px 36px;*/
  /*}*/
  .el-form-item {
    margin-bottom: 15px;
  }
  .code-btn{
    width: 121px!important;
    height: 36px!important;
    background-color: #c9cfd4!important;
    border-color: #c9cfd4!important;
    border-radius: 18px!important;
    font-family: MicrosoftYaHei!important;
    font-size: 14px!important;
    font-weight: normal!important;
    font-stretch: normal!important;
    letter-spacing: 0px!important;
    color: #ffffff!important;
    position: absolute;
    right: 0;
    top: 0px;
    text-align: center!important;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
  .code-btn-true{
    background-color:#409eff!important;
    border-color: #409eff!important;
    color:white!important;
  }
  .login .el-button--medium {
    padding: 10px 0px!important;
  }
  .login .el-form-item{
    position: relative;
  }
  #qrcode {
    margin: 0 auto;
    width: 184px!important;
    height: 181px!important;
  }
  .form-center-loginScan{
    width: 184px;
    height: 181px;
    background: url(../image/loginScan.png)right top no-repeat;
  }
  .form-center-content{
    margin: 65px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-center-content-img{
    width: 24px;
    height: 24px;
    background: url(../image/scan.png)right top no-repeat;
  }
  .form-center-content-title{
    font-family: MicrosoftYaHei;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 17px;
    letter-spacing: 0px;
    color: #000000;
    margin-left: 15px;
  }
  .code{
    border: solid 1px #aeafb2;
    cursor: pointer;
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 0px;*/
  }
  #identifyCode .el-input-group__append{
    padding: 0!important;
  }
  .login .el-input--prefix .el-input__inner {
    padding-left: 40px!important;
  }
  .login .el-input{
    /*border: 5px solid transparent;*/
    /*background: repeating-linear-gradient(-45deg, #4092f1 0%, #85d2f1 58.5%, transparent 0, transparent 17.5%, #00a5c3 0, #51c7da 59.5%, transparent 0, transparent 50.5%) 0 / 1em 1em;*/
    border-radius: 5px;
  }
</style>
