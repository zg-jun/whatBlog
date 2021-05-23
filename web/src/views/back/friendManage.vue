<style lang="scss" scoped>
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
</style>

<template>
  <div class="friend-manage-container">
    <div class="container-t">
      <div class="container-t-l">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input size="small" v-model="formInline.name" placeholder="请填写名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="container-t-r">
        <el-button size="small" type="primary" @click="friendDialogVisible = true">添加</el-button>
      </div>
    </div>
    <div class="container-b">
      <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="url" label="网址" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像"> 
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" fit="fill" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="datetime" label="发布日期">
        <template slot-scope="scope">
          <span>{{ scope.row.datetime | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)"
                >编辑</el-button
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
    :title="formData._id?'编辑友链':'添加友链'"
    :visible.sync="friendDialogVisible"
    width="500px">
    <!-- 表单部分 -->
    <el-form ref="form"
             :model="formData"
             :rules="rules"
             label-position="top"
             label-width="80px"
             size="mini">
      <el-form-item label="名称" 
                    prop="name">
        <el-input v-model="formData.name" placeholder="请填写名称"></el-input>
      </el-form-item>
      <el-form-item label="链接"
                    prop="url">
        <el-input v-model="formData.url" placeholder="https://"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          action="/api/uploadFile"
          :headers="uploadHeaders"
          accept=".jpg,.jpeg,.png"
          :limit="1"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
import {
  getFriends,
  addFriends,
  editFriends,
  delFriends
} from '@service/back/friend/friend'

export default {
  filters: {},
  data() {
    return {
      uploadHeaders:{Authorization:'Bearer ' + sessionStorage.token},
      tableData: [],
      formInline:{},
      dialogVisible:false,
      formData:{},
      fileList:[],
      dialogImageUrl:'',
      friendDialogVisible:false,
      rules:{
        name: [
            { required: true, message: '请填写账号', trigger: 'change' }
          ],
            url: [
            { required: true, message: '请填写链接', trigger: 'change' }
          ],
          avatar: [
            { required: true, message: '请上传头像', trigger: 'change' }
          ]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleRemove() {
      this.formData.avatar = '';
      },
    handleSuccess(res){
      this.formData.avatar = res.url;
    },
     beforeUpload(file){
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning('上传图片不能超过2MB');
        return false;
      } 
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    serializeForm(form){
      let data = {};
      for(let key in form){
        form[key] && (data[key] = form[key])
      }
      return data;
    },
    getList() {
      let options = this.serializeForm(this.formInline);
      getFriends(options).then((res) => {
        this.tableData = res.data.data
      })
    },
    handleClose(){
      this.friendDialogVisible = false;
    },
    handleSubmit(){
        this.$refs['form'].validate((valid) => {
         if (valid) {
           let friendAction = this.formData._id?editFriends(this.formData):addFriends(this.formData);
           friendAction.then(res => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg
            });
            this.friendDialogVisible = false;
            this.getList();
          })
         }
       });
    },
    handleEdit(row) {
      this.friendDialogVisible = true;
      let data = JSON.parse(JSON.stringify(row));//深拷贝
      data.avatar && (this.fileList = [{ url:data.avatar }]);// 上传回显
      this.formData = data;
    },
    handleDel({ _id }) {
      this.$confirm('确认删除？删除后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delFriends({ _id }).then((res) => {
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
  },
  watch:{
    friendDialogVisible(val){
      if(!val){
        this.$refs.form.resetFields();
      }
    }
  }
}
</script>
