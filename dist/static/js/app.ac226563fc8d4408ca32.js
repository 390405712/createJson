webpackJsonp([1],{"6f5U":function(e,t){},HOAn:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":this.$route.path,mode:"horizontal",router:""}},[t("el-menu-item",{attrs:{index:"Main"}},[this._v("CreateJson")]),this._v(" "),t("el-menu-item",{attrs:{index:"Time"}},[this._v("时间转换")])],1),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var l=a("VU/8")({name:"App"},i,!1,function(e){a("6f5U")},null,null).exports,o=a("/ocq"),r=a("mvHQ"),s=a.n(r),c=a("fZjL"),d=a.n(c),u=a("71e1"),p=a.n(u),h={data:function(){return{info:[{valueName:"",value:"",type:"string",checked:"不加变量"}],xunhuan:1,stringArr:1,result:"[]",option1:[{value:"number"},{value:"string"},{value:"array[单个]"},{value:"array[多个]"}],option2:[{value:"不加变量"},{value:"后面加"},{value:"累加(值为数字)"}],value:"",dialogVisible:!1,loading:!1,resultJson:[],filterText:"",activeName:"0"}},watch:{filterText:function(e){this.$refs.tree.filter(e)}},methods:{filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},handleClick:function(e,t){if("1"==e.index){var a=function(e){var t=[];for(var a in e)t.push({label:s()(a)+":"+s()(e[a])});return t},n=JSON.parse(this.result),i=[],l=this.xunhuan;l>1e3&&(l=1e3);for(var o=0;o<l;o++)i.push({label:o+"{"+d()(n[o]).length+"}",children:a(n[o])});this.resultJson=[{label:"array["+l+"]",children:i}]}},resultFun:function(){console.time("timer");for(var e=0,t="",a=this.xunhuan,n=this.info.length,i=this.stringArr,l=0;l<a;l++){for(var o=0;o<n;o++){var r=this.info,s=r[o].valueName,c=r[o].value,d=r[o].type,u=r[o].checked;if("不加变量"==u){if("number"==d)t+=(0==o?'  {\n    "':'    "')+s+'":'+c+(o==n-1?"":",\n");else if("string"==d)t+=(0==o?'  {\n    "':'    "')+s+'":"'+c+(o==n-1?'"':'",\n');else if("array[单个]"==d)t+=(0==o?'  {\n    "':'    "')+s+'":['+c+(o==n-1?"]":"],\n");else if("array[多个]"==d){for(var p="",h=0;h<i;h++)p+=c+(h==i-1?"":",");t+=(0==o?'  {\n    "':'    "')+s+'":['+p+(o==n-1?"]":"],\n")}}else if("后面加"==u){if("number"==d)t+=(0==o?'  {\n    "':'    "')+s+'":'+c+e+(o==n-1?"":",\n");else if("string"==d)t+=(0==o?'  {\n    "':'    "')+s+'":"'+c+e+(o==n-1?'"':'",\n');else if("array[单个]"==d)t+=(0==o?'  {\n    "':'    "')+s+'":['+c+e+(o==n-1?"]":"],\n");else if("array[多个]"==d){for(var f="",m=0;m<i;m++)f+='"'+c+m.toString()+(m==i-1?'"':'",');t+=(0==o?'  {\n    "':'    "')+s+'":['+f+(o==n-1?"]":"],\n")}}else if("number"==d)c=parseInt(c)+e,t+=(0==o?'  {\n    "':'    "')+s+'":'+c+(o==n-1?"":",\n");else if("string"==d)c=parseInt(c)+e,t+=(0==o?'  {\n    "':'    "')+s+'":"'+c+(o==n-1?'"':'",\n');else if("array[单个]"==d)c=parseInt(c)+e,t+=(0==o?'  {\n    "':'    "')+s+'":['+c+(o==n-1?"]":"],\n");else if("array[多个]"==d){var v="";c=parseInt(c);for(var y=0;y<i;y++)v+='"'+(c+y)+(y==i-1?'"':'",');t+=(0==o?'  {\n    "':'    "')+s+'":['+v+(o==n-1?"]":"],\n")}}t+=l==a-1?"\r\n  }\n":"\r\n  },\r\n",e++}t="[\r\n"+t+"]",this.result=t,this.loading=!1,this.dialogVisible=!0,this.activeName="0",console.timeEnd("timer")},isTrue:function(e){for(var t=this,a=0;a<t.info.length;a++)if(""==t.info[a].valueName||""==t.info[a].value)return"add"==e?void this.$message({message:"填写完整再添加",type:"warning"}):void this.$message({message:"填写完整再生成",type:"warning"});"add"==e?t.info.push({valueName:"",value:"",type:"string",checked:"不加变量"}):(t.loading=!0,window.localStorage.setItem("info",s()(t.info)),setTimeout(function(){t.resultFun()},500))},del:function(e){this.info.splice(e,1)},CopyUrl:function(){var e=document.querySelector("#copyObj");e.select(),document.execCommand("Copy"),e.blur()},clearAll:function(){this.info=[{valueName:"",value:"",type:"string",checked:"不加变量"}],window.localStorage.clear()},selectChange1:function(e){"array[多个]"==e&&this.$message("array[多个]的数组长度为"+this.stringArr)},selectChange2:function(e,t){"array[多个]"==this.info[t].type&&"不加变量"!=e&&this.$message("array[多个]：出现的变量是在自身数组中")},YuLan:function(){for(var e=0,t="",a=0;a<2;a++){for(var n=0;n<this.info.length;n++){var i=this.info,l=i[n].valueName,o=i[n].value;if("不加变量"==i[n].checked){if("number"==i[n].type)t+=(0==n?'  {\n    "':'    "')+l+'":'+o+(n==this.info.length-1?"":",\n");else if("string"==i[n].type)t+=(0==n?'  {\n    "':'    "')+l+'":"'+o+(n==this.info.length-1?'"':'",\n');else if("array[单个]"==i[n].type)t+=(0==n?'  {\n    "':'    "')+l+'":['+o+(n==this.info.length-1?"]":"],\n");else if("array[多个]"==i[n].type){for(var r="",s=0;s<3;s++)r+=o+(2==s?"":",");t+=(0==n?'  {\n    "':'    "')+l+'":['+r+(n==this.info.length-1?"]":"],\n")}}else if("后面加"==i[n].checked){if("number"==i[n].type)t+=(0==n?'  {\n    "':'    "')+l+'":'+o+e+(n==this.info.length-1?"":",\n");else if("string"==i[n].type)t+=(0==n?'  {\n    "':'    "')+l+'":"'+o+e+(n==this.info.length-1?'"':'",\n');else if("array[单个]"==i[n].type)t+=(0==n?'  {\n    "':'    "')+l+'":['+o+e+(n==this.info.length-1?"]":"],\n");else if("array[多个]"==i[n].type){for(var c="",d=0;d<3;d++)c+='"'+o+d.toString()+(2==d?'"':'",');t+=(0==n?'  {\n    "':'    "')+l+'":['+c+(n==this.info.length-1?"]":"],\n")}}else if("number"==i[n].type)o=parseInt(o)+e,t+=(0==n?'  {\n    "':'    "')+l+'":'+o+(n==this.info.length-1?"":",\n");else if("string"==i[n].type)o=parseInt(o)+e,t+=(0==n?'  {\n    "':'    "')+l+'":"'+o+(n==this.info.length-1?'"':'",\n');else if("array[单个]"==i[n].type)o=parseInt(o)+e,t+=(0==n?'  {\n    "':'    "')+l+'":['+o+(n==this.info.length-1?"]":"],\n");else if("array[多个]"==i[n].type){var u="";o=parseInt(o);for(var p=0;p<3;p++)u+='"'+(o+p)+(2==p?'"':'",');t+=(0==n?'  {\n    "':'    "')+l+'":['+u+(n==this.info.length-1?"]":"],\n")}}t+=1==a?"\r\n  }\n":"\r\n  },\r\n",e++}t="[\r\n"+t+"]",this.result=t}},mounted:function(){window.localStorage.getItem("info")&&(this.info=JSON.parse(window.localStorage.getItem("info")));var e=document.getElementById("canvas");p.a.toCanvas(e,window.location.href,function(e){e&&console.error(e),console.log("QRCode success!")})}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-container",[a("el-header",[a("el-card",{attrs:{shadow:"always",id:"biaoti"}},[a("div",{staticClass:"top-name"},[e._v("生成json[加强美化版]3.3")]),e._v(" "),a("div",{staticClass:"top-img1"}),e._v(" "),a("div",{staticClass:"top-img2"}),e._v(" "),a("div",{staticClass:"top-ma"},[a("canvas",{attrs:{id:"canvas"}})])])],1),e._v(" "),a("el-container",{attrs:{id:"content"}},[a("el-aside",{staticStyle:{width:"180px"}},[a("transition",{attrs:{name:"el-zoom-in-top"}},[a("el-card",{staticClass:"pro",attrs:{shadow:"always"}},[a("div",{staticStyle:{height:"100%"}},[a("el-steps",{attrs:{direction:"vertical",active:3}},[a("el-step",{attrs:{title:"步骤 1",description:"填写循环次数"}}),e._v(" "),a("el-step",{attrs:{title:"步骤 2",description:"添加对象"}}),e._v(" "),a("el-step",{attrs:{title:"步骤 3",description:"点击生成"}})],1)],1)])],1)],1),e._v(" "),a("el-main",[a("el-card",{staticClass:"re-pro",attrs:{shadow:"hover"}},[a("el-steps",{attrs:{active:3}},[a("el-step",{attrs:{title:"步骤 1",description:"填写循环次数"}}),e._v(" "),a("el-step",{attrs:{title:"步骤 2",description:"添加对象"}}),e._v(" "),a("el-step",{attrs:{title:"步骤 3",description:"点击生成"}})],1)],1),e._v(" "),a("el-card",{attrs:{shadow:"hover"}},[[a("div",[e._v("循环次数："+e._s(e.xunhuan)+"次")]),e._v(" "),a("div",{staticClass:"silder-width"},[a("el-slider",{attrs:{max:2e5,min:1,disabled:e.loading,"show-input":""},model:{value:e.xunhuan,callback:function(t){e.xunhuan=t},expression:"xunhuan"}})],1)],e._v(" "),[a("div",[e._v("值类型为array[多个]数组长度："+e._s(e.stringArr))]),e._v(" "),a("div",{staticClass:"silder-width"},[a("el-slider",{attrs:{max:2e5,min:1,disabled:e.loading,"show-input":""},model:{value:e.stringArr,callback:function(t){e.stringArr=t},expression:"stringArr"}})],1)]],2),e._v(" "),a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-button-group",[a("el-button",{attrs:{id:"addd",size:"medium",type:"primary",plain:"",disabled:e.loading},on:{click:function(t){e.isTrue("add")}}},[e._v("添加属性")]),e._v(" "),a("el-button",{attrs:{size:"medium",type:"danger",disabled:e.loading,plain:""},on:{click:function(t){e.clearAll()}}},[e._v("清除全部")]),e._v(" "),a("el-popover",{attrs:{placement:"right-end",width:"450",trigger:"click"}},[a("div",[a("p",{staticStyle:{"font-size":"16px",margin:"0"}},[e._v("预览效果只循环2次,array[多个]长度为3")]),e._v(" "),a("el-input",{staticStyle:{"font-size":"20px","font-family":"-webkit-body"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:15}},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}})],1),e._v(" "),a("el-button",{attrs:{slot:"reference",size:"medium",type:"warning",plain:"",disabled:e.loading},on:{click:function(t){e.YuLan()}},slot:"reference"},[e._v("预览效果")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"生成中","element-loading-spinner":"bilibili-loading","element-loading-background":"rgba(241, 245, 248, 0.8)",stripe:"",border:"",data:e.info}},[a("el-table-column",{attrs:{label:"ID",type:"index",fixed:"",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"对象属性名："}},[a("span",[e._v(e._s(t.row.valueName))])]),e._v(" "),a("el-form-item",{attrs:{label:"对象值类型："}},[a("span",[e._v(e._s(t.row.type))])]),e._v(" "),a("el-form-item",{attrs:{label:"对象属性值："}},[a("span",[e._v(e._s(t.row.value))])]),e._v(" "),a("el-form-item",{attrs:{label:"变量："}},[a("span",[e._v(e._s(t.row.checked))])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"对象"}},[a("el-table-column",{attrs:{label:"对象属性名","min-width":"160",resizable:!0},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{maxlength:20,type:"text"},model:{value:t.row.valueName,callback:function(a){e.$set(t.row,"valueName",a)},expression:"scope.row.valueName"}},[a("i",{attrs:{slot:"suffix"},slot:"suffix"},[e._v(": ")])])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"480",label:"值类型 / 对象属性值 / 变量方式",resizable:!0},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"input-with-select",attrs:{maxlength:20,type:"text"},model:{value:t.row.value,callback:function(a){e.$set(t.row,"value",a)},expression:"scope.row.value"}},[a("el-select",{attrs:{slot:"prepend",placeholder:"请选择"},on:{change:e.selectChange1},slot:"prepend",model:{value:t.row.type,callback:function(a){e.$set(t.row,"type",a)},expression:"scope.row.type"}},e._l(e.option1,function(e){return a("el-option",{key:e.value,attrs:{label:e.value,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{slot:"append",placeholder:"请选择"},on:{change:function(a){e.selectChange2(t.row.checked,t.$index)}},slot:"append",model:{value:t.row.checked,callback:function(a){e.$set(t.row,"checked",a)},expression:"scope.row.checked"}},e._l(e.option2,function(e){return a("el-option",{key:e.value,attrs:{label:e.value,value:e.value}})}),1)],1)]}}])})],1),e._v(" "),a("el-table-column",{attrs:{width:"100",label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.info.length>1,expression:"info.length>1"}],attrs:{size:"medium",plain:"",type:"danger",disabled:e.loading},on:{click:function(a){e.del(t.$index)}}},[e._v("删除\n                ")])]}}])})],1)],1),e._v(" "),a("el-card",{staticStyle:{"margin-bottom":"8px"},attrs:{shadow:"hover"}},[a("el-button",{staticStyle:{width:"100%"},attrs:{id:"btn",type:"primary",plain:"",disabled:e.loading},on:{click:function(t){e.isTrue("result")}}},[e._v("生成")])],1)],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"生成结果",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",[a("el-tabs",{attrs:{"tab-position":"left"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"字符串形式",name:"0"}},[a("el-button",{staticStyle:{position:"absolute",right:"0"},attrs:{size:"mini",type:"success"},on:{click:function(t){e.CopyUrl()}}},[e._v("复 制")]),e._v(" "),a("el-input",{staticStyle:{"font-size":"20px","font-family":"-webkit-body"},attrs:{resize:"none",id:"copyObj",type:"textarea",autosize:{minRows:2,maxRows:15}},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"树形式",name:"1"}},[a("div",{staticClass:"div-tree"},[a("span",[e._v("最多显示循环1000次的结果,渲染过多会导致画面掉帧")]),e._v(" "),a("el-input",{attrs:{size:"mini",placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),a("el-tree",{ref:"tree",attrs:{data:e.resultJson,"filter-node-method":e.filterNode}})],1)])],1)],1)])],1)},staticRenderFns:[]};var m,v,y=a("VU/8")(h,f,!1,function(e){a("HOAn")},"data-v-7f2994ac",null).exports,g=a("XLwt"),b=a.n(g),x=a("pFYg"),_=a.n(x);m=this,v=function(e,t){var a;if(!t)return a="ECharts is not Loaded",void("undefined"!=typeof console&&console&&console.error&&console.error(a));var n=["#c12e34","#e6b600","#0098d9","#2b821d","#005eaa","#339ca8","#cda819","#32a487"],i={color:n,title:{textStyle:{fontWeight:"normal"}},visualMap:{color:["#1790cf","#a2d4e6"]},toolbox:{iconStyle:{normal:{borderColor:"#06467c"}}},tooltip:{backgroundColor:"rgba(0,0,0,0.6)"},dataZoom:{dataBackgroundColor:"#dedede",fillerColor:"rgba(154,217,247,0.2)",handleColor:"#005eaa"},timeline:{lineStyle:{color:"#005eaa"},controlStyle:{normal:{color:"#005eaa",borderColor:"#005eaa"}}},candlestick:{itemStyle:{normal:{color:"#c12e34",color0:"#2b821d",lineStyle:{width:1,color:"#c12e34",color0:"#2b821d"}}}},graph:{color:n},map:{label:{normal:{textStyle:{color:"#c12e34"}},emphasis:{textStyle:{color:"#c12e34"}}},itemStyle:{normal:{borderColor:"#eee",areaColor:"#ddd"},emphasis:{areaColor:"#e6b600"}}},gauge:{axisLine:{show:!0,lineStyle:{color:[[.2,"#2b821d"],[.8,"#005eaa"],[1,"#c12e34"]],width:5}},axisTick:{splitNumber:10,length:8,lineStyle:{color:"auto"}},axisLabel:{textStyle:{color:"auto"}},splitLine:{length:12,lineStyle:{color:"auto"}},pointer:{length:"90%",width:3,color:"auto"},title:{textStyle:{color:"#333"}},detail:{textStyle:{color:"auto"}}}};t.registerTheme("shine",i)},"function"==typeof define&&a("nErl")?define(["exports","echarts"],v):"object"===("undefined"==typeof exports?"undefined":_()(exports))&&"string"!=typeof exports.nodeName?v(exports,a("XLwt")):v(0,m.echarts),function(e,t){"function"==typeof define&&a("nErl")?define(["exports","echarts"],t):"object"===("undefined"==typeof exports?"undefined":_()(exports))&&"string"!=typeof exports.nodeName?t(exports,a("XLwt")):t({},e.echarts)}(this,function(e,t){var a;if(!t)return a="ECharts is not Loaded",void("undefined"!=typeof console&&console&&console.error&&console.error(a));var n=["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"],i={color:n,backgroundColor:"#333",tooltip:{axisPointer:{lineStyle:{color:"#eee"},crossStyle:{color:"#eee"}}},legend:{textStyle:{color:"#eee"}},textStyle:{color:"#eee"},title:{textStyle:{color:"#eee"}},toolbox:{iconStyle:{normal:{borderColor:"#eee"}}},dataZoom:{textStyle:{color:"#eee"}},timeline:{lineStyle:{color:"#eee"},itemStyle:{normal:{color:n[1]}},label:{normal:{textStyle:{color:"#eee"}}},controlStyle:{normal:{color:"#eee",borderColor:"#eee"}}},timeAxis:{axisLine:{lineStyle:{color:"#eee"}},axisTick:{lineStyle:{color:"#eee"}},axisLabel:{textStyle:{color:"#eee"}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:"#eee"}}},logAxis:{axisLine:{lineStyle:{color:"#eee"}},axisTick:{lineStyle:{color:"#eee"}},axisLabel:{textStyle:{color:"#eee"}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:"#eee"}}},valueAxis:{axisLine:{lineStyle:{color:"#eee"}},axisTick:{lineStyle:{color:"#eee"}},axisLabel:{textStyle:{color:"#eee"}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:"#eee"}}},categoryAxis:{axisLine:{lineStyle:{color:"#eee"}},axisTick:{lineStyle:{color:"#eee"}},axisLabel:{textStyle:{color:"#eee"}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:"#eee"}}},line:{symbol:"circle"},graph:{color:n},gauge:{title:{textStyle:{color:"#eee"}}},candlestick:{itemStyle:{normal:{color:"#FD1050",color0:"#0CF49B",borderColor:"#FD1050",borderColor0:"#0CF49B"}}}};i.categoryAxis.splitLine.show=!1,t.registerTheme("dark",i)});var w={components:{vEcharts:b.a},data:function(){return{content:"chenli文文  21:58:13\n-------+--------------------+----------------------+\n| id    | incoming_timestamp | disconnect_timestamp |\n+-------+--------------------+----------------------+\n| 64380 | 1550365265         | 1550365296           |\n| 64402 | 1550365334         | 1550365358           |\n| 64428 | 1550365397         | 1550365434           |\n| 64477 | 1550365506         | 1550365559           |\n| 64521 | 1550365613         | 1550365642           |\n| 64549 | 1550365676         | 1550365709           |\n| 64574 | 1550365735         | 1550365779           |\n| 64616 | 1550365811         | 1550365844           |\n| 64649 | 1550365869         | 1550365906           |\n| 64683 | 1550365922         | 1550365974           |\n| 64706 | 1550365980         | 1550366008           |\n| 64739 | 1550366036         | 1550366060           |\n| 64766 | 1550366084         | 1550366126           |\n| 64799 | 1550366140         | 1550366179           |\n| 64834 | 1550366194         | 1550366240           |\n| 64864 | 1550366258         | 1550366288           |\n| 64896 | 1550366312         | 1550366346           |\n| 64927 | 1550366374         | 1550366408           |\n| 64939 | 1550366405         | 1550366453           |\n| 64984 | 1550366496         | 1550366543           |\n| 65022 | 1550366580         | 1550366613           |\n| 65068 | 1550366663         | 1550366706           |\n| 65100 | 1550366739         | 1550366770           |\n| 65126 | 1550366783         | 1550366822           |\n| 65154 | 1550366845         | 1550366887           |\n| 65184 | 1550366924         | 1550366964           |\n| 65225 | 1550367002         | 1550367055           |\n| 65265 | 1550367083         | 1550367129           |\n| 65306 | 1550367150         | 1550367198           |\n| 65337 | 1550367200         | 1550367237           |\n| 65358 | 1550367243         | 1550367291           |\n| 65490 | 1550367454         | 1550367481           |\n| 65516 | 1550367508         | 1550367551           |\n| 65548 | 1550367558         | 1550367607           |\n| 65583 | 1550367629         | 1550367659           |\n| 65619 | 1550367697         | 1550367733           |\n| 65652 | 1550367759         | 1550367781           |\n| 65676 | 1550367794         | 1550367835           |\n| 65704 | 1550367850         | 1550367893           |\n| 65809 | 1550368177         | 1550368195           |\n| 65832 | 1550368212         | 1550368244           |\n| 65854 | 1550368262         | 1550368298           |\n| 65906 | 1550368340         | 1550368367           |\n| 65941 | 1550368405         | 1550368444           |\n| 65968 | 1550368462         | 1550368499           |\n| 66007 | 1550368527         | 1550368575           |\n| 66058 | 1550368612         | 1550368659           |\n| 66085 | 1550368664         | 1550368707           |\n| 66123 | 1550368733         | 1550368824           |\n| 66158 | 1550368831         | 1550368867           |\n| 66181 | 1550368874         | 1550368903           |\n| 66203 | 1550368921         | 1550368948           |\n| 66224 | 1550368966         | 1550368990           |\n| 66242 | 1550369003         | 1550369031           |\n| 66258 | 1550369036         | 1550369059           |\n| 66269 | 1550369046         | 1550369086           |\n| 66288 | 1550369095         | 1550369123           |\n| 66311 | 1550369142         | 1550369179           |\n| 66331 | 1550369179         | 1550369228           |\n| 66357 | 1550369241         | 1550369268           |\n+-------+--------------------+----------------------+\n60 rows in set (0.01 sec)",cloName:[],resultTime:[],echartsOptions1:{},echartsOptions2:{},dialogVisible:!1}},methods:{start:function(){var e=this.content.replace(/\n/g,"").replace(/\s+/g,"").split("|"),t=e[e.length-1].split("+");this.cloName={id:e[1],start:e[2],end:e[3],time:t[t.length-1]};for(var a=[],n=1,i={id:"",start:"",end:"",time:""},l=0;l<e.length;l++)e[l]=+e[l],isNaN(e[l])||0==e[l]||(1==n?(i.id=e[l],n++):2==n?(i.start=e[l],n++):3==n&&(i.end=e[l],a.push(i),i={id:"",start:"",end:"",time:""},n=1));this.resultTime=[],this.resultTime.push(this.cloName),this.chartsName=[],this.chartsData=[];for(var o=0;o<a.length;o++)0!=o?(this.resultTime.push({id:a[o].id,time:a[o].start-a[o-1].end,start:this.sec_to_time(a[o].start),end:this.sec_to_time(a[o].end)}),this.chartsName.push(a[o].id),this.chartsData.push(a[o].start-a[o-1].end)):this.resultTime.push({id:a[o].id,time:"",start:this.sec_to_time(a[o].start),end:this.sec_to_time(a[o].end)});this.getData(this.chartsName,this.chartsData)},getData:function(e,t){var a=this.$echarts.init(document.getElementById("myChart1"),"dark"),n=this.$echarts.init(document.getElementById("myChart2"),"dark");a.setOption({tooltip:{trigger:"axis",position:function(e){return[e[0],"10%"]}},grid:{left:"3%",right:"4%",bottom:"10%",containLabel:!0},title:{left:"center",text:this.cloName.time},toolbox:{feature:{dataZoom:{},saveAsImage:{}}},xAxis:{boundaryGap:!1,data:e},yAxis:{type:"value",boundaryGap:[0,"100%"]},dataZoom:[{type:"slider",filterMode:"filter"},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],series:[{name:"相差",type:"line",smooth:!0,symbol:"none",sampling:"average",itemStyle:{color:"rgb(255, 70, 131)"},data:t}]}),n.setOption({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},title:{left:"center",text:this.cloName.time},dataZoom:[{type:"slider",filterMode:"filter"},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],toolbox:{feature:{dataZoom:{},saveAsImage:{}}},grid:{left:"3%",right:"4%",bottom:"10%",containLabel:!0},xAxis:[{type:"category",data:e,axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"相差",type:"bar",barWidth:"60%",data:t}]}),window.onresize=function(){a.resize(),n.resize()}},sec_to_time:function(e){var t=new Date(1e3*e),a=t.getFullYear(),n=t.getMonth()+1;n=n<10?"0"+n:n;var i=t.getDate();i=i<10?"0"+i:i;var l=t.getHours();l=l<10?"0"+l:l;var o=t.getMinutes(),r=t.getSeconds();return a+"-"+n+"-"+i+" "+l+":"+(o=o<10?"0"+o:o)+":"+(r=r<10?"0"+r:r)},time_to_sec:function(e){var t=e.split(":")[0],a=e.split(":")[1],n=e.split(":")[2];return Number(3600*t)+Number(60*a)+Number(n)}},mounted:function(){}},S={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{width:"calc(100% - 40px)",margin:"0 auto"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("输入时间戳")]),e._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0","font-size":"16px"},attrs:{type:"text"},on:{click:e.start}},[e._v("转换"),a("i",{staticClass:"el-icon-arrow-right"})])],1),e._v(" "),a("el-input",{attrs:{type:"textarea",resize:"none",autosize:{minRows:14,maxRows:14},placeholder:"格式：\n          +-------+--------------------+----------------------+\n          | id    | incoming_timestamp | disconnect_timestamp |\n          +-------+--------------------+----------------------+\n          | 74456 | 1550377311         | 1550377345           |\n          | 76163 | 1550378174         | 1550378217           |\n          +-------+--------------------+----------------------+\n          6 rows in set (0.01 sec)1000"},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("输出结果")])]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.resultTime}},[a("el-table-column",{attrs:{prop:"id",label:"id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"start",label:"开始时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"end",label:"结束时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"time",label:"相差"}})],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("div",{style:{width:"100%",height:"450px"},attrs:{id:"myChart1"}})]),e._v(" "),a("el-col",{attrs:{span:12}},[a("div",{style:{width:"100%",height:"450px"},attrs:{id:"myChart2"}})])],1)],1)},staticRenderFns:[]};var k=a("VU/8")(w,S,!1,function(e){a("ljfX")},null,null).exports;n.default.use(o.a);var C=new o.a({routes:[{path:"/",name:"Main",component:y},{path:"/Main",name:"Main",component:y},{path:"/Time",name:"Time",component:k}]}),N=a("zL8q"),z=a.n(N);a("tvR6");n.default.prototype.$echarts=b.a,n.default.use(z.a),n.default.config.productionTip=!1,new n.default({el:"#app",router:C,components:{App:l},template:"<App/>"})},ljfX:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.ac226563fc8d4408ca32.js.map