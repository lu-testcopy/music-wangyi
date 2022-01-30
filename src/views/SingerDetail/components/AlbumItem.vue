<template>
    <div class="album-item-container" v-loading="loading">
      <!-- 左边的列表区域图像区域 -->
      <div class="pic">
        <img :src="albumDetail.albumCover" alt="">
      </div>
      <!-- 右边的歌曲列表区域 -->
      <div class="album-info">
        <h4>{{albumDetail.name}}</h4>
        <div 
          class="music-item" 
          v-for="(item , index) in musicList" 
          :key="index"
        >
          <div class="left">
            <span class="index">{{index+1}}</span>
            <span class="name">{{item.name}}</span>
          </div>
          <span>{{item.ar[0].name}}</span>
        </div>
        <p @click="seeMore()">查看更多></p>
      </div>
    </div>
</template>
<script>
import { albumInfo } from '@/api/album.js'
export default {
  name: 'AlbumItem',
  props: {
    albumId: {
      require: true,
      default: ''
    }
  },
  created() {
    this.getAlbumInfo() 
  },
  data() {
    return {
      musicList: [],
      albumDetail: {},
      loading: false
    }
  },
  methods: {
    async getAlbumInfo() {
      this.loading = true
      const { data } = await albumInfo(this.albumId)
      var albumDetail = {albumCover: data.album.blurPicUrl, name: data.album.name }
      this.albumDetail = albumDetail
      var musicList = data.songs
      if(musicList.length>10) {
        this.musicList = musicList.slice(0, 10)
        this.loading = false
      } else {
        this.musicList = musicList
        this.loading = false
      }
    }, 
    seeMore() {
      console.log(1);
    }
  }
}
</script>
<style lang="less" scoped>
  .album-item-container {
    width: 100%;
    display: flex;
    font-size: 12px;
    .pic {
      img {
        width: 150px;
        height: 150px;
        border-radius: 10px;
      }
    }
    .album-info {
      width: 100%;
      margin-left: 15px; 
      &>div:nth-child(even) {
          background-color: #ddd;
      }
      h4 {
        margin-bottom: 10px;
      }
      .music-item {
        display: flex;
        justify-content: space-between;
        width: 96%;
        height: 25px;
        line-height: 25px;
        padding: 0 5px;
        box-sizing: border-box;
        cursor: pointer;
        .left {
          .index {
            margin-right: 10px;
          }
        }
      }
      .music-item:hover {
        background-color: pink;
      }
      p {
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
</style>