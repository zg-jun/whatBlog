<style lang="scss" scope>

.wb-container {
    width: 1200px;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  .wb-body-container{
    flex:1;
    padding: 50px 0;
    display: flex;
    .wb-body-container-l{
      flex:2;
      margin-right: 50px;
    }
    .wb-body-container-r{
      flex:1;
      overflow: hidden;
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
  .wb-container {
    width: 1000px;
  }
}
@media (max-width: 800px) {
.wb-container {
  width: 100%;
  padding: 0 20px;
  .wb-body-container{
    flex-direction: column;
    .wb-body-container-l{
      margin:0 0 50px;
    }
  }
}
}
</style>

<template>
  <div class="wb-container">
    <!-- 头部组件 -->
    <wb-header></wb-header>
    <!-- 主体内容 -->
    <div class="wb-body-container">
      <div class="wb-body-container-l">
        <router-view ref="routerView"></router-view>
      </div>
      <div class="wb-body-container-r">
        <wb-sidebar @toogleLyric="toogleLyric" @updateLyric="updateLyric" @handlerSearch="handlerSearch"></wb-sidebar>
      </div>
    </div>
    <!-- 底部组件 -->
    <wb-footer></wb-footer>
    <!-- 返回顶部 -->
    <!-- <div :class="['to-top',{'show':isShowTop}]"
         @click="toTop">
      <i class="el-icon-arrow-up"></i>
      <span>TOP</span>
    </div> -->
    <!-- 歌词 -->
    <!-- <div v-if="isShowLyric" class="lyric-txt">{{lyricTxt}}</div> -->
  </div>
</template>

<script>

export default {
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  },
  data () {
    return {
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
    },
    handlerSearch(keyWord){
      this.$refs.routerView.getList(keyWord);
    }
  },
  mounted () {
    document.addEventListener('scroll', () => {
      let topPx = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShowTop = topPx > 100;
    })
  },
  
}
</script>
