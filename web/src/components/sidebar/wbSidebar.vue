<style lang="scss" scoped>
.sidebar-container {
    background: #fff;
    box-shadow: 0 0 12px #0000001a;
    border-radius: 10px;
    overflow: hidden;
  .el-input {
    // margin-bottom: 20px;
    /deep/ .el-input__inner {
      border-radius: 0px;
      // padding: 0;
      border: none;
      background: transparent;
      // box-shadow:0 1px 0 #00000026;
      &::placeholder{
        color: #aeaeae;
      }
    }
  }
}
</style>

<template>
  <div class="sidebar-container">
    <!-- 搜索框 -->
    <el-input v-model="keyWord" placeholder="搜点什么吧~" @keyup.enter.native="handlerSearch"></el-input>
    <!-- 个人信息卡片 -->
    <wb-user-card></wb-user-card>
    <!-- 音乐卡片 -->
    <wb-music-card
      @toogleLyric="toogleLyric"
      @updateLyric="updateLyric"
      :list="list"
    ></wb-music-card>
  </div>
</template>

<script>
import { playlistDetail } from '@service/front/sidebar/sidebar'

export default {
  data() {
    return {
      keyWord:'',
      list: [],
    }
  },
  created() {
    this.getPlaylistDetail()
  },
  methods: {
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
    handlerSearch(){
      this.$emit('handlerSearch',this.keyWord)
    },
    toogleLyric() {
      this.$emit('toogleLyric')
    },
    updateLyric(val) {
      this.$emit('updateLyric', val)
    },
  },
}
</script>
