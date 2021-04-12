<style lang="scss" scoped>
.sidebar-container {
  .el-input {
    margin-bottom: 20px;
    /deep/ .el-input__inner {
      border-radius: 0px;
      border-color: #ccc;
    }
  }
}
</style>

<template>
  <div class="sidebar-container">
    <el-input placeholder="搜点什么吧~" :disabled="true"></el-input>
    <music-control
      @toogleLyric="toogleLyric"
      @updateLyric="updateLyric"
      :list="list"
    ></music-control>
  </div>
</template>

<script>
import musicControl from '@components/musicControl/musicControl'
import { playlistDetail } from '@service/client/sidebar/sidebar'

export default {
  components: {
    musicControl,
  },
  data() {
    return {
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
    toogleLyric() {
      this.$emit('toogleLyric')
    },
    updateLyric(val) {
      this.$emit('updateLyric', val)
    },
  },
}
</script>
