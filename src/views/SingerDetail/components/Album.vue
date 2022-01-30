<template>
  <div class="album-container">
     <!--top50区域 -->
     <div class="song-top">
       <!-- 图像区域 -->
       <div class="pic">
         <img src="../../style/img/topSongsLogo.png" alt="">
       </div>
       <!-- 列表区域 -->
       <div class="song-list">
         <h4>热门50首</h4>
         <div 
           class="song-item" 
           v-for= "(item,index) in topMusics" 
           :key="index">
           <div class="left">
             <span class="index">{{index+1}}</span>
             <span class="name">{{item.name}}</span>
           </div>
           <span>{{item.ar[0].name}}</span>
         </div>
         <p class="more" @click="seeMore()" v-if="topShow">查看更多></p>
       </div>
     </div>
     <!-- 其余的专辑区域 -->
     <album-item 
       v-for="(id, index) in albumIds" 
       :key="index"
       :albumId="id"
       class="album-item"
     >
     </album-item>
  </div>
</template>
<script>
import { hotMusics, albums } from '@/api/singer.js'
const AlbumItem = () => import('./AlbumItem.vue')
export default {
  name: 'Album',
  props: {
    singerId: {
      require: true,
      default: '',
    }
  },
  components: {
    AlbumItem
  },
  created() {
    this.getHotMusic() 
    this.getAlbum() 
  },
  data() {
    return {
      topMusics: [],
      otherTopMusics: [],
      topShow: true,
      albumIds: []
    }
  },
  methods: {
    // 获取歌手热门的50首歌曲
    async getHotMusic() {
      const data = await hotMusics(this.singerId)
      console.log(data);
    //   先截取前面的10首歌曲做展示
    const topMusics = data.data.songs.slice(0, 10)
    this.topMusics = topMusics
    // 再将后面的歌曲再赋值成一个数组
    const otherTopMusics = data.data.songs.slice(10)
    this.otherTopMusics = otherTopMusics
    },
    // 获取专辑数的执行函数
    async getAlbum() {
      const { data } = await albums(this.singerId)
      console.log(data);
      // 将专辑的id变成一个数组
      const albumIds = []
      data.hotAlbums.forEach(item => {
        albumIds.push(item.id)
      })
      this.albumIds = albumIds
    },
    // 点击查看更多
    seeMore() {
      // 1.点击热门50首的歌曲查看更多我们要将没有显示的歌曲列表展示到页面
      this.topShow = false
      this.topMusics.push(...this.otherTopMusics)
    }
  },
}
</script>
<style lang="less" scoped>
  .album-container {
    width: 100%;
    .song-top {
      width: 100%;
      display: flex;
      font-size: 12px;
      .pic {
        width: 150px;
        height: 150px;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .song-list {
        width: 100%;
        margin-left: 15px;
        &>div:nth-child(even) {
          background-color: #ddd;
        }
        .song-item {
          display: flex;
          justify-content: space-between;
          width: 94%;
          height: 25px;
          line-height: 25px;
          padding: 0 10px;
          margin-top: 2px;
          cursor: pointer;
          .left {
            display: flex;
            .index {
              width: 16px;
            }
          }
          .name {
            margin-left: 5px;
          }
        }  
        .more {
          color: #bbb;
          cursor: pointer;
        }
      }
    } 
    .album-item {
      margin-top: 40px;
    }  
  }
</style>