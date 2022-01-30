<template>
    <div class="individuality-container">
       <!--头部走马灯--轮播图  -->
       <el-carousel :interval="2000" type="card" height="200px">
        <el-carousel-item v-for="(item , index) in bannersList" :key="index">
          <el-image
            :src="item.imageUrl"
            fit="fill">
          </el-image>
        </el-carousel-item>
       </el-carousel>
       <!-- 推荐歌单 -->
       <div class="recommend">
         <h3>推荐歌单></h3>
         <div class="recommend-container">
           <div class="recommend-item" 
             v-for="(item, index) in recommendList" 
             :key="index"
             @click="$router.push({name: 'musiclistdetail', params: {id: item.id}, query:{timestamp: item.trackNumberUpdateTime}})"
           >
             <img :src="item.picUrl" alt="">
             <p>{{item.name}}</p>
           </div>
         </div>
       </div>
    </div>
</template>
<script>
import { getBanners, recomendSongList } from '@/api/discovery.js'
export default {
  name: 'Individuality',
  created() {
    this.getBanner()
    this.getRecommendList()
  },
  data() {
      return {
        bannersList: [],
        recommendList: []
      }
  },
  methods: {
    async getBanner() {
      const { data } = await getBanners()
      this.bannersList = data.banners
    },
    async getRecommendList() {
      const { data } = await recomendSongList()
      this.recommendList = data.result
    }
  },  
}
</script>
<style lang="less" scoped>
   .individuality-container {
      // position: fixed;
      // top: 110px;
      // height: calc(100vh - 160px);
      // overflow-y: auto;
      margin-top: 50px;
      padding: 0 10%;
      /deep/.el-carousel {
         position: relative;
         left: 50%;
         transform: translateX(-400px);
         width: 800px;
         .el-image__inner {
           width: 400px;
           height: 180px;
           border-radius: 10px;
          }
      }
      .recommend {
         margin-top: 20px;
         .recommend-container {
            margin-top: 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .recommend-item {
               width: 176px;
               height: 226px;
               cursor: pointer;
               img {
                 width: 176px;
                 height: 176px;
                 border-radius: 10px;
               }
               p {
                 font-size: 12px;
               }
            }
         }
      }
    }
</style>