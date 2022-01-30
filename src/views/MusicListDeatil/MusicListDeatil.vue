<template>
    <div class="detail-container" ref="detailRef">
     <!-- 歌单信息区域 -->
     <div class="song-description">
       <!-- 歌单的图片区域 -->
       <div class="left">
         <img :src="songDescription.coverImgUrl" alt="">
       </div>
       <!-- 歌单的信息区域 -->
       <div class="right">
         <div class="title">{{songDescription.name}}</div>
         <!-- 歌单创建者信息 -->
         <div class="creator-info">
           <img :src="songDescription.avatarUrl" alt="">
           <span @click="pushUrl(songDescription.userId)">{{songDescription.nickname}}111</span>
         </div>
         <!-- 按钮区域 -->
         <div class="button">
            <!-- 点击播放全部，要从歌单的第一首歌曲播放 -->
           <el-button type="danger" round  @click="allPlay">
             <i class="iconfont icon-bofangsanjiaoxing"></i>
             播放全部
           </el-button>
           <el-button round>
             <i class="iconfont icon-shoucang"></i>
             收藏
           </el-button>
            <el-button  round>
             <i class="iconfont icon-fenxiang"></i>
             分享
           </el-button>
         </div>
         <!-- 其余区域 -->
         <div class="song-other">
           <!-- 标签区域 -->
           <div class="tags">
             <span>标签:</span>
             <span 
               v-for="(item, index) in songDescription.tags" 
               :key="index"
               class="tag-item"
             >
               {{item}}
             </span>
           </div>
           <!-- 歌曲数区域 -->
           <div class="count">
             <span>歌曲:&nbsp{{songDescription.trackCount}}&nbsp&nbsp</span>
             <span>播放:&nbsp{{songDescription.playCount}}</span>
           </div>
           <!-- 歌曲描述 -->
           <div class="description">
             简介:&nbsp{{songDescription.description}}
           </div>
         </div>
       </div>
     </div>
     <el-tabs v-model="activeName" @tab-click="handleClick" class="song-tabs">
      <el-tab-pane label="歌曲列表" name="first">
        <music-list :musicList=musicList></music-list>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">
        <comments :songId="songId" @onScroll="onScroll"></comments>
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="third">
        <collect :songId="songId"></collect>
      </el-tab-pane>
     </el-tabs>
     <div class="back-top" :class="{'back-top-amition':backShow}" @click="onScroll">

     </div>
    </div>
</template>
<script>

import { songDetail, otherMusics } from '@/api/song.js'
import { musicUrl } from '@/api/music.js'

import pubsub from 'pubsub-js'

const MusicList = () => import('./compoments/MusicList/MusicList.vue')
const Comments = () => import('./compoments/Comments/Comments.vue')
const Collect = () => import ('./compoments/Collect/Collect.vue')

export default {
  name: 'MusicListDeatil',
  created() {
    this.getSongDetail() 
  },
  components: {
    MusicList,
    Comments,
    Collect
  },
  mounted() {
    this.$refs.detailRef.onscroll = () => {
      if(this.$refs.detailRef.scrollTop > 100) {
        this.backShow = true
      } else {
        this.backShow = false
      }
    }
  },
  data() {
    return {
      // 歌单的描述信息
      songDescription: {},
      activeName: 'first',
      musicList: [],
      backShow: false,
      mId: ''
    }
  }, 
  computed: {
    songId() {
      return this.$route.params.id
    },
    timestamp() {
      return this.$route.query.timestamp
    }
  },
  methods: {
    async getSongDetail() {
      const { data }  = await songDetail(this.songId ,this.timestamp)
      var { description, name, tags, coverImgUrl, trackCount, creator, createTime, playCount, userId } = data.playlist
      var { avatarUrl, nickname } = creator
      // 创建一个对象将歌单的描述放在里面
      var songObj = {
        description,
        name,
        tags,
        coverImgUrl,
        trackCount,
        avatarUrl,
        nickname,
        createTime,
        playCount,
        userId
      }
      // console.log(songObj)
      this.songDescription = songObj
      // 如果用户没有登录我们会展示没有登录的歌曲数
      // 否则展示登录之后全部的歌曲列表
      var userInfo = this.$store.state.userInfo
      if(!userInfo) {
        this.musicList = data.playlist.tracks
      } else {
        this.musicList = data.playlist.tracks
        // 1.截取从下标20到最后一个下标的歌曲id数组
        var otherTracks = data.playlist.trackIds.slice(20)
        var otherIds = []
        otherTracks.forEach(item => {
          otherIds.push(item.id)
        })
        // 将得到的id数组转换成字符串
        var otherIdsStr = otherIds.join(',')
        // 发送网络请求，获取其余的歌曲信息
        const songs  = await otherMusics(otherIdsStr)
        const result = songs.data.songs
        this.musicList.push(...result)
      }

    },
    async handleClick() {
     if(this.activeName === 'second') {
      // 点击tab栏，如果我们点击的是评论选项，我们要获取评论的数据
      // 发起网络请求
      // const { data } = await comments(this.songId)
      // console.log( data );
     }
    },
    onScroll() {
      // console.log(1);
     this.$refs.detailRef.scrollTop = 0
    },
    pushUrl(id) {
      console.log(id);
      // 跳转到歌单创建者的详情页
      this.$router.push({name: 'personal', params: {id: id}})
    },
    // 点击全部播放按钮，播放第一首执行的函数

    allPlay() {
      console.log(1);
    //  获取第一首歌曲的索引，并得到第一首歌曲的Id
      this.mId = this.musicList[0].id
      this.publish() 
    },

    async publish() {
      // 发送网络请求，获取音乐的url地址
      const { data } = await musicUrl({id: this.mId})
      console.log(data);
      // 获取音乐的url
      const mUrl = data.data[0].url
      console.log(mUrl);
      // 音乐的图像
      const pic = this.musicList[0].al.picUrl
      // 音乐的时长
      const dt = this.musicList[0].dt
      // 音乐的名称
      const mName = this.musicList[0].al.name
      const id = data.data[0].id
      let musicObj = {
        mUrl,
        pic,
        dt,
        mName,
        id
      }
      console.log(musicObj );
      // 发布事件
      pubsub.publish('musicPlay', musicObj)    
    }
  },
}
</script>
<style lang="less" scoped>
  .detail-container {
    padding: 0 2%;
    height: 100%;
    overflow-y: auto;
    .song-description {
      display: flex;
      align-items: center;
      height: 200px;
      .left {
        margin-right: 15px;
        img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
        }
      }
      .right {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 20px;
          font-weight: 600;
          color: #373737;
          line-height: 15px;
        }
        .creator-info {
          display: flex;
          align-items: center;
          height: 25px;
          margin: 8px 0;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 10px;
          }
          span {
            cursor: pointer;
            font-size: 12px;
            color: #6191c2;
          }
        }
        .button {
          margin-bottom: 10px;
          .el-button {
            padding: 5px 10px;
            font-size: 12px;
            .iconfont {
              font-size: 12px;
            }
          }
        }
        .song-other {
          font-size: 12px;
          margin-left: 15px;
          .tags {
            margin-bottom: 5px;
            .tag-item {
              color: #6191c2;
            }
          }
          .count {
            margin-bottom: 5px;
          }
          .description {
            width: 800px;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; 
          }
        }
      }
    }
    .song-tabs {
      /deep/.el-tabs__nav-wrap::after {
        width: 0;
      }
      /deep/.el-tabs__item {
        font-size: 12px;
        padding-left: 0;
        padding-right: 20px;
      }
    }
    .back-top {
      position: fixed;
      bottom: -55px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #ccc;
      transition: 1s;
    }
    .back-top-amition {
      position: fixed;
      bottom:65px;
      right: 20px;
      transition: 1s;
    }
  }
</style>