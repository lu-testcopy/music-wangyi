<template>
    <div class="music-container">
      <div class="play-area" :class="{'play-close': !isShow}">
        <play-detail :musicObj="musicObj "></play-detail> 
      </div>
      <div class="music">
        <audio ref="audio" :src="musicObj.mUrl"  @timeupdate="updateTime" autoplay="autoplay"></audio>
        <div class="left">
         <img 
           :src="musicObj.pic" alt="" 
           v-if="musicObj.pic" 
           @click="isShow = !isShow">
         <img src="../style/img/test.b66d0610.jpg" alt="" v-else>
         <span>{{musicObj.mName}}</span>
        </div>
        <div class="middle">
           <!-- 音乐控制区域 -->
         <div class="music-control">
           <div class="top">
             <i class="iconfont icon-24gl-repeat2"></i>
             <i class="iconfont icon-shangyishoushangyige" @click="playPrevious"></i>
             <!-- 暂停按钮 -->
             <i class="iconfont icon-24gl-pause play" v-if="isPlay" @click="musicPause"></i>
             <!-- 播放按钮 -->
             <i class="iconfont icon-bofangsanjiaoxing play" v-else  @click="mPlay"></i>
             <i class="iconfont icon-xiayigexiayishou" @click="playNext"></i>
             <i class="iconfont icon-xiai"></i>
           </div>
           <div class="bottom">
             <!-- 开始时间 -->
             <div class="start-timer">
               {{timeStamp | filterTime }}
             </div>
             <!-- 歌曲的时长条区域 -->
             <div class="play-progress" ref="playProgress">
               <div class="progress" ref="progress">
                 <div class="current-progress" ref="currentProgress"></div>
                 <div class="cricle" ref="cricle" @mousedown="down"></div>
               </div>
             </div>
             <!-- 结束的时间 -->
             <div class="end-timer">
               <span v-if="musicObj.dt">{{musicObj.dt | filterTime}}</span> 
               <span v-else>{{timeStamp | filterTime}}</span>
             </div>
           </div>
         </div>
        </div>
        <div class="right">333</div>
      </div>
    </div>
</template>
<script>
import pubsub from 'pubsub-js'
import dayjs from 'dayjs'

const PlayDetail = () => import('./components/PlayDetail.vue')

export default {
  name: 'MusicPlay',
  components: {
    PlayDetail
  },
  mounted() {
    // 订阅音乐播放的事件
    pubsub.subscribe('musicPlay', (a,musicObj) =>{
      this.timeStamp = 0
      this.isPlay = true
      this.musicObj = musicObj
      let audio = this.$refs.audio
      this.audio = audio
      this.audio.play()
      this.publishPlay()
    }) 
    // 获取总控制条的长度
    var progress = this.$refs.progress
    this.progressWidth = progress.offsetWidth
  }, 
  data() {
    return {
      musicObj: {},
      audio: null,
      timeStamp: 0,
      isPlay: false,
      progressWidth: 0,
      cLeft: 0,
      isShow: false
    }
  },
  filters: {
    filterTime(value) {
      return dayjs(value).format('mm:ss')  
    }
  },
  methods: {
    // 点击暂停按钮，音乐停止播放的执行函数
    musicPause() {
      if(this.isPlay) {
        this.audio.pause()
        this.isPlay = false
        pubsub.publish('playPause')
      }
    },

    mPlay() {
      if(this.musicObj.mName) {
        this.isPlay = true
        this.audio.play()  
        pubsub.publish('playM')
      }
    },

    // 监听音乐播放的时长
    updateTime(event) {
      // 当音乐的播放时长发生变化的时候，向音乐播放的详情区域发出一个发布事件
      pubsub.publish('playChangge',event.target.currentTime)
      this.timeStamp = parseInt(event.target.currentTime * 1000)
      //计算当音乐播放是小圆球的向前滚动的距离
      var moveLength = this.progressWidth * this.timeStamp / this.musicObj.dt
      this.$refs.cricle.style.left = moveLength + 'px'
      this.$refs.currentProgress.style.width = moveLength + 'px'
      if(this.timeStamp === this.musicObj.dt) {
        this.isPlay = false
      }
    },

    // 点击播放下一首执行的函数
    playNext() {
      // 发布播放下一首事件
       pubsub.publish('nextPlay')
    },

    // 点击播放上一首的执行函数
    playPrevious() {
      // 发布播放上一首的事件
       pubsub.publish('previousPlay')
    },

    down(event) {
      if(this.audio !== null) {
         var cLeftX = this.$refs.cricle.offsetLeft
      // 获取小圆点与进度条的宽度差
         var differenceX = cLeftX - this.$refs.progress.offsetLeft
         var progressWidth = this.$refs.progress.offsetWidth
         var cPostionX = event.clientX
         document.onmousemove = (e) =>{
           // 拖拽时小圆点应该在的位置
           var moveX = e.clientX - cLeftX + differenceX
           if(moveX >= progressWidth) {
             this.$refs.currentProgress.style.width = progressWidth + 'px'
             this.$refs.cricle.style.left = progressWidth  + 'px'
           } else if(cPostionX === this.$refs.progress.offsetLeft || moveX <= 0) {
              this.$refs.currentProgress.style.width = 0 + 'px'
              this.$refs.cricle.style.left = 0  + 'px'
           }  else{
              this.$refs.currentProgress.style.width = moveX  + 'px'
              this.$refs.cricle.style.left = moveX  + 'px'
              this.timeStamp = moveX / progressWidth * this.musicObj.dt
           }
           document.onmouseup = function() { 
             this.onmousemove = null
           }
         }
      }
      // 获取小圆点距离左边的距离
    },
    // 封装一哥发布事件来控制音乐详情页面的播放状态
    publishPlay() {
       pubsub.publish('playMusic')  
    }
  },
}
</script>
<style lang="less" scoped>
  .music-container {
    height: 100%;
    .play-area {
      position: absolute;
      bottom: 50px;
      width: 100%;
      height: 65vh;
      background-color: #e3e2e3;
      transition: 2s;
    }
    .play-close {
      bottom: -500px;
      transition: 2s;
    }
    .music {
      display: flex;
      height: 100%;
      align-items: center;
    // width: 100%;
      .left {
        display: flex;
        align-items: center;
        width: 20%;
        img {
          // position: relative;
          // top: 25px;
          // margin-top: -20px;
          margin-left: 10px;
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }
        span {
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .middle {
        display: flex;
        justify-content: center;
        width: 60%;
        .music-control {
          width: 350px;
          height: 40px;
          .top {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 40px;
            height: 24px;
            .play {
            font-size: 22px;
            }
          }
          .bottom {
            display: flex;
            height: 16px;
            .start-timer {
              width: 40px;
              font-size: 12px;
              text-align: center;
              color: #ccc;
            }
            .play-progress {
              flex: 1;
              display: flex;
              align-items: center;
              .progress {
              position: relative;
              width: 100%;
              height: 4px;
              background-color: #ccc;
              .current-progress {
                position: absolute;
                left: 0;
                top: 0;
                width: 0px;
                height: 4px;
                background-color: red;
              }
              .cricle {
                position: absolute;
                left: 0;
                top: -3px;
                width: 8px;
                height: 8px;
                border: 1px solid #ccc;
                border-radius: 50%;
                background-color: white;
                cursor: pointer;
              }
              }
            }
            .end-timer {
              width: 40px;
              font-size: 12px;
              text-align: center;
              color: #ccc;
            }
          }
        }
      }
      .right {
        width: 20%;
      }
    }
  }
</style>