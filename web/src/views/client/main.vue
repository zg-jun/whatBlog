<style lang="scss" scope>
.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  // background: #000;
  position: relative;
  &::before {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    position: fixed;
    // background: url("https://diygod.me/images/ac0.webp") no-repeat
    //   center/cover;
    z-index: -1;
  }
  .header {
    width: 1150px;
    margin: 0 auto;
    padding-top:20px;
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
    width: 1150px;
    // background: yellow;
    display: flex;
  }
  .content-l {
    flex: 2;
  }
   .content-r {
    flex: 1;
    margin-left: 50px;
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
    // 移动端点击带轮廓
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select:none;
    &.show {
      box-shadow: 0 0px 5px 0px #ccc;
      transform: translateX(-100px) rotate(-360deg);
    }
    span {
      font-size: 12px;
    }
    .el-icon-arrow-up {
      font-size: 18px;
    }
  }
  .lyric-txt{
    width: 100%;
    position: fixed;
    bottom: 15px;
    left: 0;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-weight: bold;
    text-shadow: 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba,
                 0px 0px 3px #00baba;
    letter-spacing: .5em;
    pointer-events: none;
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
@media (max-width: 800px) {
  .content{
    flex-direction: column;
    .content-r{
      margin-top: 30px;
      margin-left: 0;
    }
  }
}
</style>

<template>
  <div class="main-content">
    <header class="header">
      <!-- <span @click="$router.push({name:'client.articleList'})">WHATBLOG</span> -->
      <img @click="$router.push({name:'client.articleList'})"
           src="~@assets/images/whatblog.png"
           alt="">
    </header>
    <div class="content">
      <router-view class="content-l"></router-view>
      <div class="content-r">
        <sidebar @toogleLyric="toogleLyric" @updateLyric="updateLyric"></sidebar>
      </div>
    </div>
    <footer class="footer">
      <p>风轻云淡，一笑而过(ง •_•)ง博客已艰难运行{{runTm}}</p>
      <p class="href-info">© {{nowYear}} WHATBLOG.CN V2.0
        <a href="http://www.beian.miit.gov.cn/">鄂ICP备18013666号-2</a>
        <a href="javascript:;"
           @click="$router.push({name:'client.friendsList'})">小伙伴</a>
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
    <!-- 歌词 -->
    <div v-if="isShowLyric" class="lyric-txt">{{lyricTxt}}</div>
  </div>
</template>

<script>
import sidebar from '@components/sidebar/sidebar';
export default {
  name: "Home",
  components: {
    sidebar
  },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  },
  data () {
    return {
      runTm: null,
      isShowTop: false,
      isShowLyric:true,
      lyricTxt:''
    }
  },
  methods: {
    toTop () {
      // 回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    toogleLyric(){
      this.isShowLyric = !this.isShowLyric;
    },
    updateLyric(val){
      this.lyricTxt = val;
      document.title = val;
    }
  },
  mounted () {
    document.addEventListener('scroll', () => {
      let topPx = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShowTop = topPx > 100;
    })
  },
  created () {
    setInterval(() => { this.runTm = this._Tool.getRunTime("2020-08-08 00:00:00") }, 1000);
  }
}
</script>
