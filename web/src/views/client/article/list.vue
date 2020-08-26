<style lang='scss' scoped>
.index-content {
  .article-list {
    padding: 20px 0;
    .article-title {
      margin: 0 auto;
      padding: 0;
      display: inline-block;
      color: #00baba;
      border-bottom: 1px solid #00baba;
      cursor: pointer;
      font-size: 18px;
      letter-spacing: 1px;
      transition: all 0.2s linear;
      &:hover {
        color: #fff;
        background: #00baba;
      }
    }
    .article-abstract {
      margin: 20px 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      letter-spacing: 1px;
    }
    .article-info {
      font-size: 12px;
      span + span {
        margin-left: 20px;
      }
    }
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>

<template>
  <div class="index-content">
    <transition-group name="list">
      <div class="article-list"
           v-for="(item,index) in articleList"
           :key="index">
        <h3 class="article-title"
            @click="$router.push({name:'main.articleDetail',params:{id:item._id}})">{{item.title}}</h3>
        <p class="article-abstract">{{item.abstract | formatText}}</p>
        <div class="article-info">
          <!-- <span class="article-author">{{item.author}}</span> -->
          <span><i class="el-icon-date"></i> 发表于 {{item.datetime | formatTime}}</span>
          <span><i class="el-icon-edit"></i> {{item.author}}</span>
          <span><i class="el-icon-view"></i> {{item.views}}人浏览</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { getArticle } from '@service/client/index/index';
export default {
  data () {
    return {
      articleList: []
    }
  },
  filters: {
    formatTime: function (value) {
      if (!value) return '';
      return value.replace('T', ' ').slice(0, -5);
    },
    formatText: function (value) {
      if (!value) return '';
      let strLen = 200;//限制字符数
      return value.length > strLen ? value.slice(0, strLen) + '...' : value;
    }
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      getArticle().then(res => {
        this.articleList = res.data.data;
      })
    }
  },
}

</script>