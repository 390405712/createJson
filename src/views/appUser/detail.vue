<template>
  <el-card>
    <div slot="header" class="clearfix" style="display: flex;align-items: center;justify-content:space-between">
      <span style="font-size: 20px;font-weight: bold">{{dialogData.address}}</span>
      <div style="float: right; padding: 3px 0">
        <el-button  type="text" @click="$emit('closeDialog')" style="margin-right: 10px">返回</el-button>
        <el-popover
          placement="bottom"
          trigger="manual"
          v-model="visible">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            v-model="selectDateTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-button size="mini" @click="isTrue">确定</el-button>
          <el-button slot="reference" type="primary" @click="seesee(dialogData)">预约看房</el-button>
        </el-popover>
      </div>
    </div>
    <div style="display: flex;align-items: center;justify-content: space-between;">
      <div>
        <el-carousel style="width: 400px;height: 300px">
          <el-carousel-item v-for="item in dialogData.imgUrl" :key="item">
            <img :src="item.url" style="width: 400px;height: 300px;">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="display: flex;flex-direction: column;font-size: 14px;height: 300px;width: 300px;justify-content: space-around;">
          <div style="display: flex;align-items: baseline;">
            <div style="font-size: 36px;color: red;font-weight: bold">{{dialogData.price}}</div>
            <div style="color: red;font-size: 16px">元/月</div>
          </div>
          <div style="display: flex">
            <div style="color: #909399">位置：</div>
            <div>{{dialogData.chinaAreaStr}}</div>
          </div>
          <div style="display: flex">
            <div style="color: #909399">面积：</div>
            <div>{{dialogData.area}}平米</div>
          </div>
          <div style="display: flex">
            <div style="color: #909399">楼层：</div>
            <div>{{dialogData.height}}层（共{{dialogData.maxHeight}}层）</div>
          </div>
          <div style="display: flex">
            <div style="color: #909399">房屋户型：</div>
            <div>{{dialogData.bedRoom}}室1厅 {{dialogData.lease}}</div>
          </div>
          <div style="display: flex">
            <div style="color: #909399">房屋朝向：</div>
            <div>{{dialogData.orientation}}</div>
          </div>
          <div style="display: flex">
            <div style="color: #909399">发布时间：</div>
            <div>{{dialogData.editTime.split(' ')[0]}}</div>
          </div>
          <div>
            <el-tag style="margin:0 3px 3px 0" v-for="items in dialogData.tags" type="warning" size="mini ">{{items}}</el-tag>
          </div>
        </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    data: function () {
      return {
        visible : false,
        selectDateTime:'',
        appointObj:{}
      };
    },
    props: {
      dialogData:{},

    },
    methods:{
      seesee(data){
        let _self = this;
        if(localStorage.getItem('loginObj')){
          let obj = JSON.parse(localStorage.getItem('loginObj'));
          let appointArr = localStorage.getItem('appointData')?JSON.parse(localStorage.getItem('appointData')):[];
          let isPush = true;
          for(let i in appointArr){
            console.log(appointArr[i].phone);
            console.log(obj.phone);
            console.log(appointArr[i].id);
            console.log(data.id);
            if(appointArr[i].phone == obj.phone && appointArr[i].id == data.id){
              isPush = false;
            }
          }
          if(isPush){
            _self.visible = true;
            _self.appointObj ={
              phone:obj.phone,
              id:data.id
            }
          }else{
            _self.$message({
              message: '已经预约过了',
              type: 'warning'
            });
          }

        }else {
          let _self = this;
          _self.$confirm('未登录，请先登录', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            _self.$router.push({
              name: 'appLogin'
            });
          });
        }
      },
      isTrue(){
        let _self = this;
        let appointArr = localStorage.getItem('appointData')?JSON.parse(localStorage.getItem('appointData')):[];
        _self.appointObj.time = _self.selectDateTime;
        _self.appointObj.apppintment = false;
        appointArr.push(_self.appointObj);
        localStorage.setItem('appointData',JSON.stringify(appointArr));
        _self.$message({
          message: '预约成功',
          type: 'success'
        });
        _self.visible = false;
      }
    },
    mounted() {
      let _self = this;

    }
  };
</script>

<style scoped>

</style>
