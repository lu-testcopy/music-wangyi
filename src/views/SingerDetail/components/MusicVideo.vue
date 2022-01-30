<template>
    <div class="video-container">
      <div class="video" v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-loading="loading">
        <div class="videoItem" 
          v-for="(item, index) in videoList" 
          :key="index"
          @click="pushVideo(item.id)"
        >
        <!-- 图像区域 -->
          <div class="pic">
            <img :src="item.imgurl" alt="">
            <div class="count">
              <i class="iconfont icon-shipin-"></i>
              <span>{{item.playCount/10000}}万</span> 
            </div>
            <div class="timer">{{item.duration}}</div>
          </div>
        <!-- 名字区域 -->
          <div class="name">
            {{item.name}}
          </div>
        </div>
      </div>
      <div v-if="moreShow">没有更多了</div>
    </div>
</template>
<script>
import { singerMv } from '@/api/singer.js'
export default {
  name: 'MusicVideo',
  props: {
    singerId: {
      require: true,
      default: '',
    }
  },
  created() {
    // this.getSingerMv() 
  },
  data() {
    return {
      videoList: [],
      limit: 20,
      disabled: false,
      moreShow:false,
      loading: false    
    }
  }, 
  methods: {
    // async getSingerMv() {
    //   const { data }  = await singerMv({id: this.singerId, limit: this.limit})
    //   console.log(data);
    //   this.videoList = data.mvs
    // },
    async load() {
      this.disabled = true
      this.loading = true
      const { data }  = await singerMv({id: this.singerId, limit: this.limit})  
      const results = data.mvs
      if(results.length > this.videoList.length) {
        this.videoList = results
        this.disabled = false
        this.limit += 20
        this.loading = false
      } else {
        this.loading = false
        this.moreShow = true
      }
    },
    pushVideo(id) {
      if(this.$store.state.userInfo !== null) {
        this.$router.push({name: 'videoDeatil', params:{ id }})
      } else {
        this.$message.info('登陆之后，才能查看')
      }
    }
  },
}
</script>
<style lang="less" scoped>
  .video-container {
    padding: 0 40px;
    .video {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .videoItem {
        width: 228px;
        height: 200px;
        font-size: 12px;
        cursor: pointer;
        .pic {
          position: relative;
          width: 220px;
          height: 140px;
          font-size: 12px;
          img {
            width: 228px;
            height: 144px;
            border-radius: 10px;
          }
          .count {
            position: absolute;
            top: 2px;
            right: 2px;
            color: #fff;
          }
         .timer {
           position: absolute;
           bottom: 2px;
           right: 2px;
           color: #fff;
         }
        }
        .name {
          margin-top: 10px;
        }
      }
    }
    
  }
</style>