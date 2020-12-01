<style lang="scss" scope>
.content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .header {
    padding:0 20px;
    line-height: 50px;
    // border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    span {
      &.title{
        font-size: 18px;
        font-weight: bold;
        color: #606975;
        cursor: pointer;
      }
    }
  }
  .main-box {
    display: flex;
    flex: 1;
    .main-view{
      flex: 1;
      padding: 0 20px;
    }
  }
  .footer {
    text-align: center;
    font-size: 14px;
    padding-bottom: 10px;
    // margin-top: 20px;
    p {
      margin: 0;
      &.say-hello {
        font-size: 12px;
      }
      a {
        text-decoration: none;
        color: #606975;
        cursor: pointer;
        border-bottom: 1px solid #606975;
        &:hover {
          background: #606975;
          color: #fff;
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <header class="header">
      <span class="title">WHATBLOG</span>
      <el-dropdown @command="handleDropdown">
        <span class="el-dropdown-link">
          {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <div class="main-box">
      <navbar></navbar>
      <router-view class="main-view"></router-view>
    </div>
    <footer class="footer">
      <p>© {{nowYear}} WHATBLOG.CN <a href="http://www.beian.miit.gov.cn/">鄂ICP备18013666号-2</a></p>
    </footer>
  </div>
</template>

<script>

import navbar from '@components/navbar/navbar';

export default {
  name: "Home",
  components: {
    navbar
  },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.userInfo);
  },
  methods: {
    handleDropdown(name){
      if(name === 'exit'){
        sessionStorage.clear();
        this.$router.push({ name: 'admin.login' });
      }
    }
  },
  data () {
    return {

    }
  },
};
</script>
