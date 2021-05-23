<style lang="scss" scoped>
.admin-manage-container {
   .container-t{
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
   .container-t-l{
     ::v-deep .el-form{
      .el-form-item{
        margin-bottom: 0;
      }
    }
   }
  }
    ::v-deep .el-dialog{
    .el-dialog__body{
        padding:0 20px;
        .el-form-item{
          &:nth-last-child(1){
            margin: 0;
          }
          .wangeditor{
            .w-e-text{
              overflow: auto;
            }
          }
        }
    }
  }
}
</style>

<template>
  <div class="admin-manage-container">
    <div class="container-t">
          <div class="container-t-l">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input size="small" v-model="formInline.username" placeholder="请填写账号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="getList">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="container-t-r">
            <el-button size="small" type="primary" @click="adminDialogVisible = true">添加</el-button>
          </div>
        </div>
    <div class="container-b">
      <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="username" label="账号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isDel" label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isDel === 0 ? 'success' : 'danger'">{{
                scope.row.isDel === 0 ? '启用' : '禁用'
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="datetime" label="注册时间">
            <template slot-scope="scope">
              <span>{{ scope.row.datetime | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                :type="scope.row.isDel?'success':'warning'"
                @click="handleEditStatus(scope.row,scope.row.isDel)"
                >{{scope.row.isDel?'启用':'禁用'}}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
    </div>
     <!-- 添加管理 -->
    <el-dialog
    :title="formData._id?'编辑管理员':'添加管理员'"
    :visible.sync="adminDialogVisible"
    width="500px">
    <!-- 表单部分 -->
    <el-form ref="form"
             :model="formData"
             :rules="rules"
             label-position="top"
             label-width="80px"
             size="mini">
      <el-form-item label="账号" 
                    prop="username">
        <el-input v-model="formData.username" placeholder="请填写账户"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="formData.password" placeholder="请填写密码"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="isDel">
        <el-radio-group v-model="formData.isDel"
                        size="small">
          <el-radio border
                    :label="0">启用</el-radio>
          <el-radio border
                    :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import { getAdminUser,addAdminUser,editAdminUser,delAdminUser } from '@service/back/auth/auth'

export default {
  filters: {},
  data() {
    return {
      tableData: [],
      rules:{
          username: [
            { required: true, message: '请填写账号', trigger: 'change' }
          ],
            password: [
            { required: true, message: '请填写密码', trigger: 'change' }
          ],
      },
      formInline:{},
      adminDialogVisible:false,
      formData:{
        isDel:0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
     serializeForm(form){
      let data = {};
      for(let key in form){
        form[key] && (data[key] = form[key])
      }
      return data;
    },
    handleEdit(row){
      this.adminDialogVisible = true;
      let data = JSON.parse(JSON.stringify(row));//深拷贝
      this.formData = data;
    },
    getList() {
      let options = this.serializeForm(this.formInline);
      getAdminUser(options).then((res) => {
        this.tableData = res.data.data
      })
    },
    handleClose(){
      this.adminDialogVisible = false;
    },
    handleEditStatus(row,status) {
      row.isDel = status===1 ? 0 : 1;//修改状态
      editAdminUser(row).then((res) => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg,
        })
        this.getList()
      })
    },
    handleDel({ _id }) {
      this.$confirm('确认删除？删除后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delAdminUser({ _id }).then((res) => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg,
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作',
          })
        })
    },
    handleSubmit(){
      this.$refs['form'].validate((valid) => {
         if (valid) {
           let adminAction = this.formData._id?editAdminUser(this.formData):addAdminUser(this.formData);
           adminAction.then(res => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg
            });
            this.adminDialogVisible = false;
            this.getList();
          })
         }
       });
    }
  },
  watch:{
    adminDialogVisible(val){
      if(!val){
        this.$refs.form.resetFields();
      }
    }
  }
}
</script>
