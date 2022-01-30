<template>
    <div class="play-container">
       <div class="left"></div> 
       <div class="right">
         <!-- 顶部磁盘图片及歌词区域 -->
         <div class="top">
           <div class="pic">
             <div class="needle" :class="{'rotate': isPlay}">
               <img src="../../style/img/needle.png" alt="">
             </div>
             <div class="disk">
               <img src="../../style/img/cipan.png" alt="">
               <div class="cover" :class="{'cover-revolve': isPlay, 'cover-pause': !isPlay}">
                 <img :src="musicObj.pic" alt="">
               </div>
             </div>
           </div>
           <div class="lyric" ref="lyric">
             <div class="lyric-item" 
               :class="{'lyric-item-active': index === lIndex}"
               v-for="(item, index) in this.lyricArr" :key="index">
               {{item}}
             </div>
            
           </div>    
         </div>
       </div>
    </div>
</template>

<script>

import pubsub from 'pubsub-js'
import dayjs from 'dayjs'

import { lyric } from '@/api/music.js'
export default {
  name: 'PlayDetail',
  props: {
    musicObj: {
      require: true,
      default: {}
    }  
  },
  mounted() {
    pubsub.subscribe('playMusic', () => {
      this.isPlay = true
      this.getLyric()
      this.$refs.lyric.scrollTop = 0
    }),

    pubsub.subscribe('playChangge', (a, playTime) => {
      var musicPlayDuration = dayjs(playTime*1000).format('mm:ss.SSS')
      var newDuration = musicPlayDuration.substring(0,5)
      // console.log(newDuration)
      // 将歌词的时间数组进行循环
      const index =  this.lyricTime.findIndex((item) => {
                         return newDuration  === item.substring(0,5)
                      })
      if(index !== -1) {
        this.lIndex = index
        // this.$refs.lyric.scrollTop = index*3
        if(index > 10) {
          console.log(1);
          this.$refs.lyric.scrollTop = (index -9) * 30  
        }
      }
      }),

      pubsub.subscribe('playPause', (a) => {
        this.isPlay = false
      }),
      
      pubsub.subscribe('playM', (a) => {
        this.isPlay = true
      })
    
  },
  data() {
    return {
      isPlay: false, 
      lyric: '',
      lyricArr: [],
      lyricTime: [],
      lIndex: 0,
      tIndex: 0
    }
  },
  computed: {
    // 展现在页面上的经过处理的歌词
    // newLyric() {
    //   // 1.将老歌词变成数组
    //   var lyricArray = this.split('[')
    //   return  lyricArray
    // }
  },
  methods: {
    async getLyric () {
      const { data } = await lyric({id: this.musicObj.id})
      // this.lyric = data.lrc.lyric
      var lyricArray = data.lrc.lyric.split('[').slice(1)
      console.log(lyricArray)
      var lyricArr = []
      var lyricTime = []
      lyricArray.forEach(item => {
        // 将歌词分成2个数组，一个存放播放的时间，一个存放分段的歌词
        // 因为有的歌词会是一个空数组，所以我们要对空歌词的数组进行过滤
        if(item.split(']')[1].length !== 1) {
          lyricTime.push(item.split(']')[0])
          lyricArr.push(item.split(']')[1])
        }
      })
      this.lyricArr = lyricArr
      this.lyricTime = lyricTime
    }
  },
}
</script>

<style lang="less" scoped>
  .play-container {
    display: flex;
    height: 100%;
    overflow-y: scroll;
    .left {
      width: 30%;
      height: 100%;
    }
    .right {
      width: 70%;
      height: 100%;
      .top {
        display: flex;
        margin-top: 40px;
        width: 100%;
        height: 400px;
        .pic {
          width: 40%;
          height: 100%;
          .needle {
            position: relative;
            left: 120px;
            width: 90px;
            height: 70px;
            transform-origin: left top;
            transition: 1s 0.5s;
            z-index: 99;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .rotate {
            transform: rotate(30deg);
            transition: 1s;
          }
          .disk {
            position: relative;
            width: 250px;
            height: 250px;
            img {
              width: 100%;
              height: 100%;
            }
            .cover {
              position: absolute;
              top: 40px;
              left: 40px;
              width: 170px;
              height: 170px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            // 使用动画的属性
            .cover-revolve {
              animation: revolve 6s linear 1s infinite;
            }
            // 定义一个旋转的动画
            @keyframes revolve {
               from {
                 transform: rotate(0deg);  
               }
               to {
                 transform: rotate(360deg); 
               }
            }
            // 暂停动画
            .cover-pause {
              animation: revolve 6s linear 1s infinite;
              animation-play-state: paused;
            }
          }
        }
        .lyric {
          width: 60%;
          height: 100%;
          font-size: 12px;
          color: #aaa;
          text-align: center;
          overflow-y: scroll;
          .lyric-item {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
          }
          .lyric-item-active {
            color: red;
          }
        }
        .lyric::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>