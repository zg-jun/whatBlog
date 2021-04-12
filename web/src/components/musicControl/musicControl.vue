<style lang="scss" scoped>
.music-container {
  box-shadow: 0 0 2px 0 #ccc;
  height: 80px;
  display: flex;
  .container-l {
    width: 80px;
    &.playing {
      position: relative;
      &::after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: url('~@assets/images/wave.gif');
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .container-r {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 0 20px;
    background: #fff;
    .container-r-t {
      display: flex;
      flex-direction: column;
      span {
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
    .container-r-b {
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        cursor: pointer;
        user-select: none;
        &:hover {
          color: #00baba;
        }
      }
      .time-txt {
        font-size: 14px;
        opacity: 0.3;
      }
    }
  }
  .my-video {
    display: none;
  }
}
</style>

<template>
  <div class="music-container" v-if="list.length > 0">
    <div :class="['container-l', { playing: isPlay }]">
      <img :src="list[playIndex].picUrl" alt="" />
    </div>
    <div class="container-r">
      <div class="container-r-t">
        <span>{{ list[playIndex].name }}</span
        ><span>{{ list[playIndex].singer }}</span>
      </div>
      <div class="container-r-b">
        <i
          :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"
          @click="play"
        ></i>
        <i class="el-icon-arrow-left" @click="playIndex -= 1"></i>
        <i class="el-icon-arrow-right" @click="playIndex += 1"></i>
        <i class="el-icon-tickets" @click="toogleLyric"></i>
        <div class="time-txt">
          <span>{{ videoInfo.currentTime | formateTime }}</span
          >/<span>{{ videoInfo.duration | formateTime }}</span>
        </div>
      </div>
    </div>
    <!-- 播放器 -->
    <video class="my-video"></video>
  </div>
</template>

<script>
import { songUrl, getLyric } from '@service/client/sidebar/sidebar'
export default {
  filters: {
    formateTime(val) {
      if (!val) return '00:00'
      return `${Math.floor(val / 60)
        .toString()
        .padStart(2, 0)}:${Math.floor(val % 60)
        .toString()
        .padStart(2, 0)}`
    },
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isPlay: false,
      playIndex: 0,
      videoInfo: {
        currentTime: 0,
        duration: 0,
      },
      lyricList: [],
    }
  },
  methods: {
    // 切换歌词显示
    toogleLyric() {
      this.$emit('toogleLyric')
    },
    play() {
      this.isPlay = !this.isPlay
      let myVideo = document.querySelector('.my-video');
      document
        .querySelector('.my-video')
        .addEventListener('timeupdate', (e) => {
          e.target.ended && this.playIndex++
          this.videoInfo = {
            currentTime: e.target.currentTime,
            duration: e.target.duration,
          }
          this.lyricList[Math.round(e.target.currentTime)] &&
            this.$emit(
              'updateLyric',
              this.lyricList[Math.round(e.target.currentTime)]
            ) //更新歌词
        })
      if (this.isPlay) {
        myVideo.src
          ? myVideo.play()
          : songUrl({ id: this.list[this.playIndex].id })
              .then((res) => {
                myVideo.src = res.data.data[0].url
                myVideo.play()
                return getLyric({ id: this.list[this.playIndex].id })
              })
              .then((res) => {
                this.lyricList = this.parseLyric(res.data.lrc.lyric)
              })
      } else {
        myVideo.pause();
      }
    },
    parseLyric(lrc) {
      if (lrc === '') return ''
      var lyrics = lrc.split('\n')
      var lrcText = {}
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i])
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        var timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        var clause = lyric.replace(timeReg, '')
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k]
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1))
          var time = min * 60 + sec
          lrcText[time] = clause
        }
      }
      return lrcText
    },
  },
  watch: {
    playIndex(val) {
      val < 0 && (this.playIndex = this.list.length - 1)
      val > this.list.length - 1 && (this.playIndex = 0)
      let myVideo = document.querySelector('.my-video')
      songUrl({ id: this.list[this.playIndex].id })
        .then((res) => {
          myVideo.src = res.data.data[0].url
          this.isPlay && myVideo.play()
          return getLyric({ id: this.list[this.playIndex].id })
        })
        .then((res) => {
          this.lyricList = this.parseLyric(res.data.lrc.lyric)
        })
    },
  },
}
</script>
