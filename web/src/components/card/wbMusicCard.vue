<style lang="scss" scoped>
.music-card-container {
  // box-shadow: 0 2px 10px 0 #0000001a;
  border-radius: 25px;
  background: #e0e8f2;
  // overflow: hidden;
  // padding: 5px;
  user-select: none;
  .music-box{
    height: 50px;
    // background: #fff;
    // border-radius: 5px;
    position: relative;
    display: flex;
    .container-l {
    width: 60px;
    height: 60px;
    flex-shrink: 0;//防止压缩
    align-self: flex-end;
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
      border-radius: 5px;
    }
    }
    .container-r {
    flex: 1;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // flex-direction: column;
    padding: 0 15px 0 10px;
    // background: #fff;
    .container-r-t {
      flex:1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all .3s;
      span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        &.title{
          font-weight: bolder;
        }
        &.lyric{
          margin-top: 3px;
          text-align: center;
          font-size: 12px;
        }
      }
    }
    .container-r-b {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        user-select: none;
        &+i{
          margin-left: 15px;
        }
        &:nth-of-type(1){
          font-size: 30px;
        }
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
  }
  .music-list{
    width: 100%;
    max-height: 200px;
    overflow-y:auto;
    // 滚动条样式
    &::-webkit-scrollbar {
      width: 3px;
      height: 1px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #51525d;
    }
    .list-item{
      padding: 0 15px;
      line-height: 40px;
      cursor: pointer;
      // margin-top: 10px;
      font-size: 14px;
      &.active{
        color: #00baba;
      }
      &:nth-child(odd){
        background: #8f171703;
      }
    }
  }
}
</style>

<template>
  <div class="music-card-container" v-if="list.length > 0">
    <div class="music-box">
    <div :class="['container-l', { playing: isPlay }]">
      <img :src="list[playIndex].picUrl" alt="" />
    </div>
    <div class="container-r">
      <div class="container-r-t">
        <span :class="{'title':lyricTxt}">{{ list[playIndex].name }}-{{ list[playIndex].singer }}</span>
        <span v-if="lyricTxt" class="lyric">{{lyricTxt}}</span>
      </div>
      <div class="container-r-b">
        <!-- <i class="el-icon-arrow-left" @click="playIndex -= 1"></i>
        <i class="el-icon-arrow-right" @click="playIndex += 1"></i> -->
        <!-- <div class="time-txt">
          <span>{{ videoInfo.currentTime | formateTime }}</span
          >/<span>{{ videoInfo.duration | formateTime }}</span>
        </div> -->
        <i :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'" @click="play"></i>
        <i class="el-icon-tickets" @click="isShowList = !isShowList"></i>
      </div>
    </div>
    </div>
    <!-- 列表 -->
      <ul class="music-list" v-if="isShowList">
        <li class="list-item" v-for="(item,index) in list" :key="index" :class="{'active':playIndex===index}" @click="playIndex=index">
          {{item.name}}-{{item.singer}}
        </li>
      </ul>
  </div>
</template>

<script>
import { songUrl, getLyric } from '@service/front/sidebar/sidebar'
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
      isShowList:false,
      isPlay: false,
      playIndex: 0,
      videoInfo: {
        currentTime: 0,
        duration: 0,
      },
      lyricTxt:'',
      lyricList: [],
      videoObj:null
    }
  },
  mounted() {
    // 创建播放器
    this.videoObj = document.createElement('video');
    this.videoObj.style.display = 'none';
  },
  methods: {
    // 切换歌词显示
    toogleLyric() {
      this.$emit('toogleLyric')
    },
    play() {
      this.isPlay = !this.isPlay;
      this.videoObj.addEventListener('timeupdate', (e) => {
          e.target.ended && this.playIndex++;
          this.videoInfo = {
            currentTime: e.target.currentTime,
            duration: e.target.duration,
          }
         if(this.lyricList[Math.round(e.target.currentTime)]){
           //更新歌词
           this.lyricTxt=this.lyricList[Math.round(e.target.currentTime)];
           this.$emit(
              'updateLyric',
              this.lyricList[Math.round(e.target.currentTime)]
            ) 
         } 
        })
      if (this.isPlay) {
        this.videoObj.src
          ? this.videoObj.play()
          : songUrl({ id: this.list[this.playIndex].id })
              .then((res) => {
                this.videoObj.src = res.data.data[0].url
                this.videoObj.play()
                return getLyric({ id: this.list[this.playIndex].id })
              })
              .then((res) => {
                this.lyricList = this.parseLyric(res.data.lrc.lyric)
              })
      } else {
        this.videoObj.pause();
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
      songUrl({ id: this.list[this.playIndex].id })
        .then((res) => {
          this.videoObj.src = res.data.data[0].url
          this.isPlay && this.videoObj.play()
          return getLyric({ id: this.list[this.playIndex].id })
        })
        .then((res) => {
          this.lyricList = this.parseLyric(res.data.lrc.lyric)
        })
    },
  },
}
</script>
