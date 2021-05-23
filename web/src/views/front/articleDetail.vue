<style lang="scss" scoped>
@import '@assets/style/_vars';
@import '@assets/style/_mixins';
.detail-box {
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
          font-weight: bold;
          font-family: serif;
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

</style>

<template>
      <div class="detail-box" v-if="detailData">
        <h3 class="article-title">{{ detailData.title }}</h3>
        <div class="article-from">
          <span>发表于 {{ detailData.datetime | formatTime }}</span>
          <!-- <span><i class="el-icon-edit"></i> {{ detailData.author }}</span> -->
          <span><i class="el-icon-view"></i> {{ detailData.views }}次浏览</span>
        </div>
        <div class="article-content" v-html="detailData.content"></div>
      </div>
      <wb-loading v-else></wb-loading>
</template>

<script>
import {
  getArticleDetail,
  editViews,
} from '@service/front/article/article'

export default {
  props: ['id'],
  data() {
    return {
      detailData: null,
    }
  },
  filters: {},
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.detailData=null;
      let _id = this.$route.query.id;
      editViews({ _id })
        .then((res) => {
          if (res.data.code === 0) return getArticleDetail({ _id })
        })
        .then((res) => {
          this.detailData = res.data.data
          document.title = `Whatblog | ${this.detailData.title}`
        })
    },
  },
  watch:{
    '$route'(){
      this.getDetail();
    }
  }
}
</script>
