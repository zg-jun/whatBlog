<style lang='scss' scoped>
</style>

<template>
  <div class="content">
    <el-form ref="form"
             :model="formData"
             label-position="top"
             label-width="80px"
             size="mini">
      <el-form-item label="标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea"
                  v-model="formData.abstract"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-radio-group v-model="formData.isDel"
                        size="medium">
          <el-radio border
                    :label="0">是</el-radio>
          <el-radio border
                    :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <div ref="editBox"></div>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary"
                   @click="submitArticle">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from 'wangeditor';
import { addArticle, editArticle } from '@service/admin/article/article';
import { getArticleDetail } from '@service/client/index/index';
export default {
  props: ['id'],
  data () {
    return {
      editor: null,
      formData: {
        title: '',
        abstract: '',
        author: '',
        content: '',
        isDel: 0
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
      this.$route.params.id && editArticle({ _id: this.$route.params.id, data: this.formData }).then(res => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg
        });
      })
      !this.$route.params.id && addArticle(this.formData).then(res => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg
        });
      })
    },
    setEditor () {
      this.editor = new E(this.$refs.editBox);
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = '/backApi/uploadFile'// 配置服务器端地址
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 1 // 限制一次上传数量
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
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