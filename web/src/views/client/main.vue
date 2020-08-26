<style lang="scss" scope>
.main-content {
  &::before {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    position: fixed;
    background: url("https://whatblog.cn/images/1597214364703.jpg") no-repeat
      center/cover;
    z-index: -1;
  }
  .header {
    width: 1000px;
    margin: 0 auto 20px;
    height: 80px;
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
    }
    span {
      font-size: 18px;
      font-weight: bold;
      color: #606975;
      cursor: pointer;
    }
  }
  .content {
    margin: 0 auto;
    width: 1000px;
  }
  .footer {
    padding-top: 30px;
    text-align: center;
    font-size: 14px;
    p {
      margin: 0;
      &:not(:nth-last-child(1)) {
        margin: 0;
        margin-bottom: 5px;
        color: #606975;
        letter-spacing: 2px;
        &.say-hello {
          font-size: 12px;
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .main-content {
    padding: 0 20px;
    .content,
    .header {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="main-content">
    <header class="header">
      <!-- <span @click="$router.push({name:'main.articleList'})">WHATBLOG</span> -->
      <img @click="$router.push({name:'main.articleList'})"
           src="~@assets/images/whatblog.png"
           alt="">
    </header>
    <router-view class="content"></router-view>
    <footer class="footer">
      <p class="say-hello">不必仰望别人,自己亦是风景</p>
      <p>博客已艰难运行{{runTm}}</p>
      <p>© {{nowYear}} WHATBLOG.CN <a href="http://www.beian.miit.gov.cn/">鄂ICP备18013666号-2</a></p>
    </footer>
  </div>
</template>

<script>

import { runTime } from '@assets/utils/tool'

export default {
  name: "Home",
  components: {
  },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  },
  data () {
    return {
      runTm: null,
    }
  },
  created () {
    setInterval(() => { this.runTm = runTime("2020-08-08 00:00:00") }, 1000);
  }
}
</script>
