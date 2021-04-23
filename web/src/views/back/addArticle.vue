<style lang='scss' scoped>
</style>

<template>
  <div class="add_article-content">
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
      <el-form-item label="文章背景图">
        <el-upload
          action="/backapi/uploadFile"
          :headers="uploadHeaders"
          accept=".jpg,.jpeg,.png"
          :limit="1"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-radio-group v-model="formData.isDel"
                        size="medium">
          <el-radio border
                    :label="0">公开</el-radio>
          <el-radio border
                    :label="1">私密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章内容">
        <div ref="editBox"></div>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary"
                   @click="submitArticle">发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from 'wangeditor';
import { addArticle, editArticle } from '@service/back/article/article';
import { getArticleDetail } from '@service/front/article/article';
export default {
  props: ['id'],
  data () {
    return {
      uploadHeaders:{Authorization:'Bearer ' + sessionStorage.token},
      dialogImageUrl: '',
      dialogVisible: false,
      editor: null,
      formData: {
        title: '',
        abstract: '',
        author: '',
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
          ]
       }
    }
  },
  mounted () {
    this.setEditor();
  },
  created () {
    if (this.$route.params.id) this.getDetail(this.$route.params.id);
  },
  methods: {
    beforeUpload(file){
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) return this.$message.warning('上传图片不能超过2MB');
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
    getDetail (_id) {
      getArticleDetail({ _id }).then(res => {
        let { title, abstract, author, content, isDel } = res.data.data;
        this.formData.title = title;
        this.formData.abstract = abstract;
        this.formData.author = author;
        this.formData.content = content;
        this.formData.isDel = isDel;
        // 富文本编辑器回显
        this.editor.txt.html(content);
      })
    },
    submitArticle () {
       this.$refs['form'].validate((valid) => {
         if (valid) {
           this.$route.params.id && editArticle({ _id: this.$route.params.id, data: this.formData }).then(res => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg
            });
            this.$refs['form'].resetFields();
            this.$router.push({name:'articlesManage'});
          })
          !this.$route.params.id && addArticle(this.formData).then(res => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg
            });
            this.$refs['form'].resetFields();
            this.$router.push({name:'articlesManage'});
          })
         }
       });
    },
    setEditor () {
      this.editor = new E(this.$refs.editBox);
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = '/backapi/uploadFile'// 配置服务器端地址
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
    }
  },
}

</script>