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
import { addArticle } from '@service/admin/article/article';
export default {
  data () {
    return {
      editor: null,
      formData: {
        title: '',
        abstract: '',
        content: '',
        isDel: 0
      }
    }
  },
  mounted () {
    this.setEditor();
  },
  methods: {
    submitArticle () {
      addArticle(this.formData).then(res => {
        console.log(res);
      })
    },
    setEditor () {
      this.editor = new E(this.$refs.editBox);
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
      this.editor.customConfig.onchange = (html) => {
        this.formData.content = html;
        console.log(this.formData);
      }
      this.editor.create();
    }
  },
}

</script>