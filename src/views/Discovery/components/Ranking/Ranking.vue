<template>
  <div class="ranking-container">
    <p>官方榜</p>
    <!-- 榜单排行榜的展示区域 -->
    <div class="top-ranking">
      <div 
        class="top-item"
        v-for="(item, index) in showRankingList" 
        :key="index"
      > 
      <!-- 图片区域 -->
        <div class="avtor">
          <img :src="item.coverImgUrl" alt="">
        </div>
      <!-- 表单区域 -->
        <div class="song-list">
          <div class="song-item" v-for="(item1, index1) in item.showList" :key="index1">
            <span>{{index1+1}}&nbsp;{{item1.name}}</span>
            <span>{{item1.ar[0].name}}</span>
          </div>
          <p @click="pushDetail(item)">查看更多&nbsp;></p>
        </div>
      </div>
    </div>
    <p>全球榜</p>
    <!-- 没有展示排行榜的歌单区域 -->
    <div class="other-song">
      <div 
       class="other-item" v-for="(item ,index) in otherList" 
       :key="index"
       @click="pushDetail(item)"
      >
        <img :src="item.coverImgUrl" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { topList, rankingList } from "@/api/list.js"
// const showRankingList = []
export default {
  name: 'Ranking',
  async created() {
    await this.getAllTopList()
    await this.getShowRanking(this.showList[0].id)
    console.log(1);
    await this.getShowRanking(this.showList[1].id)
    console.log(2);
    await this.getShowRanking(this.showList[2].id)
    console.log(3);
    await this.getShowRanking(this.showList[3].id)
    console.log(4);
  },
  data() {
    return {
     showList: [],
     otherList: [],
     showRankingList: []
    }
  }, 
  methods: {
    // 获取所有榜单的接口函数
    async getAllTopList() {
      const { data } = await topList()
      console.log(data);
      const showList = data.list.slice(0,4)
      this.showList = showList
      const otherList = data.list.slice(4)
      this.otherList = otherList
    },
    // 获取头部榜单详情的执行函数
    async getShowRanking(id) {
      const { data } = await rankingList(id)
      // console.log(data);
      // 截取前五条数据做展示列表，封面地址做封面
      const showInfo = {
                        id:data.playlist.id, 
                        trackNumberUpdateTime:data.playlist.trackNumberUpdateTime, 
                        coverImgUrl: data.playlist.coverImgUrl, 
                        showList:data.playlist.tracks.slice(0,5)
                        }
      this.showRankingList.push(showInfo)
      // console.log(showRankingList);
      // this.showRankingList = showRankingList
    },
    // 跳转到榜单详情执行的函数
    pushDetail(item) {
      if(this.$store.state.userInfo === null) {
        this.$message.info('您还没有登录，请登录')
      } else {
        
        this.$router.push({name: 'musiclistdetail', params: {id: item.id}, query:{timestamp: item.trackNumberUpdateTime}})
      }
    }
  },
}
</script>
<style lang="less" scoped>
  .ranking-container {
    margin-top: 60px;
    padding: 0 12%;
    .top-ranking {
      margin-top: 20px;
      .top-item {
        display: flex;
        justify-content: space-between;
        width: 900px;
        height: 200px;
        margin-bottom: 15px;
        .avtor {
          img {
            width: 180px;
            height: 180px;
            border-radius: 10%;
          }
        }
        .song-list {
           &>div:nth-child(2n-1){
             background-color: #f9f9f9 !important;
           }
          .song-item {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            box-sizing: border-box;
            width: 700px;
            height: 30px;
            line-height: 30px;
            border-radius: 10px;
            font-size: 12px;
            cursor: pointer;
           }
           p {
             margin-top: 5px;
             margin-left: 10px;
             font-size: 12px;
             cursor: pointer;
           }
        }
        
      }
    }
    .other-song {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      width: 900px;
      &>div:nth-child(5n+1) {
        margin-left: unset;
      }
      .other-item {
        margin-left: 22px;
        width: 160px;
        height: 200px;
        cursor: pointer;
        img {
          width: 160px;
          height: 160px;
          border-radius: 10px;
        }
        p {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
  }
</style>