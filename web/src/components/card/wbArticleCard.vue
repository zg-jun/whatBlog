<style lang="scss" scoped>
@import '@assets/style/_vars';
@import '@assets/style/_mixins';
.article-card-container {
  // padding:20px 0;
  // border-bottom: 1px dashed #aeaeae;
  display: flex;
  flex-direction: column;
  transition: all 0.2s linear;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 10px 0 #0000001a;
  // &:nth-child(1){
  //   padding-top: 0;
  // }
  .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-bottom: 5px;
    border-radius: 5px;
    max-height: 300px;
    overflow: hidden;
    img {
      width: 100%;
      cursor: pointer;
      transition: all 0.2s;
    }
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }
  .card-body {
    padding: 10px 0;
    .card-body-title {
      //  align-self: center;
      font-size: 18px;
      line-height: normal;
    }
    .card-body-abstract {
      margin: 5px 0;
      align-self: flex-start;
      text-align: justify;
      letter-spacing: 1px;
      font-size: 14px;
      color: map-get($colors, 'text1');
    }
  }
  .card-footer {
    // padding: 0 10px 10px;
    @include f-sc(12px, map-get($colors, 'text2'));
    span {
      i {
        margin-right: 3px;
      }
      & + span {
        margin-left: 15px;
      }
    }
  }
}
</style>

<template>
  <div class="article-card-container">
    <div
      class="card-header"
      v-if="data.bgUrl"
      @click="$router.push({ name: 'articleDetail', query: { id: data._id } })"
    >
      <img :src="data.bgUrl" alt="" />
    </div>
    <div class="card-body">
      <h3 class="card-body-title">
        <a
          href="javascript:;"
          @click="
            $router.push({ name: 'articleDetail', query: { id: data._id } })
          "
          >{{ data.title }}</a
        >
      </h3>
      <p class="card-body-abstract">{{ data.abstract | formatAbstract }}</p>
    </div>
    <div class="card-footer">
      <!-- <div class="card-footer-info"> -->
      <span
        ><i class="el-icon-time"></i>发表于{{
          data.datetime | formatTime
        }}</span
      >
      <span
        ><i class="el-icon-edit-outline"></i
        >{{ data.classifyId | formateClassify }}</span
      >
      <span><i class="el-icon-view"></i>{{ data.views }}次浏览</span>
      <!-- </div>
        <div class="card-footer-read" @click="$router.push({name:'articleDetail',params:{id:data._id}})">阅读全文</div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formateClassify(val) {
      return val
        .map((item) => {
          item = item.split(',')[1]
          return item
        })
        .join('/')
    },
  },
  data() {
    return {}
  },
  created() {},
}
</script>
