<style lang='scss' scoped>
@import '@assets/style/_vars';
@import '@assets/style/_mixins';
  .card-box{
    border-bottom:2px solid map-get($colors, "primary");
    background:rgba(255,255,255,.5);
    // border-radius: 15px;
    box-shadow: 0 0 2px 0 #ccc;
    overflow: hidden;
    &:not(:nth-last-child(1)){
      margin-bottom: 30px;
    }
    .card-header{
      overflow: hidden;
      img{
        display: block;
        width: 100%;
        transition: all .3s linear;
        &:hover{
          transform: scale(1.01);
        }
      }
    }
    .card-content{
      @include pd(20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      h3{
        // font-weight: 600;
        @include f-w(600);
        margin-bottom: 10px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        &:hover{
          border-color:map-get($colors, "primary");
        }
      }
      p{
        align-self: flex-start;
        text-align: justify;
        letter-spacing: 1px;
        color: #2c3e50;
      }
    }
    .card-footer{
      padding: 20px;
      padding-top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card-footer-info{
        @include f-sc(12px,#2c3e50);
        span{
          i{
            margin-right: 3px;
          }
          &+span{
            margin-left: 15px;
          }
        }
      }
      .card-footer-read{
        padding: 3px 10px; 
        // width: 80px;
        // @include l-height(25px);
        border:1px solid #2c3e50;
        text-align: center;
        cursor: pointer;
        @include f-sc(14px,#2c3e50);
        &:hover{
          color: map-get($colors, "primary");;
          border-color: map-get($colors, "primary");
        }
      }
    }
  }
@media (max-width: 800px) {
  .card-footer{
    flex-direction: column;
    // align-items: center;
      .card-footer-info{
        align-self: flex-start;
      }
      .card-footer-read{
      margin-top: 20px;
      }
  } 
}
</style>

<template>
  <div class="card-box">
      <div v-if="data.bgUrl" class="card-header">
        <img :src="data.bgUrl" alt="">
      </div>
      <div class="card-content">
        <h3 class="card-content-title" @click="$router.push({name:'client.articleDetail',params:{id:data._id}})">{{data.title}}</h3>
        <p class="card-content-abstract">{{data.abstract | formatAbstract}}</p>
      </div>
      <div class="card-footer">
        <div class="card-footer-info">
          <span><i class="el-icon-time"></i>发表于{{data.datetime | formatTime}}</span> 
          <span><i class="el-icon-edit-outline"></i>{{data.author}}</span>
          <span><i class="el-icon-view"></i>{{data.views}}次浏览</span>
        </div>
        <div class="card-footer-read" @click="$router.push({name:'client.articleDetail',params:{id:data._id}})">阅读全文</div>
      </div>
  </div>
</template>

<script>

export default {
  props:{
   data:{
     type:Object,
     required: true
    }
  },
  data () {
    return {

    }
  },
  created() {
  }
}

</script>