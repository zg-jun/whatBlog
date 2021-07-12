<style lang="scss" scoped>
.sidebar-container {
    background: #fff;
    // box-shadow: 0 0 12px #0000001a;
    border-radius: 5px;
    padding:10px;
    overflow: hidden;
    .card-style{
      margin-bottom: 20px;
    }
    .search-box{
      .el-input {
    // margin-bottom: 20px;
    // background: #fff;
    border-radius: 5px;
      // padding-left: 10px;
    /deep/ .el-input__inner {
      border-radius: 0px;
      padding: 5px 0;
      border: none;
      background: transparent;
      height: auto;
      line-height: normal;
      // border-bottom: 1px solid #aeaeae;
      // box-shadow:0 1px 0 #00000026;
      &::placeholder{
        color: #aeaeae;
      }
    }
  }
    }
    .classify-box{
      .classify-list{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        .classify-list-item{
          margin-right: 10px;
        }
      }
    }
    .hot-article-box{
  .hot-list{
        margin-top: 5px;
        .hot-list-item{
          display: flex;
          align-items: center;
          &+.hot-list-item{
            margin-top: 5px;
          }
          .hot-title{
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .view-count{
            font-size: 10px;
            i{
              margin-right: 3px;
            }
          }
        }
      }
    }
    .link-box{
      .link-list{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
      .link-list-item{
          margin-right: 10px;
      }
      }
    }
}
</style>

<template>
  <div class="sidebar-container">
    <!-- 搜索框 -->
    <div class="card-style search-box">
      <el-input v-model="keyWord" placeholder="搜点什么吧~" @keyup.enter.native="handlerSearch({keyWord})"></el-input>
    </div>
    <!-- 文章分类 -->
    <div class="card-style classify-box">
      <h4>文章标签</h4>
      <div class="classify-list">
        <span class="classify-list-item" v-for="item in classifyList" :key="item._id"><a href="javascript:;" @click="handlerSearch({cId:item._id})">{{item.classifyName}}</a></span>
      </div>
    </div>
    <!-- 热门文章 -->
    <div class="card-style hot-article-box">
      <h4>热门文章</h4>
      <div class="hot-list">
        <a href="javascript:;" class="hot-list-item" v-for="item in hotArticleList" :key="item._id">
          <span class="hot-title"  @click="$router.push({name:'articleDetail',query:{id:item._id}})">{{item.title}}</span>
          <span class="view-count"><i class="el-icon-view"></i>{{item.views}}</span>
        </a>
      </div>
    </div>
    <!-- 链接 -->
    <div class="card-style link-box">
      <h4>友链</h4>
      <div class="link-list">
        <span class="link-list-item"><a href="https://github.com/zg-jun" target="_blank">GitHub</a></span>
        <span class="link-list-item"><a href="https://blog.csdn.net/qq_38944959" target="_blank">CSDN</a></span>
        <span class="link-list-item"><a href="javascript:;" @click="$router.push({name:'friendsList'})">小伙伴</a></span>
      </div>
    </div>
    <!-- 音乐卡片 -->
    <wb-music-card
      @toogleLyric="toogleLyric"
      @updateLyric="updateLyric"
      :list="list"
    ></wb-music-card>
  </div>
</template>

<script>
import { playlistDetail,getClassify,getHotArticle } from '@service/front/sidebar/sidebar'

export default {
  data() {
    return {
      keyWord:'',
      list: [],
      classifyList:[],
      hotArticleList:[]
    }
  },
  created() {
    this.getPlaylistDetail();
    this.getClassifyList();
    this.getHotArticleList();
  },
  methods: {
    // 获取文章分类
    getClassifyList(){
      getClassify().then(res=>{
        this.classifyList = res.data.data;
      })
    },
    // 获取热门文章
    getHotArticleList(){
      getHotArticle().then(res=>{
              this.hotArticleList = res.data.data;
      })
    },
    getPlaylistDetail() {
      playlistDetail({ id: 3778678 }).then((res) => {
        let result = res.data.playlist.tracks.map((item) => {
          return {
            id: item.id,
            name: item.name,
            singer: item.ar[0].name,
            picUrl: item.al.picUrl,
          }
        })
        this.list = result
      })
    },
    handlerSearch(searchData){
      this.$emit('handlerSearch',searchData)
    },
    toogleLyric() {
      this.$emit('toogleLyric')
    },
    updateLyric(val) {
      this.$emit('updateLyric', val)
    },
    // 根据分类查文章
    filterArticle(id){
      this.$emit('filterArticle',id)
    }
  },
}
</script>
