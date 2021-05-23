<style lang="scss" scoped>
.article-manage-container {
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
  <div class="article-manage-container">
    <div class="container-t">
      <div class="container-t-l">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input size="small" v-model="formInline.title" placeholder="请填写标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="container-t-r">
        <el-button size="small" type="primary" @click="articleDialogVisible = true">发布文章</el-button>
      </div>
    </div>
    <div class="container-b">
       <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="abstract" label="摘要" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <!-- <el-table-column prop="classifyId" label="标签"> 
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.classifyId" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="isDel" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDel === 0 ? 'success' : 'warning'">{{
            scope.row.isDel === 0 ? '公开' : '私密'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="datetime" label="发布日期">
        <template slot-scope="scope">
          <span>{{ scope.row.datetime | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.isDel === 0"
            size="mini"
            type="warning"
            @click="handleArticleStatus(scope.row,1)"
            >私密</el-button
          >
          <el-button
            v-else
            size="mini"
            type="success"
            @click="handleArticleStatus(scope.row,0)"
            >公开</el-button
          >
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
       </el-table>
    </div>

    <!-- 发布/编辑文章 -->
    <el-dialog
    :title="formData._id?'编辑文章':'发布文章'"
    :visible.sync="articleDialogVisible"
    width="800px">
    <!-- 表单部分 -->
    <el-form ref="form"
             :model="formData"
             :rules="rules"
             label-position="top"
             label-width="80px"
             size="mini">
      <el-form-item label="文章标题" 
                    prop="title">
        <el-input v-model="formData.title" placeholder="请填写文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要"
                    prop="abstract">
        <el-input type="textarea"
                  v-model="formData.abstract" placeholder="请填写文章摘要"></el-input>
      </el-form-item>
      <el-form-item label="文章作者"
                    prop="author">
        <el-input v-model="formData.author" placeholder="请填写文章作者"></el-input>
      </el-form-item>
      <el-form-item label="文章标签"
                    prop="classifyId">
            <el-checkbox-group v-model="formData.classifyId">
              <el-checkbox-button v-for="item in tagList" :label="item._id" :key="item._id">{{item.classifyName}}</el-checkbox-button>
            </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文章背景图">
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
      <el-form-item label="文章状态" prop="isDel">
        <el-radio-group v-model="formData.isDel"
                        size="small">
          <el-radio border
                    :label="0">公开</el-radio>
          <el-radio border
                    :label="1">私密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="wangeditor" ref="editBox"></div>
      </el-form-item>
      <!-- <el-form-item size="large">
        <el-button type="primary"
                   @click="handleSubmit">发布文章</el-button>
      </el-form-item> -->
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
  getAllArticle,
  delArticle,
  addArticle, 
  editArticle,
  getClassify
} from '@service/back/article/article'
import E from 'wangeditor';

export default {
  filters: {},
  data() {
    return {
      tableData: [],
      formInline:{},
      articleDialogVisible:false,
      tagList:[],
      fileList:[],
      uploadHeaders:{Authorization:'Bearer ' + sessionStorage.token},
      dialogImageUrl: '',
      dialogVisible: false,
      editor: null,
      formData: {
        title: '',
        abstract: '',
        author: '',
        classifyId:[],
        bgUrl:'',
        content: '',
        isDel: 0
      },
      rules: {
          title: [
            { required: true, message: '请填写文章标题', trigger: 'change' }
          ],
          abstract: [
            { required: true, message: '请填写文章摘要', trigger: 'change' }
          ],
          author: [
            { required: true, message: '请填写文章作者', trigger: 'change' }
          ],
          classifyId: [
            { required: true, message: '请选择文章标签', trigger: 'change' }
          ],
          isDel: [
            { required: true, message: '请选择文章状态', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请填写文章内容', trigger: 'change' }
          ],
       }
    }
  },
  created() {
    this.getTagList();

    this.getList();
  },
  methods: {
    handleClose(){
      this.articleDialogVisible = false;
    },
    getTagList(){
      getClassify().then(res=>{
        this.tagList = res.data.data;
      })
    },
    beforeUpload(file){
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning('上传图片不能超过2MB');
        return false;
      } 
    },
    handleSuccess(res){
      this.formData.bgUrl = res.url;
    },
     handleRemove() {
        // console.log(file, fileList);
      this.formData.bgUrl = '';
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    handleSubmit () {
       this.$refs['form'].validate((valid) => {
         if (valid) {
           let articleAction = this.formData._id?editArticle(this.formData):addArticle(this.formData);
           articleAction.then(res => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg
            });
            this.articleDialogVisible = false;
            this.getList();
          })
         }
       });
    },
    setEditor () {
      this.editor = new E(this.$refs.editBox);
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = '/api/uploadFile'// 配置服务器端地址
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 1 // 限制一次上传数量
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      // 配置请求头
      this.editor.customConfig.uploadImgHeaders = {
          Authorization : 'Bearer ' + sessionStorage.token
      }
      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ];
      this.editor.customConfig.uploadImgHooks = {
        fail: () => {
          // 插入图片失败回调
        },
        success: () => {
          // 图片上传成功回调
        },
        timeout: () => {
          // 网络超时的回调
        },
        error: () => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result) => {
          // 图片上传成功，插入图片的回调
          let url = result.url;
          insertImg(url)
        }
      }
      this.editor.customConfig.onchange = (html) => {
        this.formData.content = html;
      }
      this.editor.create();
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
      getAllArticle(options).then((res) => {
        this.tableData = res.data.data
      })
    },
    handleEdit(row) {
      this.articleDialogVisible = true;
      let data = JSON.parse(JSON.stringify(row));//深拷贝
      data.bgUrl && (this.fileList = [{ url:data.bgUrl }]);// 上传回显
      this.formData = data;
    },
    handleArticleStatus(row,status) {
      row.isDel = status;//修改状态
      editArticle(row).then((res) => {
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
          delArticle({ _id }).then((res) => {
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
    }
  },
  watch:{
    articleDialogVisible(val){
      if(val){
        this.$nextTick(()=>{
          this.setEditor();
          // 富文本编辑器回显
          this.formData._id && this.editor.txt.html(this.formData.content);
        })
      }else{
        this.$refs.form.resetFields();
        this.fileList = [];
        this.$refs.editBox.innerHTML = '';
        this.editor = null;
      }
    }
  }
}
</script>
