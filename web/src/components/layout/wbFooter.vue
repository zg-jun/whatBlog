<style lang='scss' scoped>
.wb-footer-container {
  // background: #fff;
    padding:0 0 10px;
    // height: 100px;
    text-align: center;
    font-size: 14px;
    p {
      margin: 0;
      &:not(:nth-last-child(1)) {
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
</style>

<template>
<div class="wb-footer-container">
      <p>博客已艰难运行{{runTm}}</p>
      <p class="href-info">© {{nowYear}} WHATBLOG.CN V3.0
        <a href="http://www.beian.miit.gov.cn/">鄂ICP备18013666号-2</a>
      </p>
</div>
</template>

<script>

  export default {
    data () {
      return {
        runTm: null,
      }
    },
    computed:{
      nowYear () {
        return new Date().getFullYear()
      }
    },
    created () {
      setInterval(() => { this.runTm = this._Tool.getRunTime("2020-08-08 00:00:00") }, 1000);
    }
  }
</script>