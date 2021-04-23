<style lang='scss' scoped>
.info-card-container{
  // box-shadow: 0 0 1px 0 #aeaeae;
  // background: #fff;
  padding: 20px 0;
  // margin-bottom: 20px;
.card-header{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .head{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .title{
    padding: 5px 0;
  }
}
}
</style>

<template>
<div class="info-card-container">
    <div class="card-header">
      <img class="head" src="http://thirdqq.qlogo.cn/g?b=sdk&k=NV2oxtBaaKs7ktwuIiaV7Ew&s=140&t=1598286757" alt="">
      <h3 class="title">J.</h3>
    </div>
    <div class="card-footer">
      
    </div>
</div>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
  }

</script>