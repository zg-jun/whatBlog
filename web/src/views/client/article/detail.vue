<style lang='scss' scoped>
.detail-content {
  .article-title {
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: 18px;
    color: #606975;
  }
  .article-from {
    font-size: 12px;
    margin: 20px 0;
    span + span {
      margin-left: 10px;
    }
  }
  .article-content {
    /deep/ blockquote {
      display: block;
      border-left: 8px solid rgba(0, 186, 186, 0.5);
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }
    /deep/ table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      th {
        border-bottom: 2px solid #ccc;
        text-align: center;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
      }
      td {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
      }
    }
    /deep/ img {
      border-radius: 15px;
      transition: all 0.3s linear;
      &:hover {
        transform: scale(1.02);
      }
    }
    /deep/ pre {
      code {
        display: block;
        background-color: #2c2a2a;
        color: #8bc34a;
        border-radius: 5px;
        padding: 10px 20px;
        line-height: 20px;
        overflow-x: auto;
      }
    }
    /deep/ iframe {
      width: 100%;
      height: 400px;
    }
    /deep/ p {
      word-wrap: break-word;
      word-break: normal;
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 1s linear;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

<template>
  <div class="detail-content">
    <transition name="list"
                v-if="detailData">
      <div class="detail-content">
        <h3 class="article-title">{{detailData.title}}</h3>
        <div class="article-from">
          <span>发表于 {{detailData.datetime | formatTime}}</span>
          <span><i class="el-icon-edit"></i> {{detailData.author}}</span>
          <span><i class="el-icon-view"></i> {{detailData.views}}人浏览</span>
        </div>
        <div class="article-content"
             v-html="detailData.content"></div>
      </div>
    </transition>
    <Loading v-else></Loading>
  </div>
</template>

<script>
import { getArticleDetail, editViews } from '@service/client/index/index';
import Loading from '@components/loading/loading';

export default {
  props: ['id'],
  data () {
    return {
      detailData: null
    }
  },
  components: { Loading },
  filters: {
    formatTime: function (value) {
      if (!value) return '';
      return value.replace('T', ' ').slice(0, -5);
    },
  },
  created () {
    this.getDetail();
  },
  methods: {
    getDetail () {
      let _id = this.$route.params.id;
      editViews({ _id }).then(res => {
        if (res.data.code === 0) return getArticleDetail({ _id });
      }).then(res => {
        this.detailData = res.data.data;
        document.title = `Whatblog | ${this.detailData.title}`;
      })
    }
  },
}

</script>