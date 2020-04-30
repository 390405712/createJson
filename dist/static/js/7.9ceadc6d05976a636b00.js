webpackJsonp([7],{"56fK":function(e,t,n){"use strict";var i={name:"SIdentify",props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:24},fontSizeMax:{type:Number,default:35},backgroundColorMin:{type:Number,default:200},backgroundColorMax:{type:Number,default:240},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:112},contentHeight:{type:Number,default:34}},methods:{randomNum:function(e,t){return Math.floor(Math.random()*(t-e)+e)},randomColor:function(e,t){return"rgb("+this.randomNum(e,t)+","+this.randomNum(e,t)+","+this.randomNum(e,t)+")"},drawPic:function(){var e=document.getElementById("s-canvas").getContext("2d");e.textBaseline="bottom",e.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),e.fillRect(0,0,this.contentWidth,this.contentHeight);for(var t=0;t<this.identifyCode.length;t++)this.drawText(e,this.identifyCode[t],t);this.drawLine(e),this.drawDot(e)},drawText:function(e,t,n){e.fillStyle=this.randomColor(this.colorMin,this.colorMax),e.font=this.randomNum(this.fontSizeMin,this.fontSizeMax)+"px SimHei";var i=(n+1)*(this.contentWidth/(this.identifyCode.length+1)),o=this.randomNum(this.fontSizeMax,this.contentHeight-5),r=this.randomNum(-5,5);e.translate(i,o),e.rotate(r*Math.PI/180),e.fillText(t,0,0),e.rotate(-r*Math.PI/180),e.translate(-i,-o)},drawLine:function(e){for(var t=0;t<3;t++)e.strokeStyle=this.randomColor(this.lineColorMin,this.lineColorMax),e.beginPath(),e.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),e.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),e.stroke()},drawDot:function(e){for(var t=0;t<20;t++)e.fillStyle=this.randomColor(0,255),e.beginPath(),e.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),e.fill()}},watch:{identifyCode:function(){this.drawPic()}},mounted:function(){this.drawPic()}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"s-canvas"},[t("canvas",{attrs:{id:"s-canvas",width:this.contentWidth,height:this.contentHeight}})])},staticRenderFns:[]};var r=n("VU/8")(i,o,!1,function(e){n("bP6p")},null,null);t.a=r.exports},"aN+w":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("mvHQ"),o=n.n(i),r=(n("NTvx"),{components:{identify:n("56fK").a},data:function(){var e=this;return{phoneIcon:"",imgIdentifyIcon:"",phoneIdentifyIcon:"",loading:!1,visible:!1,identifyCodes:"23456789ABDEFGHJKMNPRSTUVWXYZ",identifyCode:"",ruleForm:{phone:"",imgIdentify:"",phoneIdentify:""},phoneIdentify:!1,phoneIdentifyText:"获取短信验证码",rules:{phone:[{validator:function(t,n,i){""==n?(e.phoneIcon="1",i(new Error("请输入手机号"))):/^1[34578]\d{9}$/.test(n)?(e.phoneIcon="0",i()):(e.phoneIcon="1",i(new Error("手机号格式有误")))},trigger:"change"}],imgIdentify:[{validator:function(t,n,i){""==n?(e.imgIdentifyIcon="1",i(new Error("请输入图形验证码"))):n.toUpperCase()!=e.identifyCode?(e.imgIdentifyIcon="1",i(new Error("图形验证码有误"))):(e.imgIdentifyIcon="0",i())},trigger:"change"}],phoneIdentify:[{validator:function(t,n,i){""==n?(e.phoneIdentifyIcon="1",i(new Error("请输入手机验证码"))):isNaN(n)?(e.phoneIdentifyIcon="1",i(new Error("必须为数字值"))):(e.phoneIdentifyIcon="0",i())},trigger:"change"}]}}},methods:{submitForm:function(e){var t=this;t.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$message({message:"登录成功",type:"success"}),setTimeout(function(){if("18000000000"==t.ruleForm.phone){var e={phone:t.ruleForm.phone,phoneIdentify:t.ruleForm.phoneIdentify};localStorage.setItem("adminObj",o()(e)),t.$router.push({name:"appAdmin"})}else if("18000000000"!=t.ruleForm.phone){var n=localStorage.getItem("usersData")?JSON.parse(localStorage.getItem("usersData")):[],i=!0;for(var r in n)t.ruleForm.phone==n[r].phone&&(i=!1);if(i){n.push({id:n.length>0?parseInt(n[n.length-1].id)+1:1,phone:t.ruleForm.phone}),localStorage.setItem("userData",o()(n));var a={phone:t.ruleForm.phone,phoneIdentify:t.ruleForm.phoneIdentify};localStorage.setItem("loginObj",o()(a)),t.$router.push({name:"appUser"})}}else t.$message({message:"手机号或者验证码有误",type:"warning"})},500)})},randomNum:function(e,t){return Math.floor(Math.random()*(t-e)+e)},refreshCode:function(){this.identifyCode="",this.makeCode(this.identifyCodes,4),this.ruleForm.imgIdentify=""},makeCode:function(e,t){for(var n=0;n<t;n++)this.identifyCode+=this.identifyCodes[this.randomNum(0,this.identifyCodes.length)]},getPhoneCode:function(){var e=this;if(/^1[34578]\d{9}$/.test(e.ruleForm.phone)){e.phoneIdentify=!0,e.phoneIdentifyText="发送中";var t=59,n=setInterval(function(){e.phoneIdentifyText="已发送 "+t+"s",0==t?(clearInterval(n),e.phoneIdentify=!1,e.phoneIdentifyText="获取短信验证码"):t--},1e3)}else 1!=e.visible&&(e.visible=!0,setTimeout(function(){e.visible=!1},2e3))}},mounted:function(){this.identifyCode="",this.makeCode(this.identifyCodes,4)}}),a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("div",{staticClass:"login-main"},[n("div",{staticClass:"login-main-left"}),e._v(" "),n("div",{staticClass:"login-main-right"},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"login-main-form",attrs:{"element-loading-text":"登录中","element-loading-background":"rgba(241, 245, 248, 0.5)"}},[e._m(0),e._v(" "),n("div",{staticClass:"form-center"},[n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"0px"},nativeOn:{submit:function(e){e.preventDefault()}}},[n("el-form-item",{staticStyle:{margin:"50px 0!important"},attrs:{label:"",prop:"phone",rules:e.rules.phone}},[n("el-input",{attrs:{"prefix-icon":{"phone-icon":""==e.phoneIcon,"phone-icon-true":"0"==e.phoneIcon,"phone-icon-false":"1"==e.phoneIcon},maxlength:"11",placeholder:"请输入手机号"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),e._v(" "),n("el-form-item",{staticStyle:{"margin-bottom":"50px!important"},attrs:{label:"",prop:"imgIdentify",id:"identifyCode",rules:e.rules.imgIdentify}},[n("el-input",{attrs:{"prefix-icon":{"verification-icon":""==e.imgIdentifyIcon,"verification-icon-true":"0"==e.imgIdentifyIcon,"verification-icon-false":"1"==e.imgIdentifyIcon},maxlength:"4",placeholder:"请输入图形验证码"},model:{value:e.ruleForm.imgIdentify,callback:function(t){e.$set(e.ruleForm,"imgIdentify",t)},expression:"ruleForm.imgIdentify"}},[n("template",{slot:"append"},[n("div",{staticClass:"code",on:{click:e.refreshCode}},[n("identify",{attrs:{identifyCode:e.identifyCode}})],1)])],2)],1),e._v(" "),n("el-form-item",{staticStyle:{"margin-bottom":"50px!important"},attrs:{label:"",prop:"phoneIdentify",rules:e.rules.phoneIdentify}},[n("el-input",{attrs:{"prefix-icon":{"verification-icon":""==e.phoneIdentifyIcon,"verification-icon-true":"0"==e.phoneIdentifyIcon,"verification-icon-false":"1"==e.phoneIdentifyIcon},maxlength:"4",placeholder:"请输入短信验证码"},model:{value:e.ruleForm.phoneIdentify,callback:function(t){e.$set(e.ruleForm,"phoneIdentify",t)},expression:"ruleForm.phoneIdentify"}},[n("template",{slot:"append"},[n("el-popover",{attrs:{placement:"top-end",trigger:"manual",content:"请先将手机号填写正确"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[n("el-button",{class:{"code-btn-true":"0"==e.phoneIcon},attrs:{slot:"reference",disabled:e.phoneIdentify},on:{click:function(t){e.getPhoneCode("ruleForm")}},slot:"reference"},[e._v(e._s(e.phoneIdentifyText))])],1)],1)],2)],1),e._v(" "),n("el-form-item",[n("el-button",{staticClass:"login-btn",attrs:{disabled:e.loading,type:"primary","native-type":"submit"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("登录")])],1)],1)],1)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"form-top"},[t("div",{staticClass:"form-top-left"},[t("div",{staticClass:"form-top-left-title1"},[this._v("快速登录")]),this._v(" "),t("div",{staticClass:"form-top-left-title2"},[this._v("QUICK LOGIN")])])])}]};var l=n("VU/8")(r,a,!1,function(e){n("c108")},null,null);t.default=l.exports},bP6p:function(e,t){},c108:function(e,t){}});