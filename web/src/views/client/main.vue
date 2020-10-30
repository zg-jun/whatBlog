<style lang="scss" scope>
.main-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  &::before {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.05;
    position: fixed;
    background: url("https://whatblog.cn/images/1597214364703.jpg") no-repeat
      center/cover;
    z-index: -1;
  }
  .header {
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
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
    flex: 1;
    margin: 60px auto;
    width: 1000px;
  }
  .footer {
    padding-bottom: 10px;
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
      &.href-info {
        a {
          margin: 0 5px;
        }
      }
    }
  }
  .to-top {
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 50px;
    right: -50px;
    border-radius: 50%;
    background: rgba(0, 186, 186, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    transition: all 0.5s linear;
    &.show {
      transform: translateX(-100px) rotate(-360deg);
    }
    span {
      font-size: 12px;
    }
    .el-icon-arrow-up {
      font-size: 18px;
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
      <p class="say-hello">不必仰望别人,自己亦是风景🤞</p>
      <p>博客已艰难运行{{runTm}}</p>
      <p class="href-info">© {{nowYear}} WHATBLOG.CN
        <a href="http://www.beian.miit.gov.cn/">鄂ICP备18013666号-2</a>
        <a href="javascript:;"
           @click="$router.push({name:'main.friendshipChainList'})">小伙伴</a>
        <a href="https://github.com/zg-jun"
           target="_blank">GitHub</a>
        <a href="https://blog.csdn.net/qq_38944959"
           target="_blank">CSDN</a>
      </p>
    </footer>
    <!-- 返回顶部 -->
    <div :class="['to-top',{'show':isShowTop}]"
         @click="toTop">
      <i class="el-icon-arrow-up"></i>
      <span>TOP</span>
    </div>
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
      isShowTop: false
    }
  },
  methods: {
    toTop () {
      // 回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  mounted () {
    document.addEventListener('scroll', () => {
      let topPx = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShowTop = topPx > 100;
    })
  },
  created () {
    setInterval(() => { this.runTm = runTime("2020-08-08 00:00:00") }, 1000);
  }
}
</script>
