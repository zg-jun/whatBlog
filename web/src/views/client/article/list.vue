<style lang='scss' scoped>
.index-content {
  .article-list {
    & + div {
      margin-top: 40px;
    }
    .article-title {
      margin: 0 auto;
      padding: 0;
      display: inline-block;
      color: #606975;
      border-bottom: 2px solid #606975;
      cursor: pointer;
      font-size: 18px;
      letter-spacing: 1px;
      transition: all 0.2s linear;
      &:hover {
        color: #fff;
        border-bottom-color: transparent;
        background: rgba(0, 186, 186, 0.5);
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
    <transition-group v-if="articleList.length>0"
                      name="list">
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
    <Loading v-else></Loading>
  </div>
</template>

<script>
import { getArticle } from '@service/client/index/index';
import Loading from '@components/loading/loading';
export default {
  data () {
    return {
      articleList: []
    }
  },
  components: { Loading },
  filters: {
    formatTime: function (value) {
      if (!value) return '--';
      let dateObj = new Date(value);
      let y = dateObj.getFullYear();
      let m = dateObj.getMonth()+1;
      let d = dateObj.getDate();
      let h = dateObj.getHours();
      let mi = dateObj.getMinutes();
      let s = dateObj.getSeconds();
      return `${y}-${String(m).padStart(2,0)}-${String(d).padStart(2,0)} ${String(h).padStart(2,0)}:${String(mi).padStart(2,0)}:${String(s).padStart(2,0)}`;
    },
    formatText: function (value) {
      if (!value) return '';
      let strLen = 200;//限制字符数
      return value.length > strLen ? value.slice(0, strLen) + '...' : value;
    }
  },
  created () {
    this.getList();
    document.title = 'Whatblog';
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