<template>
  <div>
    <el-card>
      <el-button @click="dialogAdd = true">添加</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="姓名" prop="name"/>
        <el-table-column label="手机" prop="phone"/>
        <el-table-column label="创建时间" prop="createdAt"/>
        <el-table-column label="最后修改时间" prop="updatedAt"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="find(scope.$index, scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.$index,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加"
      :visible.sync="dialogAdd"
      @closed="resetForm('addForm')"
      width="30%">
      <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="50px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input type="text" v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add()">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync="dialogEdit"
      @closed="resetForm('editForm')"
      width="30%">
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="50px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input type="text" v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update()">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import service from './../services/service';
  export default {
    name: "koa2",
    data() {
      return {
        tableData:[],
        addForm:{},
        editForm:{},
        dialogAdd:false,
        dialogEdit:false,
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
        }
      }
    },
    watch: {},
    mounted() {
      let _self = this;
      _self.query();
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      query(){
        let _self = this;
        service.query().then(function (res) {
          if(res.status == 200){
            _self.tableData = res.data;
          }
        })
      },
      find(index,id){
        let _self = this;
        service.find(id).then(function (res) {
          if(res.status == 200){
            _self.editForm = res.data;
            _self.dialogEdit = true;
          }
        })
      },
      add(){
        let _self = this;
        service.add(_self.addForm).then(function (res) {
          if(res.status == 200){
            _self.dialogAdd = false;
            _self.$message({
              message: '添加成功',
              type: 'success'
            });
            _self.query();
          }
        })
      },
      update(){
        let _self = this;
        service.update(_self.editForm).then(function (res) {
          if(res.status == 200){
            _self.dialogEdit = false;
            _self.$message({
              message: '修改成功',
              type: 'success'
            });
            _self.query();
          }
        })
      },
      del(index,id){
        let _self = this;
        service.del({id:id}).then(function (res) {
          if(res.status == 200){
            _self.$message({
              message: '删除成功',
              type: 'success'
            });
            _self.tableData.splice(index,1);
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
