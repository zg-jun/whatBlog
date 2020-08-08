<style lang="scss" scope>
.content {
  .header {
    padding: 0 20px;
    line-height: 50px;
    // border-bottom: 1px solid #ccc;
    span {
      font-size: 18px;
      font-weight: bold;
      color: #606975;
      cursor: pointer;
    }
  }
  .main-box {
    display: flex;
  }

  .footer {
    // width: 100%;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    text-align: center;
    font-size: 14px;
    padding: 0;
    p {
      margin: 0;
      margin-bottom: 5px;
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
      <span @click="$router.push({name:'main.index'})">WHATBLOG</span>
    </header>
    <div class="main-box">
      <navbar></navbar>
      <router-view></router-view>
    </div>
    <footer class="footer">
      <p class="say-hello">不要什么都没有，却想要所有❤</p>
      <p>© {{nowYear}} WhatBlog.cn <a href="http://www.beian.miit.gov.cn/">鄂ICP备18013666号-2</a></p>
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
  data () {
    return {

    }
  },
};
</script>
