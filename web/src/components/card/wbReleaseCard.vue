<style lang="scss" scoped>
.release-card-container {
  & > div + div {
    margin-top: 10px;
  }
  .comment-info {
    .el-form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      .el-form-item {
        margin: 0;
        &.row {
          grid-column-start: 1;
          grid-column-end: 4;
        }
      }
    }
  }
  .comment-ctrl {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<template>
  <!-- 发表评论 -->
  <div class="release-card-container">
    <div class="comment-info">
      <el-form ref="form" :rules="rules" :model="commentForm">
        <el-form-item prop="nickName">
          <el-input
            v-model="commentForm.nickName"
            size="small"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="commentForm.email"
            size="small"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="site">
          <el-input
            v-model="commentForm.site"
            size="small"
            placeholder="网址"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content" class="row">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="说点什么吧..."
            v-model="commentForm.content"
            size="small"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="comment-ctrl">
      <el-button plain size="small" @click="handleSubmit">提交评论</el-button>
    </div>
  </div>
</template>

<script>
import { addComment } from '@service/front/article/article'
export default {
  props: ['id'],
  data() {
    return {
      commentForm: {
        articleId: this.id,
      },
      rules: {
        nickName: [{ required: true, message: '请填写昵称', trigger: 'blur' }],
        email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
        content: [
          { required: true, message: '请填写评论内容', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addComment(this.commentForm).then((res) => {
            this.$notify({
              title: res.data.code === 0 ? '发表成功' : res.data.msg,
              type: res.data.code === 0 ? 'success' : 'error',
              position: 'bottom-right',
            })
            // 重置表单，刷新评论
            if (res.data.code === 0) {
              this.$refs['form'].resetFields()
              this.$emit('trigger-update')
            }
          })
        }
      })
    },
  },
}
</script>
