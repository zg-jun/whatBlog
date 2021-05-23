<style lang='scss' scoped>
@import '@assets/style/_vars';
@import '@assets/style/_mixins';
.wb-header-container{
  // padding: 20px 20px 0;
  height: 50px;
  // height: 30vh;
  display: flex;
  align-items: center;
  // box-shadow: 0 0 3px 0 map-get($colors, "primary");
  // background: #e5f3f3;
  .logo{
    display: inline-block;
    background: url('~@assets/images/icon.svg') no-repeat 0 -4px;
    width: 137px;
    height: 20px;
    cursor: pointer;
  }
}
</style>

<template>
<div class="wb-header-container">
    <i class="logo" @click="toIndex"></i>
</div>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
    methods: {
      toIndex(){
        this.$route.name === 'articleList' ? window.location.reload() : this.$router.push({name:'articleList'})
      }
    },
  }

</script>