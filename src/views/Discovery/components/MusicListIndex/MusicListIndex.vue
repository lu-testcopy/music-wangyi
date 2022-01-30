<template>
    <div class="music-container">
      <div class="top-song">
        <img :src="topSongInfo.coverImgUrl">
        <div class="song-info">
          <el-button icon="el-icon-service" round plain>精品歌单</el-button>
          <h3>{{topSongInfo.name}}</h3>
          <p>{{topSongInfo.description}}</p>
        </div>
      </div>
      <!-- 歌单分类区域 -->
      <div class="song-list">
        <!-- 左边区域 -->
        <div class="left">
          <el-popover
            placement="bottom-start"
            width="300"
            trigger="click"
            v-model="songShow"
          >
            <div class="all-item">
              <div class="all-tag-item" v-for="(item,index) in allSongList" :key="index" @click="getSong(item,index)">
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="selectes-tag" slot="reference">
              <span v-if="isClassifyShow">另类/独立</span>
              <span v-else>{{allSongList.length!==0?allSongList[tagIndex].name:''}}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-popover>
        </div>
        <!-- 右边区域 -->
        <div class="right">
          <div class="tag-item" :class="{active:showTagIndex===index }" v-for="(item,index) in showSongList" :key="index" @click="getShowSongIndex(item,index)">
            {{item.name}}
          </div>
        </div>
      </div>
      <!-- 歌单区域 -->
      <div class="song-container">
        <!-- 每个歌单区域 -->
        <div class="song-item" 
          v-for="(item,index) in songsList" :key="index"
           @click="$router.push({name: 'musiclistdetail', params: {id: item.id}, query:{timestamp: item.trackNumberUpdateTime}})"
        >
          <img :src="item.coverImgUrl" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
</template>
<script>
import { topSong, showSong, allSong, songsList } from '@/api/discovery.js'
export default {
  name: 'MusicListIndex',
  async created() {
    await this.getTopSong()
    await this.getShowSong()
    await this.getAllSong()
    await this.getSongsList(this.showSongList[0].name)
  },
  mounted() {
   
  },
  data() {
      return {
        topSongInfo: {},
        showSongList: [],
        allSongList: [],
        tagIndex: 0,
        showTagIndex: 0,
        // showTagIndex:0,
        songShow: false,
        // 用于判断全部分类的列表里面没有显示分类的那个单个分类，再将这个分类显示到左边的单个分类框里面
        isClassifyShow: false,
        songsList: []
      }
  },
  methods: {
    async getTopSong() {
      const { data } = await topSong()
      this.topSongInfo = data.playlists[0]
    },
    // 获取显示的歌单分类的执行函数
    async getShowSong() {
        console.log(11);
      const { data } = await showSong()
      console.log(data);
      this.showSongList = data.tags
    },
    // 获取全部歌单分类的执行函数
    async getAllSong() {
      const { data } = await allSong()
      console.log(data);
      this.allSongList = data.sub
      this.$nextTick(() =>{
				const index3 = this.allSongList.findIndex(item => {
          return item.name === this.showSongList[0].name
        })
        console.log(index3);
        this.tagIndex = index3
			})
    },
    // 点击全部歌单分类执行的函数
    getSong(item,index) {
      this.tagIndex = index
      // 将这个索引存放到本地,以方便持久化
      const index1 = this.showSongList.findIndex(item1 => {
        return item.name === item1.name
      })
      console.log(index1);
      this.showTagIndex = index1
      this.songShow = false
      this.getSongsList(item.name)
    },
    // 点击显示的歌单分类执行的函数
    getShowSongIndex(item,index) {
      this.showTagIndex = index
      const index2 = this.allSongList.findIndex(item2 => {
        return item.name === item2.name
      })
      if(index2==-1){
        this.isClassifyShow = true 
      } else {
        this.isClassifyShow = false
        this.tagIndex = index2
      }
      this.getSongsList(item.name)
    },
    // 获取歌单的执行函数
    async getSongsList(cat){
      this.songsList = []
      const { data } = await songsList(cat)
      console.log(data);
      this.songsList = data.playlists
    }  
  }
 }
</script>
<style lang="less" scoped>
   .music-container {
      margin-top: 60px;
      padding: 0 10%;
      .top-song {
        position: relative;
        left: 50%;
        transform: translateX(-500px);
        display: flex;
        align-items: center;
        width: 1000px;
        height: 200px;
        background-color: #ccc;
        border-radius: 10px;
        img { 
          width: 180px;          
          height: 180px;          
          border-radius: 10px; 
          margin-left: 10px;
          margin-right: 10px;         
        }
        .song-info {
           display: flex;
           flex-direction: column;
           justify-content: space-around;
           padding-right: 2%;
           box-sizing: border-box;
           height: 160px;
           .el-button {
             width: 120px;
             padding: 8px 10px;
           }
           h3 {
             color: #fff;
           }
           p {
             font-size: 12px;
             color: red;
             padding: 0 2%;
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
             overflow: hidden;
           }
        }
      }
      .song-list {
        position: relative;
        left: 50%;
        transform: translateX(-500px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding: 0 10px;
        width: 1000px;
        height: 30px;
        box-sizing: border-box;
        .left {
          .selectes-tag {
            padding: 0 5px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            border: 1px solid #ccc;
            border-radius: 10px;
            cursor: pointer;
          }
        }
        .right {
          display: flex;
          .tag-item {
            height: 20px;
            line-height: 20px;
            font-size: 10px;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
      .song-container {
        position: relative;
        left: 50%;
        transform: translateX(-500px);
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 1000px;
        .song-item {
          width: 180px;
          height: 230px;
          cursor: pointer;
          img {
            width: 180px;
            height: 180px;
            border-radius: 10px;
          }
          p {
            margin-bottom: 10px;
            font-size: 12px;
          }
        }
      }
    }
   .all-item {
     display: flex;
     flex-wrap: wrap;
     height: 250px;
     overflow-y: auto;
     font-size: 12px;
     .all-tag-item {
       width: 25%;
       height: 30px;
       text-align: center;
       cursor: pointer;
     }
   }
   .active {
      padding: 0 8px;
      border: 1px solid #DC143C;
      background-color: #ff6347;
      border-radius: 20px;
   }
</style>