<style lang="scss" scoped>
@import '@assets/style/_vars';
@import '@assets/style/_mixins';
.detail-box {
  div + div {
    margin-top: 20px;
  }
  .detail-box-t {
    background: #fff;
    border-radius: 5px;
    @include pd(10px);
    .article-title {
      margin: 0;
      padding: 0;
      font-weight: bold;
      // @include f-sc(18px, #606975);
      font-size: 18px;
      text-align: center;
    }
    .article-from {
      font-size: 12px;
      margin: 5px 0 20px;
      text-align: center;
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
  .detail-box-c {
    background: #fff;
    border-radius: 5px;
    @include pd(10px);
    h4.title {
      margin-bottom: 30px;
    }
    .no-data {
      font-size: 14px;
    }
  }
  .detail-box-b {
    h4.title {
      margin-bottom: 30px;
    }
    background: #fff;
    border-radius: 5px;
    @include pd(10px);
  }
}
</style>

<template>
  <div class="detail-box" v-if="detailData">
    <div class="detail-box-t">
      <h3 class="article-title">{{ detailData.title }}</h3>
      <div class="article-from">
        <span>发表于 {{ detailData.datetime | formatTime }}</span>
        <!-- <span><i class="el-icon-edit"></i> {{ detailData.author }}</span> -->
        <span><i class="el-icon-view"></i> {{ detailData.views }}次浏览</span>
      </div>
      <div class="article-content" v-html="detailData.content"></div>
    </div>
    <div class="detail-box-c">
      <h4 class="title">{{ `评论列表（${commentData.length}条 ）` }}</h4>
      <!-- 评论区 -->
      <wb-article-comment
        v-if="commentData.length > 0"
        :commentData="commentData"
      ></wb-article-comment>
      <span v-else class="no-data">暂无评论</span>
    </div>
    <div class="detail-box-b">
      <h4 class="title">发表评论</h4>
      <!-- 发布评论 -->
      <wb-release-card
        :id="detailData._id"
        @trigger-update="getCommentList"
      ></wb-release-card>
    </div>
  </div>
  <wb-loading v-else></wb-loading>
</template>

<script>
import {
  getArticleDetail,
  editViews,
  getComment,
} from '@service/front/article/article'

export default {
  props: ['id'],
  data() {
    return {
      detailData: null,
      commentData: [],
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.detailData = null
      let _id = this.$route.query.id
      getArticleDetail({ _id }).then((res) => {
        this.detailData = res.data.data
        res.data.code === 0 && editViews({ _id }) && this.getCommentList()
        document.title = `Whatblog | ${this.detailData.title}`
      })
    },
    getCommentList() {
      getComment({ articleId: this.detailData._id }).then((res) => {
        this.commentData = res.data.data
      })
    },
  },
  watch: {
    $route() {
      this.getList()
    },
  },
}
</script>
