<style lang='scss' scoped>
.admin-content {
  .login-box {
    width: 400px;
    height: 414px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .title {
      margin: 0;
      padding: 0;
      margin-bottom: 50px;
      color: #606975;
      text-align: center;
    }
  }
  /deep/ .el-form-item {
    &:not(:nth-last-child(1)) {
      margin-bottom: 50px;
    }
    .el-form-item__label {
      padding: 0;
      line-height: normal;
      color: #606975;
    }
    /deep/ .el-input__inner {
      border: none;
      border-bottom: 1px solid #dcdfe6;
      border-radius: 0;
      padding: 0;
      transition: all 0.1s linear;
      &:focus {
        border-color: #606975;
      }
    }
    .el-button {
      width: 100%;
      transition: all 0.1s linear;
      color: #606975;
      &:hover {
        color: #fff;
        border-color: #606975;
        background-color: #606975;
      }
      &:focus {
        color: #fff;
        border-color: #606975;
        background-color: #606975;
      }
    }
  }
}
</style>

<template>
  <div class="admin-content">
    <div class="login-box">
      <h3 class="title">WHATBLOG</h3>
      <el-form :label-position="labelPosition"
               label-width="80px"
               :model="formData">
        <el-form-item label="账号">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button round
                     @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '@service/admin/adminLogin/adminLogin';
export default {
  data () {
    return {
      labelPosition: 'top',
      formData: {}
    }
  },
  methods: {
    login () {
      adminLogin(this.formData).then(res => {
        if (res.data.code !== 0) return this.$message({
          message: res.data.msg,
          type: 'error'
        });
      })
    }
  },
}

</script>